
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  ChevronLeft, 
  Clapperboard, 
  Briefcase, 
  Layers, 
  Phone, 
  Mail, 
  UserCheck, 
  CheckCircle2, 
  Sparkles,
  Smartphone,
  Info,
  Users,
  Lock,
  Network,
  Cpu,
  ArrowRight,
  FileText,
  ShieldAlert,
  Fingerprint
} from 'lucide-react';
import Select from '../components/Select';
import TagInput from '../components/TagInput';
import { MOCK_PROJECTS } from '../constants';
import { User as UserType, Capability, Department } from '../types';

interface CrewJoinProps {
  onComplete: (user: UserType) => void;
}

// Fix: Updated DEPARTMENTS list to match types and use 'Costume' instead of 'Wardrobe', added 'Cast'
const DEPARTMENTS: Department[] = [
  'Direction', 'Production', 'Camera', 'Art', 'Sound', 'Costume', 'Grip', 'Electric', 'Logistics', 'Cast'
];

// Fix: Updated key 'Wardrobe' to 'Costume' to match Department type
const ROLES_BY_DEPT: Record<string, string[]> = {
  'Direction': ['Director', '1st AD', '2nd AD', 'Script Supervisor'],
  'Camera': ['DOP', 'Camera Operator', '1st AC', '2nd AC', 'DIT'],
  'Production': ['Line Producer', 'EP', 'Production Manager', 'PA'],
  'Art': ['Production Designer', 'Art Director', 'Set Dresser', 'Prop Master'],
  'Sound': ['Sound Mixer', 'Boom Op'],
  'Costume': ['Costume Designer', 'Wardrobe Supervisor', 'Set Costumer'],
  'Logistics': ['Locations Manager', 'Unit Manager', 'Production Coordinator'],
  'Cast': ['Lead Actor', 'Supporting', 'Background', 'Stunt']
};

// Requirement 5.1: Initial Capability Mapping
const GET_INITIAL_CAPABILITIES = (dept: string, role: string): Capability[] => {
  const base: Capability[] = ['VIEW', 'COMMENT'];
  if (['Director', 'DOP', 'Line Producer', '1st AD'].includes(role)) {
    return [...base, 'UPLOAD', 'ASSIGN', 'APPROVE', 'OVERRIDE'];
  }
  if (['PA', '2nd AC', 'Set Dresser', 'DIT'].includes(role)) {
    return [...base, 'UPLOAD'];
  }
  return base;
};

