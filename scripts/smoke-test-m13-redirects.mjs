/**
 * MAHALAKSHMI TOURS AND TRAVELS — M13 HTTP REDIRECT SMOKE TEST
 * Dynamically loads expected redirects from src/config/m13-migration-registry.ts (Single Source of Truth),
 * spawns a production Next.js server (if not already running), and performs real HTTP requests
 * against all REDIRECT sources to verify 301/308 status, exact Location header, 1-hop execution,
 * final 200 OK canonical response, and zero loops/chains.
 */

import http from 'http';
import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Load authoritative redirect definitions directly from src/config/m13-migration-registry.ts
 */
function loadExpectedRedirects() {
  const registryPath = path.join(rootDir, 'src', 'config', 'm13-migration-registry.ts');
  const content = fs.readFileSync(registryPath, 'utf-8');

  const recordRegex = /{\s*sourcePath:\s*['"]([^'"]+)['"],\s*action:\s*['"]REDIRECT['"],\s*redirectTarget:\s*['"]([^'"]+)['"]/g;
  const redirects = [];
  let match;
  while ((match = recordRegex.exec(content)) !== null) {
    redirects.push({
      source: match[1],
      target: match[2],
    });
  }
  return redirects;
}

function fetchRaw(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers,
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function waitForServer(baseUrl, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await fetchRaw(baseUrl);
      return true;
    } catch (e) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  return false;
}

async function runSmokeTests(baseUrl) {
  const redirects = loadExpectedRedirects();

  console.log(`============================================================`);
  console.log(`M13 HTTP REDIRECT SMOKE TEST — TESTING ${baseUrl}`);
  console.log(`============================================================\n`);

  let failures = 0;
  let successCount = 0;
  let chainCount = 0;
  let loopCount = 0;

  for (const item of redirects) {
    const fullUrl = `${baseUrl}${item.source}`;
    try {
      // Step A: Initial HTTP GET request (do not auto-follow redirects)
      const res = await fetchRaw(fullUrl);
      const status = res.statusCode;
      const location = res.headers.location || '';

      // Step B: Verify Permanent Redirect status (301 or 308)
      const isPermanent = status === 301 || status === 308;
      if (!isPermanent) {
        console.error(`[FAIL] ${item.source}`);
        console.error(`       HTTP Status: ${status} (Expected 301 or 308 permanent redirect)`);
        failures++;
        continue;
      }

      // Step C: Verify Location header matches target
      const normalizedLocation = location.replace(/^https?:\/\/[^\/]+/, '');
      if (normalizedLocation !== item.target) {
        console.error(`[FAIL] ${item.source}`);
        console.error(`       Location: ${normalizedLocation} (Expected ${item.target})`);
        failures++;
        continue;
      }

      // Step D & E: Request target URL to verify 1-hop 200 OK and no chain/loop
      const targetUrl = `${baseUrl}${item.target}`;
      const targetRes = await fetchRaw(targetUrl);
      if (targetRes.statusCode !== 200) {
        if ([301, 308, 302, 307].includes(targetRes.statusCode)) {
          chainCount++;
          if (targetRes.headers.location?.includes(item.source)) {
            loopCount++;
            console.error(`[FAIL] ${item.source} -> Redirect Loop Detected!`);
          } else {
            console.error(`[FAIL] ${item.source} -> Redirect Chain Detected! Target ${item.target} redirected to ${targetRes.headers.location}`);
          }
        } else {
          console.error(`[FAIL] ${item.source} -> Target ${item.target} returned HTTP ${targetRes.statusCode} (Expected 200 OK)`);
        }
        failures++;
        continue;
      }

      console.log(`[PASS] ${item.source}`);
      console.log(`       ${status}`);
      console.log(`       Location: ${item.target}`);
      console.log(`       Final: ${item.target}`);
      console.log(`       Hops: 1\n`);
      successCount++;
    } catch (err) {
      console.error(`[FAIL] ${item.source} request error: ${err.message}\n`);
      failures++;
    }
  }

  console.log(`------------------------------------------------------------`);
  console.log(`M13 REDIRECT SUMMARY`);
  console.log(`Expected: ${redirects.length}`);
  console.log(`Tested: ${redirects.length}`);
  console.log(`Passed: ${successCount}`);
  console.log(`Failed: ${failures}`);
  console.log(`Chains: ${chainCount}`);
  console.log(`Loops: ${loopCount}`);
  console.log(`------------------------------------------------------------\n`);

  return failures === 0;
}

async function main() {
  let serverProcess = null;
  let baseUrl = process.env.TEST_URL;

  if (!baseUrl) {
    const port = 3099;
    baseUrl = `http://127.0.0.1:${port}`;
    console.log(`Starting Next.js production server on port ${port}...`);

    serverProcess = spawn('npx', ['next', 'start', '-p', String(port)], {
      cwd: rootDir,
      stdio: 'ignore',
      shell: true,
    });

    const isReady = await waitForServer(baseUrl);
    if (!isReady) {
      console.error('ERROR: Failed to start Next.js production server for smoke testing.');
      if (serverProcess) serverProcess.kill();
      process.exit(1);
    }
  }

  const passed = await runSmokeTests(baseUrl);

  if (serverProcess) {
    console.log('Stopping test server...');
    serverProcess.kill('SIGTERM');
  }

  if (!passed) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal error in M13 HTTP smoke test:', err);
  process.exit(1);
});
