
export type UserRole = 'guest' | 'talent' | 'production' | 'vendor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  verified: boolean;
  bio?: string;
  skills?: string[];
  location?: string;
  languages?: string[];
  rating?: number;
  completedProjects?: number;
  specialty?: string;
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
  progress?: number;
  activeScene?: string;
  crewCount?: number;
  aiInsights?: string[];
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'suggestion' | 'update';
  content: string;
  timestamp: string;
}

export interface CallSheet {
  id: string;
  projectId: string;
  date: string;
  callTime: string;
  location: string;
  scenes: string[];
  status: 'Draft' | 'Published' | 'Acknowledged';
}

export interface Scene {
  id: string;
  projectId: string;
  number: string;
  title: string;
  status: 'Draft' | 'Ready' | 'Shot' | 'Editing';
  location: string;
}

export interface ServiceItem {
  id: string;
  vendorId: string;
  name: string;
  category: 'Equipment' | 'Location' | 'Props' | 'VFX' | 'Post-Production';
  price: string;
  unit: 'Day' | 'Project' | 'Hour';
  image: string;
  description: string;
  availability: 'Available' | 'Booked' | 'Maintenance';
}

export interface Booking {
  id: string;
  serviceId: string;
  projectId: string;
  projectName: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  date: string;
  vendorName?: string;
}

export interface Audition {
  id: string;
  projectId: string;
  projectTitle: string;
  roleName: string;
  roleDescription: string;
  deadline: string;
  payScale?: string;
  tags?: string[];
  image?: string;
}

export interface Application {
  id: string;
  auditionId: string;
  projectTitle: string;
  roleName: string;
  status: 'Applied' | 'Shortlisted' | 'Auditioning' | 'Accepted' | 'Rejected';
  appliedAt: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  type: 'Video' | 'Image' | 'Document';
  url: string;
  thumbnail?: string;
  size?: string;
  category?: 'Script' | 'Storyboard' | 'Reel' | 'Reference';
}

export interface Task {
  id: string;
  title: string;
  scene?: string;
  status: 'Todo' | 'In Progress' | 'Completed';
  assignee: string;
  priority: 'Low' | 'Medium' | 'High';
  dueTime?: string;
}

export interface Message {
  id: string;
  sender: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  channel?: string;
}
