/**
 * MAHALAKSHMI TOUR & TRAVEL — CRM DATA REPOSITORY
 * In-memory / Server-side storage for leads, pipeline stages, quotes, and ad tracking.
 */

import { CrmEnquiry, LeadStatus, LeadPriority, AdSource, CrmAnalyticsSummary, ActivityItem } from '@/types/crm';
import { generateEnquiryReference } from '@/lib/conversion/reference';

// Initial realistic starter leads for demonstration
// Synthetic demo seed data for development/admin testing only
const demoSeedEnquiries: CrmEnquiry[] = [
  {
    id: 'lead-001',
    referenceCode: 'MT-260818-7821',
    intent: 'family',
    origin: 'Madurai',
    destinations: ['Munnar', 'Thekkady'],
    travelDate: '2026-09-05',
    returnDate: '2026-09-08',
    duration: '3 Nights / 4 Days',
    dateFlexibility: 'exact',
    travellerCount: 6,
    groupType: 'family',
    vehicleRequirement: 'help-me-choose',
    assignedVehicle: 'Innova Crysta (7+1)',
    notes: 'Require child car seat and hotel suggestions near tea estates.',
    name: 'Demo Family Traveler',
    phone: '+91 90000 00001',
    email: 'demo.family@example.com',
    contactPreference: 'whatsapp',
    status: 'PROPOSAL_SENT',
    priority: 'UNQUALIFIED',
    quotedAmount: 36500,
    advanceReceived: 10000,
    balanceAmount: 26500,
    verifiedCommercialValue: {
      amount: 36500,
      currency: 'INR',
      source: 'VERIFIED_QUOTE',
      verifiedAt: '2026-08-18T10:15:00.000Z',
    },
    isDemo: true,
    attribution: {
      source: 'google_ads',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'munnar_family_tours_madurai',
      landingPage: '/tours/munnar',
    },
    internalNotes: 'Demo record for admin UI testing.',
    activityLog: [
      {
        id: 'act-1',
        timestamp: '2026-08-18T10:15:00.000Z',
        author: 'System',
        type: 'created',
        message: 'Demo lead initialized for admin UI testing.',
      },
    ],
    whatsappSent: true,
    whatsappLastSentAt: '2026-08-18T10:20:00.000Z',
    createdAt: '2026-08-18T10:15:00.000Z',
    updatedAt: '2026-08-18T11:45:00.000Z',
  },
  {
    id: 'lead-002',
    referenceCode: 'MT-260818-4519',
    intent: 'college',
    origin: 'Madurai',
    destinations: ['Kodaikanal', 'Ooty'],
    travelDate: '2026-09-18',
    returnDate: '2026-09-21',
    duration: '3 Nights / 4 Days',
    dateFlexibility: 'flexible',
    travellerCount: 21,
    groupType: 'college',
    vehicleRequirement: '21-seater-van',
    assignedVehicle: '21-Seater Executive Coach (AC)',
    notes: 'Demo college group department tour.',
    name: 'Demo Student Group Rep',
    phone: '+91 90000 00002',
    email: 'demo.college@example.com',
    contactPreference: 'call',
    status: 'BOOKED',
    priority: 'UNQUALIFIED',
    quotedAmount: 62000,
    advanceReceived: 20000,
    balanceAmount: 42000,
    verifiedCommercialValue: {
      amount: 62000,
      currency: 'INR',
      source: 'VERIFIED_BOOKING',
      verifiedAt: '2026-08-17T14:30:00.000Z',
    },
    isDemo: true,
    attribution: {
      source: 'meta_ads',
      utm_source: 'instagram',
      utm_medium: 'paid_social',
      landingPage: '/travel-services/college-trips',
    },
    internalNotes: 'Demo record for admin UI testing.',
    activityLog: [
      {
        id: 'act-4',
        timestamp: '2026-08-17T14:30:00.000Z',
        author: 'System',
        type: 'created',
        message: 'Demo lead initialized for admin UI testing.',
      },
    ],
    whatsappSent: true,
    whatsappLastSentAt: '2026-08-17T14:31:00.000Z',
    createdAt: '2026-08-17T14:30:00.000Z',
    updatedAt: '2026-08-18T09:00:00.000Z',
  },
];

// Global in-memory storage singleton for Next.js runtime
declare global {
  // eslint-disable-next-line no-var
  var __mahalakshmi_crm_enquiries: CrmEnquiry[] | undefined;
}

function getStore(): CrmEnquiry[] {
  if (!global.__mahalakshmi_crm_enquiries) {
    // Production CRM initializes empty with ZERO fabricated customer records.
    // Demo seed data is loaded only when explicitly enabled in development mode.
    global.__mahalakshmi_crm_enquiries = process.env.ENABLE_CRM_DEMO_SEED === 'true'
      ? [...demoSeedEnquiries]
      : [];
  }
  return global.__mahalakshmi_crm_enquiries;
}

