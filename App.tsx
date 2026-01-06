
import React, { useState } from 'react';
// Fix: Using namespace import for react-router-dom to resolve named export errors
import * as ReactRouterDOM from 'react-router-dom';
import Layout from './components/Layout';
import PublicNav from './components/PublicNav';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import CompleteProfile from './pages/CompleteProfile';
import Discover from './pages/Discover';
import Explore from './pages/Explore';
import AuditReport from './pages/AuditReport';
import Settings from './pages/Settings';
import RequirementDetail from './pages/RequirementDetail';
import ServiceDetail from './pages/ServiceDetail';
import Applications from './pages/Applications';
import ApplicationDetail from './pages/ApplicationDetail';
import Profile from './pages/Profile';
import Communications from './pages/Communications';
import NewProject from './pages/NewProject';
import NewService from './pages/NewService';
import ScriptReader from './pages/ScriptReader';
import SceneShotManager from './pages/SceneShotManager';
import ContinuityLog from './pages/ContinuityLog';
import Financials from './pages/Financials';
import ContextPanel from './components/ContextPanel';
import TalentDeepDive from './pages/TalentDeepDive';
import VendorDeepDive from './pages/VendorDeepDive';
import ProductionDeepDive from './pages/ProductionDeepDive';
import WhyClap from './pages/WhyClap';
import VendorCatalog from './pages/VendorCatalog';
import TestScenario from './pages/TestScenario';
import AIAssistant from './pages/AIAssistant';
import ProjectWorkspace from './pages/ProjectWorkspace';
import MediaVault from './pages/MediaVault';
import Auditions from './pages/Auditions';
import AuditionDetail from './pages/AuditionDetail';
import ApplyRole from './pages/ApplyRole';
import Insights from './pages/Insights';
import CrewJoin from './pages/CrewJoin';
import LocationsManager from './pages/LocationsManager';
import ProductionProjects from './pages/ProductionProjects';
import ProductionCasting from './pages/ProductionCasting';
import ProcurementTracker from './pages/ProcurementTracker';
import DailyProductionReport from './pages/DailyProductionReport';
import ContractSigning from './pages/ContractSigning';
import { UserRole, User } from './types';

const { HashRouter, Routes, Route, Navigate, useNavigate } = ReactRouterDOM;

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [mirrorRole, setMirrorRole] = useState<UserRole | undefined>(undefined);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/onboarding');
  };
  
  const handleOnboardingComplete = (role: UserRole) => {
    setUser({
      id: 'u-current',
      name: 'User',
      email: '',
      role,
      verified: false,
      isProfileComplete: false,
      capabilities: ['VIEW'],
      assignedUnits: [],
      assignedDepts: []
    } as User);
    navigate('/complete-profile');
  };

  const handleProfileFinalization = (updatedData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updatedData, isProfileComplete: true } : null);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setMirrorRole(undefined);
    navigate('/');
  };

  const toggleContext = () => setIsContextOpen(!isContextOpen);
  const activeDisplayRole = mirrorRole || user?.role || 'talent';

  return (
    <>
      <Routes>
        <Route path="/" element={<><PublicNav onStart={handleStart} /><Landing onStart={handleStart} /></>} />
        <Route path="/solutions/talent" element={<><PublicNav onStart={handleStart} /><TalentDeepDive onStart={handleStart} /></>} />
        <Route path="/solutions/vendor" element={<><PublicNav onStart={handleStart} /><VendorDeepDive onStart={handleStart} /></>} />
        <Route path="/solutions/production" element={<><PublicNav onStart={handleStart} /><ProductionDeepDive onStart={handleStart} /></>} />
        <Route path="/why-clap" element={<><PublicNav onStart={handleStart} /><WhyClap onStart={handleStart} /></>} />
        <Route path="/join/:projectId" element={<CrewJoin onComplete={(userData) => {
          setUser(userData);
          navigate('/workspace');
        }} />} />
        <Route path="/onboarding" element={<Onboarding onComplete={handleOnboardingComplete} />} />
        <Route path="/complete-profile" element={user ? <CompleteProfile user={user} onComplete={handleProfileFinalization} /> : <Navigate to="/" />} />

        {user?.isProfileComplete ? (
          <Route path="/*" element={
            <Layout 
              role={user.role} 
              activeMirrorRole={mirrorRole}
              onMirrorRoleChange={(r) => setMirrorRole(r === user.role ? undefined : r)}
              onLogout={handleLogout} 
              onToggleContext={toggleContext}
            >
              <Routes>
                <Route path="/dashboard" element={<Dashboard role={activeDisplayRole} user={user} />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/audit-report" element={<AuditReport />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/vault" element={<MediaVault />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/auditions" element={<Auditions />} />
                <Route path="/auditions/:id" element={<AuditionDetail />} />
                <Route path="/auditions/:id/apply" element={<ApplyRole />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/messages" element={<Communications role={activeDisplayRole} />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/applications/:id" element={<ApplicationDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings user={user} />} />
                <Route path="/script" element={<ScriptReader />} />
                <Route path="/projects" element={<ProductionProjects />} />
                <Route path="/projects/new" element={<NewProject />} />
                <Route path="/workspace" element={<ProjectWorkspace role={activeDisplayRole} user={user} />} />
                <Route path="/slate" element={<SceneShotManager user={user} />} />
                <Route path="/casting" element={<ProductionCasting />} />
                <Route path="/procurement" element={<ProcurementTracker />} />
                <Route path="/reports" element={<DailyProductionReport />} />
                <Route path="/locations" element={<LocationsManager />} />
                <Route path="/logbook" element={<ContinuityLog />} />
                <Route path="/financials" element={<Financials />} />
                <Route path="/my-services" element={<VendorCatalog />} />
                <Route path="/my-services/new" element={<NewService />} />
                <Route path="/test-suite" element={<TestScenario />} />
                <Route path="/ai-genie" element={<AIAssistant />} />
                <Route path="/contract/:id" element={<ContractSigning />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Layout>
          } />
        ) : (
          <Route path="/*" element={<Navigate to="/" />} />
        )}
      </Routes>
      
      {user?.isProfileComplete && (
        <ContextPanel 
          isOpen={isContextOpen} 
          onClose={() => setIsContextOpen(false)} 
          role={activeDisplayRole}
        />
      )}
    </>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
