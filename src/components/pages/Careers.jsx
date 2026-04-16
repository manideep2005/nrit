import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Users, 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  ChevronRight, 
  Download, 
  TrendingUp, 
  Award, 
  Globe,
  ExternalLink,
  Plus
} from 'lucide-react';

const Careers = () => {
  const [activeTab, setActiveTab] = useState('jobs');

  const renderContent = () => {
    switch (activeTab) {
      case 'jobs': return <JobPortalView />;
      case 'alumni': return <AlumniNetworkView />;
      case 'placements': return <PlacementStatsView />;
      default: return <JobPortalView />;
    }
  };

  return (
    <div className="careers-container animate-in">
      <div className="sub-nav-header">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            <Briefcase size={18} />
            <span>Job & Internships</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'alumni' ? 'active' : ''}`}
            onClick={() => setActiveTab('alumni')}
          >
            <Users size={18} />
            <span>Alumni Network</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'placements' ? 'active' : ''}`}
            onClick={() => setActiveTab('placements')}
          >
            <TrendingUp size={18} />
            <span>Placement Analytics</span>
          </button>
        </div>
      </div>

      <div className="module-content mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

const JobPortalView = () => {
  const jobs = [
    { title: 'Software Engineering Intern', company: 'Google', location: 'Remote / Bangalore', type: 'Internship', stipend: '$1200/mo', deadline: 'April 20, 2026', tags: ['React', 'Node.js', 'System Design'] },
    { title: 'Graduate Analyst', company: 'Morgan Stanley', location: 'Mumbai Office', type: 'Full-time', stipend: '$18k - $22k/yr', deadline: 'May 05, 2026', tags: ['Java', 'SQL', 'Finance'] },
    { title: 'Frontend Developer', company: 'Stripe', location: 'Bangalore / Remote', type: 'Full-time', stipend: '$20k - $25k/yr', deadline: 'April 15, 2026', tags: ['Typescript', 'Next.js', 'Tailwind'] },
    { title: 'Data Scientist Intern', company: 'NVIDIA', location: 'Pune HQ', type: 'Internship', stipend: '$1500/mo', deadline: 'April 12, 2026', tags: ['Python', 'PyTorch', 'C++'] },
  ];

  return (
    <div className="job-portal flex flex-col gap-6">
       <div className="card bg-slate-900 border-none text-white p-8 relative overflow-hidden">
          <div className="relative z-10">
             <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Campus Recruitment 2026</span>
             <h2 className="text-3xl font-bold tracking-tighter m-0 mt-2">Find Your Future with NRIT</h2>
             <div className="flex gap-4 mt-8">
                <div className="search-bar h-12 bg-white/10 border-white/20 backdrop-blur-xl w-full max-w-lg">
                   <Search size={18} className="text-white/40" />
                   <input type="text" placeholder="Search for jobs, companies, or skills..." className="text-white placeholder:text-white/30" />
                </div>
                <button className="btn btn-primary bg-amber-500 text-slate-900 border-none px-10 rounded-xl font-bold">Search</button>
             </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 transform skew-x-12 bg-gradient-to-l from-amber-500 to-transparent"></div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, i) => (
             <div key={i} className="job-card card flex flex-col gap-4 group hover:border-amber-500 transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                   <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-slate-50 border rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all">
                         <Building2 size={24} />
                      </div>
                      <div>
                         <h4 className="m-0 text-slate-900 font-bold">{job.title}</h4>
                         <span className="text-xs text-slate-500 font-medium">{job.company}</span>
                      </div>
                   </div>
                   <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-tighter uppercase ${job.type === 'Internship' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'}`}>
                      {job.type}
                   </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                   {job.tags.map(tag => <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold uppercase">{tag}</span>)}
                </div>

                <div className="flex justify-between items-center mt-4 border-t pt-4">
                   <div className="flex gap-4 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1 text-emerald-600"><Award size={14} /> {job.stipend}</span>
                   </div>
                   <button className="btn btn-text text-amber-600 flex items-center gap-1">Apply Now <ExternalLink size={14} /></button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

const AlumniNetworkView = () => {
  const alumni = [
    { name: 'Sameer Varma', batch: 'Class of 2022', role: 'SDE-2 at Microsoft', domain: 'Cloud Computing', status: 'Willing to Mentor', image: null },
    { name: 'Priya Sharma', batch: 'Class of 2020', role: 'Design Lead at Adobe', domain: 'Product Design', status: 'Willing to Mentor', image: null },
    { name: 'Rahul Khanna', batch: 'Class of 2023', role: 'Quant Analyst at GS', domain: 'Fintech', status: 'Hiring', image: null },
  ];

  return (
    <div className="alumni-view flex flex-col gap-6">
       <div className="flex justify-between items-center mb-2">
          <h3>Alumni Directory</h3>
          <div className="flex gap-2">
             <button className="btn btn-outline btn-sm"><Filter size={14} /> Filter Batch</button>
             <button className="btn btn-primary btn-sm"><Plus size={14} /> Join Network</button>
          </div>
       </div>

       <div className="grid-3">
          {alumni.map((a, i) => (
             <div key={i} className="alumni-card card flex flex-col gap-4 text-center items-center py-8 group hover:bg-slate-900 hover:text-white transition-all">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-slate-800 transition-all">
                   <Users size={40} />
                </div>
                <div>
                   <h4 className="m-0 text-lg">{a.name}</h4>
                   <span className="text-xs text-slate-500 group-hover:text-slate-400">{a.batch}</span>
                </div>
                <div className="border-t w-full pt-4 mt-2 px-6">
                   <p className="text-sm font-bold m-0 italic">"{a.role}"</p>
                   <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">{a.domain}</p>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${a.status === 'Hiring' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'} group-hover:bg-white/10 group-hover:text-white`}>
                   {a.status}
                </span>
                <div className="flex gap-2 w-full px-6 mt-4">
                   <button className="btn btn-outline btn-sm flex-1 group-hover:border-white/20 group-hover:text-white">Profile</button>
                   <button className="btn btn-primary btn-sm flex-1 group-hover:bg-white group-hover:text-slate-900 border-none">Connect</button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

const PlacementStatsView = () => (
  <div className="placement-stats flex flex-col gap-6">
     <div className="stats-grid">
        <div className="stat-card card">
           <div className="stat-icon bg-blue-50 text-blue-600"><Globe size={24} /></div>
           <div className="stat-info">
              <span className="stat-label">Companies Visited</span>
              <h3 className="stat-value">142</h3>
           </div>
        </div>
        <div className="stat-card card">
           <div className="stat-icon bg-emerald-50 text-emerald-600"><Award size={24} /></div>
           <div className="stat-info">
              <span className="stat-label">Highest Package</span>
              <h3 className="stat-value">$55.2k</h3>
           </div>
        </div>
        <div className="stat-card card">
           <div className="stat-icon bg-amber-50 text-amber-600"><GraduationCap size={24} /></div>
           <div className="stat-info">
              <span className="stat-label">Placement %</span>
              <h3 className="stat-value">88.4%</h3>
           </div>
        </div>
     </div>

     <div className="grid-2">
        <div className="card">
           <div className="section-header">
              <h3>Salary Trends (LPA)</h3>
              <button className="btn-text">By Sector</button>
           </div>
           <div className="chart-placeholder mt-6">
              {[40, 55, 65, 85, 45, 90].map((val, i) => (
                 <div key={i} className="chart-bar h-full bg-blue-500" data-value={`${val}k`} style={{ height: `${val}%` }}></div>
              ))}
           </div>
           <div className="flex justify-between mt-4 px-2">
              {['2020', '2021', '2022', '2023', '2024', '2025'].map(yr => <span key={yr} className="text-[10px] font-bold text-slate-400">{yr}</span>)}
           </div>
        </div>

        <div className="card h-fit">
           <div className="p-2 border-b mb-6 pb-4">
              <h3 className="m-0">Top Recruiting Partners</h3>
           </div>
           <div className="grid grid-cols-2 gap-4">
              {['Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Accenture'].map(company => (
                 <div key={company} className="p-4 bg-slate-50 border rounded-xl flex items-center justify-between group hover:bg-white hover:border-blue-500 transition-all cursor-pointer">
                    <span className="font-bold text-slate-900">{company}</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                 </div>
              ))}
           </div>
           <div className="mt-8 p-6 bg-slate-900 rounded-2xl text-white text-center">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4">Batch of 2026 Orientation</p>
              <h4 className="m-0">Placement Drive starts in 12 days</h4>
              <button className="btn btn-primary bg-amber-500 text-slate-900 border-none w-full mt-6 font-bold">Register for Drive</button>
           </div>
        </div>
     </div>
  </div>
);

export default Careers;
