/**
 * MAHALAKSHMI TOURS AND TRAVELS — VEHICLES & RENTAL DATA REPOSITORY & DAL
 */

import { Vehicle } from '@/types/vehicle';

export const vehiclesRepository: Vehicle[] = [
  {
    id: 'veh-21-seater',
    name: '21-Seater AC Group Travel Van (Tempo / Mini Coach)',
    slug: '21-seater-van',
    category: '21-seater-van',
    seatingCapacity: 21,
    luggageCapacityText: 'Dedicated top carrier + deep rear boot for 21 passenger bags',
    tagline: 'PREMIER OUTSTATION GROUP VAN RENTAL FROM MADURAI.',
    rentalHeading: '21-Seater AC Van Rental in Madurai with Driver',
    description: 'Hire our premium 21-seater passenger van in Madurai for family holidays, college industrial visits (IV), wedding guest transportation, corporate team outings, and South India temple pilgrimage circuits. Equipped with 20+1 pushback seats, individual AC vents, audio system, and experienced local drivers.',
    availabilityBadge: 'Available with Driver',
    features: [
      { iconName: 'Users', title: '20+1 Pushback Reclining Seats', description: 'Ergonomic 2x1 high-back seating layout with armrests and generous legroom for long-distance highway travel.' },
      { iconName: 'Wind', title: 'High-Power Dual Air Conditioning', description: 'Evenly distributed roof AC louvers ensuring rapid cooling across all rows in hot weather.' },
      { iconName: 'ShieldCheck', title: 'Experienced Highway & Hill Drivers', description: 'Professional drivers with extensive experience traversing Kodaikanal, Munnar, Ooty, and Valparai routes.' },
      { iconName: 'Luggage', title: 'Massive Luggage Capacity', description: 'Heavy-duty rooftop carrier with protective cover plus deep under-chassis boot space for group luggage.' },
    ],
    specifications: [
      { label: 'Seating Configuration', value: '20 Passenger Pushback Seats + 1 Driver Seat' },
      { label: 'Air Conditioning', value: 'Powerful Dual AC with Individual Overhead Vents' },
      { label: 'Entertainment & Audio', value: 'Bluetooth & USB Integrated PA Music System' },
      { label: 'Charging Points', value: 'Multi-device mobile USB charging points' },
      { label: 'Fleet Status', value: 'Core Owned Fleet (2 Units Available)' },
      { label: 'Booking Availability', value: 'Outstation & City Dispatch by Schedule' },
      { label: 'Origin Depot', value: 'Madurai Central Depot, Tamil Nadu' },
    ],
    idealFor: ['college', 'group', 'family', 'function', 'corporate'],
    serviceAreas: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'],
    popularRoutes: [
      { route: 'Madurai to Kodaikanal Outstation', distance: '120 KM (3.5 Hrs)', drivingTime: '3.5 Hours', fitNote: 'Ideal for 15–20 family members or student batches ascending Palani Ghats' },
      { route: 'Madurai to Munnar Hill Trip', distance: '157 KM (4.5 Hrs)', drivingTime: '4.5 Hours', fitNote: 'Smooth climbing via Bodi Mettu pass with experienced mountain drivers' },
      { route: 'Madurai to Rameshwaram & Dhanushkodi', distance: '172 KM (3.5 Hrs)', drivingTime: '3.5 Hours', fitNote: 'Spacious coastal day/night tour crossing the historic Pamban Sea Bridge' },
      { route: 'Madurai to Kanyakumari Highway', distance: '242 KM (4.5 Hrs)', drivingTime: '4.5 Hours', fitNote: 'Comfortable highway cruising for joint family temple and sunrise excursions' },
      { route: 'Madurai to Tirupati Balaji Pilgrimage', distance: '480 KM (8.5 Hrs)', drivingTime: '8.5 Hours', fitNote: 'Dedicated group darshan travel with night halt flexibility and luggage comfort' },
    ],
    faqs: [
      {
        question: 'How do I book a 21-seater van in Madurai with Mahalakshmi Tours and Travels?',
        answer: 'You can book directly via WhatsApp (+91 63801 92145) or phone call. Share your travel dates, passenger count, pickup point in Madurai, and itinerary. We will provide a quick, tailored journey quote with vehicle confirmation.',
      },
      {
        question: 'What is the booking model for outstation 21-seater van hire?',
        answer: 'Our outstation rentals are calculated based on transparent journey requirements according to your itinerary and duration. Contact our Madurai travel desk for a current quote.',
      },
      {
        question: 'Is the 21-seater van suitable for college IV trips and student groups?',
        answer: 'Yes, our 21-seater van is popular for college department industrial visits (IV) departing from Madurai. It offers music system, secure luggage carriers, and dedicated drivers committed to route safety.',
      },
      {
        question: 'Can the 21-seater van travel across Tamil Nadu, Kerala, and Karnataka?',
        answer: 'Yes. Our vehicles and experienced drivers operate across Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, and Telangana.',
      },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
        alt: '21 Seater Van Rental in Madurai - Outstation Tourist Van Hire',
        caption: 'Luxury 21-seater AC passenger van for outstation group tours and family travel from Madurai',
      },
    ],
    seo: {
      title: '21 Seater Van Rental in Madurai | Tempo Traveller & Mini Bus Hire',
      description: 'Hire premium 21-seater AC van in Madurai for outstation family trips, college IV, wedding transportation, and temple pilgrimages.',
      keywords: [
        '21 seater van rental madurai',
        'tempo traveller rental madurai',
        'tourist van hire madurai',
        '21 seater bus hire madurai',
        'outstation van rental madurai',
        'college trip van madurai',
        'wedding van hire madurai',
        'madurai to kodaikanal van hire',
        'madurai to munnar 21 seater van',
      ],
      canonicalUrl: 'https://mahalakshmitravels.com/vehicles/21-seater-van',
    },
  },
  {
    id: 'veh-sedan-car',
    name: 'Sedan Travel Cars (AC Prime Sedan / Dzire / Etios)',
    slug: 'sedan-car',
    category: 'sedan-car',
    seatingCapacity: 4,
    luggageCapacityText: 'Spacious 400+ Litre boot accommodating 3–4 standard suitcases',
    tagline: 'QUIET COMFORT & OUTSTATION CAB SERVICE FROM MADURAI.',
    rentalHeading: 'Sedan Car Rental in Madurai for Outstation & Local Taxi',
    description: 'Book well-maintained private AC sedan cars in Madurai for small family vacations, temple darshans, Madurai airport (IXM) pickups, and outstation weekend hill escapes. Travel with courteous local drivers with deep knowledge of South Indian roads.',
    availabilityBadge: 'Express Booking Available',
    features: [
      { iconName: 'Users', title: '4 Passenger Comfort', description: 'Clean, cushioned seating with ample legroom for couples and families of 3–4 members.' },
      { iconName: 'Wind', title: 'Effective Climate Control', description: 'Powerful all-weather air conditioning ensuring relaxing long-distance journeys.' },
      { iconName: 'Navigation', title: 'Courteous Local Madurai Drivers', description: 'Courteous drivers who know clean highway stops, viewpoints, and temples.' },
      { iconName: 'Sparkles', title: 'Spotless Sanitization', description: 'Thoroughly vacuumed, washed, and safety-inspected before departure.' },
    ],
    specifications: [
      { label: 'Seating Capacity', value: '4 Passengers + 1 Driver' },
      { label: 'Boot / Luggage Space', value: '400+ Litres (3-4 Large Bags + Handbags)' },
      { label: 'Air Conditioning', value: 'Full Cabin AC' },
      { label: 'Driver Standard', value: 'Experienced Local Driver, Non-Smoking' },
      { label: 'Fleet Status', value: 'Core Owned Fleet' },
      { label: 'Booking Availability', value: 'Outstation & City Dispatch by Schedule' },
      { label: 'Service Coverage', value: 'Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana' },
      { label: 'Origin Depot', value: 'Madurai, Tamil Nadu' },
    ],
    idealFor: ['family', 'couple', 'corporate'],
    serviceAreas: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana'],
    popularRoutes: [
      { route: 'Madurai to Kodaikanal Private Cab', distance: '120 KM (3.5 Hrs)', drivingTime: '3.5 Hours', fitNote: 'Smooth, peaceful ride for couples or small families heading to Kodai hills' },
      { route: 'Madurai to Rameshwaram Day / Overnight Trip', distance: '172 KM (3.5 Hrs)', drivingTime: '3.5 Hours', fitNote: 'Door-to-door temple darshan with Dhanushkodi sightseeing' },
      { route: 'Madurai to Munnar Tea Gardens', distance: '157 KM (4.5 Hrs)', drivingTime: '4.5 Hours', fitNote: 'Private couple/family holiday cab with scenic photo stops' },
      { route: 'Madurai Airport (IXM) & Local City Sightseeing', distance: 'Custom Package', drivingTime: 'Flexible', fitNote: 'Punctual airport transfers and Meenakshi Amman temple city tours' },
    ],
    faqs: [
      {
        question: 'Can I rent a sedan car for outstation trips from Madurai?',
        answer: 'Yes. Our private AC sedans are available for one-way drops, round trips, and multi-day outstation itineraries across Tamil Nadu, Kerala, and beyond.',
      },
      {
        question: 'How is outstation sedan taxi fare calculated?',
        answer: 'Fares are based on transparent journey quotes for your specific itinerary. Contact our Madurai travel desk for an all-inclusive quote.',
      },
      {
        question: 'Do you provide airport pickup and drops for Madurai Airport (IXM)?',
        answer: 'Yes. We track your flight timings and ensure timely pickup from Madurai Airport with clean sedan cars and polite drivers.',
      },
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
        alt: 'Sedan Car Rental in Madurai - Outstation Taxi Booking',
        caption: 'Comfortable private AC sedan cars for family tours, temple visits, and outstation trips from Madurai',
      },
    ],
    seo: {
      title: 'Sedan Car Rental in Madurai | Outstation Cab & Airport Taxi Service',
      description: 'Book private AC sedan car rentals in Madurai for outstation family trips, temple darshans, and airport drops.',
      keywords: [
        'sedan car rental madurai',
        'outstation cab madurai',
        'car hire madurai with driver',
        'madurai airport taxi',
        'swift dzire rental madurai',
        'madurai to kodaikanal taxi',
        'madurai to rameshwaram cab',
        'family car rental madurai',
      ],
      canonicalUrl: 'https://mahalakshmitravels.com/vehicles/sedan-car',
    },
  },
];

// Data Access Queries
export function getAllVehicles(): Vehicle[] {
  return vehiclesRepository;
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehiclesRepository.find((v) => v.slug === slug || v.id === slug);
}
