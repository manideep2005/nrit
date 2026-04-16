import React from 'react';
import { Bell, Search, User, LogOut, Menu } from 'lucide-react';

const Header = ({ activeTab, userRole, onLogout }) => {
  const getTabTitle = () => {
    const titles = {
      dashboard: 'Academic Overview',
      admissions: 'Admissions & Enrollment',
      academic: 'Academic Management',
      staff: 'Staff & HR',
      finance: 'Finance & Accounting',
      welfare: 'Student Welfare',
      comm: 'Communication',
      campus: 'Campus & Facilities',
      admin: 'Administration',
      careers: 'Careers & Alumni',
      intelligence: 'AI Intelligence',
    };
    return titles[activeTab] || 'Dashboard';
  };

  return (
    <header className="header glass">
      <div className="header-left">
        <button className="menu-btn"><Menu size={20} /></button>
        <h1 className="header-title">{getTabTitle()}</h1>
      </div>

      <div className="header-right">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search records, students, staff..." />
        </div>

        <div className="action-buttons">
          <button className="icon-btn">
            <Bell size={20} />
            <span className="notif-badge">3</span>
          </button>
          
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">Rahul</span>
              <span className="user-role badge-role">{userRole?.toUpperCase()}</span>
            </div>
            <div className="user-avatar">
              <img src="/IMG_2817.jpg" alt="User Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
          </div>
          
          <button className="icon-btn logout-btn" onClick={onLogout}>
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
