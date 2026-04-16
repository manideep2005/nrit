import React, { useState } from 'react';
import { 
  ClipboardList, 
  FileCheck, 
  UserCheck, 
  UserPlus, 
  MessageSquare, 
  Calendar,
  Layers,
  ArrowRight,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Upload,
  Plus
} from 'lucide-react';

const subModules = [
  { id: 'processing', label: 'Application Processing', icon: ClipboardList },
  { id: 'documents', label: 'Document Management', icon: FileCheck },
  { id: 'eligibility', label: 'Eligibility Verification', icon: UserCheck },
  { id: 'enrollment', label: 'Enrollment Automation', icon: UserPlus },
  { id: 'communication', label: 'Automated Communication', icon: MessageSquare },
  { id: 'interview', label: 'Interview Scheduling', icon: Calendar },
];

const Admissions = ({ userRole }) => {
  const [activeSub, setActiveSub] = useState('processing');
  const [viewType, setViewType] = useState(userRole === 'student' ? 'applicant' : 'admin');

  const renderSubContent = () => {
    switch (activeSub) {
      case 'processing':
        return viewType === 'admin' ? <AdminApplicationList /> : <ApplicantApplicationForm />;
      case 'documents':
        return viewType === 'admin' ? <AdminDocumentVerification /> : <ApplicantDocumentUpload />;
      case 'eligibility':
        return viewType === 'admin' ? <AdminEligibilityCheck /> : <ApplicantEligibilityStatus />;
      case 'enrollment':
        return viewType === 'admin' ? <AdminEnrollmentAutomation /> : <ApplicantEnrollmentOffer />;
      case 'communication':
        return <CommunicationLogs />;
      case 'interview':
        return viewType === 'admin' ? <AdminInterviewSchedule /> : <ApplicantInterviewBooking />;
      default:
        return (
          <div className="module-placeholder">
            <div className="placeholder-icon"><Layers size={48} /></div>
            <h3>{subModules.find(m => m.id === activeSub)?.label}</h3>
            <p>Module functionality is being implemented according to your detailed specifications.</p>
          </div>
        );
    }
  };

  return (
    <div className="admissions-container">
      {/* Sub-Navigation */}
      <div className="sub-nav-header">
        <div className="nav-tabs">
          {subModules.map((sub) => (
            <button
              key={sub.id}
              className={`nav-tab ${activeSub === sub.id ? 'active' : ''}`}
              onClick={() => setActiveSub(sub.id)}
            >
              <sub.icon size={18} />
              <span>{sub.label}</span>
            </button>
          ))}
        </div>
        
        {userRole === 'employee' && (
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewType === 'applicant' ? 'active' : ''}`} 
              onClick={() => setViewType('applicant')}
            >
              Applicant Portal
            </button>
            <button 
              className={`toggle-btn ${viewType === 'admin' ? 'active' : ''}`}
              onClick={() => setViewType('admin')}
            >
              Admin Panel
            </button>
          </div>
        )}
      </div>

      <div className="module-content animate-in">
        {renderSubContent()}
      </div>
    </div>
  );
};

/* --- Sub-Components --- */

const AdminApplicationList = () => {
  const [applications, setApplications] = useState([
    { id: 'APP-2026-001', name: 'Mani Deep', program: 'Computer Science', date: '2026-04-01', status: 'Pending Review', fee: 'Paid' },
    { id: 'APP-2026-002', name: 'Sara Johnson', program: 'Mechanical Engineering', date: '2026-04-02', status: 'Approved', fee: 'Paid' },
    { id: 'APP-2026-003', name: 'Rob Wilson', program: 'Electrical Engineering', date: '2026-04-03', status: 'Rejected', fee: 'Unpaid' },
  ]);

  const updateStatus = (id, newStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    // Simulate notification trigger
    console.log(`Notification sent to applicant ${id}: Status updated to ${newStatus}`);
  };

  return (
    <div className="admin-list-view card">
      <div className="list-header">
        <div className="header-info">
          <h3>Recent Applications</h3>
          <p>Manage and review incoming student applications.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary"><Plus size={18} /> Manual Entry</button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Applicant Name</th>
              <th>Program</th>
              <th>Submitted Date</th>
              <th>Fee Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="font-mono">{app.id}</td>
                <td className="font-semibold">{app.name}</td>
                <td>{app.program}</td>
                <td>{app.date}</td>
                <td>
                  <span className={`badge ${app.fee === 'Paid' ? 'success' : 'warning'}`}>
                    {app.fee}
                  </span>
                </td>
                <td>
                  <span className={`status-pill ${app.status.toLowerCase().replace(' ', '-')}`}>
                    {app.status}
                  </span>
                </td>
                <td className="actions">
                  <button className="action-icon-btn" title="View Details"><Eye size={16} /></button>
                  <button 
                    className="action-icon-btn success" 
                    title="Approve"
                    onClick={() => updateStatus(app.id, 'Approved')}
                  >
                    <CheckCircle2 size={16} />
                  </button>
                  <button 
                    className="action-icon-btn danger" 
                    title="Reject"
                    onClick={() => updateStatus(app.id, 'Rejected')}
                  >
                    <XCircle size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ApplicantApplicationForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', dob: '', gender: '', program: '', details: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert('Application submitted successfully! Your Application ID is: APP-2026-' + Math.floor(100 + Math.random() * 900));
      setSubmitted(false);
      setFormData({ name: '', dob: '', gender: '', program: '', details: '' });
    }, 1000);
  };

  return (
    <div className="applicant-form card">
      <div className="form-header">
        <h3>New Student Registration</h3>
        <p>Fill in the details below to start your academic journey with NRIT.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name *</label>
            <input 
              type="text" 
              placeholder="Enter your full name" 
              required 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth *</label>
            <input 
              type="date" 
              required
              value={formData.dob}
              onChange={e => setFormData({...formData, dob: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Gender *</label>
            <select 
              required
              value={formData.gender}
              onChange={e => setFormData({...formData, gender: e.target.value})}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Program Applied *</label>
            <select 
              required
              value={formData.program}
              onChange={e => setFormData({...formData, program: e.target.value})}
            >
              <option value="">Select Program</option>
              <option>B.Tech Computer Science</option>
              <option>B.Tech Mechanical Engineering</option>
              <option>M.Tech AI & Data Science</option>
            </select>
          </div>
          <div className="form-group full-width">
            <label>Academic Details (Previous Qualification)</label>
            <textarea 
              rows="3" 
              placeholder="Enter your academic details..."
              value={formData.details}
              onChange={e => setFormData({...formData, details: e.target.value})}
            ></textarea>
          </div>
        </div>

        <div className="form-footer">
          <button type="button" className="btn btn-outline" onClick={() => alert('Draft Saved Locally.')}>Save Draft</button>
          <button type="submit" className="btn btn-primary" disabled={submitted}>
            {submitted ? 'Submitting...' : 'Submit Application'} <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

const AdminDocumentVerification = () => {
  const [docs, setDocs] = useState([
    { id: 'APP-2026-001', type: '10th Marksheet', file: 'marksheet_10.pdf', date: '2026-04-05', status: 'Pending' }
  ]);

  const verify = (status) => {
    setDocs(docs.map(d => ({ ...d, status })));
    alert(`Document ${status}`);
  };

  return (
    <div className="admin-list-view card">
      <div className="list-header">
        <div className="header-info">
          <h3>Document Verification Queue</h3>
          <p>Review and verify documents submitted by applicants.</p>
        </div>
      </div>
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>App ID</th>
              <th>Document Type</th>
              <th>File Name</th>
              <th>Upload Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc, i) => (
              <tr key={i}>
                <td className="font-mono">{doc.id}</td>
                <td>{doc.type}</td>
                <td><span className="file-link"><Download size={14} /> {doc.file}</span></td>
                <td>{doc.date}</td>
                <td><span className={`badge ${doc.status === 'Approved' ? 'success' : doc.status === 'Rejected' ? 'danger' : 'warning'}`}>{doc.status}</span></td>
                <td className="actions">
                  <button className="action-icon-btn success" onClick={() => verify('Approved')}><CheckCircle2 size={16} /></button>
                  <button className="action-icon-btn danger" onClick={() => verify('Rejected')}><XCircle size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ApplicantDocumentUpload = () => {
  const [uploads, setUploads] = useState({
    '10th Marksheet': 'Pending',
    '12th Marksheet': 'Pending',
    'ID Proof': 'Pending',
    'Birth Certificate': 'Pending'
  });

  const handleUpload = (doc) => {
    setUploads({ ...uploads, [doc]: 'Uploading...' });
    setTimeout(() => {
      setUploads({ ...uploads, [doc]: 'Uploaded' });
    }, 1500);
  };

  return (
    <div className="applicant-form card">
       <div className="form-header">
        <h3>Document Upload Portal</h3>
        <p>Please upload the required documents for your application (APP-2026-001).</p>
      </div>
      <div className="upload-grid">
        {Object.entries(uploads).map(([doc, status]) => (
          <div key={doc} className="upload-item card">
            <div className="upload-info">
              <span className="doc-name">{doc}</span>
              <span className={`doc-status ${status === 'Uploaded' ? 'text-green-600' : ''}`}>
                {status === 'Pending' ? <Clock size={12} /> : status === 'Uploading...' ? <div className="animate-spin mr-1">⌛</div> : <CheckCircle2 size={12} />} 
                {status}
              </span>
            </div>
            <button 
              className={`btn btn-sm ${status === 'Uploaded' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleUpload(doc)}
              disabled={status !== 'Pending'}
            >
              {status === 'Pending' ? <><Upload size={14} /> Upload</> : status === 'Uploading...' ? 'Wait...' : 'Success'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- Eligibility Verification --- */
const AdminEligibilityCheck = () => (
  <div className="admin-list-view card">
    <div className="list-header">
      <div className="header-info">
        <h3>Eligibility Check Engine</h3>
        <p>Automated verification based on program criteria.</p>
      </div>
    </div>
    <div className="table-responsive">
      <table className="custom-table">
        <thead>
          <tr>
            <th>App ID</th>
            <th>Acad %</th>
            <th>Entrance Score</th>
            <th>Criteria Match</th>
            <th>Status</th>
            <th>Override</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-mono">APP-2026-001</td>
            <td>88%</td>
            <td>142/160</td>
            <td><span className="badge success">Pass</span></td>
            <td><span className="status-pill approved">Eligible</span></td>
            <td><button className="btn btn-sm btn-outline" onClick={() => alert('Eligibility criteria met.')}>Review</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const ApplicantEligibilityStatus = () => (
  <div className="applicant-form card">
    <div className="text-center py-8">
      <div className="status-icon"><CheckCircle2 size={48} color="var(--success)" /></div>
      <h3>You are Eligible!</h3>
      <p>Based on your academic records, you have met the initial eligibility criteria for B.Tech CS.</p>
      <div className="criteria-list">
        <div className="criteria-item"><span>Academic Percentage: 88%</span> <CheckCircle2 size={14} color="var(--success)" /></div>
        <div className="criteria-item"><span>Entrance Score: 142</span> <CheckCircle2 size={14} color="var(--success)" /></div>
      </div>
    </div>
  </div>
);

/* --- Enrollment Automation --- */
const AdminEnrollmentAutomation = () => (
  <div className="admin-list-view card">
    <div className="list-header"><h3>Enrollment Dashboard</h3></div>
    <div className="table-responsive">
      <table className="custom-table">
        <thead>
          <tr><th>App ID</th><th>Offer Status</th><th>Batch</th><th>Enrollment ID</th><th>Action</th></tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-mono">APP-2026-002</td>
            <td><span className="badge success">Accepted</span></td>
            <td>Batch-A</td>
            <td className="font-mono">STU-2026-882</td>
            <td><button className="btn btn-sm btn-primary" onClick={() => alert('Processing Enrollment ID STU-2026-882')}>Process</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const ApplicantEnrollmentOffer = () => {
  const [status, setStatus] = useState('Offered');

  return (
    <div className="applicant-form card">
      <h3>Admission Offer</h3>
      <p>Congratulations! You have been offered admission to NRIT.</p>
      <div className={`offer-box card ${status !== 'Offered' ? 'opacity-50 pointer-events-none' : ''}`}>
        <h4>B.Tech Computer Science</h4>
        <p>Semester 1 Fees: $2,500</p>
        <div className="flex gap-4">
          <button className="btn btn-primary" onClick={() => { setStatus('Accepted'); alert('Offer Accepted!'); }}>Accept Offer</button>
          <button className="btn btn-outline" onClick={() => { setStatus('Declined'); alert('Offer Declined.'); }}>Decline</button>
        </div>
      </div>
      {status !== 'Offered' && <div className="text-center mt-4 font-bold text-indigo-600">Decision: {status}</div>}
    </div>
  );
};

/* --- Automated Communication --- */
const CommunicationLogs = () => (
  <div className="admin-list-view card">
    <div className="list-header">
      <div className="header-info">
        <h3>System Communication Logs</h3>
        <p>Audit trail of all automated messages sent to applicants.</p>
      </div>
      <button className="btn btn-outline btn-sm" onClick={() => alert('Exporting CSV...')}>Export CSV</button>
    </div>
    <div className="table-responsive">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Log ID</th>
            <th>Recipient</th>
            <th>Event Trigger</th>
            <th>Channel</th>
            <th>Sent Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: '#LOG-121', name: 'Mani Deep', event: 'Application Submitted', channel: 'WhatsApp', time: '10:45 AM', status: 'Delivered' },
            { id: '#LOG-120', name: 'Sara Johnson', event: 'Document Rejected', channel: 'Email', time: '09:30 AM', status: 'Read' },
            { id: '#LOG-119', name: 'Rob Wilson', event: 'Fee Reminder', channel: 'SMS', time: 'Yesterday', status: 'Delivered' },
            { id: '#LOG-118', name: 'Mani Deep', event: 'OTP Verification', channel: 'SMS', time: 'Yesterday', status: 'Expired' },
          ].map((log, i) => (
            <tr key={i}>
              <td className="font-mono text-xs">{log.id}</td>
              <td className="font-semibold">{log.name}</td>
              <td><span className="text-sm">{log.event}</span></td>
              <td>{log.channel}</td>
              <td className="text-xs text-slate-500">{log.time}</td>
              <td>
                <span className={`badge ${log.status === 'Delivered' || log.status === 'Read' ? 'success' : 'warning'}`}>
                  {log.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* --- Interview Scheduling --- */
const AdminInterviewSchedule = () => (
  <div className="admin-list-view card">
    <div className="list-header">
      <div className="header-info">
        <h3>Interview Calendar</h3>
        <p>Manage interview slots for upcoming admissions.</p>
      </div>
      <div className="flex gap-2">
         <button className="btn btn-outline btn-sm" onClick={() => alert('Slot Configuration Menu')}>Configure Slots</button>
         <button className="btn btn-primary btn-sm" onClick={() => alert('AI Auto-Assignment in progress...')}>Auto-Assign</button>
      </div>
    </div>
    <div className="timetable-container p-6">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { date: 'April 10, 2026', time: '10:00 AM', applicant: 'Mani Deep', status: 'Confirmed', panel: 'Panel A' },
            { date: 'April 10, 2026', time: '11:00 AM', applicant: 'Sara Johnson', status: 'Waitlist', panel: 'Panel B' },
            { date: 'April 11, 2026', time: '02:00 PM', applicant: 'Unassigned', status: 'Available', panel: 'Panel A' },
          ].map((slot, i) => (
            <div key={i} className={`p-4 rounded-xl border-2 ${slot.status === 'Available' ? 'border-dashed border-slate-200 bg-slate-50' : 'border-indigo-100 bg-indigo-50/30'}`}>
               <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{slot.date}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-white border rounded">{slot.time}</span>
               </div>
               <h4 className="m-0 text-slate-900">{slot.applicant}</h4>
               <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tight">{slot.panel}</p>
               <div className="mt-4 flex justify-between items-center">
                  <span className={`text-[10px] font-bold uppercase ${slot.status === 'Confirmed' ? 'text-emerald-600' : 'text-slate-400'}`}>{slot.status}</span>
                  <button className="btn-text text-xs" onClick={() => alert(`Managing slot for ${slot.applicant}`)}>Manage Slot</button>
               </div>
            </div>
          ))}
       </div>
    </div>
  </div>
);

const ApplicantInterviewBooking = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="applicant-form card">
      <div className="form-header">
         <h3>Book Your Interview Slot</h3>
         <p>Please select a convenient time for your academic interview with the faculty panel.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <button 
            key={i} 
            className={`group p-6 rounded-2xl border-2 transition-all text-center ${selected === i ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 hover:border-indigo-600 hover:bg-indigo-50'}`}
            onClick={() => setSelected(i)}
          >
             <span className={`block text-xs font-bold uppercase ${selected === i ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'}`}>April {10+i}</span>
             <span className="block text-lg font-bold text-slate-900 mt-1">10:00 AM</span>
             <span className="block text-[10px] text-emerald-500 font-bold mt-2 uppercase">4 Slots Left</span>
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
         <button className="btn btn-primary px-12" disabled={!selected} onClick={() => alert(`Slot for April ${10+selected} booked!`)}>Confirm Selection</button>
      </div>
    </div>
  );
};

export default Admissions;
