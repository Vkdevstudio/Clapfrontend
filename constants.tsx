
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
  Users
} from 'lucide-react';
import { Project, Scene, Shot, CallSheet, User, Message } from './types';

// COLORS constant added for Layout.tsx
export const COLORS = {
  primary: '#DC2626',
  accent: '#F59E0B',
};

// Internal minimal icons moved before NAV_LINKS to fix declaration order
const ClockIcon = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const FileTextIcon = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const CheckCircleIcon = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;

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
    progress: 35
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
    status: 'Scheduled', 
    location: 'Jazz Club Main Hall' 
  }
];

export const MOCK_SHOTS: Shot[] = [
  { id: 'sh1', sceneId: 'sc1', number: '1', description: 'MCU Protagonist', lens: '50mm', movement: 'Static', status: 'Done' },
  { id: 'sh2', sceneId: 'sc1', number: '2', description: 'Wide Club View', lens: '24mm', movement: 'Slider', status: 'Active' }
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
    acknowledgements: ['u1'] 
  }
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', projectId: 'p1', senderId: 'u2', senderName: 'Sarah J.', senderAvatar: 'https://picsum.photos/seed/sarah/100', content: 'Talent is in wardrobe.', timestamp: '06:45 AM', channel: '#Direction' },
  { id: 'm2', projectId: 'p1', senderId: 'sys', senderName: 'SYSTEM', senderAvatar: 'https://picsum.photos/seed/sys/100', content: 'EMERGENCY: Location power out in Studio B.', timestamp: '06:50 AM', channel: '#Set-Alerts', isEmergency: true }
];

// Added missing mock data required by several pages
export const MOCK_SERVICES = [
  { id: 's1', name: 'Premium Arri Package', category: 'Equipment Rental', price: '₹45,000', unit: 'day', description: 'Full Alexa Mini LF package with Master Anamorphics.', image: 'https://picsum.photos/seed/camera/800/500', availability: 'Available' },
  { id: 's2', name: 'Jazz Club Studio', category: 'Studio Space', price: '₹1,20,000', unit: 'day', description: 'Period accurate 1920s interior with functional bar.', image: 'https://picsum.photos/seed/studio/800/500', availability: 'Booked' }
];

export const MOCK_BOOKINGS = [
  { id: 'b1', projectName: 'Cyberpunk Mumbai', vendorName: 'Vinod Productions', date: '2024-11-05' }
];

export const MOCK_AUDITIONS = [
  { id: 'au1', roleName: 'Lead Detective', projectTitle: 'Neon Shadows', payScale: '₹50,000+', roleDescription: 'Grit-hardened investigator in his late 40s.', tags: ['Lead', 'Male'], deadline: '2024-11-01', image: 'https://picsum.photos/seed/actor/800/500' }
];

export const MOCK_APPLICATIONS = [
  { id: 'ap1', roleName: 'Supporting Jazz Singer', projectTitle: 'The Midnight Script', appliedAt: '2024-10-20', status: 'Shortlisted' }
];

export const MOCK_MEDIA = [
  { id: 'md1', title: 'Performance Reel 2024', type: 'Video', thumbnail: 'https://picsum.photos/seed/reel/400/225', size: '124MB' },
  { id: 'md2', title: 'Headshots_Final', type: 'Document', thumbnail: 'https://picsum.photos/seed/headshot/400/225', size: '12MB' }
];

export const MOCK_TALENT = [
  { id: 't1', name: 'Vinod S.', avatar: 'https://picsum.photos/seed/vinod/100', verified: true, specialty: 'Cinematographer', rating: 4.9, completedProjects: 24, skills: ['Visual Storytelling', 'ARRI Expert'] },
  { id: 't2', name: 'Sarah J.', avatar: 'https://picsum.photos/seed/sarah2/100', verified: true, specialty: 'Production Design', rating: 4.8, completedProjects: 18, skills: ['Period Design', 'AutoCAD'] }
];

export const MOCK_LOGS = [
  { id: 'l1', time: '08:00 AM', author: 'AD', note: 'Crew call complete. Safety briefing in progress.' },
  { id: 'l2', time: '09:30 AM', author: 'Camera', note: 'Ready for Scene 12B Shot 1. Lighting adjusted.' }
];

export const MOCK_AI_INSIGHTS = [
  { id: 'i1', type: 'warning', content: 'Rain probability increasing at 2 PM.', timestamp: '10:00 AM' },
  { id: 'i2', type: 'info', content: 'Art department finishing sets 2 hours early.', timestamp: '11:15 AM' }
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
