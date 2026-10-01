/**
 * MAHALAKSHMI TOURS AND TRAVELS — M13 HTTP REDIRECT SMOKE TEST
 * Spawns a production Next.js server (if not already running) and performs
 * real HTTP requests against all 14 M13 redirect sources to verify 301/308 status,
 * exact Location header, 1-hop execution, final 200 OK canonical response, and zero loops.
 */

import http from 'http';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const EXPECTED_REDIRECTS = [
  { source: '/customised-tours', target: '/plan-your-journey' },
  { source: '/group-travel', target: '/travel-services/group-travel' },
  { source: '/college-trips', target: '/travel-services/college-trips' },
  { source: '/family-travel', target: '/travel-services/family-travel' },
  { source: '/function-travel', target: '/travel-services/function-travel' },
  { source: '/tours/madurai-meenakshi-amman-temple', target: '/tours/madurai' },
  { source: '/tours/thanjavur-big-temple', target: '/tours/thanjavur' },
  { source: '/travel-guide/college-industrial-visit-planning-guide', target: '/travel-guide/how-to-plan-college-industrial-visit-trip' },
  { source: '/travel-guide/temple-tour-etiquette-and-darshan-tips', target: '/travel-guide/weekend-getaways-from-madurai' },
  { source: '/travel-guide/choosing-between-van-and-sedan-for-group-travel', target: '/travel-guide/rameswaram-dhanushkodi-day-trip-guide' },
  { source: '/travel-guide/rameshwaram-dhanushkodi-1-day-trip-guide', target: '/travel-guide/madurai-to-kodaikanal-one-day-trip-plan' },
  { source: '/travel-guide/south-india-hill-station-packing-checklist', target: '/travel-guide/madurai-to-tiruchendur-rameshwaram-temple-tour-guide' },
  { source: '/travel-guide/monsoon-travel-tips-western-ghats', target: '/travel-guide/madurai-airport-ixm-outstation-cab-travel-guide' },
  { source: '/travel-guide/madurai-sightseeing-food-culture-guide', target: '/travel-guide/wedding-guest-transportation-madurai-marriage-halls' },
];

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
  console.log(`============================================================`);
  console.log(`M13 HTTP REDIRECT SMOKE TEST — TESTING ${baseUrl}`);
  console.log(`============================================================\n`);

  let failures = 0;
  let successCount = 0;

  for (const item of EXPECTED_REDIRECTS) {
    const fullUrl = `${baseUrl}${item.source}`;
    try {
      // Step A: Initial HTTP GET request (do not auto-follow redirects)
      const res = await fetchRaw(fullUrl);
      const status = res.statusCode;
      const location = res.headers.location || '';

      // Step B: Verify Permanent Redirect status (301 or 308)
      const isPermanent = status === 301 || status === 308;
      if (!isPermanent) {
        console.error(`FAIL: ${item.source} returned HTTP ${status} (expected 301 or 308 permanent redirect)`);
        failures++;
        continue;
      }

      // Step C: Verify Location header matches target
      const normalizedLocation = location.replace(/^https?:\/\/[^\/]+/, '');
      if (normalizedLocation !== item.target) {
        console.error(`FAIL: ${item.source} redirected to ${normalizedLocation} (expected ${item.target})`);
        failures++;
        continue;
      }

      // Step D & E: Request target URL to verify 1-hop 200 OK and no chain/loop
      const targetUrl = `${baseUrl}${item.target}`;
      const targetRes = await fetchRaw(targetUrl);
      if (targetRes.statusCode !== 200) {
        console.error(`FAIL: Redirect target ${item.target} returned HTTP ${targetRes.statusCode} (expected 200 OK)`);
        failures++;
        continue;
      }

      // Verify target is NOT another redirect
      if (targetRes.statusCode === 301 || targetRes.statusCode === 308 || targetRes.statusCode === 302 || targetRes.statusCode === 307) {
        console.error(`FAIL: Redirect target ${item.target} returned HTTP redirect ${targetRes.statusCode} (redirect chain detected)`);
        failures++;
        continue;
      }

      console.log(`PASS: [HTTP ${status}] ${item.source} -> ${item.target} [1 hop -> HTTP 200 OK]`);
      successCount++;
    } catch (err) {
      console.error(`FAIL: ${item.source} request error: ${err.message}`);
      failures++;
    }
  }

  console.log(`\n------------------------------------------------------------`);
  console.log(`HTTP REDIRECT SMOKE TEST RESULTS: ${successCount}/${EXPECTED_REDIRECTS.length} PASSED`);
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
