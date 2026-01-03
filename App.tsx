
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PublicNav from './components/PublicNav';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import CompleteProfile from './pages/CompleteProfile';
import Discover from './pages/Discover';
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
import { UserRole, User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [mirrorRole, setMirrorRole] = useState<UserRole | undefined>(undefined);

  const handleStart = () => setIsAuthenticated(true);
  
  const handleOnboardingComplete = (role: UserRole) => {
    setUser({
      id: 'u-current',
      name: 'User',
      email: '',
      role,
      verified: false,
      isProfileComplete: false
    } as User);
  };

  const handleProfileFinalization = (updatedData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updatedData, isProfileComplete: true } : null);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setMirrorRole(undefined);
  };

  const toggleContext = () => setIsContextOpen(!isContextOpen);

  if (!isAuthenticated && !user) {
    return (
      <Router>
        <PublicNav onStart={handleStart} />
        <Routes>
          <Route path="/" element={<Landing onStart={handleStart} />} />
          <Route path="/solutions/talent" element={<TalentDeepDive onStart={handleStart} />} />
          <Route path="/solutions/vendor" element={<VendorDeepDive onStart={handleStart} />} />
          <Route path="/solutions/production" element={<ProductionDeepDive onStart={handleStart} />} />
          <Route path="/why-clap" element={<WhyClap onStart={handleStart} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  if (isAuthenticated && !user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (user && !user.isProfileComplete) {
    return <CompleteProfile user={user} onComplete={handleProfileFinalization} />;
  }

  const activeDisplayRole = mirrorRole || user?.role || 'talent';

  return (
    <Router>
      <Layout 
        role={user?.role || 'talent'} 
        activeMirrorRole={mirrorRole}
        onMirrorRoleChange={(r) => setMirrorRole(r === user?.role ? undefined : r)}
        onLogout={handleLogout} 
        onToggleContext={toggleContext}
      >
        <Routes>
          <Route path="/" element={<Dashboard role={activeDisplayRole} />} />
          <Route path="/dashboard" element={<Dashboard role={activeDisplayRole} />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/discover/:id" element={<RequirementDetail />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/messages" element={<Communications />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/:id" element={<ApplicationDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/script" element={<ScriptReader />} />
          <Route path="/projects" element={<ProductionProjects />} />
          <Route path="/projects/new" element={<NewProject />} />
          <Route path="/slate" element={<SceneShotManager />} />
          <Route path="/logbook" element={<ContinuityLog />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/my-services" element={<VendorCatalog />} />
          <Route path="/my-services/new" element={<NewService />} />
          <Route path="/test-suite" element={<TestScenario />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
      <ContextPanel isOpen={isContextOpen} onClose={() => setIsContextOpen(false)} />
    </Router>
  );
};

const ProductionProjects = () => <div className="text-white">Production Projects List</div>;

export default App;
