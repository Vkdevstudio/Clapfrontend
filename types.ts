
export type UserRole = 'guest' | 'talent' | 'production' | 'vendor' | 'admin';
export type Department = 'Direction' | 'Production' | 'Camera' | 'Art' | 'Sound' | 'Wardrobe' | 'Grip' | 'Electric' | 'Logistics';
export type ProjectStatus = 'Development' | 'Pre-Production' | 'Production' | 'Post-Production' | 'Released';
export type TaskStatus = 'Todo' | 'In Progress' | 'Blocked' | 'Completed';
export type SceneStatus = 'Unscheduled' | 'Scheduled' | 'Shooting' | 'Shot' | 'Omitted';
export type ShotStatus = 'Todo' | 'Active' | 'Done';

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
  clapScore?: number; // Private reliability score
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
  currency?: string;
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

export interface DaySummary {
  projectId: string;
  day: number;
  scenesCompleted: string[];
  shotsCompleted: number;
  totalTakes: number;
  delays: string[];
  wrapTime: string;
}

export interface CallSheet {
  id: string;
  projectId: string;
  shootDay: number;
  date: string;
  crewCall: string;
  location: string;
  weather: string;
  status: 'Draft' | 'Published';
  acknowledgments: Record<string, { timestamp: string, status: 'Confirmed' | 'Delayed', reason?: string }>;
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  channel: string;
  isEmergency?: boolean;
}

export interface Audition {
  id: string;
  projectId: string;
  roleName: string;
  projectTitle: string;
  payScale: string;
  roleDescription: string;
  tags: string[];
  deadline: string;
  image: string;
  requirements?: string[];
}

export interface Application {
  id: string;
  roleName: string;
  projectTitle: string;
  appliedAt: string;
  status: 'Applied' | 'Shortlisted' | 'Rejected';
}

export interface MediaAsset {
  id: string;
  title: string;
  type: 'Video' | 'Image' | 'PDF' | 'Audio';
  thumbnail?: string;
  size: string;
  uploadedBy: string;
  sceneContext?: string; // Mandated scene scope
  shotContext?: string;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assigneeId?: string;
  dueDate?: string;
}
