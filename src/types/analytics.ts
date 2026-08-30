/**
 * MAHALAKSHMI TOUR & TRAVEL — ANALYTICS EVENT TYPES
 * Safe, type-checked tracking events
 */

export type AnalyticsEventName =
  | 'tour_view'
  | 'destination_view'
  | 'vehicle_view'
  | 'article_view'
  | 'whatsapp_click'
  | 'phone_click'
  | 'tour_enquiry'
  | 'vehicle_enquiry'
  | 'custom_trip_start'
  | 'custom_trip_complete'
  | 'design_system_preview';

export interface BaseEventParams {
  timestamp?: number;
  path?: string;
  source?: string;
}

export interface TourViewParams extends BaseEventParams {
  tourId: string;
  tourSlug: string;
  destination: string;
  duration: string;
}

export interface DestinationViewParams extends BaseEventParams {
  destinationId: string;
  destinationSlug: string;
  state: string;
}

export interface VehicleViewParams extends BaseEventParams {
  vehicleId: string;
  vehicleSlug: string;
  capacity: number;
}

export interface ConversionClickParams extends BaseEventParams {
  channel: 'whatsapp' | 'phone';
  context?: string; // e.g. "tour_munnar_cta" or "vehicle_21_seater"
}

export type AnalyticsEventPayload =
  | { event: 'tour_view'; params: TourViewParams }
  | { event: 'destination_view'; params: DestinationViewParams }
  | { event: 'vehicle_view'; params: VehicleViewParams }
  | { event: 'whatsapp_click' | 'phone_click'; params: ConversionClickParams }
  | { event: 'tour_enquiry' | 'vehicle_enquiry'; params: BaseEventParams & { itemSlug: string } }
  | { event: 'custom_trip_start' | 'custom_trip_complete'; params: BaseEventParams }
  | { event: 'article_view'; params: BaseEventParams & { articleSlug: string } }
  | { event: 'design_system_preview'; params: BaseEventParams };
