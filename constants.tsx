
import React from 'react';
import { 
  Clock, BookOpen, Briefcase, FolderOpen, MessageSquare, LayoutDashboard, 
  Clapperboard, Users, Package, Truck, Wallet, ListTodo, History, ClipboardCheck 
} from 'lucide-react';
import { Audition, Application, User, Scene, Shot, Take, Booking, MediaAsset } from './types';

const ClockIcon = ({ size }: { size: number }) => <Clock size={size} />;
const BookOpenIcon = ({ size }: { size: number }) => <BookOpen size={size} />;
const BriefcaseIcon = ({ size }: { size: number }) => <Briefcase size={size} />;
const FolderOpenIcon = ({ size }: { size: number }) => <FolderOpen size={size} />;
const MessageSquareIcon = ({ size }: { size: number }) => <MessageSquare size={size} />;
const LayoutDashboardIcon = ({ size }: { size: number }) => <LayoutDashboard size={size} />;
const ClapperboardIcon = ({ size }: { size: number }) => <Clapperboard size={size} />;
const UsersIcon = ({ size }: { size: number }) => <Users size={size} />;
const HistoryIcon = ({ size }: { size: number }) => <History size={size} />;

export const MOCK_AUDITIONS: Audition[] = [
  {
    id: 'req1',
    projectTitle: 'MIDNIGHT CHASE',
    postedBy: 'Moonlight Films',
    roleName: 'Lead Actor (Arjun)',
    roleDescription: 'A gritty, determined detective chasing a ghost from his past. High emotional range required.',
    payScale: '₹50,000 - ₹75,000',
    deadline: '2024-11-20',
    location: 'Mumbai, Maharashtra',
    duration: '15 Shoot Days',
    workType: 'Project-based',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    tags: ['Paid', 'Action', 'Lead'],
    requirements: ['Experience in Action', 'Fluent Hindi', 'Aged 25-35'],
    logistics: { travelProvided: true, foodProvided: true, stayProvided: false }
  },
  {
    id: 'req2',
    projectTitle: 'COFFEE & DREAMS',
    postedBy: 'Urban Ad Agency',
    roleName: 'Cinematographer (DOP)',
    roleDescription: 'Need a DOP with a soft, warm aesthetic for a boutique coffee brand commercial.',
    payScale: '₹15,000 / Day',
    deadline: '2024-11-15',
    location: 'Bangalore, Karnataka',
    duration: '2 Days',
    workType: 'Daily',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    tags: ['Paid', 'Commercial', 'Technical'],
    requirements: ['Owns 4K Camera Rig', 'Experience with Lighting', 'Portfolio Link'],
    logistics: { travelProvided: false, foodProvided: true, stayProvided: false }
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'ap1',
    roleName: 'Lead Protagonist (Arjun)',
    projectTitle: 'MIDNIGHT CHASE',
    productionName: 'Moonlight Films',
    status: 'Shortlisted',
    appliedAt: '2024-11-01',
    matchScore: 92,
    projectType: 'Feature Film',
    directorName: 'Rajesh Kumar',
    methodApproach: 'Deep immersion into the character\'s psychological landscape through sensory deprivation techniques.',
    mediaSubmitted: [
      { id: 'm1', title: 'Action Reel 2024', type: 'Video', thumbnail: 'https://picsum.photos/seed/m1/400/225', size: '250 MB' }
    ],
    timeline: [
      { label: 'Applied', date: '01 Nov', completed: true },
      { label: 'Viewed', date: '02 Nov', completed: true },
      { label: 'Shortlisted', date: '03 Nov', completed: true, current: true },
      { label: 'Selected', completed: false }
    ]
  }
];

export const NAV_LINKS = {
  talent: [
    { label: 'Dashboard', icon: <LayoutDashboardIcon size={20} />, path: '/dashboard' },
    { label: 'Find Work', icon: <BriefcaseIcon size={20} />, path: '/discover' },
    { label: 'My Jobs', icon: <HistoryIcon size={20} />, path: '/applications' },
    { label: 'Comms', icon: <MessageSquareIcon size={20} />, path: '/messages' },
  ],
  production: [
    { label: 'Mission Control', icon: <LayoutDashboardIcon size={20} />, path: '/dashboard' },
    { label: 'Projects', icon: <ClapperboardIcon size={20} />, path: '/projects' },
    { label: 'Comms', icon: <MessageSquareIcon size={20} />, path: '/messages' },
  ],
  vendor: [
    { label: 'Hub', icon: <LayoutDashboardIcon size={20} />, path: '/dashboard' },
    { label: 'Inventory', icon: <Package size={20} />, path: '/my-services' },
  ],
  admin: [
    { label: 'Research Audit', icon: <ClipboardCheck size={20} />, path: '/test-suite' },
  ]
};

// Added missing MOCK_PROJECTS
export const MOCK_PROJECTS = [
  {
    id: 'p1',
    title: 'THE MIDNIGHT CHASE',
    description: 'A gritty detective thriller set in the heart of Mumbai.',
    status: 'In Production',
    progress: 42,
    currentShootDay: 12,
    totalShootDays: 45,
    startDate: '2024-10-15',
    location: 'Mumbai, India',
    type: 'Feature Film',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800'
  }
];

// Added missing MOCK_CALL_SHEETS
export const MOCK_CALL_SHEETS = [
  {
    id: 'cs1',
    shootDay: 12,
    crewCall: '06:30 AM',
    location: 'Sector 4, Film City',
    weather: 'Sunny, 32°C',
  }
];

