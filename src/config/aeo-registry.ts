/**
 * MAHALAKSHMI TOURS AND TRAVELS — AEO QUESTION OWNERSHIP REGISTRY
 * Authoritative mapping of customer search questions to their canonical owner pages.
 * Enforces one question -> one canonical owner -> one visible crawlable answer.
 */

export interface AEOQuestionOwnership {
  id: string;
  question: string;
  canonicalPath: string;
  answerType: 'vehicle' | 'tour' | 'service' | 'guide' | 'core' | 'conversion';
  entityType: string;
  entityId: string;
  status: 'CONFIRMED';
  answerText: string;
}

export const aeoQuestionRegistry: AEOQuestionOwnership[] = [
  {
    id: 'aeo-01',
    question: 'What size vehicle is suitable for a group trip from Madurai?',
    canonicalPath: '/vehicles/21-seater-van',
    answerType: 'vehicle',
    entityType: 'vehicle',
    entityId: 'veh-21-seater',
    status: 'CONFIRMED',
    answerText: 'Our 21-seater AC passenger van accommodates 20 passengers plus a driver with pushback seating, rooftop luggage carrier, and rear boot space for outstation group travel from Madurai.',
  },
  {
    id: 'aeo-02',
    question: 'What vehicle is suitable for a small family trip or outstation drop?',
    canonicalPath: '/vehicles/sedan-car',
    answerType: 'vehicle',
    entityType: 'vehicle',
    entityId: 'veh-sedan-car',
    status: 'CONFIRMED',
    answerText: 'Our sedan cars accommodate 4 passengers plus a driver with AC cabin and 400+ litre boot space for small family trips, outstation travel, and Madurai airport transfers.',
  },
  {
    id: 'aeo-03',
    question: 'How do I plan a custom itinerary or book a trip from Madurai?',
    canonicalPath: '/plan-your-journey',
    answerType: 'conversion',
    entityType: 'conversion',
    entityId: 'core-plan-your-journey',
    status: 'CONFIRMED',
    answerText: 'You can plan a custom itinerary using the 6-step Custom Journey Builder on /plan-your-journey or contact our Madurai travel desk by phone (+91 63801 92145) or WhatsApp.',
  },
  {
    id: 'aeo-04',
    question: 'How do I plan a college industrial visit (IV) or department trip from Madurai?',
    canonicalPath: '/travel-services/college-trips',
    answerType: 'service',
    entityType: 'service',
    entityId: 'service-college-trips',
    status: 'CONFIRMED',
    answerText: 'College industrial visits can be planned by selecting your route and student batch count for our 21-seater AC passenger van with pushback seating, luggage storage, and outstation route coordination.',
  },
  {
    id: 'aeo-05',
    question: 'What are the common routes from Madurai to Munnar for driving or van travel?',
    canonicalPath: '/travel-guide/best-routes-madurai-to-munnar',
    answerType: 'guide',
    entityType: 'guide',
    entityId: 'art-01',
    status: 'CONFIRMED',
    answerText: 'The driving route from Madurai to Munnar follows NH 85 via Usilampatti, Theni, Bodinayakanur, and the Bodi Mettu mountain pass, spanning 157 KM with approximately 4.5 to 5 hours driving time.',
  },
  {
    id: 'aeo-06',
    question: 'How can I plan a family holiday to Kodaikanal from Madurai?',
    canonicalPath: '/travel-guide/kodaikanal-family-travel-guide',
    answerType: 'guide',
    entityType: 'guide',
    entityId: 'art-02',
    status: 'CONFIRMED',
    answerText: 'Planning a family trip to Kodaikanal (120 KM from Madurai) involves driving via the Batlagundu ghat road and visiting locations such as Coaker’s Walk, Kodaikanal Lake promenade, and Bryant Park.',
  },
  {
    id: 'aeo-07',
    question: 'How to contact Mahalakshmi Tours and Travels in Madurai?',
    canonicalPath: '/contact',
    answerType: 'core',
    entityType: 'core',
    entityId: 'core-contact',
    status: 'CONFIRMED',
    answerText: 'Contact Mahalakshmi Tours and Travels in Madurai by phone at +91 63801 92145, WhatsApp (+91 63801 92145), or email (mahalakshmitoursandtravels6@gmail.com). Travel desk hours are 9:00 AM to 7:00 PM daily.',
  },
  {
    id: 'aeo-08',
    question: 'What outstation travel services are available for multi-generational families?',
    canonicalPath: '/travel-services/family-travel',
    answerType: 'service',
    entityType: 'service',
    entityId: 'service-family-travel',
    status: 'CONFIRMED',
    answerText: 'Outstation family travel is available using AC sedan cars or 21-seater passenger vans with driver service covering routes across Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, and Telangana.',
  },
  {
    id: 'aeo-09',
    question: 'How do I book wedding guest transportation or marriage hall shuttles in Madurai?',
    canonicalPath: '/travel-services/function-travel',
    answerType: 'service',
    entityType: 'service',
    entityId: 'service-function-travel',
    status: 'CONFIRMED',
    answerText: 'Wedding guest transportation can be arranged using 21-seater AC vans and sedan cars for transfers between Madurai Airport (IXM), Madurai Junction railway station, hotels, and marriage halls.',
  },
  {
    id: 'aeo-10',
    question: 'What is included in a 1-night 2-day Rameshwaram tour package from Madurai?',
    canonicalPath: '/tours/rameshwaram',
    answerType: 'tour',
    entityType: 'tour',
    entityId: 'tour-rameshwaram',
    status: 'CONFIRMED',
    answerText: 'The 1-night 2-day Rameshwaram tour itinerary from Madurai covers the Pamban Sea Bridge crossing, Ramanathaswamy Temple 22 Theerthams, Dhanushkodi Arichal Munai, and return travel to Madurai.',
  },
];

export function getAEOQuestionsForPath(canonicalPath: string): AEOQuestionOwnership[] {
  return aeoQuestionRegistry.filter((record) => record.canonicalPath === canonicalPath);
}

export function getAllAEOQuestions(): AEOQuestionOwnership[] {
  return aeoQuestionRegistry;
}
