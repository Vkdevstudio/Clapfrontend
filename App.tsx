
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Auditions from './pages/Auditions';
import AuditionDetail from './pages/AuditionDetail';
import ApplyRole from './pages/ApplyRole';
import ServiceDetail from './pages/ServiceDetail';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import MediaVault from './pages/MediaVault';
import TalentDiscovery from './pages/TalentDiscovery';
import ProductionProjects from './pages/ProductionProjects';
import ProjectWorkspace from './pages/ProjectWorkspace';
import AIAssistant from './pages/AIAssistant';
import Communications from './pages/Communications';
import Discover from './pages/Discover';
import NewProject from './pages/NewProject';
import NewService from './pages/NewService';
import CallSheetManagement from './pages/CallSheetManagement';
import ScriptReader from './pages/ScriptReader';
import ContextPanel from './components/ContextPanel';
import { UserRole, Booking } from './types';
import { MOCK_SERVICES, MOCK_BOOKINGS } from './constants';
import { Plus, Eye, Trash2, Settings as SettingsIcon, CheckCircle, FileText, MoreVertical, Truck, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [mirrorRole, setMirrorRole] = useState<UserRole | undefined>(undefined);

  const handleStart = () => setIsAuthenticated(true);
  const handleOnboardingComplete = (role: UserRole) => setUserRole(role);
  const handleLogout = () => {
    setUserRole('guest');
    setIsAuthenticated(false);
    setMirrorRole(undefined);
  };

  const toggleContext = () => setIsContextOpen(!isContextOpen);

  if (!isAuthenticated && userRole === 'guest') {
    return <Landing onStart={handleStart} />;
  }

  if (isAuthenticated && userRole === 'guest') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const activeDisplayRole = mirrorRole || userRole;

  return (
    <Router>
      <Layout 
        role={userRole} 
        activeMirrorRole={mirrorRole}
        onMirrorRoleChange={(r) => setMirrorRole(r === userRole ? undefined : r)}
        onLogout={handleLogout} 
        onToggleContext={toggleContext}
      >
        <Routes>
          <Route path="/" element={<Dashboard role={activeDisplayRole} />} />
          <Route path="/dashboard" element={<Dashboard role={activeDisplayRole} />} />
          
          <Route path="/discover" element={<Discover />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/messages" element={<Communications />} />
          
          <Route path="/auditions" element={<Auditions />} />
          <Route path="/auditions/:id" element={<AuditionDetail />} />
          <Route path="/auditions/:id/apply" element={<ApplyRole />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/vault" element={<MediaVault />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/script" element={<ScriptReader />} />

          <Route path="/projects" element={<ProductionProjects />} />
          <Route path="/projects/new" element={<NewProject />} />
          <Route path="/projects/:projectId/callsheets" element={<CallSheetManagement />} />
          <Route path="/talent-discovery" element={<TalentDiscovery />} />
          <Route path="/workspace" element={<ProjectWorkspace />} />
          <Route path="/ai-genie" element={<AIAssistant />} />

          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/my-services" element={<VendorServices />} />
          <Route path="/my-services/new" element={<NewService />} />
          <Route path="/bookings" element={<VendorBookings />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
      <ContextPanel isOpen={isContextOpen} onClose={() => setIsContextOpen(false)} />
    </Router>
  );
};

// ... Rest of the sub-components refined for cinematic UI ...
const Marketplace = () => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-7xl mx-auto">
    <div className="space-y-2">
      <h2 className="text-4xl md:text-7xl font-cinematic font-bold tracking-tighter uppercase text-white leading-none">Vendor Marketplace</h2>
      <p className="text-neutral-500 text-lg font-medium">Professional assets for world-class productions.</p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {MOCK_SERVICES.map(service => (
        <div key={service.id} className="bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-red-600/40 transition-all flex flex-col h-full shadow-3xl">
          <div className="aspect-[16/10] overflow-hidden relative">
            <img src={service.image} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" alt={service.name} />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase text-red-500 border border-red-500/20">{service.category}</div>
          </div>
          <div className="p-10 flex-1 flex flex-col space-y-6">
            <h4 className="text-3xl font-cinematic font-bold tracking-widest text-white group-hover:text-red-500 transition-colors uppercase">{service.name}</h4>
            <p className="text-neutral-500 text-base leading-relaxed line-clamp-2">{service.description}</p>
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Rate</span>
                  <span className="text-2xl font-cinematic font-bold text-white tracking-widest">{service.price}/{service.unit}</span>
               </div>
               <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-600/30 active-scale">BOOK ASSET</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const VendorServices = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-7xl font-cinematic font-bold tracking-tighter uppercase text-white leading-none">Catalog Core</h2>
          <p className="text-neutral-500 text-lg font-medium">Verified inventory and logistical oversight.</p>
        </div>
        <button 
          onClick={() => navigate('/my-services/new')}
          className="bg-red-600 px-10 py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl shadow-red-600/40 flex items-center gap-3 transition-all transform hover:scale-105 hover:bg-red-700 text-white active-scale"
        >
          <Plus size={20} /> Deploy New Asset
        </button>
      </div>

      <div className="grid gap-8">
        {MOCK_SERVICES.map(service => (
          <div key={service.id} className="bg-neutral-900 border border-white/5 p-10 rounded-[3.5rem] flex items-center justify-between group hover:border-red-600/30 transition-all shadow-3xl backdrop-blur-3xl">
             <div className="flex items-center gap-12">
                <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border border-white/10 group-hover:scale-105 transition-all shadow-2xl relative">
                   <img src={service.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 duration-500" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>
                <div className="space-y-4">
                   <div className="flex items-center gap-4">
                      <h4 className="text-5xl font-cinematic font-bold tracking-tighter uppercase text-white leading-none">{service.name}</h4>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-xl ${
                        service.availability === 'Available' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                      }`}>
                         {service.availability}
                      </span>
                   </div>
                   <div className="flex gap-10 items-center">
                      <div className="flex flex-col">
                         <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Category</span>
                         <p className="text-[12px] font-bold text-red-500 uppercase tracking-[0.2em]">{service.category}</p>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                      <div className="flex flex-col">
                         <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Rate</span>
                         <p className="text-[12px] font-bold text-white uppercase tracking-[0.2em]">{service.price}/{service.unit}</p>
                      </div>
                   </div>
                </div>
             </div>
             <div className="flex gap-4">
                <button 
                  onClick={() => navigate(`/services/${service.id}`)}
                  className="flex items-center gap-3 px-8 py-5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active-scale"
                >
                   <Eye size={18} /> Review
                </button>
                <button className="p-5 bg-red-600/10 border border-red-600/20 rounded-2xl text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-xl active-scale">
                   <Trash2 size={24} />
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VendorBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);

  const handleStatusChange = (id: string, newStatus: any) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      <div className="space-y-2 border-b border-white/5 pb-10">
        <h2 className="text-4xl md:text-7xl font-cinematic font-bold tracking-tighter uppercase text-white leading-none">Operational Fulfillment</h2>
        <p className="text-neutral-500 text-lg font-medium">Dispatch oversight and cyclical rental logistics.</p>
      </div>

      <div className="grid gap-8">
        {bookings.map(booking => (
          <div key={booking.id} className={`bg-neutral-900 border border-white/5 p-12 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between group hover:border-red-600/30 transition-all shadow-3xl backdrop-blur-3xl ${booking.status === 'Fulfilled' ? 'opacity-40 grayscale-[0.8]' : ''}`}>
            <div className="flex items-center gap-12 w-full md:w-auto">
              <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-3xl transform group-hover:rotate-6 transition-transform duration-500 ${
                booking.status === 'Pending' ? 'bg-accent/10 text-accent border-accent/20' : 
                booking.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                'bg-green-500/10 text-green-500 border-green-500/20'
              }`}>
                {booking.status === 'Fulfilled' ? <CheckCircle size={60} /> : <Truck size={60} />}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-5xl font-cinematic font-bold tracking-tighter uppercase text-white leading-none">{booking.projectName}</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-2">
                   <div className="flex flex-col">
                      <p className="text-[9px] text-neutral-600 font-black uppercase tracking-widest">Client Entity</p>
                      <p className="text-[13px] text-neutral-300 font-bold uppercase tracking-widest">{booking.clientName}</p>
                   </div>
                   <div className="flex flex-col">
                      <p className="text-[9px] text-neutral-600 font-black uppercase tracking-widest">Cycle Value</p>
                      <p className="text-[13px] text-green-500 font-black uppercase tracking-widest">{booking.amount}</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-8 mt-10 md:mt-0">
               <div className="text-right space-y-1">
                  <p className="text-[9px] font-black text-neutral-700 uppercase tracking-[0.4em]">Logistical State</p>
                  <p className={`text-3xl font-cinematic font-bold uppercase tracking-[0.1em] ${
                    booking.status === 'Pending' ? 'text-accent' : 
                    booking.status === 'Fulfilled' ? 'text-green-500' : 'text-blue-500'
                  }`}>{booking.status}</p>
               </div>
               <div className="flex gap-4">
                  {booking.status === 'Pending' && (
                    <button onClick={() => handleStatusChange(booking.id, 'Confirmed')} className="px-12 py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-3xl shadow-red-600/30 transition-all active-scale">CONFIRM</button>
                  )}
                  {booking.status === 'Confirmed' && (
                    <button onClick={() => handleStatusChange(booking.id, 'Fulfilled')} className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-3xl shadow-blue-600/30 transition-all active-scale">DISPATCH</button>
                  )}
                  {booking.status === 'Fulfilled' && (
                    <button className="flex items-center gap-3 px-10 py-5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest border border-white/5 shadow-2xl group active-scale">
                      <FileText size={20} className="group-hover:scale-110 transition-transform" /> GENERATE INVOICE
                    </button>
                  )}
                  <button className="p-5 bg-black/40 rounded-2xl text-neutral-700 hover:text-white transition-all border border-white/5 active-scale">
                    <MoreVertical size={24} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Settings = () => (
  <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
    <div className="space-y-4 text-center md:text-left border-b border-white/5 pb-10">
      <h2 className="text-5xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase text-white leading-none">System Control</h2>
      <p className="text-neutral-500 text-lg font-medium">Verified settings and platform permissions.</p>
    </div>
    <div className="space-y-6">
      {[
        { title: 'Identity & Production Access', desc: 'Manage verified roles and craft permissions.' },
        { title: 'Privacy & Discoverability', desc: 'Control how production leads find your profile.' },
        { title: 'Security & Auth', desc: 'Manage session keys and biometric device logs.' }
      ].map((item, i) => (
        <div key={i} className="p-12 bg-neutral-900 border border-white/5 rounded-[3.5rem] flex items-center justify-between group hover:border-red-600/40 transition-all cursor-pointer bg-black/20 shadow-3xl active-scale">
           <div className="space-y-2 text-white">
              <h4 className="text-4xl font-cinematic font-bold tracking-widest uppercase mb-1 group-hover:text-red-500 transition-colors leading-none">{item.title}</h4>
              <p className="text-neutral-500 font-medium text-base">{item.desc}</p>
           </div>
           <div className="p-6 bg-neutral-900 rounded-3xl border border-white/5 group-hover:bg-red-600 group-hover:text-white transition-all shadow-2xl">
              <ChevronRight className="transition-all group-hover:translate-x-2" size={32} />
           </div>
        </div>
      ))}
    </div>
  </div>
);

export default App;
