/**
 * MAHALAKSHMI TOUR & TRAVEL — CRM & LEAD MANAGEMENT TYPES
 * Comprehensive types for lead pipeline, ad attribution, and financial tracking.
 */

import { StructuredEnquiry, TravelIntent, GroupType, VehicleRequirementType, DateFlexibility, ContactPreference } from './enquiry';

export type LeadStatus =
  | 'NEW_ENQUIRY'
  | 'CONTACTED'
  | 'PROPOSAL_SENT'
  | 'FOLLOW_UP'
  | 'BOOKED'
  | 'COMPLETED'
  | 'LOST';

export type LeadPriority = 'HOT' | 'WARM' | 'COLD' | 'UNQUALIFIED';

export type AdSource =
  | 'website'
  | 'google_ads'
  | 'meta_ads'
  | 'instagram_direct'
  | 'walk_in'
  | 'phone_call'
  | 'referral';

export interface ActivityItem {
  id: string;
  timestamp: string;
  author: string;
  type: 'status_change' | 'note' | 'whatsapp' | 'call' | 'quote' | 'created';
  message: string;
}

export interface AdAttribution {
  source: AdSource;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string; // Google Click ID
  fbclid?: string; // Meta Click ID
  landingPage?: string;
}

export interface CrmEnquiry extends StructuredEnquiry {
  id: string;
  referenceCode: string;
  status: LeadStatus;
  priority: LeadPriority;
  attribution: AdAttribution;
  
  // Financials & Quote
  estimatedValue?: number;
  quotedAmount?: number;
  advanceReceived?: number;
  balanceAmount?: number;
  
  // Fulfillment Details
  assignedVehicle?: string; // e.g. "Force Urbania 12S", "Tempo Traveller 21S", "Innova Crysta"
  assignedDriver?: string;
  
  // Internal Notes & Audit
  internalNotes?: string;
  activityLog: ActivityItem[];
  
  // WhatsApp Automation
  whatsappSent: boolean;
  whatsappLastSentAt?: string;
  isDemo?: boolean;
  
  createdAt: string;
  updatedAt: string;
}

export interface CrmAnalyticsSummary {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  proposalSentLeads: number;
  bookedLeads: number;
  lostLeads: number;
  conversionRate: number; // Percentage
  totalPipelineValue: number; // INR
  totalBookedRevenue: number; // INR
  adAttributionStats: {
    source: AdSource;
    count: number;
    bookedCount: number;
    revenue: number;
  }[];
}
