'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  Download,
  Plus,
  MessageSquare,
  Phone,
  Compass,
  Calendar,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  X,
  Check,
} from 'lucide-react';
import { CrmEnquiry, LeadStatus, AdSource, LeadPriority } from '@/types/crm';
import { getDirectWhatsAppUrl, generateWhatsAppMessage } from '@/lib/crm/whatsapp-templates';

export default function AdminEnquiriesPage() {
  const searchParams = useSearchParams();
  const initialStatus = (searchParams.get('status') || 'ALL') as LeadStatus | 'ALL';
  const initialSource = (searchParams.get('source') || 'ALL') as AdSource | 'ALL';

  const [enquiries, setEnquiries] = useState<CrmEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | 'ALL'>(initialStatus);
  const [selectedSource, setSelectedSource] = useState<AdSource | 'ALL'>(initialSource);

  // Manual Add Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    phone: '',
    destinations: 'Munnar',
    travellerCount: 4,
    travelDate: '',
    groupType: 'family',
    notes: '',
    quotedAmount: '',
    source: 'phone_call' as AdSource,
  });
  const [submittingModal, setSubmittingModal] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedStatus !== 'ALL') params.set('status', selectedStatus);
      if (selectedSource !== 'ALL') params.set('source', selectedSource);
      if (searchQuery.trim()) params.set('q', searchQuery.trim());

      const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [selectedStatus, selectedSource]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingModal(true);
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: modalForm.name,
          phone: modalForm.phone,
          destinations: [modalForm.destinations],
          travellerCount: Number(modalForm.travellerCount) || 1,
          travelDate: modalForm.travelDate || undefined,
          groupType: modalForm.groupType,
          notes: modalForm.notes,
          quotedAmount: modalForm.quotedAmount ? Number(modalForm.quotedAmount) : undefined,
          status: 'NEW_ENQUIRY',
          priority: 'HOT',
          attribution: {
            source: modalForm.source,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        setModalForm({
          name: '',
          phone: '',
          destinations: 'Munnar',
          travellerCount: 4,
          travelDate: '',
          groupType: 'family',
          notes: '',
          quotedAmount: '',
          source: 'phone_call',
        });
        fetchEnquiries();
      }
    } catch (err) {
      console.error('Error creating manual enquiry:', err);
    } finally {
      setSubmittingModal(false);
    }
  };

  const handleExportCSV = () => {
    if (enquiries.length === 0) return;

    const headers = [
      'Reference Code',
      'Customer Name',
      'Phone',
      'Email',
      'Origin',
      'Destinations',
      'Travel Date',
      'Traveller Count',
      'Status',
      'Quoted Amount (INR)',
      'Ad Source',
      'Created Date',
    ];

    const rows = enquiries.map((e) => [
      e.referenceCode,
      `"${e.name}"`,
      `"${e.phone}"`,
      `"${e.email || ''}"`,
      `"${e.origin}"`,
      `"${e.destinations.join(' | ')}"`,
      `"${e.travelDate || 'Flexible'}"`,
      e.travellerCount,
      e.status,
      e.quotedAmount || e.estimatedValue || '',
      e.attribution?.source || 'website',
      `"${new Date(e.createdAt).toLocaleDateString('en-IN')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Mahalakshmi_Travels_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusList: { label: string; value: LeadStatus | 'ALL' }[] = [
    { label: 'All Leads', value: 'ALL' },
    { label: 'New', value: 'NEW_ENQUIRY' },
    { label: 'Contacted', value: 'CONTACTED' },
    { label: 'Proposal Sent', value: 'PROPOSAL_SENT' },
    { label: 'Follow-Up', value: 'FOLLOW_UP' },
    { label: 'Booked', value: 'BOOKED' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Lost', value: 'LOST' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-white font-bold tracking-tight">
            Lead Management & Enquiry Register
          </h1>
          <p className="text-xs text-[#8A8780] font-mono mt-1">
            Filter by status, trigger 1-click WhatsApp conversations, and log custom quotes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded bg-[#1C1C1A] border border-[#2E2E2A] text-xs text-[#C2BFBA] hover:text-white hover:border-[#4B4A46] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#A65F43] text-white text-xs font-semibold hover:bg-[#86462E] transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Manual Enquiry</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name, phone, ref code, or destination..."
              className="w-full pl-9 pr-20 py-2 bg-[#121211] border border-[#33332E] rounded text-xs text-white placeholder:text-[#63615C] focus:outline-none focus:border-[#A65F43]"
            />
            <Search className="w-3.5 h-3.5 text-[#63615C] absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#242422] text-[#C2BFBA] hover:text-white text-[11px] rounded font-mono"
            >
              Search
            </button>
          </form>

          {/* Ad Source Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#8A8780] font-mono">Source:</span>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value as AdSource | 'ALL')}
              className="px-2.5 py-1.5 bg-[#121211] border border-[#33332E] rounded text-xs text-[#C2BFBA] focus:outline-none focus:border-[#A65F43]"
            >
              <option value="ALL">All Channels</option>
              <option value="google_ads">Google Ads</option>
              <option value="meta_ads">Meta / Instagram</option>
              <option value="website">Website Direct</option>
              <option value="phone_call">Phone Call</option>
            </select>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {statusList.map((st) => (
            <button
              key={st.value}
              onClick={() => setSelectedStatus(st.value)}
              className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                selectedStatus === st.value
                  ? 'bg-[#A65F43] text-white font-medium shadow-sm'
                  : 'bg-[#141413] text-[#8A8780] hover:text-white border border-[#262624]'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg overflow-hidden shadow-editorial-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#2D2D29] bg-[#141413] text-[#8A8780] font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Customer & Ref</th>
                <th className="py-3 px-4">Journey Route</th>
                <th className="py-3 px-4">Travel Date & Pax</th>
                <th className="py-3 px-4">Ad Source</th>
                <th className="py-3 px-4">Quote (INR)</th>
                <th className="py-3 px-4">Lead Status</th>
                <th className="py-3 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242422]">
              {enquiries.map((lead) => {
                const whatsappMsg = generateWhatsAppMessage(lead, { type: 'welcome' });
                const whatsappUrl = getDirectWhatsAppUrl(lead.phone, whatsappMsg);

                return (
                  <tr key={lead.id} className="hover:bg-[#1C1C1A]/80 transition-colors">
                    {/* Customer & Ref */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white text-sm">{lead.name}</div>
                      <div className="text-[11px] text-[#8A8780] font-mono flex items-center gap-1 mt-0.5">
                        <span>{lead.phone}</span>
                        <span>•</span>
                        <span className="text-[#A65F43]">{lead.referenceCode}</span>
                      </div>
                    </td>

                    {/* Route */}
                    <td className="py-3.5 px-4">
                      <div className="text-white font-medium">
                        {lead.origin} → {lead.destinations.join(', ')}
                      </div>
                      <div className="text-[11px] text-[#7E7B75]">
                        {lead.vehicleRequirement || 'Executive Vehicle'}
                      </div>
                    </td>

                    {/* Date & Pax */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="text-white">
                        {lead.travelDate ? new Date(lead.travelDate).toLocaleDateString('en-IN') : 'Flexible'}
                      </div>
                      <div className="text-[11px] text-[#8A8780]">
                        {lead.travellerCount} Persons ({lead.groupType})
                      </div>
                    </td>

                    {/* Ad Source */}
                    <td className="py-3.5 px-4">
                      {lead.attribution?.source === 'google_ads' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-800">
                          Google Ads
                        </span>
                      )}
                      {lead.attribution?.source === 'meta_ads' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-pink-950 text-pink-400 border border-pink-800">
                          Meta Lead Ad
                        </span>
                      )}
                      {lead.attribution?.source === 'phone_call' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-400 border border-amber-800">
                          Phone Call
                        </span>
                      )}
                      {(!lead.attribution?.source || lead.attribution?.source === 'website') && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                          Website Direct
                        </span>
                      )}
                    </td>

                    {/* Quote */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="text-white font-semibold">
                        ₹{(lead.quotedAmount || lead.estimatedValue || 0).toLocaleString('en-IN')}
                      </div>
                      {lead.advanceReceived ? (
                        <div className="text-[10px] text-emerald-400">
                          Adv: ₹{lead.advanceReceived.toLocaleString('en-IN')}
                        </div>
                      ) : null}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className="px-2 py-1 bg-[#121211] border border-[#33332E] rounded text-xs text-white focus:outline-none focus:border-[#A65F43] cursor-pointer"
                      >
                        <option value="NEW_ENQUIRY">New Lead</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="PROPOSAL_SENT">Proposal Sent</option>
                        <option value="FOLLOW_UP">Follow-Up</option>
                        <option value="BOOKED">Booked</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="LOST">Lost</option>
                      </select>
                    </td>

                    {/* Quick Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900 transition-colors"
                          title="Open WhatsApp Chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1.5 rounded bg-[#222220] border border-[#333330] text-[#C2BFBA] hover:text-white transition-colors"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          href={`/admin/enquiries/${lead.id}`}
                          className="px-2.5 py-1 rounded bg-[#A65F43]/20 border border-[#A65F43]/40 text-[#D3957C] hover:bg-[#A65F43] hover:text-white transition-all text-xs font-medium"
                        >
                          Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {enquiries.length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-[#78756F]">
                    No enquiries match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Enquiry Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg max-w-lg w-full p-6 space-y-4 shadow-editorial-lift">
            <div className="flex items-center justify-between border-b border-[#2C2C29] pb-3">
              <h3 className="font-serif text-lg font-bold text-white">
                Log New Manual / Phone Enquiry
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-[#8A8780] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={modalForm.name}
                    onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                    placeholder="e.g. Senthil Kumar"
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white focus:outline-none focus:border-[#A65F43]"
                  />
                </div>
                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={modalForm.phone}
                    onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                    placeholder="+91 63801 XXXXX"
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white focus:outline-none focus:border-[#A65F43]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Destinations
                  </label>
                  <input
                    type="text"
                    value={modalForm.destinations}
                    onChange={(e) => setModalForm({ ...modalForm, destinations: e.target.value })}
                    placeholder="e.g. Munnar, Thekkady"
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white focus:outline-none focus:border-[#A65F43]"
                  />
                </div>
                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={modalForm.travelDate}
                    onChange={(e) => setModalForm({ ...modalForm, travelDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white focus:outline-none focus:border-[#A65F43]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Pax Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={modalForm.travellerCount}
                    onChange={(e) => setModalForm({ ...modalForm, travellerCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white focus:outline-none focus:border-[#A65F43]"
                  />
                </div>
                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Lead Source
                  </label>
                  <select
                    value={modalForm.source}
                    onChange={(e) => setModalForm({ ...modalForm, source: e.target.value as AdSource })}
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white focus:outline-none focus:border-[#A65F43]"
                  >
                    <option value="phone_call">Phone Call</option>
                    <option value="walk_in">Walk-in Depot</option>
                    <option value="google_ads">Google Ad</option>
                    <option value="meta_ads">Instagram / Meta</option>
                    <option value="referral">Referral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Quote (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="35000"
                    value={modalForm.quotedAmount}
                    onChange={(e) => setModalForm({ ...modalForm, quotedAmount: e.target.value })}
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white focus:outline-none focus:border-[#A65F43]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                  Internal Notes
                </label>
                <textarea
                  rows={2}
                  value={modalForm.notes}
                  onChange={(e) => setModalForm({ ...modalForm, notes: e.target.value })}
                  placeholder="e.g. 21 Seater requirement for temple function."
                  className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white focus:outline-none focus:border-[#A65F43]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#2C2C29]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded bg-[#222220] text-[#C2BFBA] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingModal}
                  className="px-4 py-2 rounded bg-[#A65F43] hover:bg-[#86462E] text-white font-medium cursor-pointer"
                >
                  {submittingModal ? 'Saving...' : 'Create Lead & Trigger Welcome'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
