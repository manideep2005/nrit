import React, { useState } from 'react';
import { 
  Users, GraduationCap, Calendar, TrendingUp, FileText, 
  CheckCircle2, AlertCircle, ArrowUpRight, Loader2,
  BookOpen, Award, Wallet, Building, ArrowRight, X
} from 'lucide-react';
import { useFetchData } from '../../hooks/useFetchData';
import { apiClient } from '../../services/apiClient';

// Map string icon names to Lucide components
const iconMap = { Users, GraduationCap, Calendar, TrendingUp, FileText, CheckCircle2, AlertCircle, BookOpen, Award, Wallet, Building };

// Reusable Stat Grid components
const StatGrid = ({ loading, error, stats }) => {
  if (loading) return <div className="card flex items-center justify-center p-6 w-full text-slate-400"><Loader2 className="animate-spin mr-2" /> Loading Statistics...</div>;
  if (error) return <div className="text-red-500 card">Error: {error}</div>;
  if (!stats) return null;

  return (
    <div className="stats-grid">
      {stats.map((stat, i) => {
        const Icon = iconMap[stat.icon] || Users;
        return (
          <div key={i} className="stat-card card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <Icon size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <div className="stat-value-group">
                <h3 className="stat-value">{stat.value}</h3>
                <span className={`stat-change ${stat.change.includes('-') || stat.change.includes('Due') ? 'negative' : 'positive'}`}>{stat.change}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Reusable Feed component
const ActivityFeed = ({ loading, error, items, emptyMsg = "No activities found." }) => {
  if (loading) return <div className="p-6 text-slate-400 text-center"><Loader2 className="animate-spin inline mr-2" /> Loading Feed...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading feed.</div>;
  if (!items || items.length === 0) return <div className="p-6 text-center text-slate-500">{emptyMsg}</div>;

  return (
    <div className="activity-list border-t">
      {items.map((item) => {
        const Icon = iconMap[item.icon] || FileText;
        return (
          <div key={item.id} className="activity-item px-6 py-4 border-b last:border-0 hover:bg-slate-50 cursor-pointer transition-colors">
            <div className={`activity-icon ${item.color || 'blue'}`}><Icon size={18} /></div>
            <div className="activity-details">
              <p className="activity-text"><strong>{item.title}</strong>: {item.desc}</p>
              <span className="activity-time">{item.time} {item.user ? `• ${item.user}` : ''}</span>
            </div>
            <div className={`activity-status ${item.status === 'Completed' || item.status === 'Confirmed' ? 'success' : 'warning'}`}>{item.status}</div>
          </div>
        );
      })}
    </div>
  );
};

/* --- Employee Dashboard --- */
const EmployeeDashboard = () => {
  const { data: stats, loading: statsLoading, error: statsError } = useFetchData(apiClient.getDashboardStats, [], []);
  const { data: activities, loading: activitiesLoading, error: activitiesError } = useFetchData(apiClient.getRecentActivities, [], []);

  return (
    <div className="dashboard-content animate-in">
      <StatGrid loading={statsLoading} error={statsError} stats={stats} />
      <div className="dashboard-grid">
        <div className="main-section">
          <div className="section-header">
            <h3>Recent Academic Activities</h3>
            <button className="btn-text">View all <ArrowUpRight size={16} /></button>
          </div>
          <div className="card p-0 min-h-[150px]"><ActivityFeed loading={activitiesLoading} error={activitiesError} items={activities} /></div>
        </div>
        <div className="side-section">
          <div className="section-header"><h3>Action Center</h3></div>
          <div className="alerts-container">
            <div className="alert-card task-info card">
              <div className="alert-icon"><CheckCircle2 size={20} /></div>
              <div className="alert-info">
                <h4>System Health</h4>
                <p>All core services operating normally.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Student Dashboard --- */
const StudentDashboard = () => {
  const { data: stats, loading: statsLoading, error: statsError } = useFetchData(apiClient.getStudentStats, [], []);
  const { data: feed, loading: feedLoading, error: feedError } = useFetchData(apiClient.getStudentFeed, [], []);

  const [assignmentDone, setAssignmentDone] = useState(false);

  return (
    <div className="dashboard-content animate-in">
      <StatGrid loading={statsLoading} error={statsError} stats={stats} />
      <div className="dashboard-grid">
        <div className="main-section">
          <div className="section-header">
            <h3>My Classes Timeline</h3>
            <button className="btn-text">View full timetable <ArrowUpRight size={16} /></button>
          </div>
          <div className="card p-0 min-h-[150px]"><ActivityFeed loading={feedLoading} error={feedError} items={feed} /></div>
        </div>
        <div className="side-section">
          <div className="section-header"><h3>Action Center</h3></div>
          <div className="alerts-container">
            <div className={`alert-card card ${assignmentDone ? 'bg-emerald-50 border-emerald-200' : 'low-stock'}`}>
              <div className={`alert-icon ${assignmentDone ? 'text-emerald-500' : ''}`}>
                {assignmentDone ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              </div>
              <div className="alert-info">
                <h4>{assignmentDone ? "All Caught Up!" : "Assignment Due Tomorrow"}</h4>
                <p>{assignmentDone ? "You have no pending tasks." : "Data Structures Lab Report is pending submission."}</p>
                {!assignmentDone && (
                  <button className="btn btn-sm btn-outline mt-2 w-full" onClick={() => setAssignmentDone(true)}>Mark as Submitted</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Parent Dashboard + Interactive Modal --- */
const ParentDashboard = () => {
  const { data: stats, loading: statsLoading, error: statsError } = useFetchData(apiClient.getParentStats, [], []);
  const { data: feed, loading: feedLoading, error: feedError } = useFetchData(apiClient.getParentFeed, [], []);
  
  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      await apiClient.payFees(1200);
      setPaymentSuccess(true);
      // Wait a moment then close
      setTimeout(() => {
        setShowPayModal(false); 
      }, 2000);
    } catch {
      alert("Payment failed");
    }
    setPaymentLoading(false);
  };

  return (
    <div className="dashboard-content animate-in relative">
      <StatGrid loading={statsLoading} error={statsError} stats={stats} />
      <div className="dashboard-grid">
        <div className="main-section">
          <div className="section-header">
            <h3>Ward's Academic Progress</h3>
          </div>
          <div className="card p-0 min-h-[150px]"><ActivityFeed loading={feedLoading} error={feedError} items={feed} /></div>
        </div>
        <div className="side-section">
          <div className="section-header"><h3>Action Center</h3></div>
          <div className="alerts-container">
            {!paymentSuccess ? (
              <div className="alert-card low-stock card border-red-200 bg-red-50">
                <div className="alert-icon text-red-500"><Wallet size={20} /></div>
                <div className="alert-info">
                  <h4 className="text-red-700">Tuition Fee Reminder</h4>
                  <p className="text-red-600/80">Semester 2 fee payment ($1,200) is approaching.</p>
                  <button className="btn btn-sm bg-red-600 text-white mt-3 w-full border-none hover:bg-red-700" onClick={() => setShowPayModal(true)}>Pay Now</button>
                </div>
              </div>
            ) : (
              <div className="alert-card task-info card border-emerald-200 bg-emerald-50">
                <div className="alert-icon text-emerald-500"><CheckCircle2 size={20} /></div>
                <div className="alert-info text-emerald-700">
                  <h4>Fees Paid</h4>
                  <p>Semester 2 tuition paid successfully.</p>
                  <button className="btn btn-sm btn-outline border-emerald-500 text-emerald-600 mt-2">Download Receipt</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPayModal && (
        <div className="fixed inset-0 min-h-screen bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
           <div className="card max-w-md w-full bg-white shadow-2xl relative animate-in zoom-in-95 duration-200">
             <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" onClick={() => setShowPayModal(false)}><X size={20} /></button>
             
             {!paymentSuccess ? (
               <>
                 <h2 className="text-xl mb-4 text-slate-800 flex items-center gap-2"><Wallet className="text-primary"/> Make Payment</h2>
                 <div className="p-4 bg-slate-50 border rounded-xl mb-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-500">Amount Due</p>
                      <p className="text-2xl font-bold text-slate-800">1,20000.00</p>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                      Due: Apr 25, 2026<br/>Sem 2 Tuition
                    </div>
                 </div>
                 <div className="space-y-3 mb-6">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase">Card Number</label>
                      <input type="text" className="input w-full mt-1 p-2 border rounded" placeholder="**** **** **** 4242" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-xs font-bold text-slate-400 uppercase">Expiry</label><input type="text" className="input w-full mt-1 p-2 border rounded" placeholder="MM/YY" /></div>
                      <div><label className="text-xs font-bold text-slate-400 uppercase">CVV</label><input type="text" className="input w-full mt-1 p-2 border rounded" placeholder="123" /></div>
                    </div>
                 </div>
                 <button 
                   className="btn btn-primary w-full text-lg" 
                   onClick={handlePayment} 
                   disabled={paymentLoading}
                 >
                   {paymentLoading ? <Loader2 className="animate-spin" /> : `Pay $1,200.00`}
                 </button>
               </>
             ) : (
               <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={32} /></div>
                  <h2 className="text-xl font-bold text-slate-800">Payment Successful</h2>
                  <p className="text-sm text-slate-500 mt-2">Transaction ID has been emailed to you.</p>
               </div>
             )}
           </div>
        </div>
      )}
    </div>
  );
};

/* --- Alumni Dashboard --- */
const AlumniDashboard = () => {
  const { data: stats, loading: statsLoading, error: statsError } = useFetchData(apiClient.getAlumniStats, [], []);
  const { data: feed, loading: feedLoading, error: feedError } = useFetchData(apiClient.getAlumniFeed, [], []);

  return (
    <div className="dashboard-content animate-in">
      <StatGrid loading={statsLoading} error={statsError} stats={stats} />
      <div className="dashboard-grid">
        <div className="main-section">
          <div className="section-header">
            <h3>Alumni Network Updates</h3>
          </div>
          <div className="card p-0 min-h-[150px]"><ActivityFeed loading={feedLoading} error={feedError} items={feed} /></div>
        </div>
      </div>
    </div>
  );
};


const DashboardPage = ({ userRole }) => {
  switch (userRole) {
    case 'student': return <StudentDashboard />;
    case 'parent': return <ParentDashboard />;
    case 'alumni': return <AlumniDashboard />;
    case 'employee':
    default:
      return <EmployeeDashboard />;
  }
};

export default DashboardPage;
