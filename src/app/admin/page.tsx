'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  TrendingUp,
  Award,
  CircleDollarSign,
  MessageSquare,
  ArrowUpRight,
  Filter,
  Phone,
  Compass,
  Calendar,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { CrmEnquiry, CrmAnalyticsSummary, LeadStatus } from '@/types/crm';
import { getDirectWhatsAppUrl, generateWhatsAppMessage } from '@/lib/crm/whatsapp-templates';

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<CrmAnalyticsSummary | null>(null);
  const [recentLeads, setRecentLeads] = useState<CrmEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, leadsRes] = await Promise.all([
        fetch('/api/admin/analytics'),
        fetch('/api/admin/enquiries'),
      ]);

      const analyticsData = await analyticsRes.json();
      const leadsData = await leadsRes.json();

      if (analyticsData.success) {
        setAnalytics(analyticsData.analytics);
      }
      if (leadsData.success) {
        setRecentLeads(leadsData.enquiries.slice(0, 6)); // Top 6 recent leads
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'NEW_ENQUIRY':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-900/40 text-blue-300 border border-blue-700/50">NEW</span>;
      case 'CONTACTED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-900/40 text-amber-300 border border-amber-700/50">CONTACTED</span>;
      case 'PROPOSAL_SENT':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-900/40 text-purple-300 border border-purple-700/50">PROPOSAL SENT</span>;
      case 'FOLLOW_UP':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-yellow-900/40 text-yellow-300 border border-yellow-700/50">FOLLOW-UP</span>;
      case 'BOOKED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-900/40 text-emerald-300 border border-emerald-700/50">BOOKED</span>;
      case 'COMPLETED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-900/40 text-teal-300 border border-teal-700/50">COMPLETED</span>;
      case 'LOST':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-900/40 text-rose-300 border border-rose-700/50">LOST</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300">{status}</span>;
    }
  };

  const getSourceBadge = (source?: string) => {
    if (source === 'google_ads') {
      return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-800">Google Ads</span>;
    }
    if (source === 'meta_ads' || source === 'instagram_direct') {
      return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-pink-950 text-pink-400 border border-pink-800">Meta / IG</span>;
    }
    return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">Website</span>;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-white font-bold tracking-tight">
            Executive CRM & Pipeline Overview
          </h1>
          <p className="text-xs text-[#8A8780] font-mono mt-1">
            Real-time lead ingestion, Google & Meta Ads tracking, and WhatsApp dispatch center.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#1C1C1A] border border-[#2E2E2A] text-xs text-[#C2BFBA] hover:text-white hover:border-[#4B4A46] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            href="/admin/pipeline"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#A65F43] text-white text-xs font-semibold hover:bg-[#86462E] transition-colors shadow-sm"
          >
            <span>Open Kanban Board</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Ingested Leads */}
        <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-5 shadow-editorial-sm">
          <div className="flex items-center justify-between text-[#8A8780] mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Total Ingested Leads</span>
            <div className="w-8 h-8 rounded bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-serif tracking-tight">
            {loading ? '...' : analytics?.totalLeads || 0}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-[#8A8780]">
            <span className="text-blue-400 font-mono font-medium">
              {analytics?.newLeads || 0} New
            </span>
            <span>•</span>
            <span className="text-amber-400 font-mono font-medium">
              {analytics?.proposalSentLeads || 0} Proposals
            </span>
          </div>
        </div>

        {/* Booked Revenue */}
        <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-5 shadow-editorial-sm">
          <div className="flex items-center justify-between text-[#8A8780] mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Confirmed Booked Revenue</span>
            <div className="w-8 h-8 rounded bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
              <CircleDollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-serif tracking-tight text-emerald-400">
            {loading ? '...' : `₹${(analytics?.totalBookedRevenue || 0).toLocaleString('en-IN')}`}
          </div>
          <div className="mt-2 text-xs text-[#8A8780]">
            <span className="text-emerald-400 font-mono font-medium">{analytics?.bookedLeads || 0} Tours</span> successfully confirmed
          </div>
        </div>

        {/* Active Pipeline Value */}
        <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-5 shadow-editorial-sm">
          <div className="flex items-center justify-between text-[#8A8780] mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Active Pipeline Value</span>
            <div className="w-8 h-8 rounded bg-[#A65F43]/20 border border-[#A65F43]/40 flex items-center justify-center text-[#A65F43]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-serif tracking-tight">
            {loading ? '...' : `₹${(analytics?.totalPipelineValue || 0).toLocaleString('en-IN')}`}
          </div>
          <div className="mt-2 text-xs text-[#8A8780]">
            Total value across active opportunities
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-5 shadow-editorial-sm">
          <div className="flex items-center justify-between text-[#8A8780] mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Lead Conversion Rate</span>
            <div className="w-8 h-8 rounded bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white font-serif tracking-tight text-purple-300">
            {loading ? '...' : `${analytics?.conversionRate || 0}%`}
          </div>
          <div className="mt-2 text-xs text-[#8A8780]">
            From ad click to confirmed booking
          </div>
        </div>
      </div>

      {/* Two Column Layout: Ad Attribution Breakdown & Recent Leads Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Col: Ad Attribution Performance */}
        <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-5 shadow-editorial-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#2A2A26] pb-3">
            <div>
              <h2 className="font-serif text-base font-semibold text-white">
                Ad Channel Attribution
              </h2>
              <p className="text-[11px] text-[#8A8780] font-mono">Google vs Meta vs Organic Web</p>
            </div>
            <Link
              href="/admin/settings"
              className="text-xs text-[#A65F43] hover:underline font-mono"
            >
              Config Webhooks
            </Link>
          </div>

          <div className="space-y-3.5">
            {analytics?.adAttributionStats.map((stat) => {
              const channelName =
                stat.source === 'google_ads'
                  ? 'Google Ads (PMax & Search)'
                  : stat.source === 'meta_ads'
                  ? 'Instagram & Facebook Ads'
                  : 'Website Direct & Organic';

              const badgeColor =
                stat.source === 'google_ads'
                  ? 'text-blue-400 bg-blue-950/40 border-blue-800'
                  : stat.source === 'meta_ads'
                  ? 'text-pink-400 bg-pink-950/40 border-pink-800'
                  : 'text-zinc-300 bg-zinc-800 border-zinc-700';

              return (
                <div
                  key={stat.source}
                  className="p-3 bg-[#141413] border border-[#292926] rounded-md space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${badgeColor}`}>
                      {channelName}
                    </span>
                    <span className="text-xs font-semibold text-white font-mono">
                      {stat.count} Leads
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#8A8780]">
                    <span>Converted Bookings: <strong className="text-emerald-400">{stat.bookedCount}</strong></span>
                    <span>Revenue: <strong className="text-white font-mono">₹{stat.revenue.toLocaleString('en-IN')}</strong></span>
                  </div>
                </div>
              );
            })}

            {(!analytics?.adAttributionStats || analytics.adAttributionStats.length === 0) && (
              <div className="text-center py-6 text-xs text-[#78756F]">
                No ad attribution data recorded yet.
              </div>
            )}
          </div>

          {/* Quick WhatsApp Brochure Push Banner */}
          <div className="p-3.5 bg-gradient-to-br from-[#241E1A] to-[#1C1A18] border border-[#3D2C24] rounded-md space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D3957C]">
              <Sparkles className="w-4 h-4 text-[#A65F43]" />
              <span>WhatsApp Automated PDF Dispatch</span>
            </div>
            <p className="text-[11px] text-[#A8A59E]">
              Every new lead from Google or Instagram automatically receives the Mahalakshmi Tours brochure & itinerary quote on WhatsApp.
            </p>
          </div>
        </div>

        {/* Right 2 Cols: Live Enquiries & Fast Actions */}
        <div className="lg:col-span-2 bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-5 shadow-editorial-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#2A2A26] pb-3">
            <div>
              <h2 className="font-serif text-base font-semibold text-white">
                Live Incoming Enquiries
              </h2>
              <p className="text-[11px] text-[#8A8780] font-mono">
                Click 1-Click WhatsApp to open personalized chat
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs text-[#A65F43] hover:text-[#BC765A] font-medium flex items-center gap-1"
            >
              <span>View All Enquiries</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Leads Stream List */}
          <div className="space-y-3">
            {recentLeads.map((lead) => {
              const whatsappMsg = generateWhatsAppMessage(lead, { type: 'welcome' });
              const whatsappUrl = getDirectWhatsAppUrl(lead.phone, whatsappMsg);

              return (
                <div
                  key={lead.id}
                  className="p-4 bg-[#141413] border border-[#292926] hover:border-[#3D3D38] rounded-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-white">
                        {lead.name}
                      </span>
                      <span className="text-[11px] font-mono text-[#78756F]">
                        ({lead.referenceCode})
                      </span>
                      {getStatusBadge(lead.status)}
                      {getSourceBadge(lead.attribution?.source)}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[#A8A59E] flex-wrap">
                      <span className="flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5 text-[#A65F43]" />
                        <span>{lead.origin} → {lead.destinations.join(', ')}</span>
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-[#8A8780]" />
                        <span>{lead.travelDate || 'Flexible'} ({lead.travellerCount} Pax)</span>
                      </span>
                    </div>

                    {lead.notes && (
                      <p className="text-xs text-[#7E7B75] italic line-clamp-1">
                        “{lead.notes}”
                      </p>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900 text-xs font-semibold transition-colors"
                      title="Open WhatsApp chat with prefilled message"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <Link
                      href={`/admin/enquiries/${lead.id}`}
                      className="px-3 py-1.5 rounded bg-[#222220] border border-[#333330] hover:bg-[#2A2A27] text-xs text-[#C2BFBA] hover:text-white transition-colors"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              );
            })}

            {recentLeads.length === 0 && !loading && (
              <div className="text-center py-10 text-xs text-[#78756F]">
                No enquiries recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
