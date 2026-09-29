/**
 * MAHALAKSHMI TOURS AND TRAVELS — AEO QUESTION OWNERSHIP REGISTRY
 * Authoritative mapping of customer search questions to their canonical owner pages.
 * Enforces one question -> one canonical owner.
 */

export interface AEOQuestionOwnership {
  id: string;
  question: string;
  canonicalPath: string;
  answerType: 'vehicle' | 'tour' | 'service' | 'guide' | 'core' | 'conversion';
  entityType: string;
  entityId: string;
  status: 'CONFIRMED';
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
  },
  {
    id: 'aeo-02',
    question: 'What vehicle is suitable for a small family trip or outstation drop?',
    canonicalPath: '/vehicles/sedan-car',
    answerType: 'vehicle',
    entityType: 'vehicle',
    entityId: 'veh-sedan-car',
    status: 'CONFIRMED',
  },
  {
    id: 'aeo-03',
    question: 'How do I plan a custom itinerary or book a trip from Madurai?',
    canonicalPath: '/plan-your-journey',
    answerType: 'conversion',
    entityType: 'conversion',
    entityId: 'core-plan-your-journey',
    status: 'CONFIRMED',
  },
  {
    id: 'aeo-04',
    question: 'How do I plan a college industrial visit (IV) or department trip from Madurai?',
    canonicalPath: '/travel-services/college-trips',
    answerType: 'service',
    entityType: 'service',
    entityId: 'service-college-trips',
    status: 'CONFIRMED',
  },
  {
    id: 'aeo-05',
    question: 'What are the best routes from Madurai to Munnar for driving or van travel?',
    canonicalPath: '/travel-guide/best-routes-madurai-to-munnar',
    answerType: 'guide',
    entityType: 'guide',
    entityId: 'art-01',
    status: 'CONFIRMED',
  },
  {
    id: 'aeo-06',
    question: 'How can I plan a family holiday to Kodaikanal from Madurai?',
    canonicalPath: '/travel-guide/kodaikanal-family-travel-guide',
    answerType: 'guide',
    entityType: 'guide',
    entityId: 'art-02',
    status: 'CONFIRMED',
  },
  {
    id: 'aeo-07',
    question: 'How to contact Mahalakshmi Tours and Travels in Madurai?',
    canonicalPath: '/contact',
    answerType: 'core',
    entityType: 'core',
    entityId: 'core-contact',
    status: 'CONFIRMED',
  },
  {
    id: 'aeo-08',
    question: 'What outstation travel services are available for multi-generational families?',
    canonicalPath: '/travel-services/family-travel',
    answerType: 'service',
    entityType: 'service',
    entityId: 'service-family-travel',
    status: 'CONFIRMED',
  },
  {
    id: 'aeo-09',
    question: 'How do I book wedding guest transportation or marriage hall shuttles in Madurai?',
    canonicalPath: '/travel-services/function-travel',
    answerType: 'service',
    entityType: 'service',
    entityId: 'service-function-travel',
    status: 'CONFIRMED',
  },
  {
    id: 'aeo-10',
    question: 'What is included in a 1-night 2-day Rameshwaram tour package from Madurai?',
    canonicalPath: '/tours/rameshwaram',
    answerType: 'tour',
    entityType: 'tour',
    entityId: 'tour-rameshwaram',
    status: 'CONFIRMED',
  },
];

export function getAEOQuestionsForPath(canonicalPath: string): AEOQuestionOwnership[] {
  return aeoQuestionRegistry.filter((record) => record.canonicalPath === canonicalPath);
}

export function getAllAEOQuestions(): AEOQuestionOwnership[] {
  return aeoQuestionRegistry;
}
