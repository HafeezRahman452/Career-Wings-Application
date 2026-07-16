export interface University {
  id: string;
  name: string;
  location: string;
  ranking: number;
  featuredCourse: string;
  tuitionFee: string; // e.g. "$15,000 - $35,000 / year"
  scholarshipAvailable: string; // e.g. "Up to 50%"
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  bgImage: string;
  flagImage: string;
  benefits: string[];
  averageCostOfLiving: string;
  ieltsRequirement: string;
  popularUniversities: University[];
}

export interface Course {
  id: string;
  name: string;
  level: "Undergraduate" | "Postgraduate" | "Doctorate" | "Diploma";
  duration: string;
  subjectArea: string;
  country: string;
  university: string;
  estimatedFee: number; // yearly in USD
  scholarshipOffer: string;
}

export interface Story {
  id: string;
  name: string;
  destination: string;
  durationString: string;
  quote: string;
  detailedExperience: string;
  photoPosition: string; // object-position style parameter
}

export interface CounsellingFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  startDate: string;
  mode: string; // "Virtual", "In-Person Office", "Call"
  funding: string; // "Self-Funded", "Family Support", "Bank Loan", "Scholarship Seeking"
  agreeTerms: boolean;
  contactConsent: boolean;
  marketingConsent: boolean;
}
