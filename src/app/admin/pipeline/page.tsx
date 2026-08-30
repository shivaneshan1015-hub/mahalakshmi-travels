'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  KanbanSquare,
  MessageSquare,
  Phone,
  Compass,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { CrmEnquiry, LeadStatus } from '@/types/crm';
import { getDirectWhatsAppUrl, generateWhatsAppMessage } from '@/lib/crm/whatsapp-templates';

interface ColumnDef {
  id: LeadStatus;
  title: string;
  color: string;
  borderColor: string;
}

const COLUMNS: ColumnDef[] = [
  {
    id: 'NEW_ENQUIRY',
    title: 'New Enquiries',
    color: 'bg-blue-950/40 text-blue-300',
    borderColor: 'border-blue-700/60',
  },
  {
    id: 'CONTACTED',
    title: 'Contacted',
    color: 'bg-amber-950/40 text-amber-300',
    borderColor: 'border-amber-700/60',
  },
  {
    id: 'PROPOSAL_SENT',
    title: 'Proposal / PDF Sent',
    color: 'bg-purple-950/40 text-purple-300',
    borderColor: 'border-purple-700/60',
  },
  {
    id: 'FOLLOW_UP',
    title: 'Follow-Up Needed',
    color: 'bg-yellow-950/40 text-yellow-300',
    borderColor: 'border-yellow-700/60',
  },
  {
    id: 'BOOKED',
    title: 'Confirmed Bookings',
    color: 'bg-emerald-950/40 text-emerald-300',
    borderColor: 'border-emerald-700/60',
  },
  {
    id: 'LOST',
    title: 'Lost / Closed',
    color: 'bg-rose-950/40 text-rose-300',
    borderColor: 'border-rose-700/60',
  },
];

export default function PipelineKanbanPage() {
  const [enquiries, setEnquiries] = useState<CrmEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/enquiries');
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error('Error fetching leads for pipeline:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const moveStage = async (id: string, currentStatus: LeadStatus, direction: 'forward' | 'backward') => {
    const statusOrder: LeadStatus[] = [
      'NEW_ENQUIRY',
      'CONTACTED',
      'PROPOSAL_SENT',
      'FOLLOW_UP',
      'BOOKED',
      'LOST',
    ];
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex === -1) return;

    let targetIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;
    if (targetIndex < 0 || targetIndex >= statusOrder.length) return;

    const nextStatus = statusOrder[targetIndex];

    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: nextStatus } : e))
        );
      }
    } catch (err) {
      console.error('Error moving lead stage:', err);
    }
  };

  const getSourceBadge = (source?: string) => {
    if (source === 'google_ads') return <span className="text-[10px] font-mono text-blue-400">Google Ads</span>;
    if (source === 'meta_ads') return <span className="text-[10px] font-mono text-pink-400">Meta / IG</span>;
    return <span className="text-[10px] font-mono text-zinc-400">Web Direct</span>;
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-white font-bold tracking-tight">
            Sales & Journey Pipeline
          </h1>
          <p className="text-xs text-[#8A8780] font-mono mt-1">
            Visual stage management from initial WhatsApp arrival to departure & completion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1C1C1A] border border-[#2E2E2A] text-xs text-[#C2BFBA] hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Board</span>
          </button>
          <Link
            href="/admin/enquiries"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#A65F43] text-white text-xs font-semibold hover:bg-[#86462E] transition-colors shadow-sm"
          >
            <span>Table View</span>
          </Link>
        </div>
      </div>

      {/* Kanban Horizontal Scroll Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const colLeads = enquiries.filter((e) => e.status === col.id);
          const colTotalValue = colLeads.reduce(
            (acc, curr) => acc + (curr.quotedAmount || curr.estimatedValue || 0),
            0
          );

          return (
            <div
              key={col.id}
              className="bg-[#171716] border border-[#2B2B28] rounded-lg flex flex-col min-w-[240px] max-h-[calc(100vh-220px)] shadow-editorial-sm"
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-[#2B2B28] space-y-1 bg-[#1A1A19] rounded-t-lg">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${col.color} ${col.borderColor}`}>
                    {col.title}
                  </span>
                  <span className="text-xs font-semibold text-white font-mono bg-[#242422] px-1.5 py-0.5 rounded">
                    {colLeads.length}
                  </span>
                </div>
                <div className="text-[11px] text-[#8A8780] font-mono">
                  Stage Value: <strong className="text-white">₹{colTotalValue.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {/* Column Cards Container */}
              <div className="flex-1 p-2.5 space-y-3 overflow-y-auto min-h-[150px]">
                {colLeads.map((lead) => {
                  const whatsappMsg = generateWhatsAppMessage(lead, { type: 'welcome' });
                  const whatsappUrl = getDirectWhatsAppUrl(lead.phone, whatsappMsg);

                  return (
                    <div
                      key={lead.id}
                      className="p-3 bg-[#1F1F1D] border border-[#333330] hover:border-[#A65F43]/60 rounded-md transition-all space-y-2 shadow-sm"
                    >
                      {/* Customer Name & Source */}
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/admin/enquiries/${lead.id}`}
                          className="font-semibold text-xs text-white hover:text-[#A65F43] truncate transition-colors"
                        >
                          {lead.name}
                        </Link>
                        {getSourceBadge(lead.attribution?.source)}
                      </div>

                      {/* Route & Pax */}
                      <div className="text-[11px] text-[#A8A59E] space-y-0.5">
                        <div className="flex items-center gap-1 truncate text-white">
                          <Compass className="w-3 h-3 text-[#A65F43] shrink-0" />
                          <span className="truncate">{lead.origin} → {lead.destinations.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-1 font-mono text-[#8A8780]">
                          <Calendar className="w-3 h-3 shrink-0" />
                          <span>{lead.travelDate || 'Flexible'} • {lead.travellerCount} Pax</span>
                        </div>
                      </div>

                      {/* Financial Value Tag */}
                      <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-[#2B2B28]">
                        <span className="text-[#8A8780]">Quote:</span>
                        <span className="text-emerald-400 font-bold">
                          ₹{(lead.quotedAmount || lead.estimatedValue || 0).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Card Actions & Stage Movers */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-emerald-950/70 text-emerald-300 hover:bg-emerald-900"
                          title="Direct WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveStage(lead.id, lead.status, 'backward')}
                            className="p-1 rounded bg-[#2A2A28] text-[#8A8780] hover:text-white"
                            title="Move to previous stage"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveStage(lead.id, lead.status, 'forward')}
                            className="p-1 rounded bg-[#2A2A28] text-[#8A8780] hover:text-white"
                            title="Move to next stage"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {colLeads.length === 0 && (
                  <div className="h-24 flex items-center justify-center text-[11px] text-[#55534E] italic">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
