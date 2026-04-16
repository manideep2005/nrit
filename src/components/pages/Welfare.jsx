import React, { useState } from 'react';
import { 
  HeartHandshake, Stethoscope, AlertTriangle, FileText, 
  MessageCircle, Phone, Clock, CheckCircle2, Loader2, ArrowRight
} from 'lucide-react';
import { useFetchData } from '../../hooks/useFetchData';
import { apiClient } from '../../services/apiClient';

const Welfare = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('health');

  const renderContent = () => {
    switch (activeTab) {
      case 'health': return <HealthCenterView userRole={userRole} />;
      case 'counseling': return <CounselingView userRole={userRole} />;
      case 'grievance': return <GrievancePortal userRole={userRole} />;
      default: return <HealthCenterView userRole={userRole} />;
    }
  };

  return (
    <div className="welfare-container animate-in">
      <div className="sub-nav-header">
        <div className="nav-tabs">
          <button className={`nav-tab ${activeTab === 'health' ? 'active' : ''}`} onClick={() => setActiveTab('health')}><Stethoscope size={18} /><span>Health Center</span></button>
          <button className={`nav-tab ${activeTab === 'counseling' ? 'active' : ''}`} onClick={() => setActiveTab('counseling')}><HeartHandshake size={18} /><span>Counseling & Support</span></button>
          <button className={`nav-tab ${activeTab === 'grievance' ? 'active' : ''}`} onClick={() => setActiveTab('grievance')}><AlertTriangle size={18} /><span>Grievance Portal</span></button>
        </div>
      </div>
      <div className="module-content mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

const HealthCenterView = ({ userRole }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Use real mock API fetch for medical records
  const { data: records, loading, error, setData } = useFetchData(apiClient.getMedicalRecords, [], []);

  const handleBooking = () => {
    if (!selectedSlot) return;
    const newVisit = {
      visit: 'Scheduled Consultation',
      date: 'Today',
      doctor: 'Assigned Physician',
      status: 'Scheduled'
    };
    // Optimistically update the UI with the new visit
    setData([newVisit, ...(records || [])]);
    alert(`Appointment confirmed for ${selectedSlot}!`);
    setSelectedSlot(null);
  };

  return (
    <div className="health-view grid-2">
      <div className="health-info flex flex-col gap-6">
        <div className="card bg-sky-600 text-white border-none relative overflow-hidden">
           <div className="relative z-10">
             <h3 className="text-white">Campus Clinic Status</h3>
             <div className="flex items-center gap-2 mt-2">
               <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
               <span className="font-bold">Open Now</span>
               <span className="text-sky-100 text-sm opacity-80 ml-2">Until 08:00 PM</span>
             </div>
             <div className="flex gap-4 mt-6">
               <button className="btn btn-sm bg-white text-sky-600 border-none font-bold" onClick={() => alert('Dialing Campus Clinic: +91 9988776655')}>Call Clinic</button>
               <button className="btn btn-sm bg-rose-500 text-white border border-rose-400 font-bold" onClick={() => alert('Emergency protocol activated. Medical response team notified.')}>Emergency</button>
             </div>
           </div>
           <div className="absolute -right-4 -bottom-4 opacity-10 text-white transform -rotate-12"><Stethoscope size={120} /></div>
        </div>

        <div className="card min-h-[200px]">
          <h3>Medical Records</h3>
          <p className="text-xs text-slate-500 mb-4">{userRole === 'parent' ? "View your ward's recent clinic visits and health reports." : "View your recent clinic visits and health reports."}</p>
          
          <div className="activity-list border-t pt-2">
             {loading && <div className="text-center py-4 text-slate-400"><Loader2 className="animate-spin inline mr-2"/> Fetching Records...</div>}
             {error && <div className="text-red-500">{error}</div>}
             {!loading && !error && records?.length === 0 && <div className="text-slate-400 text-center py-4">No records found.</div>}
             
             {!loading && !error && records?.map((visit, i) => (
                <div key={i} className="activity-item px-0 animate-in">
                  <div className="activity-icon bg-sky-50 text-sky-600"><FileText size={18} /></div>
                  <div className="activity-details">
                    <p className="activity-text font-bold">{visit.visit}</p>
                    <span className="activity-time">{visit.date} • {visit.doctor}</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase ${visit.status === 'Scheduled' ? 'text-blue-500' : 'text-emerald-600'}`}>{visit.status}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      <div className="health-actions flex flex-col gap-6">
        <div className="card">
          <h3>Book Appointment</h3>
          <p className="text-sm text-slate-500 mb-4">Schedule a visit with the campus physician or nursing staff.</p>
          <div className="flex flex-col gap-3">
             <div className="form-group">
                <label className="text-xs font-bold uppercase text-slate-400">Select Service</label>
                <select className="input text-sm p-2 border rounded w-full">
                  <option>General Consultation</option>
                  <option>Physiotherapy</option>
                  <option>Dental Checkup</option>
                  <option>Vaccination</option>
                </select>
             </div>
             <div className="form-group">
                <label className="text-xs font-bold uppercase text-slate-400">Available Slots (Today)</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                   {['04:30 PM', '05:15 PM', '06:00 PM', '06:45 PM'].map(slot => (
                     <button 
                        key={slot} 
                        className={`btn btn-sm text-xs ${selectedSlot === slot ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setSelectedSlot(slot)}
                     >
                       {slot}
                     </button>
                   ))}
                </div>
             </div>
             <button className="btn btn-primary w-full mt-2" disabled={!selectedSlot} onClick={handleBooking}>
                {selectedSlot ? 'Confirm Booking' : 'Select a Slot'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CounselingView = ({ userRole }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleCounselingRequest = async () => {
    setIsBooking(true);
    try {
      await apiClient.bookCounseling({ type: userRole === 'parent' ? 'parent' : 'student' });
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 3000);
    } catch {
      alert("Failed to submit request.");
    }
    setIsBooking(false);
  };

  return (
    <div className="counseling-view flex flex-col gap-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card flex flex-col items-center text-center gap-4">
             <div className="p-4 bg-rose-50 text-rose-600 rounded-full"><HeartHandshake size={32} /></div>
             <div>
                <h4 className="m-0">{userRole === 'parent' ? "Parent Counseling" : "Confidential Session"}</h4>
                <p className="text-xs text-slate-500 mt-1">{userRole === 'parent' ? "Discuss your ward's well-being with our experts." : "Book a 1-on-1 private counseling session with our experts."}</p>
             </div>
             <button 
                className={`btn btn-sm w-full ${bookingSuccess ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'btn-primary'}`} 
                onClick={handleCounselingRequest}
                disabled={isBooking || bookingSuccess}
              >
                {isBooking ? <Loader2 size={16} className="animate-spin" /> : bookingSuccess ? <CheckCircle2 size={16}/> : 'Request Session'}
                {bookingSuccess ? ' Session Requested' : ''}
              </button>
          </div>
          <div className="card flex flex-col items-center text-center gap-4">
             <div className="p-4 bg-violet-50 text-violet-600 rounded-full"><MessageCircle size={32} /></div>
             <div>
                <h4 className="m-0">Peer Support Group</h4>
                <p className="text-xs text-slate-500 mt-1">Join anonymous student-led groups for shared experiences.</p>
             </div>
             <button className="btn btn-outline btn-sm w-full" onClick={() => alert('Browsing community groups...')}>Browse Groups</button>
          </div>
          <div className="card flex flex-col items-center text-center gap-4">
             <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full"><Phone size={32} /></div>
             <div>
                <h4 className="m-0">24/7 Helpline</h4>
                <p className="text-xs text-slate-500 mt-1">Emergency mental health support available around the clock.</p>
             </div>
             <button className="btn btn-outline btn-sm w-full border-emerald-600 text-emerald-600" onClick={() => alert('Dialing Student Crisis Center...')}>Call Now</button>
          </div>
       </div>

       <div className="card p-0 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
             <h3>Upcoming Workshops</h3>
             <button className="btn-text">View Calendar</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-slate-100">
             {[
               { title: 'Stress Management for Exams', date: 'April 12', time: '04:00 PM', location: 'Seminar Hall B' },
               { title: 'Mindfulness & Meditation', date: 'April 15', time: '07:00 AM', location: 'Wellness Center' },
               { title: 'Career Guidance Lab', date: 'April 20', time: '11:00 AM', location: 'Main Aud' }
             ].map((ws, i) => (
                <div key={i} className="p-6 bg-white flex flex-col gap-2 group hover:bg-slate-50 transition-all cursor-pointer" onClick={() => alert(`Registered for ${ws.title}!`)}>
                   <div className="flex justify-between items-start">
                     <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">{ws.date}</span>
                     <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold">{ws.time}</span>
                   </div>
                   <h4 className="m-0 text-slate-900 group-hover:text-violet-600 transition-all uppercase tracking-tighter">{ws.title}</h4>
                   <span className="text-xs text-slate-400 mt-2 flex items-center gap-1"><Clock size={12} /> {ws.location}</span>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

const GrievancePortal = ({ userRole }) => {
  const [grievances, setGrievances] = useState([
    { id: 'GRV-26-001', subject: 'Library Air Conditioning issue', category: 'Facilities', date: 'April 02, 2026', status: 'In Progress' },
    { id: 'GRV-26-002', subject: 'Hostel Wifi Connectivity', category: 'IT Support', date: 'March 28, 2026', status: 'Resolved' },
  ]);

  const [formData, setFormData] = useState({ category: '', subject: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject) return;

    const newG = {
      id: `GRV-26-00${grievances.length + 1}`,
      subject: formData.subject,
      category: formData.category || 'General',
      date: 'Today',
      status: 'In Progress'
    };

    setGrievances([newG, ...grievances]);
    alert('Grievance filed successfully. Reference ID: ' + newG.id);
    setFormData({ category: '', subject: '', description: '' });
  };

  return (
    <div className="grievance-portal grid-2">
       <div className="grievance-list flex flex-col gap-6">
          <div className="card p-0 overflow-hidden h-fit">
             <div className="p-6 border-b flex justify-between items-center">
                <h3>{userRole === 'parent' ? "Grievances Raised" : "My Grievances"}</h3>
                <span className="badge info bg-sky-50 text-sky-600 font-bold">Total: {grievances.length}</span>
             </div>
             <div className="activity-list">
                {grievances.map((g, i) => (
                   <div key={i} className="activity-item px-6 py-4 border-b hover:bg-slate-50 cursor-pointer animate-in">
                      <div className="activity-icon bg-rose-50 text-rose-600"><AlertTriangle size={18} /></div>
                      <div className="activity-details">
                         <p className="activity-text font-bold">{g.subject}</p>
                         <span className="activity-time">{g.id} • {g.date}</span>
                      </div>
                      <span className={`badge ${g.status === 'Resolved' ? 'success' : 'warning'}`} style={{ backgroundColor: g.status === 'Resolved' ? '#ecfdf5' : '#fffbeb', color: g.status === 'Resolved' ? '#059669' : '#d97706' }}>
                         {g.status}
                      </span>
                   </div>
                ))}
             </div>
          </div>
       </div>

       <div className="new-grievance">
          <div className="card">
             <h3>File a Grievance</h3>
             <p className="text-sm text-slate-500 mb-6">If you have concerns regarding campus life, academics, or facilities, please let us know.</p>
             <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="form-group">
                   <label>Category</label>
                   <select 
                      className="input w-full p-2 border rounded"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                   >
                      <option value="">Select Category</option>
                      <option>Academic</option>
                      <option>Facilities & Hostel</option>
                      <option>Account & Finance</option>
                      <option>IT & Technical Support</option>
                      <option>Other</option>
                   </select>
                </div>
                <div className="form-group">
                   <label>Subject</label>
                   <input 
                      type="text" 
                      placeholder="Short description of the issue" 
                      className="input w-full p-2 border rounded" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                   />
                </div>
                <div className="form-group">
                   <label>Detailed Description</label>
                   <textarea 
                      rows="5" 
                      placeholder="Please provide all details..." 
                      className="textarea w-full p-2 border rounded"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                   ></textarea>
                </div>
                <div className="flex gap-2 items-center text-[10px] text-slate-400">
                   <AlertTriangle size={12} />
                   <span>False grievances can lead to disciplinary action.</span>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit Grievance <ArrowRight size={18} /></button>
             </form>
          </div>
       </div>
    </div>
  );
};

export default Welfare;
