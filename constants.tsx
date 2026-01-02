
import React from 'react';
import { 
  Clapperboard, 
  MessageSquare, 
  FolderOpen, 
  LayoutDashboard,
  Briefcase,
  Search,
  BrainCircuit,
  ShoppingBag,
  Package,
  Truck,
  Users,
  Clock,
  FileText,
  CheckCircle2,
  BookOpen,
  ShieldAlert,
  Wallet,
  Zap,
  ListTodo,
  History
} from 'lucide-react';
import { Project, Scene, Shot, User, Message, Audition, Application, Booking, MediaAsset, Service, ScriptLine, CallSheet, Take } from './types';

export const COLORS = {
  primary: '#DC2626',
  accent: '#F59E0B',
};

const ClockIcon = ({ size }: { size: number }) => <Clock size={size} />;
const BookOpenIcon = ({ size }: { size: number }) => <BookOpen size={size} />;
const BriefcaseIcon = ({ size }: { size: number }) => <Briefcase size={size} />;
const FolderOpenIcon = ({ size }: { size: number }) => <FolderOpen size={size} />;
const MessageSquareIcon = ({ size }: { size: number }) => <MessageSquare size={size} />;
const LayoutDashboardIcon = ({ size }: { size: number }) => <LayoutDashboard size={size} />;
const ClapperboardIcon = ({ size }: { size: number }) => <Clapperboard size={size} />;
const UsersIcon = ({ size }: { size: number }) => <Users size={size} />;
const PackageIcon = ({ size }: { size: number }) => <Package size={size} />;
const TruckIcon = ({ size }: { size: number }) => <Truck size={size} />;
const WalletIcon = ({ size }: { size: number }) => <Wallet size={size} />;
const ListTodoIcon = ({ size }: { size: number }) => <ListTodo size={size} />;
const HistoryIcon = ({ size }: { size: number }) => <History size={size} />;

export const MOCK_SCRIPT: ScriptLine[] = [
  { id: 'l1', type: 'slugline', content: 'INT. JAZZ CLUB - NIGHT' },
  { id: 'l2', type: 'action', content: 'Thick smoke curls through the spotlight. VIKRAM (40s) stands by the bar, nursing a whiskey.' },
  { id: 'l3', type: 'character', content: 'VIKRAM' },
  { id: 'l4', type: 'dialogue', content: 'I told you not to come here, Sarah.', metadata: { genieInsight: 'Character beat: Internal conflict over past betrayal.' } },
  { id: 'l5', type: 'character', content: 'SARAH' },
  { id: 'l6', type: 'dialogue', content: 'And I told you I don\'t take orders from ghosts.', metadata: { genieInsight: 'Prop requirement: Old photograph in Sarah\'s hand.' } },
  { id: 'l7', type: 'action', content: 'Vikram slams the glass down. The club goes quiet.' }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'THE MIDNIGHT SCRIPT',
    type: 'Feature Film',
    status: 'Production',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800',
    description: 'Psychological thriller in a 1920s jazz club.',
    location: 'Mumbai, India',
    startDate: '2024-10-15',
    currentShootDay: 12,
    totalShootDays: 45,
    progress: 35,
    budget: '₹4,50,00,000',
    spent: '₹1,25,00,000'
  }
];

export const MOCK_CALL_SHEETS: CallSheet[] = [
  { id: 'cs1', projectId: 'p1', shootDay: 12, crewCall: '06:00 AM', location: 'Jazz Club Main Hall', weather: 'Clear, 28°C', sunrise: '06:12 AM', sunset: '06:45 PM' }
];

export const MOCK_SCENES: Scene[] = [
  { 
    id: 'sc1', 
    projectId: 'p1', 
    number: '12B', 
    title: 'The Revelation', 
    setting: 'INT', 
    timeOfDay: 'NIGHT', 
    pages: 2.5, 
    status: 'Shooting', 
    location: 'Jazz Club Main Hall',
    castIds: ['u1', 'u3']
  },
  { 
    id: 'sc2', 
    projectId: 'p1', 
    number: '13', 
    title: 'Escaping the Club', 
    setting: 'EXT', 
    timeOfDay: 'NIGHT', 
    pages: 1.2, 
    status: 'Scheduled', 
    location: 'Alleyway Behind Club',
    castIds: ['u1', 'u3']
  }
];

export const MOCK_SHOTS: Shot[] = [
  { id: 'sh1', sceneId: 'sc1', number: '1', description: 'MCU Protagonist', lens: '50mm', movement: 'Static', status: 'Done', takeCount: 4 },
  { id: 'sh2', sceneId: 'sc1', number: '2', description: 'Wide Club View', lens: '24mm', movement: 'Slider', status: 'Active', takeCount: 2 },
  { id: 'sh3', sceneId: 'sc1', number: '3', description: 'Tight CU on Letter', lens: '85mm Macro', movement: 'Static', status: 'Todo', takeCount: 0 }
];

