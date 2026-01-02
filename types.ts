
export type UserRole = 'guest' | 'talent' | 'production' | 'vendor' | 'admin';
export type Department = 'Direction' | 'Production' | 'Camera' | 'Art' | 'Sound' | 'Wardrobe' | 'Grip' | 'Electric' | 'Logistics';
export type ProjectStatus = 'Development' | 'Pre-Production' | 'Production' | 'Post-Production' | 'Released';
export type TaskStatus = 'Todo' | 'In Progress' | 'Blocked' | 'Completed';
export type SceneStatus = 'Unscheduled' | 'Scheduled' | 'Shooting' | 'Shot' | 'Omitted';
export type ShotStatus = 'Todo' | 'Active' | 'Done';

export type OnboardingStep = "BASIC_DETAILS" | "ROLE_SELECTION" | "ONBOARD_TALENT" | "ONBOARD_PRODUCTION" | "ONBOARD_VENDOR" | "REVIEW";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: Department;
  avatar?: string;
  verified: boolean;
  specialty?: string;
  rating?: number;
  completedProjects?: number;
  skills?: string[];
  clapScore?: number;
  location?: string;
}

export interface ContinuityNote {
  id: string;
  shotId: string;
  takeNumber: number;
  status: 'Circle' | 'NG' | 'FS' | 'Safety';
  notes: string;
  lensInfo?: string;
  timestamp: string;
}

export interface Take {
  id: string;
  shotId: string;
  number: number;
  duration: string;
  status: 'Circle' | 'NG' | 'FS' | 'Safety';
  notes?: string;
}

export interface Message {
  id: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isEmergency?: boolean;
  channelType: 'general' | 'department' | 'alert';
}

export interface ScriptLine {
  id: string;
  type: 'slugline' | 'action' | 'character' | 'dialogue' | 'parenthetical';
  content: string;
  metadata?: {
    tags?: string[];
    genieInsight?: string;
  };
}

export interface Service {
  id: string;
  vendorId: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  description: string;
  image: string;
  availability: 'Available' | 'Booked' | 'Maintenance';
  specs?: string[];
}

export interface Booking {
  id: string;
  serviceId: string;
  projectId: string;
  projectName: string;
  vendorName: string;
  status: 'Pending' | 'Confirmed' | 'Dispatched' | 'Fulfilled' | 'Cancelled';
  date: string;
  duration: string;
  amount: string;
  clientName: string;
  paymentStatus: 'Awaiting Escrow' | 'In Escrow' | 'Released';
}

export interface Project {
  id: string;
  title: string;
  type: 'Feature Film' | 'Short Film' | 'Web Series' | 'Commercial';
  status: ProjectStatus;
  image: string;
  description: string;
  location: string;
  startDate: string;
  currentShootDay: number;
  totalShootDays: number;
  progress: number;
  budget?: string;
  spent?: string;
  currency?: string;
}

export interface CallSheet {
  id: string;
  projectId: string;
  shootDay: number;
  crewCall: string;
  location: string;
  weather: string;
  sunrise?: string;
  sunset?: string;
}

export interface Scene {
  id: string;
  projectId: string;
  number: string;
  title: string;
  setting: 'INT' | 'EXT';
  timeOfDay: 'DAY' | 'NIGHT' | 'DUSK' | 'DAWN';
  pages: number;
  status: SceneStatus;
  location: string;
  castIds: string[];
}

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

export interface Audition {
  id: string;
  projectTitle: string;
  roleName: string;
  roleDescription: string;
  payScale: string;
  deadline: string;
  image: string;
  tags: string[];
  requirements?: string[];
}

export interface Application {
  id: string;
  roleName: string;
  projectTitle: string;
  status: 'Applied' | 'Shortlisted' | 'Rejected';
  appliedAt: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  type: 'Video' | 'Image' | 'Document';
  thumbnail?: string;
  size?: string;
}
