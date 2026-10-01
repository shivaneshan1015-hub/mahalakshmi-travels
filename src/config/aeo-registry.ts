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
    answerText: 'Our 21-seater AC passenger van (20+1 pushback seats) is ideal for group trips, family functions, college industrial visits (IV), and outstation pilgrimages from Madurai.',
  },
  {
    id: 'aeo-02',
    question: 'What vehicle is suitable for a small family trip or outstation drop?',
    canonicalPath: '/vehicles/sedan-car',
    answerType: 'vehicle',
    entityType: 'vehicle',
    entityId: 'veh-sedan-car',
    status: 'CONFIRMED',
    answerText: 'AC sedan cars (4 passengers + driver) are best suited for small family vacations, couples, outstation drops, and airport transfers from Madurai.',
  },
  {
    id: 'aeo-03',
    question: 'How do I plan a custom itinerary or book a trip from Madurai?',
    canonicalPath: '/plan-your-journey',
    answerType: 'conversion',
    entityType: 'conversion',
    entityId: 'core-plan-your-journey',
    status: 'CONFIRMED',
    answerText: 'You can design a custom itinerary using our 6-step Custom Journey Builder on /plan-your-journey or contact our Madurai travel desk directly via WhatsApp (+91 63801 92145) or phone call.',
  },
  {
    id: 'aeo-04',
    question: 'How do I plan a college industrial visit (IV) or department trip from Madurai?',
    canonicalPath: '/travel-services/college-trips',
    answerType: 'service',
    entityType: 'service',
    entityId: 'service-college-trips',
    status: 'CONFIRMED',
    answerText: 'College industrial visits can be planned by selecting your route and student count for our 21-seater AC passenger van equipped with pushback seating, luggage bay, and institutional billing support.',
  },
  {
    id: 'aeo-05',
    question: 'What are the common routes from Madurai to Munnar for driving or van travel?',
    canonicalPath: '/travel-guide/best-routes-madurai-to-munnar',
    answerType: 'guide',
    entityType: 'guide',
    entityId: 'art-01',
    status: 'CONFIRMED',
    answerText: 'The primary driving route follows NH 85 via Usilampatti, Theni, Bodinayakanur, and the Bodi Mettu mountain pass (157 KM, approx. 4.5 to 5 hours driving time).',
  },
  {
    id: 'aeo-06',
    question: 'How can I plan a family holiday to Kodaikanal from Madurai?',
    canonicalPath: '/travel-guide/kodaikanal-family-travel-guide',
    answerType: 'guide',
    entityType: 'guide',
    entityId: 'art-02',
    status: 'CONFIRMED',
    answerText: 'Planning a family trip to Kodaikanal (120 KM from Madurai) involves an early morning departure (6:30–7:30 AM), driving via Batlagundu ghat road, and visiting child and senior-friendly spots like Coaker’s Walk, Kodai Lake, and Bryant Park.',
  },
  {
    id: 'aeo-07',
    question: 'How to contact Mahalakshmi Tours and Travels in Madurai?',
    canonicalPath: '/contact',
    answerType: 'core',
    entityType: 'core',
    entityId: 'core-contact',
    status: 'CONFIRMED',
    answerText: 'Reach our Madurai travel desk directly by phone at +91 63801 92145, WhatsApp (+91 63801 92145), or email (mahalakshmitoursandtravels6@gmail.com). Office hours are 9:00 AM to 7:00 PM daily.',
  },
  {
    id: 'aeo-08',
    question: 'What outstation travel services are available for multi-generational families?',
    canonicalPath: '/travel-services/family-travel',
    answerType: 'service',
    entityType: 'service',
    entityId: 'service-family-travel',
    status: 'CONFIRMED',
    answerText: 'We offer unhurried private outstation family travel using AC sedan cars or 21-seater passenger vans with child and senior-friendly rest halts across Tamil Nadu, Kerala, and Karnataka.',
  },
  {
    id: 'aeo-09',
    question: 'How do I book wedding guest transportation or marriage hall shuttles in Madurai?',
    canonicalPath: '/travel-services/function-travel',
    answerType: 'service',
    entityType: 'service',
    entityId: 'service-function-travel',
    status: 'CONFIRMED',
    answerText: 'Wedding guest transportation can be arranged with multi-vehicle shuttles (21-seater AC vans and VIP sedan cars) connecting Madurai Airport, Madurai Junction railway station, hotels, and marriage mandapams.',
  },
  {
    id: 'aeo-10',
    question: 'What is included in a 1-night 2-day Rameshwaram tour package from Madurai?',
    canonicalPath: '/tours/rameshwaram',
    answerType: 'tour',
    entityType: 'tour',
    entityId: 'tour-rameshwaram',
    status: 'CONFIRMED',
    answerText: 'Our 1-night 2-day Rameshwaram tour package includes Madurai departure, Pamban Sea Bridge crossing, Ramanathaswamy Temple 22 Theerthams, Dhanushkodi Land’s End, and dedicated vehicle return.',
  },
];

export function getAEOQuestionsForPath(canonicalPath: string): AEOQuestionOwnership[] {
  return aeoQuestionRegistry.filter((record) => record.canonicalPath === canonicalPath);
}

export function getAllAEOQuestions(): AEOQuestionOwnership[] {
  return aeoQuestionRegistry;
}
