/**
 * MAHALAKSHMI TOUR & TRAVEL — INTERACTIVE MAP ARCHITECTURE
 * Conceptual Direction: "An incomplete, discoverable travel map with Madurai as Origin Hub."
 * Covered States: Tamil Nadu, Kerala, Karnataka, Andhra Pradesh.
 */

import { SouthIndiaState } from './tour';

export type StateFilterId =
  | 'all'
  | 'tamil-nadu'
  | 'kerala'
  | 'karnataka'
  | 'andhra-pradesh';

export type DestinationCategory =
  | 'all'
  | 'hills'
  | 'temples'
  | 'wildlife'
  | 'coastal'
  | 'heritage';

export interface MapCoordinates {
  x: number; // Normalized SVG coordinate (0-1000)
  y: number; // Normalized SVG coordinate (0-1000)
  lat: number;
  lng: number;
}

export interface RouteWaypoint {
  name: string;
  type?: 'origin' | 'scenic' | 'halt' | 'ghat' | 'destination';
  note?: string;
}

export interface MapNode {
  id: string;
  name: string;
  slug: string;
  state: SouthIndiaState;
  stateSlug: 'tamil-nadu' | 'kerala' | 'karnataka' | 'andhra-pradesh';
  category: 'hub' | 'hills' | 'temples' | 'wildlife' | 'coastal' | 'heritage';
  categoryLabel?: string;
  categoryIcon?: string;
  coordinates: MapCoordinates;
  isOrigin?: boolean; // True only for Madurai
  distanceFromMaduraiKm: number;
  travelTimeFromMadurai: string;
  highwayRoute: string; // e.g. "NH 85 via Theni & Bodi Mettu"
  highwayBadge?: string; // e.g. "NH 85"
  terrain?: string; // e.g. "High Altitude Mountain Ghats (1,600m)"
  highlightTag: string;
  shortDescription: string;
  keyHalts?: string[];
  waypoints?: RouteWaypoint[];
  routeSvgPath: string; // Accurate bezier path originating from Madurai
  connectedRouteIds: string[];
  relatedTourSlugs: string[];
  heroImageUrl?: string;
}

export interface MapRouteSegment {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  distanceKm: number;
  svgPath: string;
  isPrimaryHighway?: boolean;
  highwayCode?: string;
  isIncompleteContinuesOut?: boolean; // Brand motif: Route continues beyond frame
  continuationLabel?: string;
}

export interface SouthIndiaMapData {
  originNodeId: string; // 'madurai'
  statesCovered: SouthIndiaState[];
  nodes: MapNode[];
  routes: MapRouteSegment[];
}

