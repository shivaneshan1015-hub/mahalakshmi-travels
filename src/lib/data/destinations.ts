/**
 * MAHALAKSHMI TOUR & TRAVEL — DESTINATIONS DATA REPOSITORY & DAL
 * Curated South India destinations with verified photography, facts, and route connections.
 */

import { Destination } from '@/types/destination';

export const destinationsRepository: Destination[] = [
  {
    id: 'dest-madurai',
    name: 'Madurai',
    slug: 'madurai',
    state: 'Tamil Nadu',
    distanceFromMaduraiKm: 0,
    travelTimeFromMadurai: 'Origin Depot',
    shortDescription: 'The ancient temple city of Meenakshi Amman and operational headquarters of Mahalakshmi Tours.',
    description: 'Madurai is the cultural soul of Tamil Nadu, centered around the magnificent Meenakshi Sundareswarar Temple with its 14 towering sculpted gopurams, Thirumalai Nayakkar Mahal, and vibrant local cuisine.',
    heroImage: {
      url: '/images/destinations/madurai.png',
      alt: 'Madurai Meenakshi Amman Temple illuminated gopuram and lotus pond',
    },
    gallery: [
      { url: '/images/destinations/madurai.png', alt: 'Meenakshi Temple' },
    ],
    bestTimeToVisit: 'October to March',
    climateSummary: 'Warm tropical weather with breezy pleasant winter evenings.',
    popularPlaces: [
      { name: 'Meenakshi Amman Temple', description: 'Historic 2500-year-old temple complex with iconic gopurams and Hall of 1000 Pillars.' },
      { name: 'Thirumalai Nayakkar Mahal', description: '17th-century palace showcasing Indo-Saracenic architectural grandeur and evening light shows.' },
      { name: 'Gandhi Memorial Museum', description: 'Historic palace museum preserving India’s freedom struggle relics.' },
      { name: 'Alagar Kovil', description: 'Scenic hillside Vishnu temple situated in the Alagar hills.' },
    ],
    geo: {
      latitude: 9.9252,
      longitude: 78.1198,
    },
    relatedTours: ['tour-madurai', 'tour-munnar', 'tour-kodaikanal'],
    relatedArticles: ['art-01'],
    seo: {
      title: 'Madurai Travel Guide & Origin Tours | Mahalakshmi Tours and Travels',
      description: 'Explore Madurai Meenakshi Temple, Thirumalai Nayakar Mahal, and South India tour packages departing from Madurai.',
    },
  },
  {
    id: 'dest-munnar',
    name: 'Munnar',
    slug: 'munnar',
    state: 'Kerala',
    distanceFromMaduraiKm: 157,
    travelTimeFromMadurai: '4.5 Hours',
    shortDescription: 'Mist-clad hills, sprawling emerald tea estates, and cool mountain air in the Western Ghats.',
    description: 'Situated at the confluence of three mountain streams in Kerala’s Idukki district, Munnar is a premier hill station easily accessible from Madurai through the scenic Bodi Mettu ghat pass.',
    heroImage: {
      url: '/images/destinations/munnar.png',
      alt: 'Misty emerald tea plantations in Munnar, Kerala',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop', alt: 'Tea slopes of Munnar' },
    ],
    bestTimeToVisit: 'September to March',
    climateSummary: 'Pleasant summer temperatures (15°C–25°C) and brisk winters (10°C–18°C).',
    popularPlaces: [
      { name: 'Mattupetty Dam', description: 'Scenic storage reservoir flanked by rolling tea hills.' },
      { name: 'Echo Point', description: 'Natural acoustics phenomenon surrounded by lush greenery.' },
      { name: 'KDHP Tea Museum', description: 'Historic tea processing and tasting heritage center.' },
      { name: 'Eravikulam National Park', description: 'Home to the endangered Nilgiri Tahr and wild blooms.' },
    ],
    geo: {
      latitude: 10.0889,
      longitude: 77.0595,
    },
    relatedTours: ['tour-munnar'],
    relatedArticles: ['art-01', 'art-03'],
    seo: {
      title: 'Munnar Destination Guide from Madurai | Mahalakshmi Tours and Travels',
      description: 'Discover Munnar from Madurai. Distance, travel time, tea gardens, Mattupetty dam, and tailored vehicle options.',
    },
  },
  {
    id: 'dest-kodaikanal',
    name: 'Kodaikanal',
    slug: 'kodaikanal',
    state: 'Tamil Nadu',
    distanceFromMaduraiKm: 120,
    travelTimeFromMadurai: '3.5 Hours',
    shortDescription: 'The Princess of Hill Stations nestled in the Palani Hills with star-shaped lakes and pine forests.',
    description: 'Perched at 2,133 meters above sea level, Kodaikanal is the closest premier hill retreat from Madurai, offering refreshing weather, scenic lake boating, and tranquil forested walks.',
    heroImage: {
      url: '/images/destinations/kodaikanal.png',
      alt: 'Scenic misty lake and valleys of Kodaikanal',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop', alt: 'Pine forests in Kodaikanal' },
    ],
    bestTimeToVisit: 'Throughout the year, especially October to May',
    climateSummary: 'Cool mountain climate with refreshing misty mornings.',
    popularPlaces: [
      { name: 'Kodai Lake', description: 'Man-made star lake ideal for peaceful boating and cycling.' },
      { name: 'Coaker’s Walk', description: 'Paved pedestrian path offering panoramic valley vistas.' },
      { name: 'Pillar Rocks', description: 'Three massive granite boulders towering over mist-filled ravines.' },
      { name: 'Bryant Park', description: 'Manicured flower gardens and walking paths.' },
    ],
    geo: {
      latitude: 10.2381,
      longitude: 77.4892,
    },
    relatedTours: ['tour-kodaikanal'],
    relatedArticles: ['art-02'],
    seo: {
      title: 'Kodaikanal Travel from Madurai | Mahalakshmi Tours and Travels',
      description: 'Complete guide to travelling from Madurai to Kodaikanal. Route details, vehicle services, and weekend trip plans.',
    },
  },
  {
    id: 'dest-rameswaram',
    name: 'Rameswaram',
    slug: 'rameswaram',
    state: 'Tamil Nadu',
    distanceFromMaduraiKm: 172,
    travelTimeFromMadurai: '3.5 Hours',
    shortDescription: 'Island city connected by the historic Pamban Bridge, home to ancient coastal temples and Dhanushkodi.',
    description: 'An iconic pilgrimage and coastal journey from Madurai, crossing the Gulf of Mannar waters across the Pamban Sea Bridge into sacred island shores and the ghost town of Dhanushkodi.',
    heroImage: {
      url: '/images/destinations/rameswaram.png',
      alt: 'Iconic Pamban Sea Bridge crossing to Rameswaram',
    },
    gallery: [],
    bestTimeToVisit: 'October to April',
    climateSummary: 'Warm coastal breezes and pleasant winter sunshine.',
    popularPlaces: [
      { name: 'Ramanathaswamy Temple', description: 'Grand Dravidian temple famous for its 1,200-meter pillared corridors and 22 theerthams.' },
      { name: 'Pamban Sea Bridge', description: 'Iconic cantilever railway and road bridge crossing open ocean waters.' },
      { name: 'Dhanushkodi Land’s End', description: 'Stunning coastal road where the Indian Ocean meets the Bay of Bengal.' },
    ],
    geo: {
      latitude: 9.2876,
      longitude: 79.3129,
    },
    relatedTours: ['tour-rameshwaram'],
    relatedArticles: ['art-06'],
    seo: {
      title: 'Rameswaram & Dhanushkodi from Madurai | Mahalakshmi Tours and Travels',
      description: 'Plan your Madurai to Rameswaram road trip. Pamban bridge crossing, temple timings, and group van transport options.',
    },
  },
  {
    id: 'dest-thekkady',
    name: 'Thekkady',
    slug: 'thekkady',
    state: 'Kerala',
    distanceFromMaduraiKm: 140,
    travelTimeFromMadurai: '4.0 Hours',
    shortDescription: 'Spice plantations, Ayurvedic gardens, and boat safaris on Periyar Lake surrounded by evergreen forests.',
    description: 'Located in the Cardamom Hills near the Tamil Nadu–Kerala border at Kumily, Thekkady offers tranquil wildlife boat safaris, spice plantation walks, and cool mountain air.',
    heroImage: {
      url: '/images/destinations/thekkady.png',
      alt: 'Periyar Lake wildlife sanctuary and evergreen forest in Thekkady',
    },
    gallery: [],
    bestTimeToVisit: 'September to April',
    climateSummary: 'Pleasant tropical highland weather with cool evenings (15°C–24°C).',
    popularPlaces: [
      { name: 'Periyar National Park', description: 'Lake boat safari for spotting wild elephants, bison, and exotic birds.' },
      { name: 'Spice Plantations', description: 'Guided walking tours through cardamom, pepper, and cinnamon gardens.' },
      { name: 'Kadathanadan Kalari Centre', description: 'Traditional Kerala martial arts and Kathakali cultural performances.' },
    ],
    geo: {
      latitude: 9.6031,
      longitude: 77.1615,
    },
    relatedTours: ['tour-thekkady', 'tour-munnar'],
    relatedArticles: ['art-05'],
    seo: {
      title: 'Thekkady & Periyar Tour from Madurai | Mahalakshmi Tours and Travels',
      description: 'Explore Thekkady wildlife and spice plantations from Madurai. Distance, driving route via Kumily, and vehicle rental options.',
    },
  },
  {
    id: 'dest-kanyakumari',
    name: 'Kanyakumari',
    slug: 'kanyakumari',
    state: 'Tamil Nadu',
    distanceFromMaduraiKm: 242,
    travelTimeFromMadurai: '4.5 Hours',
    shortDescription: 'The southernmost tip of the Indian subcontinent where three oceans meet with glorious sunrises.',
    description: 'The confluence of the Bay of Bengal, Arabian Sea, and Indian Ocean, Kanyakumari is famous for the offshore Vivekananda Rock Memorial, Thiruvalluvar Statue, and multi-colored beach sands.',
    heroImage: {
      url: '/images/destinations/kanyakumari.png',
      alt: 'Vivekananda Rock Memorial and ocean confluence at Kanyakumari',
    },
    gallery: [],
    bestTimeToVisit: 'October to March',
    climateSummary: 'Warm coastal climate with breezy sea winds.',
    popularPlaces: [
      { name: 'Vivekananda Rock Memorial', description: 'Sacred island rock monument reached by ferry in the open sea.' },
      { name: 'Thiruvalluvar Statue', description: '133-foot stone sculpture honoring the celebrated Tamil poet.' },
      { name: 'Sunset View Point', description: 'Panoramic coastal overlook for simultaneous sunset and moonrise views.' },
    ],
    geo: {
      latitude: 8.0883,
      longitude: 77.5385,
    },
    relatedTours: ['tour-kanyakumari'],
    relatedArticles: ['art-05'],
    seo: {
      title: 'Kanyakumari Tour from Madurai | Mahalakshmi Tours and Travels',
      description: 'Complete road trip from Madurai to Kanyakumari. 242 km 4-lane highway route, ocean memorial ferry, and family transport.',
    },
  },
  {
    id: 'dest-ooty',
    name: 'Ooty & Nilgiris',
    slug: 'ooty',
    state: 'Tamil Nadu',
    distanceFromMaduraiKm: 280,
    travelTimeFromMadurai: '6.5 Hours',
    shortDescription: 'Ascend the Nilgiri blue mountains via Mettupalayam ghats for botanical gardens and tea hills.',
    description: 'The Queen of Hill Stations, Ooty sits at 2,240 meters amidst rolling tea gardens, pine forests, Doddabetta Peak, and heritage mountain railways.',
    heroImage: {
      url: '/images/destinations/ooty.png',
      alt: 'Scenic rolling green tea estates and blue hills of Ooty, Nilgiris',
    },
    gallery: [],
    bestTimeToVisit: 'September to May',
    climateSummary: 'Crisp mountain climate, often dipping below 10°C in winter.',
    popularPlaces: [
      { name: 'Government Botanical Gardens', description: '55-acre sprawling terraced garden with rare exotic flora.' },
      { name: 'Ooty Lake & Boat House', description: 'Picturesque eucalyptus-fringed lake for recreational boating.' },
      { name: 'Doddabetta Peak', description: 'Highest viewpoint in the Nilgiris offering vistas across three states.' },
      { name: 'Coonoor Tea Estates', description: 'Sim’s Park and Lamb’s Rock tea plantation overlooks.' },
    ],
    geo: {
      latitude: 11.4102,
      longitude: 76.6950,
    },
    relatedTours: ['tour-ooty'],
    relatedArticles: ['art-04'],
    seo: {
      title: 'Ooty & Nilgiris Tour from Madurai | Mahalakshmi Tours and Travels',
      description: 'Travel from Madurai to Ooty and Coonoor. 280 km mountain route details, 21-seater van hire, and family holiday circuits.',
    },
  },
  {
    id: 'dest-bangalore-mysore',
    name: 'Bengaluru / Mysore',
    slug: 'bangalore-mysore',
    state: 'Karnataka',
    distanceFromMaduraiKm: 435,
    travelTimeFromMadurai: '7.5 Hours',
    shortDescription: 'The grand royal palaces of Mysore connecting into Bengaluru for institutional and group travel.',
    description: 'A major South India circuit combining the opulent heritage of Mysore Palace and Chamundi Hills with Bengaluru’s educational campuses and tech corridors.',
    heroImage: {
      url: '/images/destinations/bangalore-mysore.png',
      alt: 'Grand illuminated Mysore Maharaja Palace in Karnataka',
    },
    gallery: [],
    bestTimeToVisit: 'October to March',
    climateSummary: 'Moderate plateau climate year-round.',
    popularPlaces: [
      { name: 'Mysore Maharaja Palace', description: 'Magnificent Indo-Saracenic royal palace with world-famous illumination.' },
      { name: 'Chamundi Hills Temple', description: 'Ancient hilltop temple overlooking Mysore city.' },
      { name: 'Brindavan Gardens', description: 'Terraced ornamental gardens and musical dancing fountains.' },
    ],
    geo: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    relatedTours: ['tour-bangalore', 'tour-mysore'],
    relatedArticles: ['art-04'],
    seo: {
      title: 'Madurai to Bengaluru & Mysore Travel | Mahalakshmi Tours and Travels',
      description: 'Outstation van hire and group travel from Madurai to Mysore and Bengaluru. Route details and 21-seater passenger options.',
    },
  },
  {
    id: 'dest-coorg',
    name: 'Coorg (Kodagu)',
    slug: 'coorg',
    state: 'Karnataka',
    distanceFromMaduraiKm: 410,
    travelTimeFromMadurai: '8.0 Hours',
    shortDescription: 'Coffee plantations, Abbey Falls, and misty Western Ghats trails in the Scotland of India.',
    description: 'Famed for its sprawling coffee and cardamom estates, forested peaks, and rich Kodava culture, Coorg is one of the most serene mountain retreats in South India.',
    heroImage: {
      url: '/images/destinations/coorg.png',
      alt: 'Lush coffee plantation hills and waterfalls in Coorg, Karnataka',
    },
    gallery: [],
    bestTimeToVisit: 'October to April',
    climateSummary: 'Cool, misty highland climate with lush post-monsoon greens.',
    popularPlaces: [
      { name: 'Abbey Falls', description: 'Roaring waterfall cascading amidst coffee estates and spice groves.' },
      { name: 'Raja’s Seat', description: 'Scenic garden overlook offering panoramic sunset views across the valleys.' },
      { name: 'Dubare Elephant Camp', description: 'Riverside sanctuary on the banks of River Cauvery.' },
    ],
    geo: {
      latitude: 12.3375,
      longitude: 75.8069,
    },
    relatedTours: ['tour-coorg'],
    relatedArticles: ['art-05'],
    seo: {
      title: 'Madurai to Coorg Tour & Vehicle Hire | Mahalakshmi Tours and Travels',
      description: 'Travel from Madurai to Coorg. Scenic Western Ghats route, coffee estate tours, and group travel options.',
    },
  },
  {
    id: 'dest-tirupati',
    name: 'Tirupati & Tirumala',
    slug: 'tirupati',
    state: 'Andhra Pradesh',
    distanceFromMaduraiKm: 480,
    travelTimeFromMadurai: '8.5 Hours',
    shortDescription: 'Dedicated 21-seater group van and family car charters for the sacred Sri Venkateswara Swamy pilgrimage.',
    description: 'The sacred abode of Lord Venkateswara nestled atop the Seven Hills of Seshachalam in Andhra Pradesh. Mahalakshmi provides door-to-door group transportation and highway coordination from Madurai.',
    heroImage: {
      url: '/images/destinations/tirupati.png',
      alt: 'Sacred Tirumala temple hills and grand architectural gateway',
    },
    gallery: [],
    bestTimeToVisit: 'September to March',
    climateSummary: 'Warm tropical climate with pleasant winter hill breezes.',
    popularPlaces: [
      { name: 'Sri Venkateswara Swamy Temple', description: 'World-renowned holy pilgrimage shrine atop Tirumala hills.' },
      { name: 'Silathoranam', description: 'Rare natural rock arch of geological and mythological significance.' },
      { name: 'Kapila Theertham', description: 'Sacred temple and mountain waterfall at the foot of Tirumala hills.' },
    ],
    geo: {
      latitude: 13.6288,
      longitude: 79.4192,
    },
    relatedTours: ['tour-tirupathi-balaji-temple'],
    relatedArticles: ['art-05'],
    seo: {
      title: 'Madurai to Tirupati Pilgrimage Transport | Mahalakshmi Tours and Travels',
      description: 'Dedicated 21-seater van hire and family sedan charters from Madurai to Tirupati and Tirumala. Route guidance and highway timing.',
    },
  },
];

// Data Access Queries
export function getAllDestinations(): Destination[] {
  return destinationsRepository;
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinationsRepository.find((d) => d.slug === slug);
}

export function getDestinationsByState(state: string): Destination[] {
  return destinationsRepository.filter((d) => d.state.toLowerCase() === state.toLowerCase());
}
