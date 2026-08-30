/**
 * MAHALAKSHMI TOUR & TRAVEL — BUSINESS & SERVICE PILLARS
 */

export const businessPillars = {
  toursAndTravel: {
    title: 'Tours & Journeys',
    description: 'Carefully curated short-format and destination journeys across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.',
    formats: [
      '1 Night / 2 Days Journeys',
      'Weekend Escapes from Madurai',
      'Family Holiday Circuits',
      'Pilgrimage & Heritage Routes',
      'Customised Adaptable Itineraries',
    ],
  },
  vehicleAndTransport: {
    title: 'Vehicle Rental & Driver Services',
    description: 'Premier outstation vehicle rental service with verified, seasoned drivers for families, college industrial visits, corporate events, and wedding functions from Madurai.',
    fleetOverview: {
      van21Seater: {
        name: '21-Seater AC Group Travel Van (Tempo / Mini Bus)',
        availability: 'On-Demand Dispatch with Commercial Permit',
        bestFor: ['College Industrial Visits & Trips', 'Family Functions & Weddings', 'Group Pilgrimages', 'Outstation Excursions'],
      },
      sedanCars: {
        name: 'Sedan Travel Cars (AC Prime Sedan)',
        availability: '24/7 Outstation & City Booking',
        bestFor: ['Family Journeys', 'Outstation Drop & Pickups', 'Couple Tours', 'Airport Transfers'],
      },
    },
  },
  coreServiceUseCases: [
    { slug: 'group-travel', label: 'Group Travel', path: '/travel-services/group-travel' },
    { slug: 'college-trips', label: 'College Trips & IV', path: '/travel-services/college-trips' },
    { slug: 'family-travel', label: 'Family Travel', path: '/travel-services/family-travel' },
    { slug: 'function-travel', label: 'Function & Wedding Travel', path: '/travel-services/function-travel' },
  ],
};
