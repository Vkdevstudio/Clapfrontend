
import React from 'react';
import { 
  Search, 
  Clapperboard, 
  MessageSquare, 
  FolderOpen, 
  LayoutDashboard,
  Briefcase,
  Truck,
  Package,
  FileText,
  ShoppingBag,
  Clock,
  Plus,
  Star,
  Zap,
  CheckCircle2,
  BrainCircuit
} from 'lucide-react';
import { Project, ServiceItem, Audition, Application, MediaAsset, User, Task, Scene, CallSheet, Message, Booking, AIInsight } from './types';

export const COLORS = {
  primary: '#E50914',
  secondary: '#1F1F1F',
  accent: '#F5C518',
  bg: '#0A0A0A',
  text: '#FFFFFF',
  textMuted: '#A3A3A3'
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'THE MIDNIGHT SCRIPT',
    type: 'Feature Film',
    status: 'Production',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800',
    description: 'A psychological thriller set in a 1920s underground jazz club.',
    location: 'Mumbai, India',
    startDate: '2024-10-15',
    progress: 35,
    activeScene: '12B',
    crewCount: 42,
    aiInsights: [
      'Weather warning: 80% chance of rain at 2:00 PM. Recommend shifting Ext. Alley shots to Int. Jazz Club.',
      'Logistics alert: Sound Unit #2 is stuck in traffic. ETA delayed by 45 mins.'
    ]
  },
  {
    id: 'p2',
    title: 'NEON HORIZON',
    type: 'Web Series',
    status: 'Pre-Production',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800',
    description: 'Cyberpunk dystopia exploring the ethics of neural implants.',
    location: 'Berlin, Germany',
    startDate: '2025-01-10',
    progress: 10,
    crewCount: 12
  }
];

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  { id: '1', type: 'warning', content: '80% rain chance at 2 PM. Shift Exterior scenes.', timestamp: '10 mins ago' },
  { id: '2', type: 'suggestion', content: 'Actor A matches 98% of Scene 12 emotional beats based on script analysis.', timestamp: '1 hour ago' },
  { id: '3', type: 'update', content: 'ARRI Rental confirmed for 6 AM pickup.', timestamp: '2 hours ago' }
];

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    vendorId: 'v1',
    name: 'ARRI Alexa Mini LF Package',
    category: 'Equipment',
    price: '$1,200',
    unit: 'Day',
    image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&q=80&w=400',
    description: 'Complete kit including lenses and tripod.',
    availability: 'Available'
  },
  {
    id: 's2',
    vendorId: 'v2',
    name: 'Industrial Virtual Studio',
    category: 'Location',
    price: '$3,500',
    unit: 'Day',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
    description: 'LED Volume studio for hyper-realistic virtual production.',
    availability: 'Available'
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: 'Sarah Jenkins',
    senderAvatar: 'https://picsum.photos/seed/sarah/200',
    content: 'Are we still on for the Scene 12 reshoot tomorrow morning?',
    timestamp: '10:42 AM',
    channel: '#Production'
  },
  {
    id: 'm2',
    sender: 'Cinema Rentals',
    senderAvatar: 'https://picsum.photos/seed/vendor/200',
    content: 'The Alexa Mini kit is ready for pickup at 6:00 AM.',
    timestamp: '09:15 AM',
    channel: 'Direct'
  }
];

export const MOCK_AUDITIONS: Audition[] = [
  {
    id: 'a1',
    projectId: 'p1',
    projectTitle: 'THE MIDNIGHT SCRIPT',
    roleName: 'Detective Elias',
    roleDescription: 'Lead role. Cynical, sharp-witted detective in his late 30s.',
    deadline: '2024-09-30',
    payScale: '$500/day',
    tags: ['Lead', 'Male', '30-45'],
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=400'
  }
];

export const MOCK_TASKS: Task[] = [
  { id: 't1', title: 'Review Scene 12 Storyboards', scene: '12', status: 'In Progress', assignee: 'Sarah Jenkins', priority: 'High', dueTime: '2:00 PM' },
  { id: 't2', title: 'Approve Camera Rental Quote', status: 'Todo', assignee: 'Production Team', priority: 'Medium', dueTime: 'EOD' },
  { id: 't3', title: 'Script Revision Distribution', scene: 'All', status: 'Completed', assignee: 'Admin', priority: 'High', dueTime: '10:00 AM' }
];

export const MOCK_APPLICATIONS: Application[] = [
  { id: 'ap1', auditionId: 'a1', projectTitle: 'THE MIDNIGHT SCRIPT', roleName: 'Detective Elias', status: 'Shortlisted', appliedAt: '2024-05-20' },
];

export const MOCK_MEDIA: MediaAsset[] = [
  { id: 'm1', title: 'Main Trailer', type: 'Video', url: '#', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400', size: '45MB' },
  { id: 'm2', title: 'Script V2.1', type: 'Document', url: '#', size: '2.4MB' },
];

export const MOCK_TALENT: User[] = [
  { id: 'u1', name: 'Vinod Star', email: 'vinod@talent.com', role: 'talent', verified: true, specialty: 'Lead Actor', rating: 4.9, completedProjects: 24, skills: ['Acting', 'Method'], avatar: 'https://picsum.photos/seed/vinod/100' },
];

export const MOCK_SCENES: Scene[] = [
  { id: 'sc1', projectId: 'p1', number: '12B', title: 'The Revelation', status: 'Ready', location: 'Int. Jazz Club - Night' },
  { id: 'sc2', projectId: 'p1', number: '13', title: 'Morning Escape', status: 'Draft', location: 'Ext. City Street - Dawn' }
];

export const MOCK_CALL_SHEETS: CallSheet[] = [
  { id: 'cs1', projectId: 'p1', date: '2024-10-15', callTime: '07:00 AM', location: 'Studio 4, Mumbai', scenes: ['12B', '13A'], status: 'Published' }
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 'b1', serviceId: 's1', projectId: 'p1', projectName: 'The Midnight Script', status: 'Confirmed', date: '2024-05-24', vendorName: 'Cinema Rentals Inc.' }
];

export const NAV_LINKS = {
  talent: [
    { label: 'Feed', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { label: 'Auditions', icon: <Briefcase size={20} />, path: '/auditions' },
    { label: 'Applications', icon: <CheckCircle2 size={20} />, path: '/applications' },
    { label: 'Vault', icon: <FolderOpen size={20} />, path: '/vault' },
    { label: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
  ],
  production: [
    { label: 'Home', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { label: 'Slate', icon: <Clapperboard size={20} />, path: '/projects' },
    { label: 'Vendor Hub', icon: <ShoppingBag size={20} />, path: '/marketplace' },
    { label: 'Discovery', icon: <Search size={20} />, path: '/talent-discovery' },
    { label: 'Workspace', icon: <FolderOpen size={20} />, path: '/workspace' },
    { label: 'AI Genie', icon: <BrainCircuit size={20} />, path: '/ai-genie' },
  ],
  vendor: [
    { label: 'Hub', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { label: 'Catalog', icon: <Package size={20} />, path: '/my-services' },
    { label: 'Bookings', icon: <Truck size={20} />, path: '/bookings' },
    { label: 'Inquiries', icon: <FileText size={20} />, path: '/quotations' },
    { label: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
  ]
};
