import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  BrainCircuit, 
  Target, 
  Zap, 
  Activity, 
  PieChart, 
  LineChart,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

const Intelligence = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics': return <AIAnalyticsView />;
      case 'predictions': return <PredictiveModellingView />;
      case 'optimizations': return <OptimizationEngine />;
      default: return <AIAnalyticsView />;
    }
  };

  return (
    <div className="intelligence-container animate-in">
      <div className="sub-nav-header">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={18} />
            <span>Academic Analytics</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'predictions' ? 'active' : ''}`}
            onClick={() => setActiveTab('predictions')}
          >
            <BrainCircuit size={18} />
            <span>Predictive Models</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'optimizations' ? 'active' : ''}`}
            onClick={() => setActiveTab('optimizations')}
          >
            <Zap size={18} />
            <span>AI Optimizations</span>
          </button>
        </div>
      </div>

      <div className="module-content mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

const AIAnalyticsView = () => {
  const [perfData, setPerfData] = useState([60, 45, 80, 55, 90, 75, 85]);
  const [forecastData, setForecastData] = useState([40, 65, 30, 85, 50, 70, 45]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [gpi, setGpi] = useState(84.5);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setPerfData(perfData.map(() => Math.floor(Math.random() * 60) + 40));
      setForecastData(forecastData.map(() => Math.floor(Math.random() * 60) + 30));
      setGpi(parseFloat((80 + Math.random() * 10).toFixed(1)));
      setIsAnalyzing(false);
      alert('AI Models updated with latest campus data feeds.');
    }, 2000);
  };

  return (
    <div className="analytics-view flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="card bg-slate-900 border-none text-white flex flex-col gap-4 overflow-hidden relative">
            <div className="relative z-10">
               <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Global Performance Index</span>
               <h2 className="text-4xl m-0 mt-2 tracking-tighter">{isAnalyzing ? '--.-%' : `${gpi}%`}</h2>
               <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-bold">
                  <TrendingUp size={12} /> {isAnalyzing ? 'Recalculating...' : '+2.4% vs last semester'}
               </span>
               <div className="mt-8 flex gap-2">
                  <button 
                    className="btn btn-sm bg-cyan-500 text-slate-900 border-none font-bold disabled:opacity-50"
                    onClick={runAnalysis}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? 'Processing...' : 'Run New Analysis'}
                  </button>
                  <button className="btn btn-sm bg-white/10 text-white border border-white/20">Compare</button>
               </div>
            </div>
            <div className={`absolute -right-4 -top-8 text-white opacity-5 transform rotate-45 ${isAnalyzing ? 'animate-pulse' : ''}`}>
               <BrainCircuit size={180} />
            </div>
         </div>

         <div className="card flex flex-col justify-between">
            <div>
               <h4 className="flex items-center gap-2 m-0"><Target size={18} className="text-blue-500" /> Retention Accuracy</h4>
               <p className="text-xs text-slate-500 mt-2">AI-driven predictive model for student dropout risk identification.</p>
            </div>
            <div className="flex items-center gap-4 mt-6">
               <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: isAnalyzing ? '10%' : '92%' }}></div>
               </div>
               <span className="text-xs font-bold font-mono">{isAnalyzing ? '...' : '92%'}</span>
            </div>
         </div>

         <div className="card flex flex-col justify-between">
            <div>
               <h4 className="flex items-center gap-2 m-0"><Zap size={18} className="text-amber-500" /> Real-time Processing</h4>
               <p className="text-xs text-slate-500 mt-2">Currently analyzing logs from 4,200+ concurrent user sessions.</p>
            </div>
            <div className="flex items-center gap-3 mt-6">
               <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[7px] font-bold ${isAnalyzing ? 'animate-bounce' : ''}`}>API</div>)}
               </div>
               <span className="text-[10px] font-bold text-slate-400 uppercase">{isAnalyzing ? 'Syncing...' : 'Live Integration'}</span>
            </div>
         </div>
      </div>

      <div className="grid-2">
         <div className="card">
            <div className="section-header">
               <h3>Performance Trends</h3>
               <button className="btn-text" onClick={() => alert('Filtering by department...')}>By Department</button>
            </div>
            <div className="chart-placeholder mt-4">
               {perfData.map((val, i) => (
                 <div key={i} className="chart-bar h-full bg-cyan-500 transition-all duration-700" data-value={`${val}%`} style={{ height: `${val}%` }}></div>
               ))}
            </div>
            <div className="flex justify-between mt-4 px-2">
               {['CSE', 'ECE', 'ME', 'CIVIL', 'BBA', 'LAW', 'ARCH'].map(dept => <span key={dept} className="text-[10px] font-bold text-slate-400">{dept}</span>)}
            </div>
         </div>

         <div className="card">
            <div className="section-header">
               <h3>Attendance Forecasting</h3>
               <button className="btn-text" onClick={() => alert('Viewing full schedule...')}>Schedule</button>
            </div>
            <div className="chart-placeholder mt-4 bg-slate-50 border-dashed">
               {forecastData.map((val, i) => (
                 <div key={i} className="chart-bar bg-indigo-500/30 border-2 border-indigo-500 h-full transition-all duration-700" data-value={`${val}%`} style={{ height: `${val}%` }}></div>
               ))}
            </div>
            <div className="flex justify-between mt-4 px-2">
               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <span key={day} className="text-[10px] font-bold text-slate-400">{day}</span>)}
            </div>
         </div>
      </div>
    </div>
  );
};


const PredictiveModellingView = () => (
  <div className="predictive-view flex flex-col gap-6">
     <div className="card bg-indigo-50 border-indigo-100 flex items-center p-8 gap-10">
        <div className="w-1/4">
           <div className="p-8 bg-white rounded-3xl shadow-xl shadow-indigo-100 flex items-center justify-center">
              <BrainCircuit size={64} className="text-indigo-600" />
           </div>
        </div>
        <div className="flex-1">
           <h2 className="text-3xl font-bold text-indigo-900 m-0 uppercase tracking-tighter">Dropout Risk Identifier</h2>
           <p className="text-indigo-700/60 mt-2 max-w-xl">Our proprietary AI model identified <span className="font-bold text-indigo-900">12 students</span> who show a high risk of academic decline based on attendance and mid-term patterns.</p>
           <button className="btn btn-primary bg-indigo-600 border-none mt-6 px-8 rounded-full">Explore High-Risk List</button>
        </div>
     </div>

     <div className="grid-3">
        <div className="card flex flex-col gap-4">
           <div className="p-3 bg-amber-50 text-amber-600 w-fit rounded-xl">
              <AlertCircle size={24} />
           </div>
           <div>
              <h4 className="m-0">Early Warning System</h4>
              <p className="text-xs text-slate-500 mt-2">Automatic alerts sent to counselors when a student misses 3 consecutive labs.</p>
           </div>
           <button className="btn btn-text text-amber-600 mt-auto flex items-center gap-2">Configure Rules <ArrowUpRight size={14} /></button>
        </div>

        <div className="card flex flex-col gap-4">
           <div className="p-3 bg-blue-50 text-blue-600 w-fit rounded-xl">
              <ShieldCheck size={24} />
           </div>
           <div>
              <h4 className="m-0">Integrity Shield</h4>
              <p className="text-xs text-slate-500 mt-2">AI-driven proctoring analytics for identifying suspicious examination patterns.</p>
           </div>
           <button className="btn btn-text text-blue-600 mt-auto flex items-center gap-2">View Audit Log <ArrowUpRight size={14} /></button>
        </div>

        <div className="card flex flex-col gap-4">
           <div className="p-3 bg-cyan-50 text-cyan-600 w-fit rounded-xl">
              <Lightbulb size={24} />
           </div>
           <div>
              <h4 className="m-0">Pathway Suggestions</h4>
              <p className="text-xs text-slate-500 mt-2">AI recommends elective combinations based on a student's historical strengths.</p>
           </div>
           <button className="btn btn-text text-cyan-600 mt-auto flex items-center gap-2">Enable AI Advisory <ArrowUpRight size={14} /></button>
        </div>
     </div>
  </div>
);

const OptimizationEngine = () => (
  <div className="optimization-view flex flex-col gap-6">
     <div className="card p-0 overflow-hidden">
        <div className="p-6 border-b bg-slate-900 text-white flex justify-between items-center">
           <div>
              <h3 className="text-white">Curriculum Optimization Engine</h3>
              <p className="text-xs text-slate-400 mt-1">Cross-referencing global job market trends with current academic syllabus.</p>
           </div>
           <span className="badge info bg-cyan-500 text-slate-900 border-none font-bold">V 2.0 ACTIVE</span>
        </div>
        <div className="table-responsive">
           <table className="custom-table">
              <thead>
                 <tr>
                    <th>Module Name</th>
                    <th>Industry Score</th>
                    <th>Current Weight</th>
                    <th>AI Recommendation</th>
                    <th>Impact Level</th>
                    <th>Status</th>
                 </tr>
              </thead>
              <tbody>
                 {[
                   { name: 'Cloud Computing Infrastructure', industry: '9.8 / 10', weight: '4 Credits', rec: 'Increase to 6 Credits', impact: 'High', status: 'Pending Review' },
                   { name: 'Legacy Mainframe Systems', industry: '1.2 / 10', weight: '4 Credits', rec: 'Move to Elective', impact: 'Moderate', status: 'Applied' },
                   { name: 'Generative AI & LLMs', industry: '10 / 10', weight: 'None', rec: 'New Core Module', impact: 'Critical', status: 'Approved' },
                   { name: 'Discrete Structures', industry: '8.4 / 10', weight: '3 Credits', rec: 'No Change Needed', impact: 'None', status: 'Optimal' },
                 ].map((mod, i) => (
                    <tr key={i}>
                       <td className="font-semibold text-slate-800">{mod.name}</td>
                       <td className="font-mono text-cyan-600 font-bold">{mod.industry}</td>
                       <td className="text-xs text-slate-400">{mod.weight}</td>
                       <td className="text-sm font-bold text-indigo-600">{mod.rec}</td>
                       <td>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded tracking-widest ${mod.impact === 'Critical' ? 'bg-red-50 text-red-500' : mod.impact === 'High' ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-400'}`}>
                             {mod.impact}
                          </span>
                       </td>
                       <td>
                          <span className={`badge ${mod.status === 'Approved' ? 'success' : 'info'}`} style={{ backgroundColor: mod.status === 'Approved' ? '#ecfdf5' : '#f0f9ff', color: mod.status === 'Approved' ? '#059669' : '#0369a1' }}>
                             {mod.status}
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

export default Intelligence;
