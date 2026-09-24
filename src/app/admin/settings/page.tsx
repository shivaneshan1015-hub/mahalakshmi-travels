'use client';

import React, { useState } from 'react';
import {
  Megaphone,
  MessageSquare,
  FileText,
  Shield,
  Copy,
  Check,
  ExternalLink,
  Code,
  Sparkles,
  Lock,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function AdminSettingsPage() {
  const [copiedMeta, setCopiedMeta] = useState(false);
  const [copiedGoogle, setCopiedGoogle] = useState(false);
  const [copiedBrochure, setCopiedBrochure] = useState(false);

  const metaWebhookUrl = `${siteConfig.url}/api/webhooks/meta-leads`;
  const googleWebhookUrl = `${siteConfig.url}/api/webhooks/google-leads`;
  const brochureUrl = `${siteConfig.url}/docs/mahalakshmi-travels-brochure.pdf`;

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl md:text-3xl text-white font-bold tracking-tight">
          Integrations, Ads & WhatsApp Hub
        </h1>
        <p className="text-xs text-[#8A8780] font-mono mt-1">
          Connect your Google Ads, Instagram/Meta Lead Forms, and automated WhatsApp delivery engine.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Meta / Instagram Lead Ads Integration */}
        <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-6 space-y-4 shadow-editorial-sm">
          <div className="flex items-center justify-between border-b border-[#2C2C29] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-pink-950/60 border border-pink-800/40 flex items-center justify-center text-pink-400">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-base font-bold text-white">
                  Meta Ads Lead Forms (Instagram & Facebook)
                </h2>
                <p className="text-xs text-[#8A8780]">
                  Directly ingest leads when travelers submit an Instagram Lead Form.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded">
              Ready for Webhook
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                Meta Webhook Callback URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={metaWebhookUrl}
                  className="flex-1 px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white font-mono text-xs select-all"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(metaWebhookUrl, setCopiedMeta)}
                  className="px-3 py-2 rounded bg-[#242422] border border-[#3D3D39] text-[#C2BFBA] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedMeta ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMeta ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="p-3 bg-[#141413] border border-[#262624] rounded space-y-1.5 text-[#A8A59E]">
              <div className="font-mono text-[11px] text-white font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#A65F43]" />
                <span>How to connect in Meta Developer Portal:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
                <li>Go to <strong>Meta Developer App → Webhooks → Page / Leadgen</strong>.</li>
                <li>Enter the Callback URL above and verify token.</li>
                <li>Subscribe to <code>leadgen</code> events for your Facebook Page / Instagram handle.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* 2. Google Ads Lead Form Webhook */}
        <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-6 space-y-4 shadow-editorial-sm">
          <div className="flex items-center justify-between border-b border-[#2C2C29] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-base font-bold text-white">
                  Google Ads Lead Form Extensions
                </h2>
                <p className="text-xs text-[#8A8780]">
                  Receive high-intent search leads directly from Google Search ads.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase bg-blue-950 text-blue-400 border border-blue-800 px-2.5 py-1 rounded">
              Ready for Webhook
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                Google Ads Webhook Endpoint
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={googleWebhookUrl}
                  className="flex-1 px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white font-mono text-xs select-all"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(googleWebhookUrl, setCopiedGoogle)}
                  className="px-3 py-2 rounded bg-[#242422] border border-[#3D3D39] text-[#C2BFBA] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedGoogle ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedGoogle ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. WhatsApp Automated Messaging & PDF Delivery */}
        <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-6 space-y-4 shadow-editorial-sm">
          <div className="flex items-center justify-between border-b border-[#2C2C29] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-base font-bold text-white">
                  WhatsApp Automation & Company Profile PDF
                </h2>
                <p className="text-xs text-[#8A8780]">
                  Automated auto-responder template and official brochure PDF link.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded">
              Active Template
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                Official Mahalakshmi Tours PDF Brochure Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={brochureUrl}
                  className="flex-1 px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white font-mono text-xs select-all"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(brochureUrl, setCopiedBrochure)}
                  className="px-3 py-2 rounded bg-[#242422] border border-[#3D3D39] text-[#C2BFBA] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedBrochure ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBrochure ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 bg-[#141413] border border-[#262624] rounded space-y-2">
              <div className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">
                WhatsApp Template Structure:
              </div>
              <p className="text-[#C2BFBA] text-xs leading-relaxed">
                <strong>Header:</strong> Document attachment (<code>Mahalakshmi_Tours_Madurai_Brochure.pdf</code>)<br />
                <strong>Body:</strong> “Vanakkam [Name]! Thank you for reaching out to Mahalakshmi Tour & Travel, Madurai. We have received your enquiry for [Destinations] for [Travel Date]...”<br />
                <strong>Quick Reply Buttons:</strong> [ 📞 Call Madurai Desk ] [ 💬 Chat with Travel Expert ] [ 🚐 View 21-Seater Fleet ]
              </p>
            </div>
          </div>
        </div>

        {/* 4. Interactive Ad Webhook Test Sandbox */}
        <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-6 space-y-4 shadow-editorial-sm">
          <div className="flex items-center justify-between border-b border-[#2C2C29] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-amber-950/60 border border-amber-800/40 flex items-center justify-center text-amber-400">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-base font-bold text-white">
                  Live Webhook Sandbox & Simulation
                </h2>
                <p className="text-xs text-[#8A8780]">
                  Trigger simulated ad leads to test webhook ingestion, CRM pipeline, and audio alerts.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase bg-amber-950 text-amber-300 border border-amber-800 px-2.5 py-1 rounded">
              Test Sandbox
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Test Google Ad Ingestion */}
            <div className="p-4 bg-[#141413] border border-[#262624] rounded space-y-2.5">
              <div className="font-semibold text-white flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Google Ads Simulation</span>
              </div>
              <p className="text-[11px] text-[#8A8780] leading-relaxed">
                Sends a simulated Search Lead Form extension payload for Munnar family tour.
              </p>
              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await fetch('/api/webhooks/google-leads', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        google_key: 'google_test_key_sandbox',
                        lead_id: `g-sim-${Math.floor(1000 + Math.random() * 9000)}`,
                        campaign_id: 'munnar_search_ad_campaign',
                        user_column_data: [
                          { column_id: 'FULL_NAME', string_value: 'Anand Ramasamy (Google Lead)' },
                          { column_id: 'PHONE_NUMBER', string_value: '+91 94431 77665' },
                          { column_id: 'EMAIL', string_value: 'anand.ramasamy@gmail.com' },
                        ],
                      }),
                    });
                    const data = await res.json();
                    if (data.success) {
                      alert('✅ Google Ads Lead successfully injected! Check your Topbar alert or Leads table.');
                    }
                  } catch (e) {
                    console.error('Test error:', e);
                  }
                }}
                className="w-full py-2 px-3 bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/60 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inject Google Ads Lead</span>
              </button>
            </div>

            {/* Test Meta Ad Ingestion */}
            <div className="p-4 bg-[#141413] border border-[#262624] rounded space-y-2.5">
              <div className="font-semibold text-white flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                <span>Instagram / Meta Simulation</span>
              </div>
              <p className="text-[11px] text-[#8A8780] leading-relaxed">
                Sends a simulated Instagram Lead Form event for 21-Seater college trip.
              </p>
              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await fetch('/api/webhooks/meta-leads', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        object: 'page',
                        entry: [
                          {
                            changes: [
                              {
                                field: 'leadgen',
                                value: {
                                  leadgen_id: `meta_sim_${Math.floor(1000 + Math.random() * 9000)}`,
                                  form_id: 'form_kerala_college_21s',
                                  page_id: 'mahalakshmi_travels_fb',
                                },
                              },
                            ],
                          },
                        ],
                      }),
                    });
                    const data = await res.json();
                    if (data.success) {
                      alert('✅ Instagram Lead successfully injected! Check your Topbar alert or Leads table.');
                    }
                  } catch (e) {
                    console.error('Test error:', e);
                  }
                }}
                className="w-full py-2 px-3 bg-pink-900/60 hover:bg-pink-800 text-pink-200 border border-pink-700/60 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inject Instagram Lead</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5. Owner Access Security & Privacy Verification */}
        <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-6 space-y-3 shadow-editorial-sm">
          <div className="flex items-center gap-3 border-b border-[#2C2C29] pb-3">
            <div className="w-9 h-9 rounded bg-[#A65F43]/20 border border-[#A65F43]/40 flex items-center justify-center text-[#A65F43]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-white">
                Owner Access & Search Engine Isolation
              </h2>
              <p className="text-xs text-[#8A8780]">
                Security guarantees and Google Search exclusion audit.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 bg-[#141413] border border-[#262624] rounded">
              <span className="text-[#78756F] font-mono text-[10px] uppercase block">
                Google Search Privacy Status
              </span>
              <span className="text-emerald-400 font-semibold font-mono flex items-center gap-1.5 mt-0.5">
                <Check className="w-3.5 h-3.5" />
                <span>NOINDEX, NOFOLLOW ACTIVE</span>
              </span>
              <p className="text-[11px] text-[#7E7B75] mt-1">
                Disallowed in <code>robots.txt</code> and protected by response headers.
              </p>
            </div>

            <div className="p-3 bg-[#141413] border border-[#262624] rounded">
              <span className="text-[#78756F] font-mono text-[10px] uppercase block">
                Session Token Protection
              </span>
              <span className="text-white font-semibold font-mono flex items-center gap-1.5 mt-0.5">
                <Lock className="w-3.5 h-3.5 text-[#A65F43]" />
                <span>HMAC Signed HTTP-Only Cookie</span>
              </span>
              <p className="text-[11px] text-[#7E7B75] mt-1">
                7-day rolling owner authentication session.
              </p>
            </div>
          </div>

          {/* Interactive Change Password Box */}
          <div className="mt-4 pt-4 border-t border-[#262624]">
            <h3 className="text-xs font-mono uppercase font-bold text-white mb-2 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#A65F43]" />
              <span>Change Owner Password</span>
            </h3>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const currentPassword = (form.elements.namedItem('currentPassword') as HTMLInputElement).value;
                const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value;

                try {
                  const res = await fetch('/api/admin/auth/change-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ currentPassword, newPassword }),
                  });
                  const data = await res.json();
                  if (data.success) {
                    alert('✅ Owner password successfully updated!');
                    form.reset();
                  } else {
                    alert(`❌ ${data.error || 'Failed to change password'}`);
                  }
                } catch (err) {
                  alert('Error updating password.');
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs"
            >
              <div>
                <input
                  type="password"
                  name="currentPassword"
                  required
                  placeholder="Current Password"
                  className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white font-mono focus:outline-none focus:border-[#A65F43]"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="newPassword"
                  required
                  minLength={6}
                  placeholder="New Password (min 6 chars)"
                  className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white font-mono focus:outline-none focus:border-[#A65F43]"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#A65F43] hover:bg-[#86462E] text-white rounded font-medium transition-colors cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
