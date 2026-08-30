/**
 * MAHALAKSHMI TOUR & TRAVEL — CRM DATA REPOSITORY
 * In-memory / Server-side storage for leads, pipeline stages, quotes, and ad tracking.
 */

import { CrmEnquiry, LeadStatus, LeadPriority, AdSource, CrmAnalyticsSummary, ActivityItem } from '@/types/crm';
import { generateEnquiryReference } from '@/lib/conversion/reference';

// Initial realistic starter leads for demonstration
const initialEnquiries: CrmEnquiry[] = [
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
    name: 'Dr. S. Karthi',
    phone: '+91 98421 98765',
    email: 'karthi.s@hospital.org',
    contactPreference: 'whatsapp',
    status: 'PROPOSAL_SENT',
    priority: 'HOT',
    estimatedValue: 38000,
    quotedAmount: 36500,
    advanceReceived: 10000,
    balanceAmount: 26500,
    attribution: {
      source: 'google_ads',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'munnar_family_tours_madurai',
      gclid: 'gclid_karthi_982347a1',
      landingPage: '/tours/munnar-hill-escape',
    },
    internalNotes: 'Family visiting from Chennai via Madurai. Ready to book if spice plantation visit is included.',
    activityLog: [
      {
        id: 'act-1',
        timestamp: '2026-08-18T10:15:00.000Z',
        author: 'System',
        type: 'created',
        message: 'Lead received from Google Ads Campaign: munnar_family_tours_madurai',
      },
      {
        id: 'act-2',
        timestamp: '2026-08-18T10:20:00.000Z',
        author: 'WhatsApp Bot',
        type: 'whatsapp',
        message: 'Automated welcome message & Munnar brochure PDF dispatched via WhatsApp.',
      },
      {
        id: 'act-3',
        timestamp: '2026-08-18T11:45:00.000Z',
        author: 'Owner (Madurai Desk)',
        type: 'quote',
        message: 'Quoted ₹36,500 for 4D/3N with Innova Crysta. Advance ₹10,000 pending confirmation.',
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
    assignedDriver: 'M. Pandian (Driver ID: MP-04)',
    notes: 'KLN College final year department tour. Need experienced hill-station driver.',
    name: 'V. Vignesh (Class Rep)',
    phone: '+91 97890 12345',
    email: 'vignesh.mech@klnce.edu',
    contactPreference: 'call',
    status: 'BOOKED',
    priority: 'HOT',
    estimatedValue: 65000,
    quotedAmount: 62000,
    advanceReceived: 20000,
    balanceAmount: 42000,
    attribution: {
      source: 'meta_ads',
      utm_source: 'instagram',
      utm_medium: 'paid_social',
      utm_campaign: 'college_group_trip_21s',
      fbclid: 'fbclid_vignesh_klce_998',
      landingPage: '/college-trips',
    },
    internalNotes: 'Advance of ₹20,000 received via GPay. Permit and hill permit included. Assigned 21S Coach.',
    activityLog: [
      {
        id: 'act-4',
        timestamp: '2026-08-17T14:30:00.000Z',
        author: 'System',
        type: 'created',
        message: 'Lead captured from Instagram Lead Ad: college_group_trip_21s',
      },
      {
        id: 'act-5',
        timestamp: '2026-08-17T15:00:00.000Z',
        author: 'Owner (Madurai Desk)',
        type: 'call',
        message: 'Called student rep. Finalized route and vehicle. Sent discount package.',
      },
      {
        id: 'act-6',
        timestamp: '2026-08-18T09:00:00.000Z',
        author: 'Owner (Madurai Desk)',
        type: 'status_change',
        message: 'Status updated to BOOKED. ₹20,000 advance confirmed.',
      },
    ],
    whatsappSent: true,
    whatsappLastSentAt: '2026-08-17T14:31:00.000Z',
    createdAt: '2026-08-17T14:30:00.000Z',
    updatedAt: '2026-08-18T09:00:00.000Z',
  },
  {
    id: 'lead-003',
    referenceCode: 'MT-260818-9102',
    intent: 'tour',
    origin: 'Madurai',
    destinations: ['Rameswaram', 'Dhanushkodi', 'Kanyakumari'],
    travelDate: '2026-09-10',
    duration: '2 Nights / 3 Days',
    dateFlexibility: 'exact',
    travellerCount: 4,
    groupType: 'family',
    vehicleRequirement: 'sedan-car',
    name: 'Ananya Sharma',
    phone: '+91 94432 55678',
    email: 'ananya.sharma@delhi.ac.in',
    contactPreference: 'whatsapp',
    status: 'NEW_ENQUIRY',
    priority: 'HOT',
    estimatedValue: 24000,
    attribution: {
      source: 'website',
      utm_source: 'google',
      utm_medium: 'organic',
      landingPage: '/destinations/rameswaram',
    },
    internalNotes: 'Needs morning temple darshan coordination and Dhanushkodi sunrise visit.',
    activityLog: [
      {
        id: 'act-7',
        timestamp: '2026-08-18T12:00:00.000Z',
        author: 'System',
        type: 'created',
        message: 'New enquiry submitted via Website Destination Page: /destinations/rameswaram',
      },
      {
        id: 'act-8',
        timestamp: '2026-08-18T12:01:00.000Z',
        author: 'WhatsApp Bot',
        type: 'whatsapp',
        message: 'Welcome message and Mahalakshmi Tour Brochure sent to +91 94432 55678.',
      },
    ],
    whatsappSent: true,
    whatsappLastSentAt: '2026-08-18T12:01:00.000Z',
    createdAt: '2026-08-18T12:00:00.000Z',
    updatedAt: '2026-08-18T12:00:00.000Z',
  },
  {
    id: 'lead-004',
    referenceCode: 'MT-260818-3329',
    intent: 'function',
    origin: 'Madurai',
    destinations: ['Tiruchendur', 'Palani'],
    travelDate: '2026-09-25',
    returnDate: '2026-09-26',
    duration: '1 Night / 2 Days',
    dateFlexibility: 'exact',
    travellerCount: 15,
    groupType: 'function',
    vehicleRequirement: '21-seater-van',
    name: 'M. Shanmugam',
    phone: '+91 98422 11223',
    contactPreference: 'call',
    status: 'CONTACTED',
    priority: 'WARM',
    estimatedValue: 32000,
    quotedAmount: 30000,
    attribution: {
      source: 'meta_ads',
      utm_source: 'facebook',
      utm_medium: 'paid_social',
      utm_campaign: 'temple_family_functions_madurai',
      fbclid: 'fbclid_shanmugam_fb_331',
    },
    internalNotes: 'Ear piercing function travel for family. Checking with family elders regarding vehicle timings.',
    activityLog: [
      {
        id: 'act-9',
        timestamp: '2026-08-18T08:30:00.000Z',
        author: 'System',
        type: 'created',
        message: 'Lead captured from Facebook Lead Ad: temple_family_functions_madurai',
      },
      {
        id: 'act-10',
        timestamp: '2026-08-18T09:15:00.000Z',
        author: 'Owner (Madurai Desk)',
        type: 'call',
        message: 'Called customer. Explained 18/21 Seater Tempo Traveller rates. Follow-up on Thursday.',
      },
    ],
    whatsappSent: true,
    whatsappLastSentAt: '2026-08-18T08:31:00.000Z',
    createdAt: '2026-08-18T08:30:00.000Z',
    updatedAt: '2026-08-18T09:15:00.000Z',
  },
  {
    id: 'lead-005',
    referenceCode: 'MT-260818-1204',
    intent: 'custom',
    origin: 'Madurai',
    destinations: ['Wayanad', 'Coorg', 'Mysore'],
    travelDate: '2026-10-02',
    returnDate: '2026-10-07',
    duration: '5 Nights / 6 Days',
    dateFlexibility: 'flexible',
    travellerCount: 8,
    groupType: 'friends',
    vehicleRequirement: 'help-me-choose',
    name: 'Rajesh Kannan',
    phone: '+91 99944 88776',
    email: 'rajesh.kannan@tcs.com',
    contactPreference: 'whatsapp',
    status: 'FOLLOW_UP',
    priority: 'WARM',
    estimatedValue: 72000,
    quotedAmount: 68000,
    attribution: {
      source: 'google_ads',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'south_india_custom_packages',
      gclid: 'gclid_rajesh_coorg_9921',
    },
    internalNotes: 'Tech professionals group. Sent detailed day-wise itinerary for Coorg-Wayanad.',
    activityLog: [
      {
        id: 'act-11',
        timestamp: '2026-08-16T16:00:00.000Z',
        author: 'System',
        type: 'created',
        message: 'Enquiry received from Google Search Ad campaign: south_india_custom_packages',
      },
      {
        id: 'act-12',
        timestamp: '2026-08-17T11:00:00.000Z',
        author: 'Owner (Madurai Desk)',
        type: 'whatsapp',
        message: 'Shared customized PDF itinerary with jungle safari options.',
      },
    ],
    whatsappSent: true,
    whatsappLastSentAt: '2026-08-17T11:00:00.000Z',
    createdAt: '2026-08-16T16:00:00.000Z',
    updatedAt: '2026-08-17T11:00:00.000Z',
  }
];

// Global in-memory storage singleton for Next.js runtime
declare global {
  // eslint-disable-next-line no-var
  var __mahalakshmi_crm_enquiries: CrmEnquiry[] | undefined;
}

function getStore(): CrmEnquiry[] {
  if (!global.__mahalakshmi_crm_enquiries) {
    global.__mahalakshmi_crm_enquiries = [...initialEnquiries];
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
      priority: payload.priority || 'HOT',
      estimatedValue: payload.estimatedValue || 25000,
      quotedAmount: payload.quotedAmount,
      advanceReceived: payload.advanceReceived || 0,
      balanceAmount: payload.balanceAmount,
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

    const updated: CrmEnquiry = {
      ...existing,
      ...updates,
      balanceAmount: balance,
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

      // Revenue counting
      const val = e.quotedAmount || e.estimatedValue || 0;
      totalPipelineValue += val;
      if (e.status === 'BOOKED' || e.status === 'COMPLETED') {
        totalBookedRevenue += (e.quotedAmount || e.estimatedValue || 0);
      }

      // Ad Attribution breakdown
      const src = e.attribution?.source || 'website';
      if (!sourceMap[src]) {
        sourceMap[src] = { count: 0, bookedCount: 0, revenue: 0 };
      }
      sourceMap[src].count++;
      if (e.status === 'BOOKED' || e.status === 'COMPLETED') {
        sourceMap[src].bookedCount++;
        sourceMap[src].revenue += (e.quotedAmount || e.estimatedValue || 0);
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
