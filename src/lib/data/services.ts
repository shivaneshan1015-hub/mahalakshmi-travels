/**
 * MAHALAKSHMI TOUR & TRAVEL — TRAVEL SERVICES DATA REPOSITORY
 * Core Service Offerings & Use Cases from Madurai.
 */

import { TravelService } from '@/types/service';

export const mockTravelServices: TravelService[] = [
  {
    id: 'service-group-travel',
    slug: 'group-travel',
    title: 'Group Travel & Transportation',
    serviceType: 'group-travel',
    shortDescription: 'Dedicated 21-seater AC passenger van and coordinated travel arrangements for associations, pilgrimage batches, and large family groups.',
    description: 'When traveling as a group, keeping everyone in a single spacious vehicle transforms the entire journey. Our flagship 21-seater (20+1) AC passenger van is based in Madurai and operated by seasoned drivers who understand outstation highways, temple corridors, and mountain routes across South India.',
    idealFor: ['group', 'family', 'corporate'],
    vehicleOptions: ['21-seater-van'],
    benefits: [
      {
        title: 'Everyone Travels Together',
        description: 'Single high-roof 21-seater van keeps your group unified without splitting into multiple smaller taxis.',
      },
      {
        title: 'Ample Luggage Capacity',
        description: 'Dedicated rear storage bay easily accommodates bags and supplies for multi-day outstation circuits.',
      },
      {
        title: 'Experienced Interstate Drivers',
        description: 'Drivers familiar with ghat roads, hill permits, and highway routes across Tamil Nadu, Kerala, Karnataka, and AP.',
      },
      {
        title: 'Custom Pickups & Halts',
        description: 'Direct door-to-door departure from your Madurai address with flexible breakfast and refreshment stops.',
      },
    ],
    typicalRoutes: [
      'Madurai to Munnar (157 KM - Western Ghats)',
      'Madurai to Rameswaram & Dhanushkodi (172 KM - Coastal Circuit)',
      'Madurai to Kodaikanal (120 KM - Palani Hills)',
      'Madurai to Tirupati Pilgrimage Circuit (480 KM)',
    ],
    faqs: [
      {
        question: 'What is the seating capacity of your group van?',
        answer: 'Our flagship van features 20 comfortable pushback passenger seats plus 1 dedicated driver seat (20+1 capacity) with full-cabin dual air conditioning.',
      },
      {
        question: 'Do you cover interstate travel to Kerala and Andhra Pradesh?',
        answer: 'Yes. All our vehicles are licensed with valid commercial permits, comprehensive insurance, and interstate paperwork for Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.',
      },
      {
        question: 'How do we book or check availability for our dates?',
        answer: 'You can check availability directly via WhatsApp or phone. Tell us your travel dates, passenger count, and destination, and our Madurai desk will confirm.',
      },
    ],
    heroImage: {
      url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
      alt: '21 Seater Group Travel Passenger Van in Madurai',
      width: 1200,
      height: 800,
    },
    relatedVehicles: ['21-seater-van'],
    relatedTours: ['madurai-to-munnar', 'madurai-to-rameswaram', 'madurai-to-kodaikanal'],
    seo: {
      title: 'Group Travel & 21-Seater Van Hire in Madurai | Mahalakshmi Tours and Travels',
      description: 'Spacious 21-seater AC van hire in Madurai for group tours, pilgrimage batches, and family excursions across South India. Experienced local drivers.',
      keywords: ['group travel madurai', '21 seater van hire madurai', 'tempo traveller madurai', 'group tour south india'],
      canonicalUrl: 'https://mahalakshmitravels.com/travel-services/group-travel',
    },
  },
  {
    id: 'service-college-trips',
    slug: 'college-trips',
    title: 'College Trips & Industrial Visits',
    serviceType: 'college-trips',
    shortDescription: 'Reliable, well-maintained 21-seater group transportation for student industrial visits, department tours, and hill station excursions.',
    description: 'Planning a department tour or educational industrial visit requires dependable transportation, route discipline, and trusted drivers. Mahalakshmi provides well-maintained 21-seater AC group vans with dedicated luggage space for student batches departing from Madurai colleges and institutions.',
    idealFor: ['college', 'group'],
    vehicleOptions: ['21-seater-van'],
    benefits: [
      {
        title: '20+1 Passenger Capacity',
        description: 'Comfortably seats entire department batches and faculty coordinators in one unified vehicle.',
      },
      {
        title: 'Safety-First Road Pacing',
        description: 'Seasoned drivers trained in highway discipline and daylight hill ascent guidelines.',
      },
      {
        title: 'Flexible Outstation Routing',
        description: 'Direct connections to Bangalore tech parks, Kochi ports, Coimbatore industries, and Nilgiri hill routes.',
      },
      {
        title: 'Institution Invoice Coordination',
        description: 'Transparent trip documentation and fuel/toll billing for department reimbursement.',
      },
    ],
    typicalRoutes: [
      'Madurai to Kodaikanal (120 KM - Student Weekend)',
      'Madurai to Munnar (157 KM - Hill Expedition)',
      'Madurai to Ooty & Nilgiris (280 KM - Extended Trip)',
      'Madurai to Bangalore / Mysore (435 KM - Industrial Visit)',
    ],
    faqs: [
      {
        question: 'Can we customize the stops and industrial visit timings?',
        answer: 'Yes. College itineraries are fully customizable. Your faculty coordinators can schedule specific company visit timings, campus halts, and rest stops.',
      },
      {
        question: 'Is there space for student luggage on multi-day trips?',
        answer: 'Yes. Our 21-seater van features a dedicated deep rear luggage compartment plus internal roof racks for backpacks.',
      },
    ],
    heroImage: {
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
      alt: 'College students group trip and industrial visit travel',
      width: 1200,
      height: 800,
    },
    relatedVehicles: ['21-seater-van'],
    relatedTours: ['madurai-to-kodaikanal', 'madurai-to-munnar', 'madurai-to-ooty'],
    seo: {
      title: 'College Trips & IV Van Hire in Madurai | Mahalakshmi Tours and Travels',
      description: 'Dedicated 21-seater AC van hire for college industrial visits (IV) and department tours from Madurai. Experienced drivers and flexible routing.',
      keywords: ['college trip van madurai', 'industrial visit transport madurai', 'student tour bus madurai'],
      canonicalUrl: 'https://mahalakshmitravels.com/travel-services/college-trips',
    },
  },
  {
    id: 'service-family-travel',
    slug: 'family-travel',
    title: 'Family Travel & Holiday Transport',
    serviceType: 'family-travel',
    shortDescription: 'Comfortable, private travel for small families and multi-generational groups with unhurried pacing, polite drivers, and custom halts.',
    description: 'Traveling with children and senior citizens requires patience, clean vehicles, and unhurried rest stops. Whether you need a private sedan for a quiet family getaway or our 21-seater van for an extended family reunion, Mahalakshmi coordinates every mile with local Madurai care.',
    idealFor: ['family', 'couple'],
    vehicleOptions: ['sedan-car', '21-seater-van'],
    benefits: [
      {
        title: 'Multi-Generational Pacing',
        description: 'Unhurried schedules accommodating senior citizens and young children with frequent tea and restroom halts.',
      },
      {
        title: 'Choice of Sedan or Van',
        description: 'Sedan cars for 1-4 passengers or the 21-seater van for extended joint family gatherings.',
      },
      {
        title: 'Polite, Local Madurai Drivers',
        description: 'Courteous drivers who know clean highway restaurants, scenic viewpoints, and safe hill routes.',
      },
      {
        title: 'Door-to-Door Convenience',
        description: 'Direct pickup from your doorstep in Madurai and return drop at the end of the journey.',
      },
    ],
    typicalRoutes: [
      'Madurai to Kodaikanal (120 KM - Family Hill Retreat)',
      'Madurai to Munnar (157 KM - Tea Country)',
      'Madurai to Rameswaram (172 KM - Coastal Darshan)',
      'Madurai to Kanyakumari (242 KM - Triple Sea Sunset)',
    ],
    faqs: [
      {
        question: 'Which vehicle suits a family of 4 vs a family of 10?',
        answer: 'For 1 to 4 passengers, our private sedan cars offer quiet, smooth comfort. For groups of 5 to 20, our 21-seater van provides generous space and legroom.',
      },
      {
        question: 'Can we stop for food and sightseeing whenever needed?',
        answer: 'Absolutely. Unlike rigid bus tours, your private vehicle stops at your preferred pace for meals, temple visits, and photo points.',
      },
    ],
    heroImage: {
      url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop',
      alt: 'Family traveling together on South India holiday',
      width: 1200,
      height: 800,
    },
    relatedVehicles: ['sedan-car', '21-seater-van'],
    relatedTours: ['madurai-to-kodaikanal', 'madurai-to-munnar', 'madurai-to-rameswaram'],
    seo: {
      title: 'Family Travel & Car Hire in Madurai | Mahalakshmi Tours and Travels',
      description: 'Private car and van hire in Madurai for family vacations across Tamil Nadu and Kerala. Safe drivers, clean vehicles, and unhurried family pacing.',
      keywords: ['family travel madurai', 'car rental for family madurai', 'madurai outstation car hire'],
      canonicalUrl: 'https://mahalakshmitravels.com/travel-services/family-travel',
    },
  },
  {
    id: 'service-function-travel',
    slug: 'function-travel',
    title: 'Wedding & Function Transportation',
    serviceType: 'function-travel',
    shortDescription: 'Coordinated guest transportation, airport/station pickups, and venue transfers for weddings, family functions, and temple events.',
    description: 'Managing guest movement for weddings, temple ceremonies, and family gatherings in Madurai requires punctuality and dedicated vehicles. Mahalakshmi provides airport shuttles, railway station pickups, and venue transfers using our 21-seater passenger van and private sedan cars.',
    idealFor: ['function', 'family', 'group'],
    vehicleOptions: ['21-seater-van', 'sedan-car'],
    benefits: [
      {
        title: 'Punctual Guest Transfers',
        description: 'Reliable shuttles between Madurai Airport (IXM), Madurai Junction railway station, and wedding halls.',
      },
      {
        title: 'Group Capacity in One Trip',
        description: 'Our 21-seater van moves up to 20 guests per trip, minimizing logistics coordination.',
      },
      {
        title: 'VIP Sedan Transfers',
        description: 'Private sedan cars for bride/groom family and key wedding guests.',
      },
      {
        title: 'Local Madurai Road Mastery',
        description: 'Drivers familiar with Madurai mandapams, Meenakshi Temple corridors, and outstation venue routes.',
      },
    ],
    typicalRoutes: [
      'Madurai Airport & Railway Station Guest Shuttles',
      'Madurai City to Outstation Wedding Venues (Theni, Dindigul, Sivakasi)',
      'Family Temple Function Day Trips (Thiruparankundram, Alagar Kovil, Palani)',
    ],
    faqs: [
      {
        question: 'Can you handle multiple pickup points across Madurai?',
        answer: 'Yes. We can coordinate multi-point pickups from hotels, residences, and transit hubs across Madurai according to your function schedule.',
      },
      {
        question: 'Can we hire both the 21-seater van and sedan cars together?',
        answer: 'Yes. Combining our 21-seater van for guest groups with sedan cars for key family members is a popular and cost-effective arrangement.',
      },
    ],
    heroImage: {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
      alt: 'Wedding function guest transportation and event travel',
      width: 1200,
      height: 800,
    },
    relatedVehicles: ['21-seater-van', 'sedan-car'],
    relatedTours: ['madurai-to-rameswaram'],
    seo: {
      title: 'Wedding & Function Van Hire in Madurai | Mahalakshmi Tours and Travels',
      description: 'Punctual guest transportation and van hire for weddings, temple functions, and family events in Madurai. 21-seater AC van and private sedans.',
      keywords: ['wedding van hire madurai', 'function transport madurai', 'guest airport pickup madurai'],
      canonicalUrl: 'https://mahalakshmitravels.com/travel-services/function-travel',
    },
  },
];

export function getAllTravelServices(): TravelService[] {
  return mockTravelServices;
}

export function getTravelServiceBySlug(slug: string): TravelService | undefined {
  return mockTravelServices.find((s) => s.slug === slug);
}
