/**
 * MAHALAKSHMI TOURS AND TRAVELS — CANONICAL CONTENT REGISTRY
 * Authoritative content-control layer for indexability, canonical paths,
 * sitemap eligibility, and relationship ownership.
 */

export type ContentType = 
  | 'core' 
  | 'service' 
  | 'vehicle' 
  | 'tour' 
  | 'destination' 
  | 'guide' 
  | 'conversion';

export type ContentStatus = 
  | 'CONFIRMED' 
  | 'READY' 
  | 'CLIENT_INPUT_REQUIRED' 
  | 'EVIDENCE_REQUIRED' 
  | 'DO_NOT_PUBLISH' 
  | 'FUTURE';

export interface CanonicalContentRecord {
  id: string;
  contentType: ContentType;
  canonicalPath: string;
  status: ContentStatus;
  indexable: boolean;
  sitemapEligible: boolean;
  primaryIntent: string;
  owner: string;
  redirectFrom?: string[];
}

export const canonicalRegistry: CanonicalContentRecord[] = [
  // Core & Hub Records
  { id: 'core-home', contentType: 'core', canonicalPath: '/', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Homepage & South India Tour Desk', owner: 'core' },
  { id: 'core-about', contentType: 'core', canonicalPath: '/about', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Company Background & Madurai Origin', owner: 'core' },
  { id: 'core-contact', contentType: 'core', canonicalPath: '/contact', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Contact & Travel Booking Enquiries', owner: 'core' },
  { id: 'core-tours-hub', contentType: 'core', canonicalPath: '/tours', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'South India Tour Catalog Hub', owner: 'core' },
  { id: 'core-vehicles-hub', contentType: 'core', canonicalPath: '/vehicles', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Vehicle Rental Fleet Catalog Hub', owner: 'core' },
  { id: 'core-services-hub', contentType: 'core', canonicalPath: '/travel-services', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Specialized Travel Services Hub', owner: 'core' },
  { id: 'core-guide-hub', contentType: 'core', canonicalPath: '/travel-guide', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'South India Travel Guides Hub', owner: 'core' },
  { id: 'core-destinations-hub', contentType: 'core', canonicalPath: '/destinations', status: 'CONFIRMED', indexable: false, sitemapEligible: false, primaryIntent: 'Destinations Knowledge Entity Hub', owner: 'core' },
  { id: 'core-plan-your-journey', contentType: 'conversion', canonicalPath: '/plan-your-journey', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Custom Journey Builder & Trip Planner', owner: 'conversion', redirectFrom: ['/customised-tours'] },

  // Vehicle Fleet Records
  { id: 'veh-21-seater', contentType: 'vehicle', canonicalPath: '/vehicles/21-seater-van', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: '21-Seater Tourist Van Hire in Madurai', owner: 'vehicle' },
  { id: 'veh-sedan-car', contentType: 'vehicle', canonicalPath: '/vehicles/sedan-car', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'AC Sedan Car Rental & Outstation Taxi', owner: 'vehicle' },

  // Specialized Travel Service Records
  { id: 'service-group-travel', contentType: 'service', canonicalPath: '/travel-services/group-travel', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Outstation Group Travel Service', owner: 'service', redirectFrom: ['/group-travel'] },
  { id: 'service-college-trips', contentType: 'service', canonicalPath: '/travel-services/college-trips', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'College Industrial Visits & IV Trips', owner: 'service', redirectFrom: ['/college-trips'] },
  { id: 'service-family-travel', contentType: 'service', canonicalPath: '/travel-services/family-travel', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Outstation Family Travel Service', owner: 'service', redirectFrom: ['/family-travel'] },
  { id: 'service-function-travel', contentType: 'service', canonicalPath: '/travel-services/function-travel', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Wedding & Function Transport', owner: 'service', redirectFrom: ['/function-travel'] },

  // Destination Knowledge/Entity Records (Non-indexable, Not in sitemap - Section 14)
  { id: 'dest-madurai', contentType: 'destination', canonicalPath: '/destinations/madurai', status: 'CONFIRMED', indexable: false, sitemapEligible: false, primaryIntent: 'Madurai Destination Entity', owner: 'destination' },
  { id: 'dest-munnar', contentType: 'destination', canonicalPath: '/destinations/munnar', status: 'CONFIRMED', indexable: false, sitemapEligible: false, primaryIntent: 'Munnar Destination Entity', owner: 'destination' },
  { id: 'dest-kodaikanal', contentType: 'destination', canonicalPath: '/destinations/kodaikanal', status: 'CONFIRMED', indexable: false, sitemapEligible: false, primaryIntent: 'Kodaikanal Destination Entity', owner: 'destination' },
  { id: 'dest-rameswaram', contentType: 'destination', canonicalPath: '/destinations/rameswaram', status: 'CONFIRMED', indexable: false, sitemapEligible: false, primaryIntent: 'Rameshwaram Destination Entity', owner: 'destination' },
  { id: 'dest-thekkady', contentType: 'destination', canonicalPath: '/destinations/thekkady', status: 'CONFIRMED', indexable: false, sitemapEligible: false, primaryIntent: 'Thekkady Destination Entity', owner: 'destination' },
  { id: 'dest-kanyakumari', contentType: 'destination', canonicalPath: '/destinations/kanyakumari', status: 'CONFIRMED', indexable: false, sitemapEligible: false, primaryIntent: 'Kanyakumari Destination Entity', owner: 'destination' },
  { id: 'dest-ooty', contentType: 'destination', canonicalPath: '/destinations/ooty', status: 'CONFIRMED', indexable: false, sitemapEligible: false, primaryIntent: 'Ooty Destination Entity', owner: 'destination' },
  { id: 'dest-bangalore-mysore', contentType: 'destination', canonicalPath: '/destinations/bangalore-mysore', status: 'CONFIRMED', indexable: false, sitemapEligible: false, primaryIntent: 'Bangalore Mysore Destination Entity', owner: 'destination' },
  { id: 'dest-coorg', contentType: 'destination', canonicalPath: '/destinations/coorg', status: 'CONFIRMED', indexable: false, sitemapEligible: false, primaryIntent: 'Coorg Destination Entity', owner: 'destination' },
  { id: 'dest-tirupati', contentType: 'destination', canonicalPath: '/destinations/tirupati', status: 'CONFIRMED', indexable: false, sitemapEligible: false, primaryIntent: 'Tirupati Destination Entity', owner: 'destination' },

  // EXACTLY 39 CANONICAL TOURS (Section 10 & 11)
  { id: 'tour-madurai', contentType: 'tour', canonicalPath: '/tours/madurai', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Madurai Temple & Heritage Tour', owner: 'tour', redirectFrom: ['/tours/madurai-meenakshi-amman-temple'] },
  { id: 'tour-rameshwaram', contentType: 'tour', canonicalPath: '/tours/rameshwaram', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Rameshwaram & Dhanushkodi Island Tour', owner: 'tour' },
  { id: 'tour-tiruchendur-and-rameshwaram', contentType: 'tour', canonicalPath: '/tours/tiruchendur-and-rameshwaram', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Tiruchendur & Rameshwaram Coastal Pilgrimage', owner: 'tour' },
  { id: 'tour-padmanabhaswamy-temple', contentType: 'tour', canonicalPath: '/tours/padmanabhaswamy-temple', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Padmanabhaswamy Temple Pilgrimage', owner: 'tour' },
  { id: 'tour-thanjavur', contentType: 'tour', canonicalPath: '/tours/thanjavur', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Thanjavur Chola Heritage Tour', owner: 'tour', redirectFrom: ['/tours/thanjavur-big-temple'] },
  { id: 'tour-palani-murugan-temple', contentType: 'tour', canonicalPath: '/tours/palani-murugan-temple', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Palani Murugan Temple Darshan Tour', owner: 'tour' },
  { id: 'tour-tirupathi-balaji-temple', contentType: 'tour', canonicalPath: '/tours/tirupathi-balaji-temple', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Tirupathi Balaji Darshan Pilgrimage', owner: 'tour' },
  { id: 'tour-velankanni-shrine', contentType: 'tour', canonicalPath: '/tours/velankanni-shrine', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Velankanni Basilica Pilgrimage Tour', owner: 'tour' },
  { id: 'tour-kodaikanal', contentType: 'tour', canonicalPath: '/tours/kodaikanal', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Kodaikanal Hill Station Vacation Tour', owner: 'tour' },
  { id: 'tour-munnar', contentType: 'tour', canonicalPath: '/tours/munnar', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Munnar Tea Estates & Ghats Tour', owner: 'tour' },
  { id: 'tour-ooty', contentType: 'tour', canonicalPath: '/tours/ooty', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Ooty & Coonoor Nilgiris Tour', owner: 'tour' },
  { id: 'tour-courtallam', contentType: 'tour', canonicalPath: '/tours/courtallam', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Courtallam Waterfalls Tour', owner: 'tour' },
  { id: 'tour-yercaud', contentType: 'tour', canonicalPath: '/tours/yercaud', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Yercaud Shevaroy Hills Tour', owner: 'tour' },
  { id: 'tour-thekkady', contentType: 'tour', canonicalPath: '/tours/thekkady', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Thekkady Periyar Wildlife Tour', owner: 'tour' },
  { id: 'tour-vagamon', contentType: 'tour', canonicalPath: '/tours/vagamon', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Vagamon Pine Forest Meadows Tour', owner: 'tour' },
  { id: 'tour-athirapally', contentType: 'tour', canonicalPath: '/tours/athirapally', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Athirapally Waterfalls Circuit', owner: 'tour' },
  { id: 'tour-wayanad', contentType: 'tour', canonicalPath: '/tours/wayanad', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Wayanad Rainforest & Hills Tour', owner: 'tour' },
  { id: 'tour-coorg', contentType: 'tour', canonicalPath: '/tours/coorg', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Coorg Coffee Plantation Tour', owner: 'tour' },
  { id: 'tour-chikmagalur', contentType: 'tour', canonicalPath: '/tours/chikmagalur', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Chikmagalur Coffee Country Tour', owner: 'tour' },
  { id: 'tour-kanyakumari', contentType: 'tour', canonicalPath: '/tours/kanyakumari', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Kanyakumari Southern Tip Tour', owner: 'tour' },
  { id: 'tour-alappuzha', contentType: 'tour', canonicalPath: '/tours/alappuzha', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Alappuzha Houseboat Backwaters Tour', owner: 'tour' },
  { id: 'tour-kochi', contentType: 'tour', canonicalPath: '/tours/kochi', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Kochi Fort & Colonial Heritage Tour', owner: 'tour' },
  { id: 'tour-varkala', contentType: 'tour', canonicalPath: '/tours/varkala', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Varkala Cliff Beach Holiday Tour', owner: 'tour' },
  { id: 'tour-thiruvananthapuram', contentType: 'tour', canonicalPath: '/tours/thiruvananthapuram', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Thiruvananthapuram City & Temple Tour', owner: 'tour' },
  { id: 'tour-pondicherry', contentType: 'tour', canonicalPath: '/tours/pondicherry', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Pondicherry French Quarter & Beach Tour', owner: 'tour' },
  { id: 'tour-gokarna', contentType: 'tour', canonicalPath: '/tours/gokarna', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Gokarna Coastal Temple & Beach Tour', owner: 'tour' },
  { id: 'tour-varkala-jatayu-earths-center', contentType: 'tour', canonicalPath: '/tours/varkala-jatayu-earths-center', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Varkala Cliff & Jatayu Earth Center Tour', owner: 'tour' },
  { id: 'tour-varkala-and-munroe', contentType: 'tour', canonicalPath: '/tours/varkala-and-munroe', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Varkala & Munroe Island Backwaters Tour', owner: 'tour' },
  { id: 'tour-mysore', contentType: 'tour', canonicalPath: '/tours/mysore', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Mysore Royal Palace & Heritage Tour', owner: 'tour' },
  { id: 'tour-bangalore', contentType: 'tour', canonicalPath: '/tours/bangalore', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Bangalore Garden City & Sights Tour', owner: 'tour' },
  { id: 'tour-hyderabad', contentType: 'tour', canonicalPath: '/tours/hyderabad', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Hyderabad Heritage & Nizami Tour', owner: 'tour' },
  { id: 'tour-ramoji-film-city', contentType: 'tour', canonicalPath: '/tours/ramoji-film-city', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Ramoji Film City Excursion Tour', owner: 'tour' },
  { id: 'tour-wonderla', contentType: 'tour', canonicalPath: '/tours/wonderla', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Wonderla Amusement Park Tour', owner: 'tour' },
  { id: 'tour-black-thunder', contentType: 'tour', canonicalPath: '/tours/black-thunder', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Black Thunder Water Theme Park Tour', owner: 'tour' },
  { id: 'tour-vagamon-adventure', contentType: 'tour', canonicalPath: '/tours/vagamon-adventure', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Vagamon Hills Outdoor Adventure Tour', owner: 'tour' },
  { id: 'tour-kanthalloor-adventure', contentType: 'tour', canonicalPath: '/tours/kanthalloor-adventure', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Kanthalloor Offbeat Orchards Tour', owner: 'tour' },
  { id: 'tour-munnar-trekking', contentType: 'tour', canonicalPath: '/tours/munnar-trekking', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Munnar High Altitude Trekking Tour', owner: 'tour' },
  { id: 'tour-mysore-adventure', contentType: 'tour', canonicalPath: '/tours/mysore-adventure', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Mysore Region Outdoor Adventure Tour', owner: 'tour' },
  { id: 'tour-kanakapura-adventure', contentType: 'tour', canonicalPath: '/tours/kanakapura-adventure', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Kanakapura Nature Adventure Camp Tour', owner: 'tour' },

  // Travel Guides / Articles
  { id: 'art-01', contentType: 'guide', canonicalPath: '/travel-guide/best-routes-madurai-to-munnar', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Madurai to Munnar Route Guide', owner: 'guide' },
  { id: 'art-02', contentType: 'guide', canonicalPath: '/travel-guide/kodaikanal-family-travel-guide', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Kodaikanal Family Vacation Guide', owner: 'guide' },
  { id: 'art-03', contentType: 'guide', canonicalPath: '/travel-guide/madurai-to-munnar-1-night-2-days-itinerary', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Munnar 2 Days Itinerary Guide', owner: 'guide' },
  { id: 'art-04', contentType: 'guide', canonicalPath: '/travel-guide/college-industrial-visit-planning-guide', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'College IV & Trip Planning Guide', owner: 'guide' },
  { id: 'art-05', contentType: 'guide', canonicalPath: '/travel-guide/temple-tour-etiquette-and-darshan-tips', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'South India Temple Etiquette Guide', owner: 'guide' },
  { id: 'art-06', contentType: 'guide', canonicalPath: '/travel-guide/choosing-between-van-and-sedan-for-group-travel', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Vehicle Selection Guide for Groups', owner: 'guide' },
  { id: 'art-07', contentType: 'guide', canonicalPath: '/travel-guide/rameshwaram-dhanushkodi-1-day-trip-guide', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Rameshwaram Day Trip Guide', owner: 'guide' },
  { id: 'art-08', contentType: 'guide', canonicalPath: '/travel-guide/south-india-hill-station-packing-checklist', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Hill Station Packing Checklist Guide', owner: 'guide' },
  { id: 'art-09', contentType: 'guide', canonicalPath: '/travel-guide/monsoon-travel-tips-western-ghats', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Western Ghats Monsoon Driving Guide', owner: 'guide' },
  { id: 'art-10', contentType: 'guide', canonicalPath: '/travel-guide/madurai-sightseeing-food-culture-guide', status: 'CONFIRMED', indexable: true, sitemapEligible: true, primaryIntent: 'Madurai Local Sightseeing & Food Guide', owner: 'guide' },
];

/**
 * Accessor Helpers for Canonical Content Registry
 */

export function getCanonicalRecordById(id: string): CanonicalContentRecord | undefined {
  return canonicalRegistry.find((rec) => rec.id === id);
}

export function getCanonicalRecordByPath(path: string): CanonicalContentRecord | undefined {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return canonicalRegistry.find(
    (rec) => rec.canonicalPath === normalizedPath || rec.redirectFrom?.includes(normalizedPath)
  );
}

export function getSitemapEligibleRecords(): CanonicalContentRecord[] {
  return canonicalRegistry.filter((rec) => rec.indexable && rec.sitemapEligible);
}

export function getCanonicalPath(id: string): string | undefined {
  return getCanonicalRecordById(id)?.canonicalPath;
}

export function getTourCanonicalRecords(): CanonicalContentRecord[] {
  return canonicalRegistry.filter((rec) => rec.contentType === 'tour' && rec.indexable && rec.sitemapEligible);
}
