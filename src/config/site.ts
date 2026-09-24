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
    phonePrimary: '+91 63801 92145',
    phoneSecondary: '+91 63801 92145',
    phoneRaw: '916380192145', // For tel: and whatsapp links
    whatsapp: '916380192145',
    email: 'mahalakshmitoursandtravels6@gmail.com',
    googleMapsUrl: 'https://maps.app.goo.gl/EdEh3y8nD3HWSByc6',
    address: {
      doorNo: 'Door No: 3',
      building: 'RK MLA Plaza 28 D',
      street: 'Alanganallur Main Road, Opposite to Sulthan Biriyani, Sikandharsavadi',
      city: 'Madurai',
      state: 'Tamil Nadu',
      pincode: '625018',
      country: 'India',
      fullAddress: 'Door No: 3, RK MLA Plaza 28 D, Alanganallur Main Road, Opposite to Sulthan Biriyani, Sikandharsavadi, Madurai, Tamil Nadu 625018, India',
    },
    geo: {
      latitude: 9.973135,
      longitude: 78.098129,
    },
  },
  operatingSince: 2021,
  businessHours: {
    opens: '09:00',
    closes: '19:00',
    display: '09:00–19:00',
  },
  ownedFleet: [
    { name: '21-Seater Tourist Van', category: '21-seater-van', count: 2, ownership: 'OWNED' },
    { name: 'Sedan Car', category: 'sedan-car', ownership: 'OWNED' },
  ],
  partnerNetwork: 'Additional vehicle requirements coordinated through suitable local vehicle/driver partners.',
  social: {
    instagram: 'https://instagram.com/mahalakshmitravels_madurai',
    facebook: 'https://facebook.com/mahalakshmitravelsmadurai',
  },
  serviceStates: [
    'Tamil Nadu',
    'Kerala',
    'Karnataka',
    'Andhra Pradesh',
    'Telangana',
  ] as const,
};
