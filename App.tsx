
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Auditions from './pages/Auditions';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import MediaVault from './pages/MediaVault';
import TalentDiscovery from './pages/TalentDiscovery';
import ProductionProjects from './pages/ProductionProjects';
import ProjectWorkspace from './pages/ProjectWorkspace';
import AIAssistant from './pages/AIAssistant';
import { UserRole } from './types';
import { MOCK_SERVICES, MOCK_BOOKINGS } from './constants';
import { ShoppingBag, Truck, DollarSign, Package, Star, MapPin, Briefcase, Plus, MessageSquare, Zap, BrainCircuit, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleStart = () => {
    setIsAuthenticated(true);
  };

  const handleOnboardingComplete = (role: UserRole) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole('guest');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated && userRole === 'guest') {
    return <Landing onStart={handleStart} />;
  }

  if (isAuthenticated && userRole === 'guest') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Router>
      <Layout role={userRole} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard role={userRole} />} />
          <Route path="/dashboard" element={<Dashboard role={userRole} />} />
          
          {/* Talent Specific Routes */}
          <Route path="/auditions" element={<Auditions />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/vault" element={<MediaVault />} />
          <Route path="/profile" element={<Profile />} />

          {/* Production Specific Routes */}
          <Route path="/projects" element={<ProductionProjects />} />
          <Route path="/talent-discovery" element={<TalentDiscovery />} />
          <Route path="/workspace" element={<ProjectWorkspace />} />
          <Route path="/ai-genie" element={<AIAssistant />} />

          {/* Marketplace & Vendors */}
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/my-services" element={<VendorServices />} />
          <Route path="/bookings" element={<VendorBookings />} />
          <Route path="/quotations" element={<Placeholder title="QUOTATIONS HUB" icon={<DollarSign size={32} />} />} />

          {/* Core Unified Pages */}
          <Route path="/discover" element={<Placeholder title="DISCOVER CLAP" icon={<ZapIcon />} />} />
          <Route path="/messages" element={<Placeholder title="CONVERSATIONS" icon={<MessageIcon />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

const Marketplace = () => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-1">
        <h2 className="text-4xl font-cinematic font-bold tracking-tight">VENDOR MARKETPLACE</h2>
        <p className="text-neutral-400">Professional services for every production scale.</p>
      </div>
      <div className="flex gap-2">
        <button className="px-5 py-2.5 bg-neutral-900 border border-white/5 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-red-600/50 transition-all">Filter Services</button>
        <button className="px-5 py-2.5 bg-neutral-900 border border-white/5 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-red-600/50 transition-all">Location: Mumbai</button>
      </div>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {MOCK_SERVICES.map(service => (
        <div key={service.id} className="bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-red-600/40 transition-all flex flex-col h-full shadow-2xl">
          <div className="aspect-[16/10] overflow-hidden relative">
            <img src={service.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={service.name} />
            <div className="absolute top-4 left-4">
              <span className="bg-black/60 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full text-red-500 uppercase tracking-widest border border-red-500/20">{service.category}</span>
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
               <div>
                 <h4 className="text-2xl font-cinematic font-bold tracking-wide group-hover:text-red-500 transition-colors mb-1">{service.name}</h4>
                 <div className="flex items-center gap-1 text-neutral-500 text-[10px] font-bold uppercase tracking-widest">
                    <Star size={12} className="text-accent fill-accent" /> 4.9 • <MapPin size={12} /> Juhu, Mumbai
                 </div>
               </div>
               <div className="text-right">
                 <p className="text-2xl font-bold text-white leading-none">{service.price}</p>
                 <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">/{service.unit}</p>
               </div>
            </div>
            <p className="text-sm text-neutral-400 line-clamp-2 mb-8 leading-relaxed">{service.description}</p>
            <div className="mt-auto flex gap-2">
               <button className="flex-1 py-4 bg-red-600 hover:bg-red-700 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-red-600/20">REQUEST BOOKING</button>
               <button className="px-5 py-4 bg-neutral-800 rounded-2xl border border-white/5 hover:bg-neutral-700"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const VendorServices = () => (
  <div className="space-y-10 animate-in fade-in duration-500 pb-20">
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h2 className="text-4xl font-cinematic font-bold tracking-tight">MY SERVICE CATALOG</h2>
        <p className="text-neutral-400">Control your offerings and visibility.</p>
      </div>
      <button className="bg-red-600 px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-red-600/20 flex items-center gap-2">
        <Plus size={18} /> ADD NEW SERVICE
      </button>
    </div>
    <div className="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-4 md:p-8 shadow-2xl">
       <div className="grid gap-4">
         {MOCK_SERVICES.map(service => (
           <div key={service.id} className="flex flex-col md:flex-row md:items-center gap-8 p-6 rounded-[2rem] bg-black/40 border border-white/5 hover:border-red-600/30 transition-all group">
             <div className="w-full md:w-32 aspect-square rounded-2xl overflow-hidden border border-white/10">
               <img src={service.image} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
             </div>
             <div className="flex-1">
               <div className="flex items-center gap-3 mb-2">
                 <h4 className="text-2xl font-cinematic font-bold tracking-wide">{service.name}</h4>
                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${service.availability === 'Available' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                   {service.availability}
                 </span>
               </div>
               <p className="text-sm text-neutral-500 font-bold uppercase tracking-widest mb-1">{service.category} • {service.price}/{service.unit}</p>
               <p className="text-sm text-neutral-400 line-clamp-1">{service.description}</p>
             </div>
             <div className="flex gap-3">
               <button className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Edit Listing</button>
               <button className="px-6 py-3 bg-red-600/10 text-red-500 hover:bg-red-600/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Deactivate</button>
             </div>
           </div>
         ))}
       </div>
    </div>
  </div>
);

const VendorBookings = () => (
  <div className="space-y-10 animate-in fade-in duration-500 pb-20">
    <div className="space-y-1">
      <h2 className="text-4xl font-cinematic font-bold tracking-tight">SERVICE BOOKINGS</h2>
      <p className="text-neutral-400">Track and manage confirmed service requests.</p>
    </div>
    <div className="grid gap-6">
      {MOCK_BOOKINGS.map(booking => (
        <div key={booking.id} className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between group hover:border-red-600/30 transition-all shadow-2xl">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center text-red-500 border border-white/5">
              <Briefcase size={32} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-2xl font-cinematic font-bold tracking-wide">{booking.projectName}</h3>
                <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/20">CONFIRMED</span>
              </div>
              <p className="text-sm text-neutral-500 font-bold uppercase tracking-widest">Client: {booking.vendorName} • Event Date: {booking.date}</p>
            </div>
          </div>
          <div className="mt-6 md:mt-0 flex gap-3">
            <button className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">VIEW INVOICE</button>
            <button className="px-8 py-3 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-all">CONTACT PRODUCTION</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Placeholder = ({ title, icon }: { title: string; icon?: React.ReactNode }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in duration-500">
    <div className="w-24 h-24 bg-neutral-900 border border-white/5 rounded-[2rem] flex items-center justify-center shadow-2xl group">
      <div className="text-neutral-700 group-hover:text-red-500 transition-colors transform group-hover:scale-110 duration-500">
        {icon || <Briefcase size={40} />}
      </div>
    </div>
    <div className="space-y-2">
      <h2 className="text-5xl font-cinematic font-bold tracking-tight">{title}</h2>
      <p className="text-neutral-500 max-w-sm mx-auto font-medium">This professional module is arriving in MVP 1.5. Prepare your production workflows!</p>
    </div>
    <button className="bg-white/5 border border-white/10 px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all">Notify me on rollout</button>
  </div>
);

const ZapIcon = () => <ZapIconComp size={40} className="text-accent fill-accent" />;
const MessageIcon = () => <MessageSquare size={40} className="text-blue-500" />;

const ZapIconComp = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 14.899 15.223 3.826c.701-.689 1.833-.188 1.833.791v8.283h2.944c.762 0 1.228.84.811 1.48L9.588 25.49c-.701.689-1.833.188-1.833-.79v-8.284H4.811c-.762 0-1.228-.84-.811-1.48Z" />
  </svg>
);

export default App;
