/**
 * MAHALAKSHMI TOURS AND TRAVELS — M13 ROUTE MIGRATION REGISTRY
 * Authoritative migration matrix defining canonical route classification,
 * legacy URL redirect mapping, indexability policies, and migration reasons.
 */

export type MigrationAction = 'KEEP' | 'RESTRUCTURE' | 'REDIRECT' | 'REMOVE' | 'CREATE';
export type MigrationIndexability = 'index' | 'noindex';

export interface M13MigrationRecord {
  sourcePath: string;
  action: MigrationAction;
  canonicalPath?: string;
  redirectTarget?: string;
  indexability?: MigrationIndexability;
  reason: string;
}

export const m13MigrationRegistry: M13MigrationRecord[] = [
  // ---------------------------------------------------------------------------
  // CORE & HUB CANONICAL ROUTES (KEEP)
  // ---------------------------------------------------------------------------
  { sourcePath: '/', action: 'KEEP', canonicalPath: '/', indexability: 'index', reason: 'Authoritative home page and South India travel hub' },
  { sourcePath: '/about', action: 'KEEP', canonicalPath: '/about', indexability: 'index', reason: 'Authoritative company background and Madurai origin' },
  { sourcePath: '/contact', action: 'KEEP', canonicalPath: '/contact', indexability: 'index', reason: 'Authoritative contact desk and booking enquiries' },
  { sourcePath: '/tours', action: 'KEEP', canonicalPath: '/tours', indexability: 'index', reason: 'Authoritative tour catalog hub' },
  { sourcePath: '/vehicles', action: 'KEEP', canonicalPath: '/vehicles', indexability: 'index', reason: 'Authoritative vehicle rental fleet catalog hub' },
  { sourcePath: '/travel-services', action: 'KEEP', canonicalPath: '/travel-services', indexability: 'index', reason: 'Authoritative travel services hub' },
  { sourcePath: '/travel-guide', action: 'KEEP', canonicalPath: '/travel-guide', indexability: 'index', reason: 'Authoritative travel guides catalog hub' },
  { sourcePath: '/destinations', action: 'KEEP', canonicalPath: '/destinations', indexability: 'noindex', reason: 'Destination entity knowledge hub (non-indexable entity hub)' },
  { sourcePath: '/plan-your-journey', action: 'KEEP', canonicalPath: '/plan-your-journey', indexability: 'index', reason: 'Authoritative M11 Custom Journey Builder experience' },

  // ---------------------------------------------------------------------------
  // VEHICLE FLEET CANONICAL ROUTES (KEEP)
  // ---------------------------------------------------------------------------
  { sourcePath: '/vehicles/21-seater-van', action: 'KEEP', canonicalPath: '/vehicles/21-seater-van', indexability: 'index', reason: 'Authoritative 21-seater tourist van fleet page' },
  { sourcePath: '/vehicles/sedan-car', action: 'KEEP', canonicalPath: '/vehicles/sedan-car', indexability: 'index', reason: 'Authoritative sedan car fleet page' },

  // ---------------------------------------------------------------------------
  // SPECIALIZED TRAVEL SERVICES CANONICAL ROUTES (KEEP)
  // ---------------------------------------------------------------------------
  { sourcePath: '/travel-services/group-travel', action: 'KEEP', canonicalPath: '/travel-services/group-travel', indexability: 'index', reason: 'Authoritative group travel service page' },
  { sourcePath: '/travel-services/college-trips', action: 'KEEP', canonicalPath: '/travel-services/college-trips', indexability: 'index', reason: 'Authoritative college IV trip service page' },
  { sourcePath: '/travel-services/family-travel', action: 'KEEP', canonicalPath: '/travel-services/family-travel', indexability: 'index', reason: 'Authoritative family travel service page' },
  { sourcePath: '/travel-services/function-travel', action: 'KEEP', canonicalPath: '/travel-services/function-travel', indexability: 'index', reason: 'Authoritative wedding & function transport service page' },

  // ---------------------------------------------------------------------------
  // DESTINATION ENTITY ROUTES (KEEP — NOINDEX)
  // ---------------------------------------------------------------------------
  { sourcePath: '/destinations/madurai', action: 'KEEP', canonicalPath: '/destinations/madurai', indexability: 'noindex', reason: 'Madurai destination entity page' },
  { sourcePath: '/destinations/munnar', action: 'KEEP', canonicalPath: '/destinations/munnar', indexability: 'noindex', reason: 'Munnar destination entity page' },
  { sourcePath: '/destinations/kodaikanal', action: 'KEEP', canonicalPath: '/destinations/kodaikanal', indexability: 'noindex', reason: 'Kodaikanal destination entity page' },
  { sourcePath: '/destinations/rameswaram', action: 'KEEP', canonicalPath: '/destinations/rameswaram', indexability: 'noindex', reason: 'Rameshwaram destination entity page' },
  { sourcePath: '/destinations/thekkady', action: 'KEEP', canonicalPath: '/destinations/thekkady', indexability: 'noindex', reason: 'Thekkady destination entity page' },
  { sourcePath: '/destinations/kanyakumari', action: 'KEEP', canonicalPath: '/destinations/kanyakumari', indexability: 'noindex', reason: 'Kanyakumari destination entity page' },
  { sourcePath: '/destinations/ooty', action: 'KEEP', canonicalPath: '/destinations/ooty', indexability: 'noindex', reason: 'Ooty destination entity page' },
  { sourcePath: '/destinations/bangalore-mysore', action: 'KEEP', canonicalPath: '/destinations/bangalore-mysore', indexability: 'noindex', reason: 'Bangalore Mysore destination entity page' },
  { sourcePath: '/destinations/coorg', action: 'KEEP', canonicalPath: '/destinations/coorg', indexability: 'noindex', reason: 'Coorg destination entity page' },
  { sourcePath: '/destinations/tirupati', action: 'KEEP', canonicalPath: '/destinations/tirupati', indexability: 'noindex', reason: 'Tirupati destination entity page' },

  // ---------------------------------------------------------------------------
  // EXACTLY 39 CANONICAL TOURS (KEEP)
  // ---------------------------------------------------------------------------
  { sourcePath: '/tours/madurai', action: 'KEEP', canonicalPath: '/tours/madurai', indexability: 'index', reason: 'Canonical Madurai Heritage Tour' },
  { sourcePath: '/tours/rameshwaram', action: 'KEEP', canonicalPath: '/tours/rameshwaram', indexability: 'index', reason: 'Canonical Rameshwaram Tour' },
  { sourcePath: '/tours/tiruchendur-and-rameshwaram', action: 'KEEP', canonicalPath: '/tours/tiruchendur-and-rameshwaram', indexability: 'index', reason: 'Canonical Tiruchendur & Rameshwaram Tour' },
  { sourcePath: '/tours/padmanabhaswamy-temple', action: 'KEEP', canonicalPath: '/tours/padmanabhaswamy-temple', indexability: 'index', reason: 'Canonical Padmanabhaswamy Temple Tour' },
  { sourcePath: '/tours/thanjavur', action: 'KEEP', canonicalPath: '/tours/thanjavur', indexability: 'index', reason: 'Canonical Thanjavur Heritage Tour' },
  { sourcePath: '/tours/palani-murugan-temple', action: 'KEEP', canonicalPath: '/tours/palani-murugan-temple', indexability: 'index', reason: 'Canonical Palani Murugan Temple Tour' },
  { sourcePath: '/tours/tirupathi-balaji-temple', action: 'KEEP', canonicalPath: '/tours/tirupathi-balaji-temple', indexability: 'index', reason: 'Canonical Tirupati Balaji Temple Tour' },
  { sourcePath: '/tours/velankanni-shrine', action: 'KEEP', canonicalPath: '/tours/velankanni-shrine', indexability: 'index', reason: 'Canonical Velankanni Shrine Tour' },
  { sourcePath: '/tours/kodaikanal', action: 'KEEP', canonicalPath: '/tours/kodaikanal', indexability: 'index', reason: 'Canonical Kodaikanal Tour' },
  { sourcePath: '/tours/munnar', action: 'KEEP', canonicalPath: '/tours/munnar', indexability: 'index', reason: 'Canonical Munnar Tour' },
  { sourcePath: '/tours/ooty', action: 'KEEP', canonicalPath: '/tours/ooty', indexability: 'index', reason: 'Canonical Ooty Tour' },
  { sourcePath: '/tours/courtallam', action: 'KEEP', canonicalPath: '/tours/courtallam', indexability: 'index', reason: 'Canonical Courtallam Waterfalls Tour' },
  { sourcePath: '/tours/yercaud', action: 'KEEP', canonicalPath: '/tours/yercaud', indexability: 'index', reason: 'Canonical Yercaud Hill Station Tour' },
  { sourcePath: '/tours/thekkady', action: 'KEEP', canonicalPath: '/tours/thekkady', indexability: 'index', reason: 'Canonical Thekkady Wildlife Tour' },
  { sourcePath: '/tours/vagamon', action: 'KEEP', canonicalPath: '/tours/vagamon', indexability: 'index', reason: 'Canonical Vagamon Pine Forest Tour' },
  { sourcePath: '/tours/athirapally', action: 'KEEP', canonicalPath: '/tours/athirapally', indexability: 'index', reason: 'Canonical Athirapally Waterfalls Tour' },
  { sourcePath: '/tours/wayanad', action: 'KEEP', canonicalPath: '/tours/wayanad', indexability: 'index', reason: 'Canonical Wayanad Rainforest Tour' },
  { sourcePath: '/tours/coorg', action: 'KEEP', canonicalPath: '/tours/coorg', indexability: 'index', reason: 'Canonical Coorg Coffee Tour' },
  { sourcePath: '/tours/chikmagalur', action: 'KEEP', canonicalPath: '/tours/chikmagalur', indexability: 'index', reason: 'Canonical Chikmagalur Coffee Tour' },
  { sourcePath: '/tours/kanyakumari', action: 'KEEP', canonicalPath: '/tours/kanyakumari', indexability: 'index', reason: 'Canonical Kanyakumari Tour' },
  { sourcePath: '/tours/alappuzha', action: 'KEEP', canonicalPath: '/tours/alappuzha', indexability: 'index', reason: 'Canonical Alappuzha Backwaters Tour' },
  { sourcePath: '/tours/kochi', action: 'KEEP', canonicalPath: '/tours/kochi', indexability: 'index', reason: 'Canonical Kochi Fort Heritage Tour' },
  { sourcePath: '/tours/varkala', action: 'KEEP', canonicalPath: '/tours/varkala', indexability: 'index', reason: 'Canonical Varkala Cliff Beach Tour' },
  { sourcePath: '/tours/thiruvananthapuram', action: 'KEEP', canonicalPath: '/tours/thiruvananthapuram', indexability: 'index', reason: 'Canonical Thiruvananthapuram City Tour' },
  { sourcePath: '/tours/pondicherry', action: 'KEEP', canonicalPath: '/tours/pondicherry', indexability: 'index', reason: 'Canonical Pondicherry Heritage Tour' },
  { sourcePath: '/tours/gokarna', action: 'KEEP', canonicalPath: '/tours/gokarna', indexability: 'index', reason: 'Canonical Gokarna Temple & Beach Tour' },
  { sourcePath: '/tours/varkala-jatayu-earths-center', action: 'KEEP', canonicalPath: '/tours/varkala-jatayu-earths-center', indexability: 'index', reason: 'Canonical Varkala & Jatayu Center Tour' },
  { sourcePath: '/tours/varkala-and-munroe', action: 'KEEP', canonicalPath: '/tours/varkala-and-munroe', indexability: 'index', reason: 'Canonical Varkala & Munroe Island Tour' },
  { sourcePath: '/tours/mysore', action: 'KEEP', canonicalPath: '/tours/mysore', indexability: 'index', reason: 'Canonical Mysore Palace Heritage Tour' },
  { sourcePath: '/tours/bangalore', action: 'KEEP', canonicalPath: '/tours/bangalore', indexability: 'index', reason: 'Canonical Bangalore Sights Tour' },
  { sourcePath: '/tours/hyderabad', action: 'KEEP', canonicalPath: '/tours/hyderabad', indexability: 'index', reason: 'Canonical Hyderabad Heritage Tour' },
  { sourcePath: '/tours/ramoji-film-city', action: 'KEEP', canonicalPath: '/tours/ramoji-film-city', indexability: 'index', reason: 'Canonical Ramoji Film City Tour' },
  { sourcePath: '/tours/wonderla', action: 'KEEP', canonicalPath: '/tours/wonderla', indexability: 'index', reason: 'Canonical Wonderla Amusement Park Tour' },
  { sourcePath: '/tours/black-thunder', action: 'KEEP', canonicalPath: '/tours/black-thunder', indexability: 'index', reason: 'Canonical Black Thunder Water Park Tour' },
  { sourcePath: '/tours/vagamon-adventure', action: 'KEEP', canonicalPath: '/tours/vagamon-adventure', indexability: 'index', reason: 'Canonical Vagamon Outdoor Adventure Tour' },
  { sourcePath: '/tours/kanthalloor-adventure', action: 'KEEP', canonicalPath: '/tours/kanthalloor-adventure', indexability: 'index', reason: 'Canonical Kanthalloor Offbeat Orchards Tour' },
  { sourcePath: '/tours/munnar-trekking', action: 'KEEP', canonicalPath: '/tours/munnar-trekking', indexability: 'index', reason: 'Canonical Munnar High Altitude Trekking Tour' },
  { sourcePath: '/tours/mysore-adventure', action: 'KEEP', canonicalPath: '/tours/mysore-adventure', indexability: 'index', reason: 'Canonical Mysore Region Outdoor Adventure Tour' },
  { sourcePath: '/tours/kanakapura-adventure', action: 'KEEP', canonicalPath: '/tours/kanakapura-adventure', indexability: 'index', reason: 'Canonical Kanakapura Nature Adventure Camp Tour' },

  // ---------------------------------------------------------------------------
  // 10 TRAVEL GUIDE ARTICLES (KEEP)
  // ---------------------------------------------------------------------------
  { sourcePath: '/travel-guide/best-routes-madurai-to-munnar', action: 'KEEP', canonicalPath: '/travel-guide/best-routes-madurai-to-munnar', indexability: 'index', reason: 'Canonical Madurai to Munnar Route Guide' },
  { sourcePath: '/travel-guide/kodaikanal-family-travel-guide', action: 'KEEP', canonicalPath: '/travel-guide/kodaikanal-family-travel-guide', indexability: 'index', reason: 'Canonical Kodaikanal Family Vacation Guide' },
  { sourcePath: '/travel-guide/madurai-to-munnar-1-night-2-days-itinerary', action: 'KEEP', canonicalPath: '/travel-guide/madurai-to-munnar-1-night-2-days-itinerary', indexability: 'index', reason: 'Canonical Munnar 2-Day Itinerary Guide' },
  { sourcePath: '/travel-guide/how-to-plan-college-industrial-visit-trip', action: 'KEEP', canonicalPath: '/travel-guide/how-to-plan-college-industrial-visit-trip', indexability: 'index', reason: 'Canonical College Industrial Visit Planning Guide' },
  { sourcePath: '/travel-guide/weekend-getaways-from-madurai', action: 'KEEP', canonicalPath: '/travel-guide/weekend-getaways-from-madurai', indexability: 'index', reason: 'Canonical Weekend Getaways from Madurai Guide' },
  { sourcePath: '/travel-guide/rameswaram-dhanushkodi-day-trip-guide', action: 'KEEP', canonicalPath: '/travel-guide/rameswaram-dhanushkodi-day-trip-guide', indexability: 'index', reason: 'Canonical Rameshwaram & Dhanushkodi Day Trip Guide' },
  { sourcePath: '/travel-guide/madurai-to-kodaikanal-one-day-trip-plan', action: 'KEEP', canonicalPath: '/travel-guide/madurai-to-kodaikanal-one-day-trip-plan', indexability: 'index', reason: 'Canonical Kodaikanal 1-Day Trip Plan Guide' },
  { sourcePath: '/travel-guide/madurai-to-tiruchendur-rameshwaram-temple-tour-guide', action: 'KEEP', canonicalPath: '/travel-guide/madurai-to-tiruchendur-rameshwaram-temple-tour-guide', indexability: 'index', reason: 'Canonical Coastal Temple Tour Guide' },
  { sourcePath: '/travel-guide/madurai-airport-ixm-outstation-cab-travel-guide', action: 'KEEP', canonicalPath: '/travel-guide/madurai-airport-ixm-outstation-cab-travel-guide', indexability: 'index', reason: 'Canonical Madurai Airport Outstation Travel Guide' },
  { sourcePath: '/travel-guide/wedding-guest-transportation-madurai-marriage-halls', action: 'KEEP', canonicalPath: '/travel-guide/wedding-guest-transportation-madurai-marriage-halls', indexability: 'index', reason: 'Canonical Wedding Guest Transportation Guide' },

  // ---------------------------------------------------------------------------
  // ALL 14 M13 PERMANENT REDIRECTS (REDIRECT)
  // ---------------------------------------------------------------------------
  { sourcePath: '/customised-tours', action: 'REDIRECT', redirectTarget: '/plan-your-journey', reason: 'Legacy custom tour path redirected to canonical Custom Journey Builder' },
  { sourcePath: '/group-travel', action: 'REDIRECT', redirectTarget: '/travel-services/group-travel', reason: 'Legacy group travel path redirected to canonical service path' },
  { sourcePath: '/college-trips', action: 'REDIRECT', redirectTarget: '/travel-services/college-trips', reason: 'Legacy college trips path redirected to canonical service path' },
  { sourcePath: '/family-travel', action: 'REDIRECT', redirectTarget: '/travel-services/family-travel', reason: 'Legacy family travel path redirected to canonical service path' },
  { sourcePath: '/function-travel', action: 'REDIRECT', redirectTarget: '/travel-services/function-travel', reason: 'Legacy function travel path redirected to canonical service path' },
  { sourcePath: '/tours/madurai-meenakshi-amman-temple', action: 'REDIRECT', redirectTarget: '/tours/madurai', reason: 'Legacy tour slug redirected to canonical Madurai tour' },
  { sourcePath: '/tours/thanjavur-big-temple', action: 'REDIRECT', redirectTarget: '/tours/thanjavur', reason: 'Legacy tour slug redirected to canonical Thanjavur tour' },
  { sourcePath: '/travel-guide/college-industrial-visit-planning-guide', action: 'REDIRECT', redirectTarget: '/travel-guide/how-to-plan-college-industrial-visit-trip', reason: 'Legacy article slug redirected to canonical guide' },
  { sourcePath: '/travel-guide/temple-tour-etiquette-and-darshan-tips', action: 'REDIRECT', redirectTarget: '/travel-guide/weekend-getaways-from-madurai', reason: 'Legacy article slug redirected to canonical guide' },
  { sourcePath: '/travel-guide/choosing-between-van-and-sedan-for-group-travel', action: 'REDIRECT', redirectTarget: '/travel-guide/rameswaram-dhanushkodi-day-trip-guide', reason: 'Legacy article slug redirected to canonical guide' },
  { sourcePath: '/travel-guide/rameshwaram-dhanushkodi-1-day-trip-guide', action: 'REDIRECT', redirectTarget: '/travel-guide/madurai-to-kodaikanal-one-day-trip-plan', reason: 'Legacy article slug redirected to canonical guide' },
  { sourcePath: '/travel-guide/south-india-hill-station-packing-checklist', action: 'REDIRECT', redirectTarget: '/travel-guide/madurai-to-tiruchendur-rameshwaram-temple-tour-guide', reason: 'Legacy article slug redirected to canonical guide' },
  { sourcePath: '/travel-guide/monsoon-travel-tips-western-ghats', action: 'REDIRECT', redirectTarget: '/travel-guide/madurai-airport-ixm-outstation-cab-travel-guide', reason: 'Legacy article slug redirected to canonical guide' },
  { sourcePath: '/travel-guide/madurai-sightseeing-food-culture-guide', action: 'REDIRECT', redirectTarget: '/travel-guide/wedding-guest-transportation-madurai-marriage-halls', reason: 'Legacy article slug redirected to canonical guide' },
];

/**
 * Accessor Helpers for M13 Migration Registry
 */
export function getMigrationRecordBySource(sourcePath: string): M13MigrationRecord | undefined {
  const normalized = sourcePath.startsWith('/') ? sourcePath : `/${sourcePath}`;
  return m13MigrationRegistry.find((r) => r.sourcePath === normalized);
}

export function getAllRedirectRecords(): M13MigrationRecord[] {
  return m13MigrationRegistry.filter((r) => r.action === 'REDIRECT');
}

export function getAllKeepRecords(): M13MigrationRecord[] {
  return m13MigrationRegistry.filter((r) => r.action === 'KEEP');
}
