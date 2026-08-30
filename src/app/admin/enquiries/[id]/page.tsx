'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Compass,
  Calendar,
  Users,
  Car,
  FileText,
  DollarSign,
  Send,
  Sparkles,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  Trash2,
} from 'lucide-react';
import { CrmEnquiry, LeadStatus, LeadPriority } from '@/types/crm';
import {
  getDirectWhatsAppUrl,
  generateWhatsAppMessage,
  WhatsAppTemplateOptions,
} from '@/lib/crm/whatsapp-templates';

export default function EnquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [enquiry, setEnquiry] = useState<CrmEnquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Financial Form State
  const [quotedAmount, setQuotedAmount] = useState<string>('');
  const [advanceReceived, setAdvanceReceived] = useState<string>('');
  const [assignedVehicle, setAssignedVehicle] = useState<string>('');
  const [assignedDriver, setAssignedDriver] = useState<string>('');
  const [status, setStatus] = useState<LeadStatus>('NEW_ENQUIRY');
  const [priority, setPriority] = useState<LeadPriority>('HOT');
  const [savingDetails, setSavingDetails] = useState(false);

  // Note Logging State
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  // WhatsApp Interactive Composer State
  const [selectedTemplate, setSelectedTemplate] = useState<WhatsAppTemplateOptions['type']>('welcome');
  const [customMessage, setCustomMessage] = useState<string>('');

  const fetchEnquiry = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/enquiries/${id}`);
      const data = await res.json();

      if (!data.success || !data.enquiry) {
        setError('Enquiry not found or could not be loaded.');
        return;
      }

      const e: CrmEnquiry = data.enquiry;
      setEnquiry(e);
      setQuotedAmount(e.quotedAmount ? String(e.quotedAmount) : '');
      setAdvanceReceived(e.advanceReceived ? String(e.advanceReceived) : '');
      setAssignedVehicle(e.assignedVehicle || '');
      setAssignedDriver(e.assignedDriver || '');
      setStatus(e.status);
      setPriority(e.priority || 'HOT');

      // Initialize default composed WhatsApp message
      const defaultMsg = generateWhatsAppMessage(e, { type: 'welcome' });
      setCustomMessage(defaultMsg);
    } catch (err) {
      console.error('Error loading enquiry:', err);
      setError('An error occurred loading the enquiry.');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (type: WhatsAppTemplateOptions['type']) => {
    if (!enquiry) return;
    setSelectedTemplate(type);
    const updatedLead: CrmEnquiry = {
      ...enquiry,
      quotedAmount: quotedAmount ? Number(quotedAmount) : enquiry.quotedAmount,
      advanceReceived: advanceReceived ? Number(advanceReceived) : enquiry.advanceReceived,
      assignedVehicle: assignedVehicle || enquiry.assignedVehicle,
      assignedDriver: assignedDriver || enquiry.assignedDriver,
    };
    const msg = generateWhatsAppMessage(updatedLead, { type });
    setCustomMessage(msg);
  };

  const handleAppendSnippet = (snippet: string) => {
    setCustomMessage((prev) => `${prev}\n\n${snippet}`);
  };

  useEffect(() => {
    if (id) fetchEnquiry();
  }, [id]);

  const handleSaveFinancials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingDetails(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quotedAmount: quotedAmount ? Number(quotedAmount) : undefined,
          advanceReceived: advanceReceived ? Number(advanceReceived) : 0,
          assignedVehicle: assignedVehicle || undefined,
          assignedDriver: assignedDriver || undefined,
          status,
          priority,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiry(data.enquiry);
        alert('Details and quote updated successfully.');
      }
    } catch (err) {
      console.error('Error saving financials:', err);
      alert('Failed to save details.');
    } finally {
      setSavingDetails(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setSubmittingNote(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: newNote.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiry(data.enquiry);
        setNewNote('');
      }
    } catch (err) {
      console.error('Error adding note:', err);
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleDeleteEnquiry = async () => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/enquiries');
      }
    } catch (err) {
      console.error('Error deleting enquiry:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 text-center text-xs text-[#8A8780] font-mono">
        Loading journey dossier & enquiry profile...
      </div>
    );
  }

  if (error || !enquiry) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
        <h2 className="text-lg font-serif text-white font-bold">{error || 'Lead Not Found'}</h2>
        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-1 text-xs text-[#A65F43] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Lead Register</span>
        </Link>
      </div>
    );
  }

  // Calculate live preview of WhatsApp message
  const whatsappPreview = generateWhatsAppMessage(
    {
      ...enquiry,
      quotedAmount: quotedAmount ? Number(quotedAmount) : enquiry.quotedAmount,
      advanceReceived: advanceReceived ? Number(advanceReceived) : enquiry.advanceReceived,
      assignedVehicle: assignedVehicle || enquiry.assignedVehicle,
    },
    { type: selectedTemplate }
  );

  const whatsappDirectUrl = getDirectWhatsAppUrl(enquiry.phone, whatsappPreview);

  const balance = (Number(quotedAmount) || enquiry.quotedAmount || 0) - (Number(advanceReceived) || enquiry.advanceReceived || 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Breadcrumb & Status Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#2C2C29] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="p-2 rounded bg-[#1C1C1A] border border-[#2E2E2A] text-[#8A8780] hover:text-white transition-colors"
            title="Back to list"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl text-white font-bold">
                {enquiry.name}
              </h1>
              <span className="text-xs font-mono text-[#A65F43] bg-[#A65F43]/10 border border-[#A65F43]/20 px-2 py-0.5 rounded">
                {enquiry.referenceCode}
              </span>
            </div>
            <p className="text-xs text-[#8A8780] font-mono mt-0.5">
              Enquiry registered on {new Date(enquiry.createdAt).toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${enquiry.phone}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#222220] border border-[#333330] text-xs text-[#C2BFBA] hover:text-white"
          >
            <Phone className="w-3.5 h-3.5 text-[#A65F43]" />
            <span>Call Customer</span>
          </a>

          <button
            onClick={handleDeleteEnquiry}
            className="p-2 rounded bg-[#222220] border border-rose-900/40 text-rose-400 hover:bg-rose-950/60 transition-colors"
            title="Delete Enquiry"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left 2 Cols (Journey Requirements & Quote), Right 1 Col (WhatsApp & Attribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Journey & Travel Requirements Card */}
          <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-5 space-y-4 shadow-editorial-sm">
            <h2 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#A65F43]" />
              <span>Tour Requirements & Customer Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-[#141413] border border-[#262624] rounded">
                <span className="text-[#78756F] font-mono uppercase text-[10px] block">
                  Route
                </span>
                <span className="text-white font-semibold text-sm">
                  {enquiry.origin} → {enquiry.destinations.join(', ')}
                </span>
              </div>

              <div className="p-3 bg-[#141413] border border-[#262624] rounded">
                <span className="text-[#78756F] font-mono uppercase text-[10px] block">
                  Travel Dates & Duration
                </span>
                <span className="text-white font-medium">
                  {enquiry.travelDate ? new Date(enquiry.travelDate).toLocaleDateString('en-IN') : 'Flexible'}
                  {enquiry.duration ? ` (${enquiry.duration})` : ''}
                </span>
              </div>

              <div className="p-3 bg-[#141413] border border-[#262624] rounded">
                <span className="text-[#78756F] font-mono uppercase text-[10px] block">
                  Group & Passengers
                </span>
                <span className="text-white font-medium">
                  {enquiry.travellerCount} Persons ({enquiry.groupType})
                </span>
              </div>

              <div className="p-3 bg-[#141413] border border-[#262624] rounded">
                <span className="text-[#78756F] font-mono uppercase text-[10px] block">
                  Contact Phone
                </span>
                <span className="text-white font-mono font-medium">
                  {enquiry.phone}
                </span>
              </div>

              <div className="p-3 bg-[#141413] border border-[#262624] rounded">
                <span className="text-[#78756F] font-mono uppercase text-[10px] block">
                  Contact Email
                </span>
                <span className="text-white font-medium">
                  {enquiry.email || 'Not provided'}
                </span>
              </div>

              <div className="p-3 bg-[#141413] border border-[#262624] rounded">
                <span className="text-[#78756F] font-mono uppercase text-[10px] block">
                  Vehicle Requirement
                </span>
                <span className="text-[#D3957C] font-medium">
                  {enquiry.vehicleRequirement || 'Executive Tourist Coach'}
                </span>
              </div>
            </div>

            {enquiry.notes && (
              <div className="p-3 bg-[#141413] border border-[#262624] rounded text-xs">
                <span className="text-[#78756F] font-mono uppercase text-[10px] block mb-1">
                  Customer Special Requests & Notes
                </span>
                <p className="text-[#C2BFBA] italic">“{enquiry.notes}”</p>
              </div>
            )}
          </div>

          {/* Financials, Quote & Fulfillment Manager */}
          <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-5 space-y-4 shadow-editorial-sm">
            <h2 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Quote, Advance & Fleet Assignment</span>
            </h2>

            <form onSubmit={handleSaveFinancials} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Quoted Package (₹)
                  </label>
                  <input
                    type="number"
                    value={quotedAmount}
                    onChange={(e) => setQuotedAmount(e.target.value)}
                    placeholder="35000"
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white font-mono text-sm focus:outline-none focus:border-[#A65F43]"
                  />
                </div>

                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Advance Paid (₹)
                  </label>
                  <input
                    type="number"
                    value={advanceReceived}
                    onChange={(e) => setAdvanceReceived(e.target.value)}
                    placeholder="10000"
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-emerald-400 font-mono text-sm focus:outline-none focus:border-[#A65F43]"
                  />
                </div>

                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Balance Due on Boarding (₹)
                  </label>
                  <div className="px-3 py-2 bg-[#141413] border border-[#2C2C29] rounded text-white font-mono text-sm font-bold">
                    ₹{Math.max(0, balance).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Assigned Vehicle
                  </label>
                  <input
                    type="text"
                    value={assignedVehicle}
                    onChange={(e) => setAssignedVehicle(e.target.value)}
                    placeholder="e.g. 21-Seater Executive Coach (TN 58 AA 1234)"
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white focus:outline-none focus:border-[#A65F43]"
                  />
                </div>

                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Assigned Driver & Mobile
                  </label>
                  <input
                    type="text"
                    value={assignedDriver}
                    onChange={(e) => setAssignedDriver(e.target.value)}
                    placeholder="e.g. M. Pandian (+91 94421 XXXXX)"
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white focus:outline-none focus:border-[#A65F43]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Pipeline Stage / Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as LeadStatus)}
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white focus:outline-none focus:border-[#A65F43]"
                  >
                    <option value="NEW_ENQUIRY">New Lead</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="PROPOSAL_SENT">Proposal / PDF Sent</option>
                    <option value="FOLLOW_UP">Follow-Up Needed</option>
                    <option value="BOOKED">Confirmed Booking</option>
                    <option value="COMPLETED">Journey Completed</option>
                    <option value="LOST">Lost / Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A8A59E] mb-1 font-mono uppercase">
                    Lead Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as LeadPriority)}
                    className="w-full px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-white focus:outline-none focus:border-[#A65F43]"
                  >
                    <option value="HOT">HOT (Immediate Travel)</option>
                    <option value="WARM">WARM (Planning Trip)</option>
                    <option value="COLD">COLD (Information only)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={savingDetails}
                  className="px-4 py-2 bg-[#A65F43] hover:bg-[#86462E] text-white rounded font-medium shadow-sm transition-colors cursor-pointer"
                >
                  {savingDetails ? 'Saving Changes...' : 'Save Financials & Lead State'}
                </button>
              </div>
            </form>
          </div>

          {/* Activity Log & Internal Notes */}
          <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-5 space-y-4 shadow-editorial-sm">
            <h2 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8A8780]" />
              <span>Internal Notes & Activity Audit</span>
            </h2>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log a call, payment note, or special requirement..."
                className="flex-1 px-3 py-2 bg-[#121211] border border-[#33332E] rounded text-xs text-white focus:outline-none focus:border-[#A65F43]"
              />
              <button
                type="submit"
                disabled={submittingNote}
                className="px-3.5 py-2 bg-[#262624] hover:bg-[#333330] text-white text-xs rounded border border-[#3D3D39] transition-colors"
              >
                Add Note
              </button>
            </form>

            {/* Timeline Stream */}
            <div className="space-y-3 pt-2">
              {enquiry.activityLog?.map((act) => (
                <div
                  key={act.id}
                  className="p-3 bg-[#141413] border border-[#262624] rounded text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px] text-[#78756F] font-mono">
                    <span className="font-semibold text-[#A65F43]">{act.author}</span>
                    <span>{new Date(act.timestamp).toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[#C2BFBA]">{act.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: WhatsApp Dispatcher & Ad Attribution */}
        <div className="space-y-6">
          {/* WhatsApp Interactive Composer Card */}
          <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-5 space-y-4 shadow-editorial-sm">
            <div className="flex items-center justify-between border-b border-[#2C2C29] pb-3">
              <h2 className="font-serif text-base font-bold text-emerald-400 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>Interactive WhatsApp Composer</span>
              </h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                Direct wa.me
              </span>
            </div>

            {/* Template Selector */}
            <div className="space-y-1.5">
              <label className="block text-[11px] text-[#8A8780] font-mono uppercase">
                1. Select Base Template
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => handleTemplateSelect('welcome')}
                  className={`p-2 rounded text-left transition-colors cursor-pointer ${
                    selectedTemplate === 'welcome'
                      ? 'bg-[#A65F43] text-white font-semibold'
                      : 'bg-[#141413] text-[#A8A59E] border border-[#292926]'
                  }`}
                >
                  Welcome
                </button>
                <button
                  type="button"
                  onClick={() => handleTemplateSelect('brochure')}
                  className={`p-2 rounded text-left transition-colors cursor-pointer ${
                    selectedTemplate === 'brochure'
                      ? 'bg-[#A65F43] text-white font-semibold'
                      : 'bg-[#141413] text-[#A8A59E] border border-[#292926]'
                  }`}
                >
                  PDF Brochure
                </button>
                <button
                  type="button"
                  onClick={() => handleTemplateSelect('quote')}
                  className={`p-2 rounded text-left transition-colors cursor-pointer ${
                    selectedTemplate === 'quote'
                      ? 'bg-[#A65F43] text-white font-semibold'
                      : 'bg-[#141413] text-[#A8A59E] border border-[#292926]'
                  }`}
                >
                  Tour Quote
                </button>
                <button
                  type="button"
                  onClick={() => handleTemplateSelect('confirmation')}
                  className={`p-2 rounded text-left transition-colors cursor-pointer ${
                    selectedTemplate === 'confirmation'
                      ? 'bg-[#A65F43] text-white font-semibold'
                      : 'bg-[#141413] text-[#A8A59E] border border-[#292926]'
                  }`}
                >
                  Confirmed
                </button>
              </div>
            </div>

            {/* Quick 1-Click Snippet Appenders */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-[11px] text-[#8A8780] font-mono uppercase">
                2. Quick Snippets (1-Click Insert)
              </label>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() =>
                    handleAppendSnippet(
                      `🌐 *View Your Day-Wise Itinerary Dossier:*\nhttps://mahalakshmitravels.com/itinerary/${enquiry.referenceCode}`
                    )
                  }
                  className="px-2.5 py-1 rounded bg-[#242422] hover:bg-[#333330] text-[#D3957C] border border-[#3D3D39] transition-colors cursor-pointer"
                >
                  + Live Itinerary Link
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleAppendSnippet(
                      `🚐 *Assigned Transportation:* ${assignedVehicle || 'Executive AC Coach'}\n👨‍✈️ *Driver Details:* ${assignedDriver || 'Driver contact dispatched 12 hrs prior.'}`
                    )
                  }
                  className="px-2.5 py-1 rounded bg-[#242422] hover:bg-[#333330] text-emerald-300 border border-[#3D3D39] transition-colors cursor-pointer"
                >
                  + Driver & Fleet Info
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleAppendSnippet(
                      `💳 *Payment Terms:* ₹${(Number(advanceReceived) || 10000).toLocaleString('en-IN')} advance confirmation. Balance on boarding day.`
                    )
                  }
                  className="px-2.5 py-1 rounded bg-[#242422] hover:bg-[#333330] text-amber-300 border border-[#3D3D39] transition-colors cursor-pointer"
                >
                  + Advance Reminder
                </button>
              </div>
            </div>

            {/* Live Editable Message Box */}
            <div className="space-y-1 pt-1">
              <label className="block text-[11px] text-[#8A8780] font-mono uppercase">
                3. Editable Message Content
              </label>
              <textarea
                rows={6}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full px-3 py-2 bg-[#111B15] border border-emerald-900/60 rounded text-xs text-emerald-100 font-mono leading-relaxed focus:outline-none focus:border-emerald-500"
                placeholder="Type or customize your WhatsApp message..."
              />
            </div>

            {/* Launch Actions */}
            <div className="space-y-2 pt-1">
              <a
                href={getDirectWhatsAppUrl(enquiry.phone, customMessage || whatsappPreview)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Launch WhatsApp & Dispatch</span>
              </a>

              <a
                href={`/itinerary/${enquiry.referenceCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-[#242422] hover:bg-[#2F2F2B] text-[#C2BFBA] hover:text-white rounded text-xs font-medium flex items-center justify-center gap-1.5 border border-[#3A3A36] transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-[#A65F43]" />
                <span>Preview Customer Itinerary Page</span>
              </a>
            </div>
          </div>

          {/* Ad Attribution & Marketing Tracking Details */}
          <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-5 space-y-3 shadow-editorial-sm">
            <h2 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-blue-400" />
              <span>Ad Attribution & Tracking</span>
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-[#141413] rounded border border-[#262624]">
                <span className="text-[#78756F] font-mono">Source Channel</span>
                <span className="text-white font-mono uppercase font-semibold">
                  {enquiry.attribution?.source || 'website'}
                </span>
              </div>

              {enquiry.attribution?.utm_campaign && (
                <div className="flex items-center justify-between p-2 bg-[#141413] rounded border border-[#262624]">
                  <span className="text-[#78756F] font-mono">Campaign</span>
                  <span className="text-white font-mono truncate max-w-[160px]">
                    {enquiry.attribution.utm_campaign}
                  </span>
                </div>
              )}

              {enquiry.attribution?.gclid && (
                <div className="p-2 bg-[#141413] rounded border border-[#262624] space-y-0.5">
                  <span className="text-[#78756F] font-mono text-[10px] block">Google Click ID (gclid)</span>
                  <span className="text-blue-300 font-mono text-[10px] break-all">
                    {enquiry.attribution.gclid}
                  </span>
                </div>
              )}

              {enquiry.attribution?.fbclid && (
                <div className="p-2 bg-[#141413] rounded border border-[#262624] space-y-0.5">
                  <span className="text-[#78756F] font-mono text-[10px] block">Meta Click ID (fbclid)</span>
                  <span className="text-pink-300 font-mono text-[10px] break-all">
                    {enquiry.attribution.fbclid}
                  </span>
                </div>
              )}

              {enquiry.attribution?.landingPage && (
                <div className="flex items-center justify-between p-2 bg-[#141413] rounded border border-[#262624]">
                  <span className="text-[#78756F] font-mono">Landing Page</span>
                  <span className="text-white font-mono text-[11px] truncate max-w-[160px]">
                    {enquiry.attribution.landingPage}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
