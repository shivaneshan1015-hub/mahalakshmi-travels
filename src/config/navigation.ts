/**
 * MAHALAKSHMI TOUR & TRAVEL — NAVIGATION STRUCTURE
 */

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const mainNavItems: NavItem[] = [
  { label: 'Tour Packages', href: '/tours' },
  { label: 'Vehicle Rentals & Services', href: '/vehicles' },
  { label: 'Customised Tours', href: '/customised-tours' },
  { label: 'Travel Guide', href: '/travel-guide' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const secondaryNavItems: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNavSections = [
  {
    title: 'Tour Categories',
    items: [
      { label: 'All 41 Tour Packages', href: '/tours' },
      { label: 'Pilgrimage & Temple Tours', href: '/tours?category=pilgrimage-temple' },
      { label: 'Hill Stations & Nature', href: '/tours?category=hill-stations-nature' },
      { label: 'Coastal & Kerala Backwaters', href: '/tours?category=coastal-backwaters' },
      { label: 'Heritage & City Circuits', href: '/tours?category=heritage-cities' },
      { label: 'Adventure & Theme Parks', href: '/tours?category=adventure-theme-parks' },
    ],
  },
  {
    title: 'Vehicle Rentals & Fleet',
    items: [
      { label: 'All Rental Vehicles in Madurai', href: '/vehicles' },
      { label: '21-Seater AC Van Rental', href: '/vehicles/21-seater-van' },
      { label: 'Sedan Car Rental & Taxi', href: '/vehicles/sedan-car' },
      { label: 'College & IV Van Hire', href: '/travel-services/college-trips' },
      { label: 'Wedding & Function Transport', href: '/travel-services/function-travel' },
      { label: 'Outstation Family Travel', href: '/travel-services/family-travel' },
    ],
  },
  {
    title: 'Company & Care',
    items: [
      { label: 'About Mahalakshmi', href: '/about' },
      { label: 'Origin: Madurai Depot', href: '/about#madurai-origin' },
      { label: 'Contact Travel Desk', href: '/contact' },
    ],
  },
];
