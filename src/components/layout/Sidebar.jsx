import React from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  BookOpen, 
  Users, 
  Wallet, 
  HeartHandshake, 
  MessageSquare, 
  Building2, 
  ShieldCheck, 
  GraduationCap, 
  BarChart3,
  Settings,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'admissions', label: 'Admissions & Enrollment', icon: UserPlus },
  { id: 'academic', label: 'Academic Management', icon: BookOpen },
  { id: 'staff', label: 'Staff & HR', icon: Users },
  { id: 'finance', label: 'Finance & Accounting', icon: Wallet },
  { id: 'welfare', label: 'Student Welfare', icon: HeartHandshake },
  { id: 'comm', label: 'Communication', icon: MessageSquare },
  { id: 'campus', label: 'Campus & Facilities', icon: Building2 },
  { id: 'admin', label: 'Administration', icon: ShieldCheck },
  { id: 'careers', label: 'Careers & Alumni', icon: GraduationCap },
  { id: 'intelligence', label: 'AI Intelligence', icon: BarChart3 },
];

const sidebarItems = {
  student: ['dashboard', 'admissions', 'academic', 'comm', 'welfare'],
  employee: ['dashboard', 'admissions', 'academic', 'staff', 'finance', 'welfare', 'comm', 'campus', 'admin', 'careers', 'intelligence'],
  parent: ['dashboard', 'academic', 'comm', 'welfare'],
  alumni: ['dashboard', 'careers', 'comm'],
};

const Sidebar = ({ activeTab, setActiveTab, userRole }) => {
  const visibleItems = menuItems.filter(item => 
    sidebarItems[userRole]?.includes(item.id)
  );

  return (
    <aside className="sidebar glass flex flex-col h-full">
      <div className="sidebar-logo">
        <div className="logo-icon">NR</div>
        <span>NRIT Academic</span>
      </div>
      
      <nav className="sidebar-nav">
        {visibleItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
            {activeTab === item.id && <ChevronRight size={16} className="active-indicator" />}
          </button>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={20} />
          <span>System Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
