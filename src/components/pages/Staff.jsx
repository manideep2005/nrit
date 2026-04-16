import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserCircle, 
  Mail, 
  Phone, 
  Calendar,
  Clock,
  Briefcase,
  BadgeCheck,
  ChevronRight,
  Download,
  CalendarCheck
} from 'lucide-react';

const Staff = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('directory');

  const renderContent = () => {
    switch (activeTab) {
      case 'directory': return <StaffDirectory />;
      case 'leave': return <LeaveManagement />;
      case 'payroll': return <PayrollView />;
      default: return <StaffDirectory />;
    }
  };

  return (
    <div className="staff-container animate-in">
      <div className="sub-nav-header">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'directory' ? 'active' : ''}`}
            onClick={() => setActiveTab('directory')}
          >
            <Users size={18} />
            <span>Staff Directory</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'leave' ? 'active' : ''}`}
            onClick={() => setActiveTab('leave')}
          >
            <CalendarCheck size={18} />
            <span>Leave Management</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'payroll' ? 'active' : ''}`}
            onClick={() => setActiveTab('payroll')}
          >
            <Briefcase size={18} />
            <span>Payroll & Benefits</span>
          </button>
        </div>
      </div>

      <div className="module-content mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

const StaffDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [staffMembers, setStaffMembers] = useState([
    { name: 'Dr. Sarah Smith', role: 'Head of CSE', dept: 'Engineering', status: 'On Duty', image: null },
    { name: 'Prof. Michael Chen', role: 'Professor', dept: 'Mathematics', status: 'On Duty', image: null },
    { name: 'Dr. Emily Adams', role: 'Associate Professor', dept: 'Artificial Intelligence', status: 'In Meeting', image: null },
    { name: 'Robert Wilson', role: 'Admin Coordinator', dept: 'Administration', status: 'Away', image: null },
    { name: 'Lisa Ray', role: 'Student Counselor', dept: 'Student Welfare', status: 'On Duty', image: null },
    { name: 'James Bond', role: 'Accounts Manager', dept: 'Finance', status: 'On Duty', image: null },
  ]);

  const filteredStaff = staffMembers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="directory-view">
      <div className="search-filter-row flex gap-4 mb-6">
        <div className="search-bar flex-1">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search staff by name, role, or department..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-outline" onClick={() => alert('Filter options modal opening...')}>
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="grid-3">
        {filteredStaff.length > 0 ? filteredStaff.map((staff, i) => (
          <div key={i} className="staff-card card flex flex-col gap-4 group hover:shadow-lg transition-all animate-in">
            <div className="flex justify-between items-start">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <UserCircle size={40} />
              </div>
              <span className={`badge ${staff.status === 'On Duty' ? 'success' : staff.status === 'Away' ? 'warning' : 'info'}`} style={{ backgroundColor: staff.status === 'On Duty' ? '#ecfdf5' : '#fffbeb', color: staff.status === 'On Duty' ? '#059669' : '#d97706' }}>
                {staff.status}
              </span>
            </div>
            
            <div className="staff-info">
              <h4 className="m-0 text-lg group-hover:text-violet-600 transition-colors uppercase tracking-tight">{staff.name}</h4>
              <p className="text-sm text-slate-500 m-0 font-medium">{staff.role}</p>
              <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                <Briefcase size={12} /> {staff.dept} department
              </div>
            </div>

            <div className="staff-contact flex gap-2 border-t pt-4">
              <button className="icon-btn flex-1 bg-slate-50 border h-10 rounded-lg hover:bg-violet-50 hover:text-violet-600 transition-all" onClick={() => alert(`Emailing ${staff.name}`)}><Mail size={16} /></button>
              <button className="icon-btn flex-1 bg-slate-50 border h-10 rounded-lg hover:bg-violet-50 hover:text-violet-600 transition-all" onClick={() => alert(`Calling ${staff.name}`)}><Phone size={16} /></button>
              <button className="icon-btn flex-1 bg-slate-50 border h-10 rounded-lg hover:bg-violet-50 hover:text-violet-600 transition-all" onClick={() => alert(`Verifying ${staff.name} credentials...`)}><BadgeCheck size={16} /></button>
            </div>
          </div>
        )) : (
          <div className="col-span-3 py-20 text-center opacity-50">
             <Search size={48} className="mx-auto mb-4" />
             <p>No staff members found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([
    { type: 'Casual', days: '2 Days', date: 'April 10-12, 2026', status: 'Approved' },
    { type: 'Medical', days: '1 Day', date: 'March 25, 2026', status: 'Rejected' },
    { type: 'Emergency', days: '0.5 Day', date: 'March 12, 2026', status: 'Approved' },
  ]);

  const [formData, setFormData] = useState({ type: '', start: '', end: '', reason: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.type || !formData.start) return;
    
    const newLeave = {
      type: formData.type.split(' ')[0],
      days: 'Pending Calculation',
      date: `${formData.start} to ${formData.end || 'TBD'}`,
      status: 'Pending'
    };

    setLeaves([newLeave, ...leaves]);
    alert('Leave request submitted to Department Head!');
    setFormData({ type: '', start: '', end: '', reason: '' });
  };

  return (
    <div className="leave-view grid-2">
      <div className="leave-info flex flex-col gap-6">
        <div className="card h-fit">
          <h3>Available Balances</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
              <span className="text-xs text-violet-600 font-bold uppercase">Paid Leaves</span>
              <div className="text-2xl font-bold text-violet-900 mt-1">12 / 18</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-xs text-emerald-600 font-bold uppercase">Sick Leaves</span>
              <div className="text-2xl font-bold text-emerald-900 mt-1">05 / 10</div>
            </div>
          </div>
        </div>

        <div className="card h-fit p-0 overflow-hidden">
          <div className="p-6 border-b">
            <h3>Recent Leave Applications</h3>
          </div>
          <div className="activity-list">
            {leaves.map((leave, i) => (
              <div key={i} className="activity-item px-6 py-4 border-b animate-in">
                <div className="activity-icon bg-slate-100 text-slate-500"><Calendar size={18} /></div>
                <div className="activity-details">
                  <p className="activity-text font-bold">{leave.type} Leave</p>
                  <span className="activity-time">{leave.date} ({leave.days})</span>
                </div>
                <span 
                  className={`badge ${leave.status === 'Approved' ? 'success' : leave.status === 'Rejected' ? 'danger' : 'info'}`} 
                  style={{ 
                    backgroundColor: leave.status === 'Approved' ? '#ecfdf5' : leave.status === 'Rejected' ? '#fef2f2' : '#f0f9ff', 
                    color: leave.status === 'Approved' ? '#059669' : leave.status === 'Rejected' ? '#dc2626' : '#0369a1' 
                  }}
                >
                  {leave.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="leave-form-container">
        <div className="card">
          <h3>Request Leave</h3>
          <p className="text-sm text-slate-500 mb-6">Plan your absence and get approvals from department head.</p>
          
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Leave Type</label>
              <select 
                className="input" 
                required 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="">Select Leave Type</option>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Paid Leave</option>
                <option>Other</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label>Start Date</label>
                <input 
                  type="date" 
                  className="input" 
                  required 
                  value={formData.start}
                  onChange={(e) => setFormData({...formData, start: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input 
                  type="date" 
                  className="input" 
                  value={formData.end}
                  onChange={(e) => setFormData({...formData, end: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Reason for Leave</label>
              <textarea 
                rows="4" 
                placeholder="Briefly describe the reason for your leave request..."
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary mt-2">Submit Application</button>
          </form>
        </div>
      </div>
    </div>
  );
};


const PayrollView = () => (
  <div className="payroll-view flex flex-col gap-6">
    <div className="stats-grid">
       <div className="stat-card card border-l-4 border-l-violet-600">
          <div className="stat-icon bg-violet-50 text-violet-600">
            <Briefcase size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Current Monthly Base</span>
            <h3 className="stat-value">$4,500.00</h3>
          </div>
       </div>
       <div className="stat-card card">
          <div className="stat-icon bg-blue-50 text-blue-600">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Tax Deduction (YTD)</span>
            <h3 className="stat-value">$8,240.00</h3>
          </div>
       </div>
    </div>

    <div className="card p-0 overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h3>Payslip History</h3>
        <button className="btn btn-sm btn-outline"><Download size={14} /> Download Bulk</button>
      </div>
      <div className="activity-list">
        {[
          { period: 'March 2026', amount: '$4,250.00', date: 'March 31, 2026', status: 'Credited' },
          { period: 'February 2026', amount: '$4,250.00', date: 'February 28, 2026', status: 'Credited' },
          { period: 'January 2026', amount: '$4,320.00', date: 'January 31, 2026', status: 'Credited' },
        ].map((slip, i) => (
          <div key={i} className="activity-item px-6 py-4 border-b hover:bg-slate-50 group">
            <div className="activity-icon bg-slate-100 text-slate-500 group-hover:bg-violet-600 group-hover:text-white transition-all"><FileText size={18} /></div>
            <div className="activity-details">
              <p className="activity-text font-bold">Salary Slip - {slip.period}</p>
              <span className="activity-time">Processed on {slip.date}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="font-bold block">{slip.amount}</span>
                <span className="text-[10px] text-emerald-600 font-bold uppercase">{slip.status}</span>
              </div>
              <button className="action-icon-btn"><Download size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Staff;
