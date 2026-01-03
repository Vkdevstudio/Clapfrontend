
export type UserRole = 'guest' | 'talent' | 'production' | 'vendor' | 'admin';
export type Department = 'Direction' | 'Production' | 'Camera' | 'Art' | 'Sound' | 'Wardrobe' | 'Grip' | 'Electric' | 'Logistics';

// Added OnboardingStep enum for multi-step onboarding process
export enum OnboardingStep {
  OTP_VERIFY = 'OTP_VERIFY',
  BASIC_INFO = 'BASIC_INFO',
  ROLE_SELECTION = 'ROLE_SELECTION',
  ROLE_SPECIFIC = 'ROLE_SPECIFIC',
  REVIEW_CREATE = 'REVIEW_CREATE',
  SUCCESS = 'SUCCESS'
}

// Added ShotStatus for production tracking
export type ShotStatus = 'Pending' | 'Active' | 'Done';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  verified: boolean;
  specialty?: string;
  skills?: string[];
  languages?: string[];
  instruments?: string[];
  talents?: string[];
  experienceLevel?: 'Beginner' | 'Amateur' | 'Pro';
  availabilityStatus?: 'Available' | 'Busy' | 'On Set';
  isProfileComplete?: boolean;
  // Added missing fields for Vendor/Production profiles used in CompleteProfile.tsx
  companyName?: string;
  companyReg?: string;
  officeAddress?: string;
  // Added for TalentDiscovery usage
  rating?: number;
  completedProjects?: number;
}

export interface Audition {
  id: string;
  projectTitle: string;
  postedBy: string;
  roleName: string;
  roleDescription: string;
  payScale: string;
  deadline: string;
  location: string;
  duration: string;
  workType: 'Full-time' | 'Project-based' | 'Daily';
  image: string;
  tags: string[];
  requirements: string[];
  logistics: {
    travelProvided: boolean;
    foodProvided: boolean;
    stayProvided: boolean;
  };
}

export interface Application {
  id: string;
  roleName: string;
  projectTitle: string;
  productionName: string;
  status: 'Applied' | 'Viewed' | 'Shortlisted' | 'Selected' | 'Declined';
  appliedAt: string;
  matchScore?: number;
  timeline: { label: string; date?: string; completed: boolean; current?: boolean }[];
  // Added missing fields for ApplicationDetail.tsx
  projectType?: string;
  directorName?: string;
  methodApproach?: string;
  mediaSubmitted?: MediaAsset[];
}

export interface MediaAsset {
  id: string;
  title: string;
  type: 'Video' | 'Image' | 'Document';
  thumbnail?: string;
  size?: string;
}

// Added Scene interface for production management
export interface Scene {
  id: string;
  number: string;
  title: string;
  location: string;
  setting: string;
  timeOfDay: string;
  pages: string;
  status: 'Shot' | 'Shooting' | 'Pending';
}

// Added Shot interface for production management
export interface Shot {
  id: string;
  sceneId: string;
  number: string;
  description: string;
  lens: string;
  movement: string;
  status: ShotStatus;
  takeCount: number;
}

// Added Take interface for continuity logs
export interface Take {
  id: string;
  shotId: string;
  number: number;
  duration: string;
  status: 'NG' | 'FS' | 'Safety' | 'Good';
  notes: string;
}

// Added Booking interface for financials and logistics
export interface Booking {
  id: string;
  projectName: string;
  vendorName: string;
  clientName: string;
  amount: string;
  date: string;
  status: string;
  paymentStatus: 'Released' | 'Pending';
  duration: string;
}