export const MOCK_TAKES: Take[] = [
  { id: 't1', shotId: 'sh1', number: 1, duration: '00:42', status: 'NG', notes: 'Actor flubbed line at end.' },
  { id: 't2', shotId: 'sh1', number: 2, duration: '00:45', status: 'FS', notes: 'False start on lighting trigger.' },
  { id: 't3', shotId: 'sh1', number: 3, duration: '00:44', status: 'Circle', notes: 'Excellent emotional delivery. Best take.' },
  { id: 't4', shotId: 'sh1', number: 4, duration: '00:44', status: 'Safety', notes: 'Backup for focus tracking.' }
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', senderName: 'Sarah J. (1st AD)', senderAvatar: 'https://picsum.photos/seed/user2/100', content: 'Unit A arriving on set now. Vikram is in wardrobe.', timestamp: '08:15 AM', channelType: 'general' },
  { id: 'm2', senderName: 'Marcus T. (Gaffer)', senderAvatar: 'https://picsum.photos/seed/user3/100', content: 'URGENT: Generator failure in Sector B. Need backup power immediately.', timestamp: '08:45 AM', isEmergency: true, channelType: 'alert' }
];

export const MOCK_LOGS = [
  { id: 'l1', user: 'Marcus T.', action: 'Shot 2 Wrapped (Take 4)', time: '5m ago' },
  { id: 'l2', user: 'Sarah J.', action: 'Call Sheet Day 13 Distributed', time: '12m ago' }
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 's1',
    vendorId: 'v1',
    name: 'Red V-Raptor Package',
    category: 'Equipment Rental',
    price: '₹15,000',
    unit: 'Day',
    description: 'Full 8K production kit including lenses and power.',
    image: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?auto=format&fit=crop&q=80&w=800',
    availability: 'Available',
    specs: ['8K Resolution', '120fps', 'PL Mount']
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    serviceId: 's1',
    projectId: 'p1',
    projectName: 'THE MIDNIGHT SCRIPT',
    vendorName: 'ARRI Rentals',
    status: 'Pending',
    date: '2024-11-20',
    duration: '3 Days',
    amount: '₹45,000',
    clientName: 'Dharma Productions',
    paymentStatus: 'In Escrow'
  }
];

export const MOCK_AUDITIONS: Audition[] = [
  {
    id: 'a1',
    projectTitle: 'THE MIDNIGHT SCRIPT',
    roleName: 'Lead Actress (Sarah)',
    roleDescription: 'A strong-willed jazz singer with a dark past.',
    payScale: '₹50k - ₹80k',
    deadline: '2024-11-05',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    tags: ['Musical', 'Thriller'],
    requirements: ['Singing ability', 'Method acting experience']
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  { id: 'ap1', roleName: 'Sarah', projectTitle: 'THE MIDNIGHT SCRIPT', status: 'Shortlisted', appliedAt: '2 days ago' }
];

export const MOCK_MEDIA: MediaAsset[] = [
  { id: 'med1', title: 'Action Showreel 2024', type: 'Video', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400', size: '45MB' },
  { id: 'med2', title: 'Headshot Studio', type: 'Image', thumbnail: 'https://picsum.photos/seed/actor/400/300', size: '12MB' }
];

export const MOCK_TALENT: User[] = [
  { id: 'u1', name: 'Vikram Malhotra', email: 'vikram@example.com', role: 'talent', specialty: 'Method Acting', rating: 4.9, completedProjects: 24, skills: ['Horse Riding', 'Fencing'], verified: true, avatar: 'https://picsum.photos/seed/vikram/100', clapScore: 840 }
];

export const MOCK_AI_INSIGHTS = [
  { id: 'i1', type: 'warning', content: 'Potential light leak in Scene 12B detected by sensor telemetry.', timestamp: '2m ago' },
  { id: 'i2', type: 'info', content: 'Production is 15% ahead of schedule.', timestamp: '15m ago' }
];

export const NAV_LINKS = {
  talent: [
    { label: 'Set Call', icon: <ClockIcon size={20} />, path: '/dashboard' },
    { label: 'Script', icon: <BookOpenIcon size={20} />, path: '/script' },
    { label: 'Auditions', icon: <BriefcaseIcon size={20} />, path: '/auditions' },
    { label: 'Vault', icon: <FolderOpenIcon size={20} />, path: '/vault' },
    { label: 'Comms', icon: <MessageSquareIcon size={20} />, path: '/messages' },
  ],
  production: [
    { label: 'Mission Control', icon: <LayoutDashboardIcon size={20} />, path: '/dashboard' },
    { label: 'Projects', icon: <ClapperboardIcon size={20} />, path: '/projects' },
    { label: 'Script Reader', icon: <BookOpenIcon size={20} />, path: '/script' },
    { label: 'Workspace', icon: <FolderOpenIcon size={20} />, path: '/workspace' },
    { label: 'Slate Manager', icon: <ListTodoIcon size={20} />, path: '/slate' },
    { label: 'Logbook', icon: <HistoryIcon size={20} />, path: '/logbook' },
    { label: 'Comms', icon: <MessageSquareIcon size={20} />, path: '/messages' },
    { label: 'Payments', icon: <WalletIcon size={20} />, path: '/financials' },
  ],
  vendor: [
    { label: 'Hub', icon: <LayoutDashboardIcon size={20} />, path: '/dashboard' },
    { label: 'Catalog', icon: <PackageIcon size={20} />, path: '/my-services' },
    { label: 'Logistics', icon: <TruckIcon size={20} />, path: '/bookings' },
    { label: 'Payments', icon: <WalletIcon size={20} />, path: '/financials' },
  ]
};
