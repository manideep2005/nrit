import React, { useState } from 'react';
import { 
  Building2, 
  Bus, 
  Library, 
  Map, 
  Wrench, 
  Search, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const Campus = () => {
  const [activeTab, setActiveTab] = useState('hostel');

  const renderContent = () => {
    switch (activeTab) {
      case 'hostel': return <HostelManagement />;
      case 'library': return <LibraryPortal />;
      case 'transport': return <TransportSystem />;
      default: return <HostelManagement />;
    }
  };

  return (
    <div className="campus-container animate-in">
      <div className="sub-nav-header">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'hostel' ? 'active' : ''}`}
            onClick={() => setActiveTab('hostel')}
          >
            <Building2 size={18} />
            <span>Hostel & Housing</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            <Library size={18} />
            <span>Library Portal</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'transport' ? 'active' : ''}`}
            onClick={() => setActiveTab('transport')}
          >
            <Bus size={18} />
            <span>Transport & Logistics</span>
          </button>
        </div>
      </div>

      <div className="module-content mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

const HostelManagement = () => {
  const [activeSub, setActiveSub] = useState('info');

  return (
    <div className="hostel-view flex flex-col gap-6">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card bg-slate-900 text-white flex flex-col gap-4 border-none relative overflow-hidden">
             <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Allocation</span>
                <h2 className="text-white m-0 mt-1">Room 402-B</h2>
                <p className="text-xs text-slate-400 mt-2">Block Alpha • North Wing</p>
                <div className="mt-6 flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10">
                   <div className="text-xs">
                      <span className="block opacity-50">Roommate</span>
                      <span className="font-bold">A. Kumar</span>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">AK</div>
                </div>
             </div>
             <div className="absolute -right-4 -bottom-4 opacity-5 text-white transform rotate-12">
               <Building2 size={110} />
             </div>
          </div>

          <div className="card flex flex-col justify-between">
             <div>
                <h4 className="flex items-center gap-2 m-0"><AlertCircle size={18} className="text-amber-500" /> Maintenance</h4>
                <p className="text-xs text-slate-500 mt-2">Found an issue in your room? Raise a request for plumbing, electrical or wifi support.</p>
             </div>
             <button className="btn btn-outline btn-sm w-full mt-4"><Wrench size={14} /> Raise Ticket</button>
          </div>

          <div className="card flex flex-col justify-between">
             <div>
                <h4 className="flex items-center gap-2 m-0"><Clock size={18} className="text-blue-500" /> Outing Pass</h4>
                <p className="text-xs text-slate-500 mt-2">Request permission for weekend outings or emergency home visits.</p>
             </div>
             <button className="btn btn-outline btn-sm w-full mt-4"><ArrowRight size={14} /> Request Pass</button>
          </div>

          <div className="card flex flex-col justify-between bg-emerald-50 border-emerald-100">
             <div className="flex flex-col items-center text-center gap-3">
                <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-200">
                   <CheckCircle2 size={24} />
                </div>
                <div>
                   <h4 className="m-0 text-emerald-900">Mess Fees Paid</h4>
                   <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1">VALID UNTIL MAY 2026</p>
                </div>
             </div>
             <button className="btn btn-text btn-sm text-emerald-600 mt-4">View Receipt</button>
          </div>
       </div>

       <div className="card p-0 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
             <h3>Maintenance History</h3>
             <button className="btn-text">View All</button>
          </div>
          <div className="table-responsive">
             <table className="custom-table">
                <thead>
                   <tr>
                      <th>Ticket ID</th>
                      <th>Category</th>
                      <th>Issue Description</th>
                      <th>Date Filed</th>
                      <th>Update</th>
                      <th>Status</th>
                   </tr>
                </thead>
                <tbody>
                   {[
                      { id: 'MT-8821', cat: 'Electrical', desc: 'Ceiling fan making noise in 402-B', date: 'April 02', update: 'Electrician assigned', status: 'In Progress' },
                      { id: 'MT-8710', cat: 'Wi-Fi', desc: 'Intermittent connection drops', date: 'March 25', update: 'Router replaced', status: 'Resolved' },
                   ].map((item, i) => (
                      <tr key={i}>
                         <td className="font-mono text-xs">{item.id}</td>
                         <td className="font-semibold">{item.cat}</td>
                         <td className="text-sm">{item.desc}</td>
                         <td className="text-xs text-slate-500">{item.date}</td>
                         <td className="text-[11px] font-medium italic text-slate-400">{item.update}</td>
                         <td>
                            <span className={`badge ${item.status === 'Resolved' ? 'success' : 'warning'}`} style={{ backgroundColor: item.status === 'Resolved' ? '#ecfdf5' : '#fffbeb', color: item.status === 'Resolved' ? '#059669' : '#d97706' }}>
                               {item.status}
                            </span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};

const LibraryPortal = () => {
  return (
    <div className="library-view flex flex-col gap-6">
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 flex flex-col gap-6">
             <div className="card bg-slate-50 flex items-center p-8 gap-8 border-none relative overflow-hidden">
                <div className="flex-1 relative z-10">
                   <h2 className="text-3xl m-0 font-bold text-slate-900 mt-2 mb-4 tracking-tight uppercase">Search Books & Resources</h2>
                   <div className="search-bar h-14 bg-white shadow-xl border-none">
                      <Search size={22} className="text-slate-300" />
                      <input type="text" placeholder="Search by title, author, or ISBN..." className="text-lg" />
                      <button className="btn btn-primary h-10 px-6 absolute right-2">Search</button>
                   </div>
                   <div className="flex gap-4 mt-6">
                      {['Computer Science', 'Mathematics', 'Aero Space', 'Journals'].map(cat => (
                         <span key={cat} className="text-xs font-bold px-3 py-1 bg-slate-200 text-slate-600 rounded-full hover:bg-slate-900 hover:text-white transition-all cursor-pointer">{cat}</span>
                      ))}
                   </div>
                </div>
                <div className="w-1/3 hidden lg:flex justify-end p-4">
                    <div className="p-12 bg-white/50 backdrop-blur rounded-3xl border border-white rotate-6 shadow-2xl relative">
                       <Library size={120} className="text-slate-900/10" />
                       <BookOpen size={60} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-900" />
                    </div>
                </div>
             </div>

             <div className="grid-2">
                <div className="card p-0 overflow-hidden">
                   <div className="p-6 border-b bg-slate-50/50">
                      <h4 className="flex items-center gap-2 m-0"><Clock size={18} /> Borrowed Books</h4>
                   </div>
                   <div className="activity-list">
                      {[
                        { title: 'The Algorithm Design Manual', author: 'Steven Skiena', due: 'April 15', status: 'On Time' },
                        { title: 'Clean Code', author: 'Robert C. Martin', due: 'April 20', status: 'On Time' },
                      ].map((book, i) => (
                         <div key={i} className="activity-item px-6 py-4 border-b hover:bg-slate-50 group">
                            <div className="activity-details">
                               <p className="activity-text font-bold">{book.title}</p>
                               <span className="activity-time">{book.author}</span>
                            </div>
                            <div className="text-right">
                               <span className="text-[10px] font-bold text-slate-400 block uppercase">Due Date</span>
                               <span className="font-bold text-slate-900">{book.due}</span>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="card p-0 overflow-hidden">
                   <div className="p-6 border-b bg-slate-50/50">
                      <h4 className="flex items-center gap-2 m-0 text-emerald-600"><CheckCircle2 size={18} /> Available Reservations</h4>
                   </div>
                   <div className="activity-list">
                      {[
                        { title: 'Pragmatic Programmer', author: 'Andrew Hunt', status: 'Available' },
                        { title: 'Designing Data-Intensive Apps', author: 'Martin Kleppmann', status: 'In Queue' },
                      ].map((book, i) => (
                         <div key={i} className="activity-item px-6 py-4 border-b hover:bg-slate-50 group">
                            <div className="activity-details">
                               <p className="activity-text font-bold">{book.title}</p>
                               <span className="activity-time">{book.author}</span>
                            </div>
                            <button className={`btn btn-sm ${book.status === 'Available' ? 'btn-primary' : 'btn-outline disabled'} px-4 py-1.5`}>{book.status === 'Available' ? 'Collect' : 'Track'}</button>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-6">
             <div className="card bg-violet-600 text-white border-none">
                <h4>Digital Library</h4>
                <p className="text-xs text-violet-100/70 mt-2">Access over 1M+ research papers, journals and ebooks online via our VPN partners.</p>
                <button className="btn btn-sm bg-white text-violet-600 border-none w-full mt-4 font-bold">Access VPN</button>
             </div>

             <div className="card">
                <h4 className="flex items-center gap-2 m-0 text-amber-500"><Info size={18} /> Fine Status</h4>
                <p className="text-2xl font-bold mt-2">$0.00</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Accounts Clear</p>
             </div>

             <div className="card p-0 overflow-hidden">
                <div className="p-4 bg-slate-900 text-white text-xs font-bold text-center uppercase tracking-widest">Library Hours</div>
                <div className="p-4 flex flex-col gap-3">
                   <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Mon - Fri</span>
                      <span className="text-xs font-bold">08 AM - 10 PM</span>
                   </div>
                   <div className="flex justify-between items-center text-amber-600">
                      <span className="text-sm">Saturday</span>
                      <span className="text-xs font-bold">09 AM - 05 PM</span>
                   </div>
                   <div className="flex justify-between items-center text-red-500">
                      <span className="text-sm">Sunday</span>
                      <span className="text-xs font-bold font-mono">CLOSED</span>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

const TransportSystem = () => {
  return (
    <div className="transport-view flex flex-col gap-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-blue-50 flex items-center p-6 gap-6 border-blue-100">
             <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-200">
                <Bus size={32} />
             </div>
             <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">My Assigned Route</span>
                <h3 className="m-0 text-blue-900">Route 14B</h3>
                <p className="text-xs text-blue-800/60 mt-1">Via Central Square & Market</p>
             </div>
          </div>

          <div className="card bg-slate-900 text-white flex items-center justify-between p-6">
             <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Status</span>
                <h3 className="m-0 text-white mt-1">Bus is Arriving</h3>
                <p className="text-xs text-emerald-400 mt-2 animate-pulse flex items-center gap-2">
                   <span className="w-2 h-2 bg-emerald-400 rounded-full"></span> 
                   3 mins away
                </p>
             </div>
             <div className="h-full border-l border-white/10 pl-6 flex items-center">
                <Map size={32} className="text-slate-700" />
             </div>
          </div>

          <div className="card flex flex-col justify-between">
             <div>
                <h4 className="m-0">Emergency Tracking</h4>
                <p className="text-xs text-slate-500 mt-2">Active GPS coordinates for safety and punctuality monitoring.</p>
             </div>
             <button className="btn btn-outline btn-sm w-full font-bold">Share Location</button>
          </div>
       </div>

       <div className="card p-0 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
             <h3>Today's Schedule</h3>
             <div className="flex gap-2">
                <button className="btn btn-outline btn-sm">Full Route Map</button>
                <button className="btn btn-primary btn-sm">Download Pass</button>
             </div>
          </div>
          <div className="table-responsive">
             <table className="custom-table">
                <thead>
                   <tr>
                      <th>Stop #</th>
                      <th>Location Name</th>
                      <th>Pickup Time</th>
                      <th>Drop Time</th>
                      <th>Vehicle ID</th>
                      <th>Driver Info</th>
                   </tr>
                </thead>
                <tbody>
                   {[
                      { stop: '01', loc: 'NRIT Main Campus', pickup: '04:30 PM', drop: '08:15 AM', bus: 'NRIT-BUS-14', driver: 'S. Singh' },
                      { stop: '02', loc: 'Metro Station Exit 3', pickup: '04:45 PM', drop: '08:00 AM', bus: 'NRIT-BUS-14', driver: 'S. Singh' },
                      { stop: '03', loc: 'City Center Hub', pickup: '05:00 PM', drop: '07:45 AM', bus: 'NRIT-BUS-14', driver: 'S. Singh' },
                      { stop: '04', loc: 'North Side Housing', pickup: '05:20 PM', drop: '07:25 AM', bus: 'NRIT-BUS-14', driver: 'S. Singh' },
                   ].map((route, i) => (
                      <tr key={i}>
                         <td className="font-bold text-slate-300">#{route.stop}</td>
                         <td className="font-semibold text-slate-800">{route.loc}</td>
                         <td className="text-emerald-600 font-bold">{route.pickup}</td>
                         <td className="text-blue-600 font-bold">{route.drop}</td>
                         <td className="font-mono text-xs text-slate-400">{route.bus}</td>
                         <td className="text-xs font-medium">{route.driver}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};

export default Campus;
