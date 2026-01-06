
export type UserRole = 'guest' | 'talent' | 'production' | 'vendor' | 'admin';
export type Department = string; // Changed from fixed union to string for dynamic creation

export interface ProjectDepartment {
  id: string;
  name: string;
  isCustom: boolean;
  active: boolean;
  leadId?: string;
}

export type Capability = 'VIEW' | 'COMMENT' | 'UPLOAD' | 'ASSIGN' | 'APPROVE' | 'OVERRIDE';

export type ProjectStatus = 'Active' | 'Archived';
export type TaskStatus = 'Pending' | 'In Progress' | 'Blocked' | 'Completed' | 'Approved';
export type TaskType = 'Project' | 'Scene' | 'Department';
export type LocationType = 'Studio' | 'Outdoor' | 'Set';

export type ScriptElementType = 'slugline' | 'action' | 'character' | 'parenthetical' | 'dialogue' | 'transition' | 'note';

export enum OnboardingStep {
  OTP_VERIFY = 'OTP_VERIFY',
  BASIC_INFO = 'BASIC_INFO',
  ROLE_SELECTION = 'ROLE_SELECTION',
  ROLE_SPECIFIC = 'ROLE_SPECIFIC',
  REVIEW_CREATE = 'REVIEW_CREATE',
  SUCCESS = 'SUCCESS'
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  status: 'Ready' | 'In Field' | 'Maintenance';
  healthScore: number;
  lastService: string;
  pricePerDay: string;
  image: string;
  specifications: string[];
}

export interface LocationProfile {
  id: string;
  name: string;
  type: LocationType;
  notes?: string;
  constraints?: string[];
  address?: string;
}

export interface Unit {
  id: string;
  name: string;
  projectId: string;
}

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  status: TaskStatus;
  assigneeId?: string;
  assignedDept?: Department;
  sceneId?: string;
  blockedBy?: string[]; 
  dueDate?: string;
}

export interface ScriptLine {
  id: string;
  type: ScriptElementType;
  content: string;
  isModified?: boolean;
}

export interface ScriptVersion {
  id: string;
  version: string;
  date: string;
  changeLog: string;
  isLocked: boolean;
  impactedSceneIds?: string[];
  content?: ScriptLine[];
}

export interface CallSheet {
  id: string;
  date: string;
  unitId: string;
  locationId: string;
  sceneIds: string[];
  callTime: string;
  deptNotes?: Record<string, string>;
  status: 'Draft' | 'Published';
  crewAcknowledgements: Record<string, { status: 'Confirmed' | 'Pending' | 'Delayed'; reason?: string; name?: string; role?: string }>;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  currentShootDay: number;
  totalShootDays: number;
  startDate: string;
  location: string;
  type: 'Film' | 'Episode' | 'Advertisement' | 'Series';
  image: string;
  units: Unit[];
  budgetedAmounts?: Record<string, number>;
  activeDepartments?: ProjectDepartment[]; // New field
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  verified: boolean;
  specialty?: string;
  skills?: string[];
  capabilities: Capability[];
  assignedUnits: string[]; 
  assignedDepts: Department[];
  isProfileComplete?: boolean;
  isHired?: boolean;
  hiredRole?: string;
  activeProjectId?: string;
  languages?: string[];
  instruments?: string[];
  talents?: string[];
  experienceLevel?: 'Beginner' | 'Amateur' | 'Pro';
  availabilityStatus?: 'Available' | 'Busy' | 'On Set';
  companyName?: string;
  companyReg?: string;
  officeAddress?: string;
  assignedScenes?: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'success' | 'info' | 'critical';
  timestamp: string;
  isRead: boolean;
  actionPath?: string;
}

export interface Scene {
  id: string;
  number: string;
  title: string;
  locationId: string;
  setting: 'INT' | 'EXT';
  timeOfDay: 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK';
  pages: string;
  status: 'Pending' | 'Shooting' | 'Shot';
  unitId: string;
  unit?: string;
}

export interface Shot {
  id: string;
  sceneId: string;
  number: string;
  description: string;
  lens: string;
  movement: string;
  status: 'Pending' | 'Done';
  takeCount: number;
}

export interface Take {
  id: string;
  shotId: string;
  number: number;
  duration: string;
  notes: string;
  status: 'NG' | 'Circle' | 'FS' | 'Safety';
}

export interface Audition {
  id: string;
  roleName: string;
  projectTitle: string;
  image: string;
  location: string;
  deadline: string;
  payScale: string;
  roleDescription: string;
  requirements: string[];
  tags: string[];
  workType: string;
  duration: string;
  productionInfo?: {
    name: string;
    avatar: string;
    bio: string;
    rating: number;
    isTrending: boolean;
    pastProjects: string[];
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
  applicantName: string;
  applicantAvatar: string;
  timeline: { label: string; date?: string; completed: boolean; current?: boolean }[];
  methodApproach?: string;
  mediaSubmitted?: { id: string; title: string; type: string; thumbnail: string; size: string; scope: string }[];
  directorName?: string;
}

export interface Booking {
  id: string;
  projectName: string;
  vendorName: string;
  clientName: string;
  date: string;
  amount: string;
  status: string;
  duration: string;
  paymentStatus: 'Pending' | 'Released';
  transitStatus: 'In Transit' | 'Delivered';
  category?: string;
}

export interface DailyReport {
  id: string;
  date: string;
  shootDay: number;
  scenesScheduled: string[];
  scenesCompleted: string[];
  totalSetups: number;
  totalTakes: number;
  callTime: string;
  wrapTime: string;
  mealStart: string;
  mealEnd: string;
  incidents: string[];
  summary: string;
}

export interface Contract {
  id: string;
  roleName: string;
  projectTitle: string;
  productionName: string;
  amount: string;
  terms: string;
  status: 'Pending' | 'Signed' | 'Declined';
  type: 'NDA' | 'PPA' | 'MASTER';
  sentAt: string;
}
