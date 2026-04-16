import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './components/pages/Dashboard';
import AdmissionsPage from './components/pages/Admissions';
import AcademicPage from './components/pages/Academic';
import StaffPage from './components/pages/Staff';
import FinancePage from './components/pages/Finance';
import WelfarePage from './components/pages/Welfare';
import CommPage from './components/pages/Comm';
import CampusPage from './components/pages/Campus';
import AdminPage from './components/pages/Admin';
import CareersPage from './components/pages/Careers';
import IntelligencePage from './components/pages/Intelligence';
import RoleSelection from './components/pages/RoleSelection';
import Auth from './components/pages/Auth';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRoleForAuth, setSelectedRoleForAuth] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRoleForAuth(role);
  };

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
    if (role === 'student') setActiveTab('admissions');
    else setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setSelectedRoleForAuth(null);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage userRole={userRole} />;
      case 'admissions':
        return <AdmissionsPage userRole={userRole} />;
      case 'academic':
        return <AcademicPage userRole={userRole} />;
      case 'staff':
        return <StaffPage userRole={userRole} />;
      case 'finance':
        return <FinancePage userRole={userRole} />;
      case 'welfare':
        return <WelfarePage userRole={userRole} />;
      case 'comm':
        return <CommPage userRole={userRole} />;
      case 'campus':
        return <CampusPage userRole={userRole} />;
      case 'admin':
        return <AdminPage userRole={userRole} />;
      case 'careers':
        return <CareersPage userRole={userRole} />;
      case 'intelligence':
        return <IntelligencePage userRole={userRole} />;
      default:
        return <DashboardPage userRole={userRole} />;
    }
  };

  if (!isAuthenticated && !selectedRoleForAuth) {
    return <RoleSelection onSelectRole={handleRoleSelect} />;
  }

  if (!isAuthenticated && selectedRoleForAuth) {
    return (
      <Auth 
        role={selectedRoleForAuth} 
        onBack={() => setSelectedRoleForAuth(null)} 
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userRole={userRole} 
      />
      
      <main className="main-layout">
        <Header activeTab={activeTab} userRole={userRole} onLogout={handleLogout} />
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
