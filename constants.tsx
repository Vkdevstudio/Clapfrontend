
import React from 'react';
import { 
  LayoutDashboard, Star, MessageSquare, Clapperboard, Package, 
  Settings, ClipboardCheck, MapPin, Clock, ShieldCheck, Zap, 
  Truck, Users, Activity, UserPlus, Box, FileText, ShoppingCart, 
  FileSpreadsheet, Bell, Heart, Search, Eye, Sparkles, Database,
  Briefcase, Target, ShieldAlert, Award,
  /* Added missing icon imports */
  TrendingUp, Wallet, Globe
} from 'lucide-react';
import { Project, LocationProfile, Scene, Shot, Task, ScriptVersion, CallSheet, Audition, Application, Take, Booking, DailyReport, Notification, Contract } from './types';

export const MOCK_LOCATIONS: LocationProfile[] = [
  { 
    id: 'loc1', 
    name: 'Sector 4 - South Alley', 
    type: 'Outdoor', 
    notes: 'Access limited after 10 PM. Silent period.', 
    constraints: ['Silence required', 'No pyro after dark'],
    address: 'Film City Road, Goregaon East'
  },
  { 
    id: 'loc2', 
    name: 'Studio 42 - Main Floor', 
    type: 'Studio', 
    notes: 'Soundproofed. Green screen pre-installed.',
    address: 'Andheri West Industry Hub'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'THE MIDNIGHT CHASE',
    description: 'A gritty detective thriller set in the heart of Mumbai.',
    status: 'Active',
    progress: 42,
    currentShootDay: 12,
    totalShootDays: 45,
    startDate: '2024-10-15',
    location: 'Mumbai, India',
    type: 'Film',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800',
    units: [
      { id: 'u1', name: 'Main Unit', projectId: 'p1' },
      { id: 'u2', name: 'Second Unit', projectId: 'p1' }
    ],
    budgetedAmounts: {
      'Cast': 500000,
      'Camera': 1200000,
      'Catering': 200000,
      'Logistics': 400000
    }
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Contract Ready', message: 'Moonlight Films has sent your PPA for THE MIDNIGHT CHASE.', type: 'critical', timestamp: '2m ago', isRead: false, actionPath: '/contract/c1' },
  { id: 'n2', title: 'Call Sheet Published', message: 'Shoot Day 13 call sheet is live. Please acknowledge.', type: 'alert', timestamp: '1h ago', isRead: false, actionPath: '/workspace' },
  { id: 'n3', title: 'Escrow Released', message: 'Payment for Unit A Catering has been released.', type: 'success', timestamp: '3h ago', isRead: true }
];

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: 'c1',
    roleName: 'Detective Arjun',
    projectTitle: 'THE MIDNIGHT CHASE',
    productionName: 'Moonlight Films',
    amount: '₹5,00,000',
    terms: 'This Production Purchase Agreement (PPA) outlines the terms of engagement for the role of Detective Arjun. Engagement includes 45 days of principal photography, 10 days of rehearsals, and all promotional activities as specified in the rider.',
    status: 'Pending',
    type: 'PPA',
    sentAt: '2024-10-24'
  }
];

export const MOCK_SCENES: Scene[] = [
  {
    id: 'sc1',
    number: '12B',
    title: 'THE ALLEYWAY STICKUP',
    locationId: 'loc1',
    setting: 'EXT',
    timeOfDay: 'NIGHT',
    pages: '2 1/8',
    status: 'Pending',
    unitId: 'u1'
  },
  {
    id: 'sc2',
    number: '14',
    title: 'THE OFFICE CONFRONTATION',
    locationId: 'loc2',
    setting: 'INT',
    timeOfDay: 'DAY',
    pages: '3 4/8',
    status: 'Pending',
    unitId: 'u1'
  }
];

export const MOCK_SHOTS: Shot[] = [
  { id: 'sh1', sceneId: 'sc1', number: '01', description: 'Master Wide Shot', lens: '35mm', movement: 'Static', status: 'Pending', takeCount: 0 },
  { id: 'sh2', sceneId: 'sc1', number: '02', description: 'Arjun Close-Up', lens: '85mm', movement: 'Handheld', status: 'Pending', takeCount: 0 }
];

export const MOCK_TAKES: Take[] = [
  { id: 't1', shotId: 'sh1', number: 1, duration: '0:42', notes: 'Camera shake at end.', status: 'NG' },
  { id: 't2', shotId: 'sh1', number: 2, duration: '0:45', notes: 'Actor blinked.', status: 'NG' },
  { id: 't3', shotId: 'sh1', number: 3, duration: '0:44', notes: 'Perfect take.', status: 'Circle' }
];

export const MOCK_TASKS: Task[] = [
  { id: 't1', title: 'Prepare Alley Prop Gun', type: 'Department', status: 'Completed', assignedDept: 'Art', sceneId: 'sc1' },
  { id: 't2', title: 'Set up Night Lighting', type: 'Department', status: 'In Progress', assignedDept: 'Lighting', sceneId: 'sc1' }
];

export const MOCK_SCRIPT: any[] = [
  { id: '1', type: 'slugline', content: 'EXT. ALLEYWAY - NIGHT' },
  { id: '2', type: 'action', content: 'Rain hammers against the asphalt. ARJUN stands in the shadows.' },
  { id: '3', type: 'character', content: 'ARJUN' },
  { id: '4', type: 'dialogue', content: 'I know you\'re there.' }
];

export const MOCK_SCRIPT_VERSIONS: ScriptVersion[] = [
  { id: 'v1', version: 'Draft 1.0', date: '2024-10-10', changeLog: 'Initial Draft', isLocked: true },
  { id: 'v2', version: 'Draft 2.0', date: '2024-10-15', changeLog: 'Action tweaks', isLocked: false }
];