// Added missing MOCK_SCENES
export const MOCK_SCENES: Scene[] = [
  {
    id: 'sc1',
    number: '12B',
    title: 'THE ALLEYWAY STICKUP',
    location: 'Sector 4 - South Alley',
    setting: 'EXT',
    timeOfDay: 'NIGHT',
    pages: '2 1/8',
    status: 'Shooting'
  }
];

// Added missing MOCK_LOGS
export const MOCK_LOGS = [
  { id: 'l1', user: 'Marcus T.', action: 'marked Scene 12A as Wrapped', time: '5m ago' },
  { id: 'l2', user: 'Sarah J.', action: 'uploaded Day 11 Footage', time: '12m ago' },
  { id: 'l3', user: 'System', action: 'deployed 4x Unit B Batteries', time: '1h ago' }
];

// Added missing MOCK_SERVICES
export const MOCK_SERVICES = [
  {
    id: 's1',
    name: 'ARRI ALEXA MINI LF',
    category: 'Equipment Rental',
    description: 'Professional 4.5K Large Format camera package with complete lens kit.',
    price: '₹45,000',
    unit: 'day',
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    specs: ['4.5K Native', 'PL Mount', '128GB Cards']
  }
];

// Added missing MOCK_BOOKINGS
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    projectName: 'MIDNIGHT CHASE',
    vendorName: 'ARRI RENTALS',
    clientName: 'Moonlight Films',
    amount: '₹4,50,000',
    date: '2024-11-05',
    status: 'Dispatched',
    paymentStatus: 'Pending',
    duration: '15 Days'
  },
  {
    id: 'b2',
    projectName: 'COFFEE DREAMS',
    vendorName: 'STUDIO 42',
    clientName: 'Urban Ad Agency',
    amount: '₹75,000',
    date: '2024-11-08',
    status: 'Ready',
    paymentStatus: 'Released',
    duration: '2 Days'
  }
];

// Added missing MOCK_MEDIA
export const MOCK_MEDIA: MediaAsset[] = [
  { id: 'm1', title: 'Action Reel 2024', type: 'Video', thumbnail: 'https://picsum.photos/seed/m1/400/225', size: '250 MB' },
  { id: 'm2', title: 'Detective Headshots', type: 'Image', thumbnail: 'https://picsum.photos/seed/m2/400/225', size: '15 MB' }
];

// Added missing MOCK_TALENT
export const MOCK_TALENT: User[] = [
  {
    id: 't1',
    name: 'Vikram Malhotra',
    email: 'vikram@example.com',
    role: 'talent',
    verified: true,
    specialty: 'Lead Actor',
    experienceLevel: 'Pro',
    avatar: 'https://picsum.photos/seed/t1/100',
    skills: ['Method Acting', 'Horse Riding'],
    rating: 4.9,
    completedProjects: 24
  }
];

// Added missing MOCK_SHOTS
export const MOCK_SHOTS: Shot[] = [
  {
    id: 'sh1',
    sceneId: 'sc1',
    number: '12B-01',
    description: 'Wide shot of Arjun entering the alley',
    lens: '35mm Prime',
    movement: 'SteadyCam',
    status: 'Done',
    takeCount: 3
  },
  {
    id: 'sh2',
    sceneId: 'sc1',
    number: '12B-02',
    description: 'Arjun Reaction (CU)',
    lens: '85mm Prime',
    movement: 'Static',
    status: 'Active',
    takeCount: 0
  }
];

// Added missing MOCK_MESSAGES
export const MOCK_MESSAGES = [
  {
    id: 'msg1',
    senderName: 'Marcus T.',
    senderAvatar: 'https://picsum.photos/seed/m1/50',
    content: 'Unit B is delayed by traffic. 20m offset expected.',
    timestamp: '12:42 PM',
    isEmergency: true
  },
  {
    id: 'msg2',
    senderName: 'Sonia Ray',
    senderAvatar: 'https://picsum.photos/seed/s2/50',
    content: 'Scene 12A footage uploaded to Vault.',
    timestamp: '12:45 PM',
    isEmergency: false
  }
];

// Added missing MOCK_SCRIPT
export const MOCK_SCRIPT = [
  { id: 'l1', type: 'slugline', content: 'EXT. DARK ALLEY - NIGHT' },
  { id: 'l2', type: 'action', content: 'ARJUN (30s) steps into the shadows. The air is thick with rain.' },
  { id: 'l3', type: 'character', content: 'ARJUN' },
  { id: 'l4', type: 'dialogue', content: 'I know you\'re here.', metadata: { genieInsight: 'Low whisper, intense eye contact required.' } }
];

// Added missing MOCK_TAKES
export const MOCK_TAKES: Take[] = [
  { id: 'tk1', shotId: 'sh1', number: 1, duration: '00:15:20', status: 'NG', notes: 'Actor blinked' },
  { id: 'tk2', shotId: 'sh1', number: 2, duration: '00:14:45', status: 'FS', notes: 'Camera slip' },
  { id: 'tk3', shotId: 'sh1', number: 3, duration: '00:15:10', status: 'Good', notes: 'Perfect take' }
];

// Added missing MOCK_AI_INSIGHTS
export const MOCK_AI_INSIGHTS = [
  { id: 'i1', content: 'Weather shift detected: Rain expected in 45m.', timestamp: 'Just now', type: 'warning' },
  { id: 'i2', content: 'Arri Alexa sensor temp rising. Suggest 5m fan cycle.', timestamp: '10m ago', type: 'info' }
];
