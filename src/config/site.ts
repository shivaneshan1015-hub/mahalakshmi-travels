/**
 * MAHALAKSHMI TOUR & TRAVEL — SITE CONFIGURATION
 */

export const siteConfig = {
  name: 'Mahalakshmi Tours and Travels',
  shortName: 'Mahalakshmi Tours and Travels',
  tagline: 'THE JOURNEY STARTS HERE.',
  supportingLine: 'Your Journey. Our Care.',
  description: 'Curated South India tour packages, temple pilgrimages, hill station holidays, and trusted group transportation originating from Madurai.',
  originCity: 'Madurai',
  originState: 'Tamil Nadu',
  originCountry: 'India',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mahalakshmitravels.com',
  ogImage: '/brand/og-cover.jpg',
  contact: {
    phonePrimary: '+91 98421 23456',
    phoneSecondary: '+91 98421 65432',
    phoneRaw: '919842123456', // For tel: and whatsapp links
    whatsapp: '919842123456',
    email: 'contact@mahalakshmitravels.com',
    address: {
      street: 'Perumal Kovil Street, Simmakkal',
      city: 'Madurai',
      state: 'Tamil Nadu',
      pincode: '625001',
      country: 'India',
    },
    geo: {
      latitude: 9.9252,
      longitude: 78.1198,
    },
  },
  social: {
    instagram: 'https://instagram.com/mahalakshmitravels_madurai',
    facebook: 'https://facebook.com/mahalakshmitravelsmadurai',
  },
  serviceStates: [
    'Tamil Nadu',
    'Kerala',
    'Karnataka',
    'Andhra Pradesh',
  ] as const,
};
