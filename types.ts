
export type UserRole = 'guest' | 'talent' | 'production' | 'vendor' | 'admin';
export type Department = 'Direction' | 'Production' | 'Camera' | 'Art' | 'Sound' | 'Wardrobe' | 'Grip' | 'Electric';

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
}

export interface Project {
  id: string;
  title: string;
  type: 'Feature Film' | 'Short Film' | 'Web Series' | 'Commercial';
  status: 'Development' | 'Pre-Production' | 'Production' | 'Post-Production';
  image: string;
  description: string;
  location: string;
  startDate: string;
  currentShootDay: number;
  totalShootDays: number;
  progress: number;
}

export interface Scene {
  id: string;
  projectId: string;
  number: string;
  title: string;
  setting: 'INT' | 'EXT';
  timeOfDay: 'DAY' | 'NIGHT' | 'DUSK' | 'DAWN';
  pages: number; // e.g., 1.5
  status: 'Unscheduled' | 'Scheduled' | 'Shooting' | 'Shot' | 'Omitted';
  location: string;
}

export interface Shot {
  id: string;
  sceneId: string;
  number: string;
  description: string;
  lens: string;
  movement: string;
  status: 'Todo' | 'Active' | 'Done';
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
  acknowledgements: string[]; // User IDs who clicked "Acknowledge"
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  sceneId?: string;
  department: Department;
  assigneeId: string;
  status: 'Todo' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  channel: string; // e.g., '#Direction', '#Set-Alerts'
  isEmergency?: boolean;
}
