import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Database, 
  Settings, 
  Search, 
  Filter, 
  Lock, 
  Unlock, 
  MoreVertical, 
  Plus, 
  Trash2, 
  Edit2,
  Activity,
  Download,
  Terminal,
  Server,
  Cloud
} from 'lucide-react';

const Administration = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users': return <UserManagementView />;
      case 'system': return <SystemLogsView />;
      case 'database': return <DatabaseBackupView />;
      default: return <UserManagementView />;
    }
  };

  return (
    <div className="admin-container animate-in">
      <div className="sub-nav-header">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={18} />
            <span>User Management</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => setActiveTab('system')}
          >
            <Activity size={18} />
            <span>System Audit Logs</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'database' ? 'active' : ''}`}
            onClick={() => setActiveTab('database')}
          >
            <Database size={18} />
            <span>Data & Backups</span>
          </button>
        </div>
      </div>

      <div className="module-content mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

const UserManagementView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { id: 'ADM-001', name: 'Mani Deep', role: 'Super Admin', email: 'mani@nrit.edu', status: 'Active', lastLogin: '10 mins ago' },
    { id: 'STF-042', name: 'Dr. Sarah Smith', role: 'Employee', email: 'sarah@nrit.edu', status: 'Active', lastLogin: '2 hours ago' },
    { id: 'STU-882', name: 'Alex Johnson', role: 'Student', email: 'alex@student.nrit.edu', status: 'Inactive', lastLogin: '3 days ago' },
  ]);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        alert(`User ${u.name} is now ${newStatus}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const deleteUser = (id, name) => {
    if (confirm(`Are you sure you want to PERMANENTLY delete user ${name}? This action is recorded in audit logs.`)) {
      setUsers(users.filter(u => u.id !== id));
      alert(`User ${name} has been purged from the system.`);
    }
  };

  const addUser = () => {
    const name = prompt("Enter Full Name:");
    if (!name) return;
    const email = prompt("Enter Email Address:");
    const role = prompt("Enter Role (Student/Employee/Admin):", "Student");
    
    const newUser = {
      id: `USR-${Math.floor(Math.random() * 900) + 100}`,
      name,
      role,
      email: email || `${name.toLowerCase().replace(' ', '.')}@nrit.edu`,
      status: 'Active',
      lastLogin: 'Never'
    };
    
    setUsers([...users, newUser]);
  };

  return (
    <div className="user-mgmt card p-0 overflow-hidden">
       <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
          <div>
             <h3 className="m-0">Global User Directory</h3>
             <p className="text-xs text-slate-500 mt-1">Manage credentials and access levels for all entities.</p>
          </div>
          <div className="flex gap-2">
             <div className="search-bar sm w-64 bg-white border rounded-lg flex items-center px-3 gap-2">
                <Search size={14} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="bg-transparent border-none text-sm outline-none w-full py-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="btn btn-primary btn-sm" onClick={addUser}><Plus size={14} /> Add User</button>
          </div>
       </div>

       <div className="table-responsive">
          <table className="custom-table w-full">
             <thead>
                <tr>
                   <th>User ID</th>
                   <th>Full Name</th>
                   <th>Access Level</th>
                   <th>Email Address</th>
                   <th>Last Login</th>
                   <th>Status</th>
                   <th>Actions</th>
                </tr>
             </thead>
             <tbody>
                {filteredUsers.map((user, i) => (
                   <tr key={i} className="animate-in">
                      <td className="font-mono text-xs font-bold text-slate-400">{user.id}</td>
                      <td>
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                               {user.name.split(' ').map(n=>n[0]).join('')}
                            </div>
                            <span className="font-semibold">{user.name}</span>
                         </div>
                      </td>
                      <td>
                         <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase ${user.role === 'Super Admin' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            {user.role}
                         </span>
                      </td>
                      <td className="text-sm">{user.email}</td>
                      <td className="text-xs text-slate-400">{user.lastLogin}</td>
                      <td>
                         <span 
                           className={`badge cursor-pointer transition-all hover:scale-105 active:scale-95 ${user.status === 'Active' ? 'success' : 'danger'}`} 
                           style={{ 
                             backgroundColor: user.status === 'Active' ? '#ecfdf5' : '#fef2f2', 
                             color: user.status === 'Active' ? '#059669' : '#dc2626' 
                           }}
                           onClick={() => toggleUserStatus(user.id)}
                           title="Click to toggle status"
                         >
                            {user.status}
                         </span>
                      </td>
                      <td>
                         <div className="flex gap-2">
                            <button className="action-icon-btn" onClick={() => alert('Edit User Profile opening...')}><Edit2 size={14} /></button>
                            <button className="action-icon-btn" onClick={() => toggleUserStatus(user.id)}><Lock size={14} /></button>
                            <button className="action-icon-btn danger" onClick={() => deleteUser(user.id, user.name)}><Trash2 size={14} /></button>
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};


const SystemLogsView = () => (
  <div className="logs-view card p-0 overflow-hidden h-fit">
     <div className="p-6 border-b bg-slate-900 text-white flex justify-between items-center">
        <h3 className="text-white flex items-center gap-2"><Terminal size={20} /> System Audit Trail</h3>
        <div className="flex gap-2">
           <button className="btn btn-sm bg-white/10 text-white border-white/20">Clear Logs</button>
           <button className="btn btn-sm bg-white text-slate-900 border-none font-bold">Export Logs</button>
        </div>
     </div>
     <div className="bg-slate-950 p-4 font-mono text-[11px] text-emerald-500 leading-relaxed max-h-[500px] overflow-y-auto">
        <div className="flex gap-4 opacity-50"><span className="text-slate-500">[2026-04-07 15:20:42]</span> [AUTH] Login successful for user ADM-001 from IP 192.168.1.45</div>
        <div className="flex gap-4"><span className="text-slate-500">[2026-04-07 15:21:10]</span> [DB] Successfully backed up 'nrit_prod_v2' to AWS S3 bucket</div>
        <div className="flex gap-4 text-amber-500"><span className="text-slate-500">[2026-04-07 15:22:15]</span> [API] WARNING: Rate limit approaching for WhatsApp API Gateway</div>
        <div className="flex gap-4 text-rose-500 font-bold"><span className="text-slate-500">[2026-04-07 15:22:30]</span> [SEC] ERROR: Multiple failed login attempts for STU-202 (3 attempts in 60s)</div>
        <div className="flex gap-4"><span className="text-slate-500">[2026-04-07 15:23:45]</span> [SYS] Auto-cleanup initiated for /tmp partition</div>
        <div className="flex gap-4"><span className="text-slate-500">[2026-04-07 15:25:00]</span> [INT] AI Intelligence model 'retention_risk_v1' updated with new data</div>
        <div className="flex gap-4 opacity-50"><span className="text-slate-500">[2026-04-07 15:26:12]</span> [AUTH] Token refreshed for session #22144</div>
     </div>
  </div>
);

const DatabaseBackupView = () => (
  <div className="db-view flex flex-col gap-6">
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-slate-50 border-slate-200">
           <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white shadow-sm rounded-xl text-indigo-600 border">
                 <Server size={24} />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">HEALTHY</span>
           </div>
           <h4 className="m-0">Primary DB Server</h4>
           <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between text-xs"><span className="text-slate-500">Uptime:</span><span className="font-bold">99.98%</span></div>
              <div className="flex justify-between text-xs"><span className="text-slate-500">Connections:</span><span className="font-bold">142/500</span></div>
              <div className="flex justify-between text-xs"><span className="text-slate-500">Storage Used:</span><span className="font-bold">1.2 GB / 10 GB</span></div>
           </div>
        </div>

        <div className="card">
           <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white shadow-sm rounded-xl text-blue-600 border">
                 <Cloud size={24} />
              </div>
           </div>
           <h4 className="m-0">AWS Cloud S3 Sync</h4>
           <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between text-xs"><span className="text-slate-500">Last Sync:</span><span className="font-bold">2 hours ago</span></div>
              <div className="flex justify-between text-xs"><span className="text-slate-500">Bucket:</span><span className="font-mono">nrit-prod-backups</span></div>
              <div className="flex justify-between text-xs"><span className="text-slate-500">Encrypted:</span><span className="font-bold text-emerald-600">AES-256</span></div>
           </div>
        </div>

        <div className="card bg-indigo-600 border-none text-white">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/10 rounded-xl text-white">
                 <Settings size={24} />
              </div>
           </div>
           <h4 className="m-0 text-white">Maintenance Mode</h4>
           <p className="text-xs text-indigo-100/60 mt-2">Next scheduled maintenance in 14 days. During this time, the portal will be accessible in read-only mode.</p>
           <button className="btn btn-sm bg-white text-indigo-600 w-full mt-4 border-none font-bold">Schedule Maintenance</button>
        </div>
     </div>

     <div className="card p-0 overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
           <h3>Available Snapshots</h3>
           <button className="btn btn-primary btn-sm"><Plus size={14} /> Create Snapshot</button>
        </div>
        <div className="table-responsive">
           <table className="custom-table">
              <thead>
                 <tr>
                    <th>Snapshot ID</th>
                    <th>Created At</th>
                    <th>Size</th>
                    <th>Region</th>
                    <th>Retention</th>
                    <th>Actions</th>
                 </tr>
              </thead>
              <tbody>
                 {[
                   { id: 'SNAP_PROD_0407', date: 'April 07, 2026', size: '254 MB', region: 'us-east-1', retention: '30 Days' },
                   { id: 'SNAP_PROD_0406', date: 'April 06, 2026', size: '248 MB', region: 'us-east-1', retention: '30 Days' },
                   { id: 'SNAP_PROD_0405', date: 'April 05, 2026', size: '242 MB', region: 'us-east-1', retention: '30 Days' },
                 ].map((snap, i) => (
                    <tr key={i}>
                       <td className="font-mono text-xs font-bold text-indigo-600">{snap.id}</td>
                       <td className="text-sm">{snap.date}</td>
                       <td className="text-sm font-semibold">{snap.size}</td>
                       <td className="text-xs text-slate-400">{snap.region}</td>
                       <td className="text-[10px] font-bold uppercase tracking-widest">{snap.retention}</td>
                       <td>
                          <div className="flex gap-2">
                             <button className="action-icon-btn"><Download size={14} /></button>
                             <button className="action-icon-btn"><Unlock size={14} /></button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
     </div>
  </div>
);

export default Administration;