const CrewJoin: React.FC<CrewJoinProps> = ({ onComplete }) => {
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const project = MOCK_PROJECTS.find(p => p.id === projectId) || MOCK_PROJECTS[0];
  
  const prefilledUnit = searchParams.get('unit') || 'Unit A';

  const [step, setStep] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const [assignmentComplete, setAssignmentComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dept: 'Camera' as Department,
    primaryRole: 'DOP',
    unit: prefilledUnit,
    secondaryRoles: [] as string[],
    experienceTags: [] as string[],
    emergencyContact: '',
    agreedToNDA: false,
    agreedToSafety: false
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleFinish = () => {
    setIsSyncing(true);
    // Simulate Requirement 4.3 & 5.1: Automatic Assignment Logic
    setTimeout(() => {
      setIsSyncing(false);
      setAssignmentComplete(true);
    }, 2500);
  };

  const handleEnterWorkspace = () => {
    onComplete({
      id: 'u-crew-' + Math.random().toString(36).substr(2, 5),
      name: formData.name,
      email: formData.email,
      role: 'production',
      verified: true,
      isProfileComplete: true,
      specialty: formData.primaryRole,
      skills: [...formData.secondaryRoles, ...formData.experienceTags],
      capabilities: GET_INITIAL_CAPABILITIES(formData.dept, formData.primaryRole),
      assignedUnits: [formData.unit],
      assignedDepts: [formData.dept]
    } as UserType);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/10 via-black to-black z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-red-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header: Project Context */}
        {!assignmentComplete && (
          <header className="text-center space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-500 text-[10px] font-black tracking-widest uppercase">
                <Clapperboard size={14} className="animate-pulse" /> Mission Ingest Hub
             </div>
             <h1 className="text-4xl md:text-6xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
                Joining <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">{project.title}</span>
             </h1>
             <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Step {step} of 4 • Ingest Protocol</p>
          </header>
        )}

        {/* Form Container */}
        <div className="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-3xl min-h-[500px] flex flex-col relative overflow-hidden group">
           
           {!isSyncing && !assignmentComplete && (
             <>
               <div className="flex-1">
                 {step === 1 && (
                   <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Identity Ingest</h3>
                        <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">Registry ID & Node Parameters</p>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Full Legal Name</label>
                           <input 
                            type="text" 
                            placeholder="e.g. Marcus T."
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all uppercase tracking-widest text-xs"
                           />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Phone Node</label>
                              <div className="relative">
                                <Phone size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" />
                                <input 
                                  type="text" 
                                  placeholder="+91..."
                                  value={formData.phone}
                                  onChange={e => setFormData({...formData, phone: e.target.value})}
                                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all text-xs"
                                />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Email Node</label>
                              <div className="relative">
                                <Mail size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600" />
                                <input 
                                  type="email" 
                                  placeholder="name@studio.com"
                                  value={formData.email}
                                  onChange={e => setFormData({...formData, email: e.target.value})}
                                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all text-xs"
                                />
                              </div>
                           </div>
                        </div>
                      </div>
                   </div>
                 )}

                 {step === 2 && (
                   <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Operational Logic</h3>
                        <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">Department & Node Scaling</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Department</label>
                           <Select 
                             value={formData.dept}
                             onChange={e => {
                               const newDept = e.target.value as Department;
                               setFormData({...formData, dept: newDept, primaryRole: ROLES_BY_DEPT[newDept][0]});
                             }}
                             options={DEPARTMENTS.map(d => ({ label: d.toUpperCase(), value: d }))}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Primary Role</label>
                           <Select 
                             value={formData.primaryRole}
                             onChange={e => setFormData({...formData, primaryRole: e.target.value})}
                             options={ROLES_BY_DEPT[formData.dept].map(r => ({ label: r.toUpperCase(), value: r }))}
                           />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Assigned Unit</label>
                        <div className="grid grid-cols-3 gap-3">
                           {['Unit A', 'Unit B', 'Logistics'].map(u => (
                             <button 
                               key={u}
                               onClick={() => setFormData({...formData, unit: u})}
                               className={`py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                                 formData.unit === u ? 'bg-red-600 border-red-500 text-white shadow-xl' : 'bg-black/40 border-white/5 text-neutral-700 hover:text-white'
                               }`}
                             >
                               {u}
                             </button>
                           ))}
                        </div>
                      </div>
                   </div>
                 )}

                 {step === 3 && (
                   <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Safety Parameters</h3>
                        <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">Emergency & Skill Mapping</p>
                      </div>

                      <div className="space-y-6">
                        <TagInput 
                          label="Additional Expertise"
                          tags={formData.secondaryRoles}
                          onChange={tags => setFormData({...formData, secondaryRoles: tags})}
                          placeholder="e.g. Focus Puller, Gimbal Op"
                          accentColor="blue-500"
                        />
                        
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Emergency Node (Name & Phone)</label>
                           <input 
                            type="text" 
                            placeholder="Name - Phone"
                            value={formData.emergencyContact}
                            onChange={e => setFormData({...formData, emergencyContact: e.target.value})}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all italic text-xs"
                           />
                        </div>
                      </div>
                   </div>
                 )}

                 {step === 4 && (
                   <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Compliance Sync</h3>
                        <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">PPA & NDA Authorization</p>
                      </div>

                      <div className="space-y-4">
                         {[
                           { 
                             id: 'agreedToNDA', 
                             label: 'Digital NDA Acknowledgment', 
                             desc: 'Strict confidentiality of script, slates, and on-set material.', 
                             icon: <Lock size={16} /> 
                           },
                           { 
                             id: 'agreedToSafety', 
                             label: 'Set Safety & Code Protocol', 
                             desc: 'Adherence to PPA safety standards and unit conduct.', 
                             icon: <ShieldAlert size={16} /> 
                           }
                         ].map(item => (
                           <button 
                             key={item.id}
                             onClick={() => setFormData(p => ({ ...p, [item.id]: !p[item.id as keyof typeof p] }))}
                             className={`w-full p-6 rounded-[1.5rem] border text-left flex gap-6 transition-all active-scale ${
                               formData[item.id as keyof typeof formData] ? 'bg-red-600/10 border-red-500 text-white' : 'bg-black/40 border-white/5 text-neutral-500'
                             }`}
                           >
                              <div className={`p-3 rounded-xl transition-all ${formData[item.id as keyof typeof formData] ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-600'}`}>
                                 {item.icon}
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[11px] font-black uppercase tracking-widest leading-none">{item.label}</p>
                                 <p className="text-[9px] font-bold uppercase opacity-60 leading-relaxed">{item.desc}</p>
                              </div>
                              {formData[item.id as keyof typeof formData] && <CheckCircle2 size={16} className="ml-auto text-red-500" />}
                           </button>
                         ))}
                      </div>

                      <div className="p-5 bg-blue-600/5 border border-blue-600/10 rounded-2xl flex items-start gap-4">
                         <Info size={16} className="text-blue-500 mt-1 shrink-0" />
                         <p className="text-[9px] font-bold text-neutral-500 uppercase leading-relaxed tracking-widest italic">
                            Your digital signature is timestamped and hashed to your CLAP ID for legal audit.
                         </p>
                      </div>
                   </div>
                 )}
               </div>

               <div className="mt-12 flex gap-4 pt-8 border-t border-white/5">
                  {step > 1 && (
                    <button onClick={handleBack} className="px-10 py-5 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all">
                      <ChevronLeft size={18} />
                    </button>
                  )}
                  <button 
                    onClick={step === 4 ? handleFinish : handleNext}
                    disabled={
                      (step === 1 && (!formData.name || !formData.email)) ||
                      (step === 4 && (!formData.agreedToNDA || !formData.agreedToSafety))
                    }
                    className="flex-1 py-5 bg-red-600 hover:bg-red-700 disabled:opacity-20 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl shadow-red-600/30 transition-all active-scale flex items-center justify-center gap-3"
                  >
                    {step === 4 ? 'AUTHORIZE INGEST' : 'CONTINUE'} {step < 4 && <ChevronRight size={18} />}
                  </button>
               </div>
             </>
           )}

           {isSyncing && (
             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 py-10 animate-in zoom-in-95 duration-1000">
                <div className="relative">
                   <div className="w-24 h-24 bg-neutral-900 rounded-[2rem] border border-white/10 flex items-center justify-center text-red-500 shadow-3xl">
                      <Zap size={40} className="animate-pulse" />
                   </div>
                   <div className="absolute inset-0 border-2 border-red-600/20 rounded-[2rem] animate-ping" />
                </div>
                
                <div className="space-y-4">
                   <h3 className="text-4xl font-cinematic font-bold text-white uppercase tracking-widest">Ingesting...</h3>
                   <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Syncing Node to Project Ledger</p>
                </div>

                <div className="bg-black/40 border border-white/5 p-6 rounded-[2rem] w-full max-w-sm text-left space-y-3">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-neutral-600">Compliance</span>
                      <span className="text-green-500">VERIFIED</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-neutral-600">Dept/Unit</span>
                      <span className="text-white">{formData.dept} • {formData.unit}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-neutral-600">Encryption</span>
                      <span className="text-blue-500">256-BIT AES</span>
                   </div>
                </div>
             </div>
           )}

           {assignmentComplete && (
             <div className="flex-1 space-y-10 py-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="text-center space-y-4">
                   <div className="w-24 h-24 bg-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-3xl transform rotate-12 mb-6">
                      <CheckCircle2 size={48} className="text-white" />
                   </div>
                   <h2 className="text-4xl md:text-5xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Node Activated</h2>
                   <p className="text-neutral-500 text-xs md:text-sm font-bold uppercase tracking-widest">Requirement 5.1: Multi-Unit Capability Synced</p>
                </div>

                <div className="space-y-3">
                   <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Digital Passport Manifest</p>
                   <div className="grid gap-3">
                      {[
                        { label: 'Project Enrollment', val: project.title, icon: <Clapperboard size={14}/> },
                        { label: 'Operational Role', val: formData.primaryRole, icon: <Users size={14}/> },
                        { label: 'Unit Status', val: 'ACTIVE • ' + formData.unit, icon: <Network size={14}/> },
                        { label: 'System Clearance', val: GET_INITIAL_CAPABILITIES(formData.dept, formData.primaryRole).join(' • '), icon: <Fingerprint size={14}/> }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-black/40 border border-white/5 rounded-2xl group transition-all hover:border-green-600/30">
                           <div className="flex items-center gap-4">
                              <div className="text-green-500">{item.icon}</div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">{item.label}</span>
                           </div>
                           <span className="text-[11px] font-bold text-white uppercase truncate max-w-[150px] text-right">{item.val}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                   <button 
                    onClick={handleEnterWorkspace}
                    className="w-full py-6 bg-white text-black font-black rounded-2xl text-[12px] uppercase tracking-[0.5em] shadow-3xl active-scale flex items-center justify-center gap-4 group"
                   >
                     LAUNCH MISSION INTERFACE <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                   </button>
                </div>
             </div>
           )}

           <div className="scanline opacity-[0.03]" />
        </div>
      </div>

      <footer className="fixed bottom-10 text-center opacity-20 pointer-events-none">
         <p className="text-[8px] font-black text-white uppercase tracking-[0.8em]">CLAP OS • SECURE INGEST v4.2 • REGION MUMBAI</p>
      </footer>
    </div>
  );
};

export default CrewJoin;