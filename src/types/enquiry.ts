/**
 * MAHALAKSHMI TOUR & TRAVEL — ENQUIRY & CONVERSION DOMAIN MODEL
 * Phase 07: Context-aware progressive travel planner & structured lead model
 */

export type TravelIntent = 
  | 'tour' 
  | 'family' 
  | 'group' 
  | 'college' 
  | 'function' 
  | 'custom' 
  | 'vehicle' 
  | 'general';

export type GroupType = 
  | 'family' 
  | 'friends' 
  | 'college' 
  | 'organization' 
  | 'function' 
  | 'couple' 
  | 'group'
  | 'other';

export type VehicleRequirementType = 
  | 'help-me-choose' 
  | '21-seater-van' 
  | 'sedan-car' 
  | 'no-vehicle' 
  | 'undecided';

export type DateFlexibility = 'exact' | 'flexible' | 'undecided';

export type ContactPreference = 'whatsapp' | 'call' | 'either';

export interface StructuredEnquiry {
  id?: string;
  referenceCode?: string;
  intent: TravelIntent;
  origin: string; // Defaults to "Madurai"
  destinations: string[]; // e.g. ["Munnar", "Thekkady"]
  customDestination?: string;
  travelDate?: string;
  returnDate?: string;
  duration?: string; // e.g. "1 Night / 2 Days"
  dateFlexibility: DateFlexibility;
  travellerCount: number;
  groupType: GroupType;
  vehicleRequirement: VehicleRequirementType;
  notes?: string;
  name: string;
  phone: string;
  email?: string;
  contactPreference: ContactPreference;
  sourceContext?: {
    tourSlug?: string;
    tourTitle?: string;
    vehicleSlug?: string;
    serviceSlug?: string;
    sourcePage?: string;
  };
  honeypot?: string; // Anti-spam trap
  createdAt?: string;
}

export type EnquiryPayload = StructuredEnquiry;

export interface EnquiryValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof StructuredEnquiry, string>>;
}