export class CrmRepository {
  /**
   * Get all enquiries with optional filtering & search
   */
  static async getAllEnquiries(filters?: {
    status?: LeadStatus | 'ALL';
    source?: AdSource | 'ALL';
    search?: string;
    priority?: LeadPriority | 'ALL';
  }): Promise<CrmEnquiry[]> {
    const store = getStore();
    let result = [...store];

    if (filters?.status && filters.status !== 'ALL') {
      result = result.filter((e) => e.status === filters.status);
    }

    if (filters?.source && filters.source !== 'ALL') {
      result = result.filter((e) => e.attribution?.source === filters.source);
    }

    if (filters?.priority && filters.priority !== 'ALL') {
      result = result.filter((e) => e.priority === filters.priority);
    }

    if (filters?.search && filters.search.trim().length > 0) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.phone.toLowerCase().includes(q) ||
          e.referenceCode.toLowerCase().includes(q) ||
          e.destinations.some((d) => d.toLowerCase().includes(q)) ||
          (e.email && e.email.toLowerCase().includes(q))
      );
    }

    // Sort by createdAt descending
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Get single enquiry by ID or Reference Code
   */
  static async getEnquiryById(idOrRef: string): Promise<CrmEnquiry | null> {
    const store = getStore();
    const enquiry = store.find((e) => e.id === idOrRef || e.referenceCode === idOrRef);
    return enquiry ? { ...enquiry } : null;
  }

  /**
   * Insert new enquiry from web or ad webhook
   */
  static async createEnquiry(payload: Partial<CrmEnquiry>): Promise<CrmEnquiry> {
    const store = getStore();
    const id = `lead-${Date.now()}`;
    const referenceCode = payload.referenceCode || generateEnquiryReference();
    const now = new Date().toISOString();

    const newEnquiry: CrmEnquiry = {
      id,
      referenceCode,
      intent: payload.intent || 'custom',
      origin: payload.origin || 'Madurai',
      destinations: payload.destinations || [],
      customDestination: payload.customDestination,
      travelDate: payload.travelDate,
      returnDate: payload.returnDate,
      duration: payload.duration,
      dateFlexibility: payload.dateFlexibility || 'flexible',
      travellerCount: payload.travellerCount || 1,
      groupType: payload.groupType || 'family',
      vehicleRequirement: payload.vehicleRequirement || 'help-me-choose',
      notes: payload.notes,
      name: payload.name || 'Anonymous Guest',
      phone: payload.phone || '',
      email: payload.email,
      contactPreference: payload.contactPreference || 'whatsapp',
      status: payload.status || 'NEW_ENQUIRY',
      priority: payload.priority || 'UNQUALIFIED',
      estimatedValue: payload.estimatedValue,
      quotedAmount: payload.quotedAmount,
      advanceReceived: payload.advanceReceived || 0,
      balanceAmount: payload.balanceAmount,
      verifiedCommercialValue: payload.verifiedCommercialValue,
      assignedVehicle: payload.assignedVehicle,
      assignedDriver: payload.assignedDriver,
      attribution: payload.attribution || {
        source: 'website',
        utm_source: 'direct',
      },
      internalNotes: payload.internalNotes,
      activityLog: [
        {
          id: `act-${Date.now()}`,
          timestamp: now,
          author: payload.attribution?.source === 'website' ? 'Website Form' : 'Ad Webhook',
          type: 'created',
          message: `Enquiry received from ${payload.attribution?.source || 'Website'}.`,
        },
        ...(payload.activityLog || []),
      ],
      whatsappSent: payload.whatsappSent || false,
      createdAt: payload.createdAt || now,
      updatedAt: now,
    };

    store.unshift(newEnquiry);
    return newEnquiry;
  }

  /**
   * Update enquiry details (status, quotes, notes, fulfillment)
   */
  static async updateEnquiry(
    id: string,
    updates: Partial<CrmEnquiry>,
    actor: string = 'Owner (Madurai Desk)'
  ): Promise<CrmEnquiry | null> {
    const store = getStore();
    const index = store.findIndex((e) => e.id === id || e.referenceCode === id);
    if (index === -1) return null;

    const existing = store[index];
    const now = new Date().toISOString();
    const newActivity: ActivityItem[] = [...existing.activityLog];

    // Log status change
    if (updates.status && updates.status !== existing.status) {
      newActivity.push({
        id: `act-${Date.now()}-status`,
        timestamp: now,
        author: actor,
        type: 'status_change',
        message: `Status changed from ${existing.status} to ${updates.status}`,
      });
    }

    // Log quote update
    if (updates.quotedAmount && updates.quotedAmount !== existing.quotedAmount) {
      newActivity.push({
        id: `act-${Date.now()}-quote`,
        timestamp: now,
        author: actor,
        type: 'quote',
        message: `Quote updated to ₹${updates.quotedAmount.toLocaleString('en-IN')}`,
      });
    }

    // Balance recalculation
    const quote = updates.quotedAmount !== undefined ? updates.quotedAmount : existing.quotedAmount;
    const advance = updates.advanceReceived !== undefined ? updates.advanceReceived : existing.advanceReceived;
    const balance = quote && advance !== undefined ? Math.max(0, quote - advance) : existing.balanceAmount;

    // Verified Commercial Value Contract derivation:
    // MUST ONLY BE populated when explicitly provided in updates.
    // Status changes alone (PROPOSAL_SENT, BOOKED, COMPLETED) or quotedAmount changes alone
    // MUST NEVER automatically manufacture or modify verifiedCommercialValue.
    const verifiedCommercialValue =
      updates.verifiedCommercialValue !== undefined
        ? updates.verifiedCommercialValue
        : existing.verifiedCommercialValue;

    const updated: CrmEnquiry = {
      ...existing,
      ...updates,
      balanceAmount: balance,
      verifiedCommercialValue,
      activityLog: newActivity,
      updatedAt: now,
    };

    store[index] = updated;
    return updated;
  }

  /**
   * Add a timestamped internal note to an enquiry
   */
  static async addNote(id: string, noteText: string, author: string = 'Owner'): Promise<CrmEnquiry | null> {
    const store = getStore();
    const enquiry = store.find((e) => e.id === id || e.referenceCode === id);
    if (!enquiry) return null;

    const now = new Date().toISOString();
    enquiry.activityLog.push({
      id: `act-${Date.now()}-note`,
      timestamp: now,
      author,
      type: 'note',
      message: noteText,
    });
    enquiry.internalNotes = enquiry.internalNotes
      ? `${enquiry.internalNotes}\n[${new Date().toLocaleDateString('en-IN')}]: ${noteText}`
      : noteText;
    enquiry.updatedAt = now;

    return { ...enquiry };
  }

  /**
   * Delete an enquiry
   */
  static async deleteEnquiry(id: string): Promise<boolean> {
    const store = getStore();
    const initialLen = store.length;
    global.__mahalakshmi_crm_enquiries = store.filter((e) => e.id !== id && e.referenceCode !== id);
    return global.__mahalakshmi_crm_enquiries.length < initialLen;
  }

  /**
   * Get CRM & Ad Analytics
   */
  static async getAnalytics(): Promise<CrmAnalyticsSummary> {
    const store = getStore();

    let newLeads = 0;
    let contactedLeads = 0;
    let proposalSentLeads = 0;
    let bookedLeads = 0;
    let lostLeads = 0;
    let totalPipelineValue = 0;
    let totalBookedRevenue = 0;

    const sourceMap: Record<AdSource, { count: number; bookedCount: number; revenue: number }> = {
      website: { count: 0, bookedCount: 0, revenue: 0 },
      google_ads: { count: 0, bookedCount: 0, revenue: 0 },
      meta_ads: { count: 0, bookedCount: 0, revenue: 0 },
      instagram_direct: { count: 0, bookedCount: 0, revenue: 0 },
      walk_in: { count: 0, bookedCount: 0, revenue: 0 },
      phone_call: { count: 0, bookedCount: 0, revenue: 0 },
      referral: { count: 0, bookedCount: 0, revenue: 0 },
    };

    store.forEach((e) => {
      // Status counting
      if (e.status === 'NEW_ENQUIRY') newLeads++;
      if (e.status === 'CONTACTED') contactedLeads++;
      if (e.status === 'PROPOSAL_SENT') proposalSentLeads++;
      if (e.status === 'BOOKED' || e.status === 'COMPLETED') bookedLeads++;
      if (e.status === 'LOST') lostLeads++;

      // Financial counting — authoritative verified commercial value contract only
      const verifiedVal = e.verifiedCommercialValue?.amount || 0;
      const verifiedSource = e.verifiedCommercialValue?.source;

      // Pipeline value includes all active verified commercial values
      if (e.verifiedCommercialValue && e.status !== 'LOST') {
        totalPipelineValue += verifiedVal;
      }

      // Booked revenue requires verified booking or completion contract
      const isVerifiedRevenue =
        (e.status === 'BOOKED' || e.status === 'COMPLETED') &&
        (verifiedSource === 'VERIFIED_BOOKING' || verifiedSource === 'VERIFIED_COMPLETION');

      if (isVerifiedRevenue) {
        totalBookedRevenue += verifiedVal;
      }

      // Ad Attribution breakdown
      const src = e.attribution?.source || 'website';
      if (!sourceMap[src]) {
        sourceMap[src] = { count: 0, bookedCount: 0, revenue: 0 };
      }
      sourceMap[src].count++;
      if (isVerifiedRevenue) {
        sourceMap[src].bookedCount++;
        sourceMap[src].revenue += verifiedVal;
      }
    });

    const totalLeads = store.length;
    const conversionRate = totalLeads > 0 ? Math.round((bookedLeads / totalLeads) * 100) : 0;

    const adAttributionStats = (Object.keys(sourceMap) as AdSource[])
      .filter((k) => sourceMap[k].count > 0)
      .map((k) => ({
        source: k,
        count: sourceMap[k].count,
        bookedCount: sourceMap[k].bookedCount,
        revenue: sourceMap[k].revenue,
      }));

    return {
      totalLeads,
      newLeads,
      contactedLeads,
      proposalSentLeads,
      bookedLeads,
      lostLeads,
      conversionRate,
      totalPipelineValue,
      totalBookedRevenue,
      adAttributionStats,
    };
  }
}
