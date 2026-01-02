
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
  CheckCircle2
} from 'lucide-react';
import { Project, Scene, Shot, CallSheet, User, Message, Audition, Application, Booking, MediaAsset, Task, Service } from './types';

export const COLORS = {
  primary: '#DC2626',
  accent: '#F59E0B',
};

// Internal minimal icons for NAV_LINKS
const ClockIcon = ({ size }: { size: number }) => <Clock size={size} />;
const FileTextIcon = ({ size }: { size: number }) => <FileText size={size} />;
const CheckCircleIcon = ({ size }: { size: number }) => <CheckCircle2 size={size} />;

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
    budget: '₹4.5Cr'
  }
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
  }
];

export const MOCK_SHOTS: Shot[] = [
  { id: 'sh1', sceneId: 'sc1', number: '1', description: 'MCU Protagonist', lens: '50mm', movement: 'Static', status: 'Done', takeCount: 4 },
  { id: 'sh2', sceneId: 'sc1', number: '2', description: 'Wide Club View', lens: '24mm', movement: 'Slider', status: 'Active', takeCount: 2 },
  { id: 'sh3', sceneId: 'sc1', number: '3', description: 'Tight CU on Letter', lens: '85mm Macro', movement: 'Static', status: 'Todo', takeCount: 0 }
];

export const MOCK_CALL_SHEETS: CallSheet[] = [
  { 
    id: 'cs1', 
    projectId: 'p1', 
    shootDay: 12, 
    date: '2024-10-27', 
    crewCall: '07:00 AM', 
    location: 'Studio 4, Mumbai', 
    weather: 'Clear, 28°C', 
    status: 'Published', 
    acknowledgments: {
      'u1': { timestamp: '06:15 AM', status: 'Confirmed' },
      'u2': { timestamp: '06:45 AM', status: 'Confirmed' }
    }
  }
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', projectId: 'p1', senderId: 'u2', senderName: 'Sarah J.', senderAvatar: 'https://picsum.photos/seed/sarah/100', content: 'Talent is in wardrobe.', timestamp: '06:45 AM', channel: '#Direction' },
  { id: 'm2', projectId: 'p1', senderId: 'sys', senderName: 'SYSTEM', senderAvatar: 'https://picsum.photos/seed/sys/100', content: 'EMERGENCY: Power out in Studio B.', timestamp: '06:50 AM', channel: '#Set-Alerts', isEmergency: true }
];

export const MOCK_SERVICES: Service[] = [
  { id: 's1', vendorId: 'v1', name: 'Premium Arri Package', category: 'Equipment Rental', price: '₹45,000', unit: 'day', description: 'Full Alexa Mini LF package with Master Anamorphics.', image: 'https://picsum.photos/seed/camera/800/500', availability: 'Available' },
  { id: 's2', vendorId: 'v1', name: 'Jazz Club Studio', category: 'Studio Space', price: '₹1,20,000', unit: 'day', description: 'Period accurate 1920s interior with functional bar.', image: 'https://picsum.photos/seed/studio/800/500', availability: 'Booked' }
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 'b1', serviceId: 's1', projectId: 'p1', projectName: 'Cyberpunk Mumbai', vendorName: 'Vinod Productions', status: 'Pending', date: '2024-11-05', duration: '3 Days', amount: '₹1,35,000', clientName: 'Neon Visions Ltd.' },
  { id: 'b2', serviceId: 's2', projectId: 'p1', projectName: 'The Midnight Script', vendorName: 'Vinod Productions', status: 'Fulfilled', date: '2024-10-20', duration: '1 Day', amount: '₹1,20,000', clientName: 'Jazz Era Films' }
];

export const MOCK_AUDITIONS: Audition[] = [
  { id: 'au1', projectId: 'p2', roleName: 'Lead Detective', projectTitle: 'Neon Shadows', payScale: '₹50,000+', roleDescription: 'Grit-hardened investigator in his late 40s.', tags: ['Lead', 'Male'], deadline: '2024-11-01', image: 'https://picsum.photos/seed/actor/800/500', requirements: ['Experience in Action', 'Strong Marathi Fluency'] }
];

export const MOCK_TALENT: User[] = [
  { id: 'u1', name: 'Vikram Malhotra', email: 'vikram@clap.film', role: 'talent', avatar: 'https://picsum.photos/seed/actor1/200', verified: true, specialty: 'Method Acting', rating: 4.9, completedProjects: 24, skills: ['Martial Arts', 'Fluent Hindi'] }
];

export const MOCK_MEDIA: MediaAsset[] = [
  { id: 'md1', title: 'Performance Reel 2024', type: 'Video', thumbnail: 'https://picsum.photos/seed/reel/400/225', size: '124MB', uploadedBy: 'u1' }
];

// Added MOCK_APPLICATIONS to fix pages/Applications.tsx error
export const MOCK_APPLICATIONS: Application[] = [
  { id: 'ap1', roleName: 'Lead Detective', projectTitle: 'Neon Shadows', appliedAt: '2024-10-20', status: 'Shortlisted' },
  { id: 'ap2', roleName: 'Background Jazz Pianist', projectTitle: 'The Midnight Script', appliedAt: '2024-10-22', status: 'Applied' }
];

// Added MOCK_TASKS to fix pages/ProjectWorkspace.tsx error
export const MOCK_TASKS: Task[] = [
  { id: 't1', title: 'Confirm Wardrobe for Scene 12B', status: 'Completed' },
  { id: 't2', title: 'Check Camera Batteries', status: 'Todo' }
];

export const MOCK_LOGS = [
  { id: 'l1', time: '08:00 AM', author: 'AD', note: 'Crew call complete.' }
];

export const MOCK_AI_INSIGHTS = [
  { id: 'i1', type: 'warning', content: 'Rain probability increasing at 2 PM.', timestamp: '10:00 AM' }
];

export const NAV_LINKS = {
  talent: [
    { label: 'Set Call', icon: <ClockIcon size={20} />, path: '/dashboard' },
    { label: 'Sides', icon: <FileTextIcon size={20} />, path: '/vault' },
    { label: 'Auditions', icon: <Briefcase size={20} />, path: '/auditions' },
    { label: 'Applications', icon: <CheckCircleIcon size={20} />, path: '/applications' },
    { label: 'Comms', icon: <MessageSquare size={20} />, path: '/messages' },
  ],
  production: [
    { label: 'Mission Control', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { label: 'Operational Slate', icon: <Clapperboard size={20} />, path: '/projects' },
    { label: 'Discovery', icon: <Search size={20} />, path: '/discover' },
    { label: 'Live Workspace', icon: <FolderOpen size={20} />, path: '/workspace' },
    { label: 'AI Genie', icon: <BrainCircuit size={20} />, path: '/ai-genie' },
  ],
  vendor: [
    { label: 'Business Hub', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { label: 'Catalog', icon: <Package size={20} />, path: '/my-services' },
    { label: 'Bookings', icon: <Truck size={20} />, path: '/bookings' },
    { label: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
  ]
};