export const MOCK_CALL_SHEETS: CallSheet[] = [
  {
    id: 'cs1',
    date: '2024-10-24',
    unitId: 'u1',
    locationId: 'loc1',
    sceneIds: ['sc1'],
    callTime: '06:00 AM',
    status: 'Published',
    crewAcknowledgements: {
      'c1': { status: 'Confirmed', name: 'Marcus T.', role: 'DOP' },
      'c2': { status: 'Delayed', reason: 'Flat tire', name: 'Rajesh K.', role: 'Art Director' }
    }
  }
];

export const MOCK_AUDITIONS: Audition[] = [
  {
    id: 'a1',
    roleName: 'Detective Arjun',
    projectTitle: 'THE MIDNIGHT CHASE',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=800',
    location: 'Mumbai, India',
    deadline: '2024-11-01',
    payScale: '₹5,00,000 Total',
    roleDescription: 'A seasoned detective with a dark past.',
    requirements: ['Method Acting', 'Action Training'],
    tags: ['Lead', 'Male'],
    workType: 'Feature Film',
    duration: '45 Days',
    productionInfo: {
      name: 'Moonlight Films',
      avatar: 'https://picsum.photos/seed/moonlight/100',
      bio: 'Leading production house in indie cinema.',
      rating: 4.9,
      isTrending: true,
      pastProjects: ['The City Sleepers']
    }
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app1',
    roleName: 'Detective Arjun',
    projectTitle: 'THE MIDNIGHT CHASE',
    productionName: 'Moonlight Films',
    status: 'Shortlisted',
    appliedAt: '2024-10-20',
    matchScore: 92,
    applicantName: 'Arjun Mehta',
    applicantAvatar: 'https://picsum.photos/seed/arjun/100',
    timeline: [
      { label: 'Applied', date: '2024-10-20', completed: true },
      { label: 'Shortlisted', date: '2024-10-22', completed: true, current: true }
    ]
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 'b1', projectName: 'THE MIDNIGHT CHASE', vendorName: 'ARRI Rentals', clientName: 'Moonlight Films', date: '2024-10-24', amount: '₹1,20,000', status: 'Active', duration: '5 Days', paymentStatus: 'Pending', transitStatus: 'In Transit' }
];

export const MOCK_DPRS: DailyReport[] = [
  // Fix: Corrected property name from 'scenes scheduled' to 'scenesScheduled' to match DailyReport type
  { id: 'r1', date: '2024-10-24', shootDay: 12, scenesScheduled: ['12B'], scenesCompleted: ['12B'], totalSetups: 8, totalTakes: 24, callTime: '06:00', wrapTime: '18:15', mealStart: '13:00', mealEnd: '14:00', incidents: ['None'], summary: 'Smooth day.' }
];

export const MOCK_SERVICES: any[] = [
  { id: 's1', name: 'ARRI Alexa Mini LF', category: 'Camera', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800', price: '₹45,000', unit: 'day', availability: 'Available', specs: ['4.5K', 'PL Mount'], description: 'Industry standard full frame camera.' }
];

export const MOCK_MEDIA: any[] = [
  { id: 'm1', title: 'Lead Showreel', type: 'Video', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800', size: '240MB', scope: 'Personal' }
];

/* Added missing MOCK_TALENT export */
export const MOCK_TALENT: any[] = [
  { id: 't1', name: 'Vikram Malhotra', specialty: 'Method Actor', rating: 4.9, avatar: 'https://picsum.photos/seed/vikram/100', verified: true, completedProjects: 42, skills: ['Method', 'Action', 'Dialect'] },
  { id: 't2', name: 'Sonia Ray', specialty: 'Cinematographer', rating: 4.8, avatar: 'https://picsum.photos/seed/sonia/100', verified: true, completedProjects: 28, skills: ['8K', 'Lighting', 'Steadicam'] }
];

/* Added missing MOCK_MESSAGES export */
export const MOCK_MESSAGES: any[] = [
  { id: 'msg1', senderName: 'Marcus T.', senderAvatar: 'https://picsum.photos/seed/marcus/100', content: 'Unit A is ready for Scene 12B.', timestamp: '12:45 PM', isEmergency: false },
  { id: 'msg2', senderName: 'System', senderAvatar: 'https://picsum.photos/seed/system/100', content: 'URGENT: Rain expected in 45 minutes.', timestamp: '12:50 PM', isEmergency: true }
];

export const NAV_LINKS = {
  talent: [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Auditions', path: '/auditions', icon: <Search size={20} /> },
    { label: 'Missions', path: '/applications', icon: <Briefcase size={20} /> },
    { label: 'Portfolio', path: '/vault', icon: <Database size={20} /> },
    { label: 'Insights', path: '/insights', icon: <TrendingUp size={20} /> },
  ],
  production: [
    { label: 'Command', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'The Library', path: '/projects', icon: <Clapperboard size={20} /> },
    { label: 'Casting', path: '/casting', icon: <Users size={20} /> },
    { label: 'Procurement', path: '/procurement', icon: <ShoppingCart size={20} /> },
    { label: 'Treasury', path: '/financials', icon: <Wallet size={20} /> },
  ],
  vendor: [
    { label: 'Nexus', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Catalogue', path: '/my-services', icon: <Package size={20} /> },
    { label: 'Logistics', path: '/procurement', icon: <Truck size={20} /> },
    { label: 'Treasury', path: '/financials', icon: <Wallet size={20} /> },
  ],
  admin: [
    { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Registry', path: '/explore', icon: <Globe size={20} /> },
    { label: 'Audit', path: '/audit-report', icon: <ClipboardCheck size={20} /> },
  ]
};