/**
 * MAHALAKSHMI TOUR & TRAVEL — BROCHURE SERVICE
 * GET /api/brochure
 * Generates an official, printable company profile and vehicle fleet overview.
 */

import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

export async function GET() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteConfig.name} — Company Profile & Tour Brochure</title>
  <style>
    :root {
      --ink: #171716;
      --terracotta: #A65F43;
      --paper: #F2EEE5;
      --paper-card: #FAF8F5;
      --border: rgba(23, 23, 22, 0.15);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--paper);
      color: var(--ink);
      line-height: 1.6;
      padding: 24px 16px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 36px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }
    .header {
      border-bottom: 2px solid var(--terracotta);
      padding-bottom: 24px;
      margin-bottom: 28px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 16px;
    }
    .brand-title {
      font-size: 26px;
      font-weight: 800;
      color: var(--ink);
      letter-spacing: -0.5px;
    }
    .brand-tagline {
      font-size: 13px;
      color: var(--terracotta);
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .contact-block {
      text-align: right;
      font-size: 12px;
      color: #555;
    }
    .badge {
      display: inline-block;
      background: #FAF2EE;
      color: var(--terracotta);
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    h2 {
      font-size: 18px;
      color: var(--ink);
      margin-bottom: 14px;
      border-left: 4px solid var(--terracotta);
      padding-left: 10px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 28px;
    }
    .card {
      background: var(--paper-card);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 16px;
    }
    .card h3 {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 6px;
      color: var(--ink);
    }
    .card p {
      font-size: 12px;
      color: #666;
    }
    .fleet-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px dashed var(--border);
      font-size: 13px;
    }
    .fleet-item:last-child { border-bottom: none; }
    .cta-btn {
      display: inline-block;
      background: var(--terracotta);
      color: #FFFFFF;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 16px;
    }
    .footer {
      margin-top: 36px;
      padding-top: 20px;
      border-top: 1px solid var(--border);
      font-size: 11px;
      color: #777;
      text-align: center;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .container { box-shadow: none; border: none; padding: 0; }
      .cta-btn { display: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <div class="badge">Official Travel Dossier</div>
        <h1 class="brand-title">${siteConfig.name}</h1>
        <p class="brand-tagline">${siteConfig.tagline}</p>
        <p style="font-size: 12px; color: #666; margin-top: 4px;">Madurai Head Office • Specialist in South India Journeys</p>
      </div>
      <div class="contact-block">
        <p><strong>Madurai Travel Desk:</strong></p>
        <p>${siteConfig.contact.phonePrimary}</p>
        <p>WhatsApp: ${siteConfig.contact.phonePrimary}</p>
        <p>${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}</p>
      </div>
    </div>

    <h2>⭐ Popular Curated South India Tour Routes</h2>
    <div class="grid">
      <div class="card">
        <h3>Munnar & Thekkady (3D / 2N)</h3>
        <p>Tea plantations, Mattupetty dam, spice gardens & Periyar boating. Ideal for families and couples.</p>
      </div>
      <div class="card">
        <h3>Kodaikanal Hill Escape (2D / 1N)</h3>
        <p>Lake boating, Coaker’s Walk, Pillar Rocks, and pine forest drives from Madurai.</p>
      </div>
      <div class="card">
        <h3>Rameswaram & Dhanushkodi (2D / 1N)</h3>
        <p>Ramanathaswamy Temple darshan, Pamban bridge viewpoint & Dhanushkodi sunrise.</p>
      </div>
      <div class="card">
        <h3>Ooty & Coonoor (4D / 3N)</h3>
        <p>Nilgiri mountain railway, botanical garden, Doddabetta peak & tea factories.</p>
      </div>
    </div>

    <h2>🚐 Executive Fleet & Group Transportation</h2>
    <div class="card" style="margin-bottom: 28px;">
      <div class="fleet-item">
        <span><strong>21-Seater Executive Coach (AC)</strong> — College trips, family functions, pilgrim groups</span>
        <span style="color: var(--terracotta); font-weight: 700;">Custom Quote</span>
      </div>
      <div class="fleet-item">
        <span><strong>Force Urbania Luxury Van (12+1)</strong> — Premium recliner seats, executive comfort</span>
        <span style="color: var(--terracotta); font-weight: 700;">Custom Quote</span>
      </div>
      <div class="fleet-item">
        <span><strong>Toyota Innova Crysta (7+1)</strong> — Family hill station tours & airport transfers</span>
        <span style="color: var(--terracotta); font-weight: 700;">Custom Quote</span>
      </div>
      <div class="fleet-item">
        <span><strong>Sedan (Swift Dzire / Etios)</strong> — Outstation 4-seater round trips</span>
        <span style="color: var(--terracotta); font-weight: 700;">Custom Quote</span>
      </div>
    </div>

    <h2>🛡️ The Mahalakshmi Assurance</h2>
    <p style="font-size: 13px; color: #444; margin-bottom: 12px;">
      • Local drivers familiar with South India routes.<br>
      • Clear and transparent custom tour quotations.<br>
      • Direct contact with Madurai Travel Desk for all journeys.
    </p>

    <div style="text-align: center;">
      <a href="https://wa.me/${siteConfig.contact.whatsapp}?text=Hi%20Mahalakshmi%20Travels,%20I%20reviewed%20your%20brochure%20and%20would%20like%20to%20book%20a%20tour." class="cta-btn">
        💬 Chat With Travel Desk On WhatsApp
      </a>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.</p>
      <p>${siteConfig.url} • ${siteConfig.contact.email}</p>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
