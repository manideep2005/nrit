import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Calendar, FileText, Clock, User, MapPin, 
  CheckCircle2, ChevronRight, Download, Search, Filter, Loader2, Check
} from 'lucide-react';

const AcademicPage = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('curriculum');

  const renderContent = () => {
    switch (activeTab) {
      case 'curriculum': return <CurriculumView userRole={userRole} />;
      case 'timetable': return <TimetableView userRole={userRole} />;
      case 'exams': return <ExaminationView userRole={userRole} />;
      default: return <CurriculumView userRole={userRole} />;
    }
  };

  return (
    <div className="academic-container animate-in">
      <div className="sub-nav-header">
        <div className="nav-tabs">
          <button className={`nav-tab ${activeTab === 'curriculum' ? 'active' : ''}`} onClick={() => setActiveTab('curriculum')}><BookOpen size={18} /><span>Curriculum</span></button>
          <button className={`nav-tab ${activeTab === 'timetable' ? 'active' : ''}`} onClick={() => setActiveTab('timetable')}><Calendar size={18} /><span>Timetable</span></button>
          <button className={`nav-tab ${activeTab === 'exams' ? 'active' : ''}`} onClick={() => setActiveTab('exams')}><FileText size={18} /><span>Examinations</span></button>
        </div>
      </div>

      <div className="module-content mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

const CurriculumView = ({ userRole }) => {
  const allCourses = [
    { id: 'CS101', title: 'Data Structures & Algorithms', credits: 4, instructor: 'Dr. Sarah Smith', progress: 85 },
    { id: 'CS202', title: 'Database Management Systems', credits: 3, instructor: 'Prof. Michael Chen', progress: 60 },
    { id: 'CS305', title: 'Artificial Intelligence', credits: 4, instructor: 'Dr. Emily Adams', progress: 40 },
    { id: 'MA201', title: 'Discrete Mathematics', credits: 3, instructor: 'Prof. Robert Wilson', progress: 95 },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredCourses = allCourses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const courseTitle = userRole === 'parent' ? "Ward's Registered Courses" : 
                      userRole === 'employee' ? "Teaching Assignments" : "Registered Courses";
                      
  const resourceTitle = userRole === 'parent' ? "Parent Handbooks & Resources" : 
                        userRole === 'employee' ? "Faculty Resource Center" : "Academic Resources";

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="grid-2">
      <div className="courses-list flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="m-0">{courseTitle}</h3>
          <div className="search-bar sm">
            <Search size={14} />
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        
        {filteredCourses.length === 0 ? (
          <div className="p-8 text-center text-slate-500 card">No courses match your search.</div>
        ) : (
          filteredCourses.map(course => (
            <div key={course.id} className="course-card card flex justify-between items-center group">
              <div className="flex gap-4 items-center">
                <div className="course-icon bg-indigo-50 text-indigo-600 p-3 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h4 className="m-0 text-lg">{course.title}</h4>
                  <div className="flex gap-3 text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><Clock size={14} /> {course.credits} Credits</span>
                    {userRole !== 'employee' && <span className="flex items-center gap-1"><User size={14} /> {course.instructor}</span>}
                  </div>
                </div>
              </div>
              {userRole !== 'employee' && (
                <div className="progress-section text-right">
                  <span className="text-xs font-bold text-indigo-600">{course.progress}%</span>
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-indigo-600" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="resource-center flex flex-col gap-4">
        <h3 className="mb-4">{resourceTitle}</h3>
        <div className="card bg-slate-900 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h4 className="text-amber-400">{userRole === 'employee' ? 'Faculty Library Access' : 'Library Access'}</h4>
            <p className="text-slate-300 text-sm mt-2">Digital resources and journals are now accessible for the 2026 semester.</p>
            <button className="btn btn-sm bg-amber-400 text-slate-900 mt-4 border-none font-bold">Access Portal</button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 text-white transform rotate-12"><BookOpen size={120} /></div>
        </div>

        <div className="download-grid grid grid-cols-2 gap-4">
          <button 
            className="card p-4 flex flex-col items-center text-center gap-2 hover:border-indigo-500 cursor-pointer transition-all border-none bg-white"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <div className={`text-indigo-600 ${isDownloading ? 'animate-pulse' : ''}`}>
              {isDownloading ? <Loader2 size={24} className="animate-spin" /> : downloadSuccess ? <Check size={24} className="text-emerald-500"/> : <Download size={24} />}
            </div>
            <span className={`text-sm font-semibold ${downloadSuccess ? 'text-emerald-600' : ''}`}>
               {downloadSuccess ? 'Downloaded!' : isDownloading ? 'Downloading...' : userRole === 'parent' ? "Ward's Study Material" : "Study Material"}
            </span>
          </button>
          <div className="card p-4 flex flex-col items-center text-center gap-2 hover:border-indigo-500 cursor-pointer transition-all">
            <div className="text-indigo-600"><FileText size={24} /></div>
            <span className="text-sm font-semibold">Syllabus 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimetableView = ({ userRole }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];
  
  const schedule = [
    { day: 'Monday', time: '09:00 AM', subject: 'Data Structures', room: 'Lab 101' },
    { day: 'Monday', time: '11:00 AM', subject: 'Mathematics', room: 'Hall A' },
    { day: 'Tuesday', time: '10:00 AM', subject: 'DBMS', room: 'Room 302' },
    { day: 'Wednesday', time: '09:00 AM', subject: 'Artificial Intelligence', room: 'AI Lab' },
  ];

  return (
    <div className="timetable-container card p-0 overflow-hidden">
      <div className="timetable-grid">
        <div className="day-slot bg-slate-100 border-r border-b">Time</div>
        {days.map(day => <div key={day} className="day-slot bg-slate-100 border-b">{day}</div>)}
        
        {times.map(time => (
          <React.Fragment key={time}>
            <div className="time-slot border-r">{time}</div>
            {days.map(day => {
              const item = schedule.find(s => s.day === day && s.time === time);
              return (
                <div key={`${day}-${time}`} className={`schedule-item ${item ? 'occupied' : ''}`}>
                  {item && (
                    <>
                      <h5>{item.subject}</h5>
                      <span className="flex items-center gap-1 mt-1"><MapPin size={10} /> {item.room}</span>
                    </>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ExaminationView = ({ userRole }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const results = [
    { exam: 'Mid-term Assessment', date: 'March 15, 2026', subject: 'Data Structures', score: 'A+', status: 'Published' },
    { exam: 'Quiz 2', date: 'March 28, 2026', subject: 'Discrete Maths', score: 'B', status: 'Published' },
    { exam: 'Lab Final', date: 'April 05, 2026', subject: 'DBMS', score: 'Pending', status: 'Processing' },
  ];

  const resultsTitle = userRole === 'parent' ? "Ward's Recent Results" : 
                       userRole === 'employee' ? "Recent Grading Published" : "Recent Results";

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="exam-view-container">
      <div className="grid-2">
        <div className="results-card card p-0 overflow-hidden h-fit">
          <div className="p-6 border-b"><h3>{resultsTitle}</h3></div>
          <div className="activity-list">
            {results.map((res, i) => (
              <div key={i} className="activity-item px-6 py-4">
                <div className={`activity-icon ${res.status === 'Published' ? 'blue' : 'amber'}`}><FileText size={18} /></div>
                <div className="activity-details">
                  <p className="activity-text font-bold">{res.subject}</p>
                  <span className="activity-time">{res.exam} • {res.date}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {userRole !== 'employee' && <span className={`badge ${res.status === 'Published' ? 'success' : 'warning'}`}>{res.score}</span>}
                  <span className="text-[10px] uppercase font-bold text-slate-400">{res.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="exam-info flex flex-col gap-6">
          <div className="card p-6 border-dashed border-2 flex flex-col items-center text-center gap-4">
            <div className="p-4 bg-green-50 text-green-600 rounded-full">
              {downloadSuccess ? <Check size={32} /> : <CheckCircle2 size={32} />}
            </div>
            <div>
              <h4>{userRole === 'parent' ? "Ward's Progress Report Available" : userRole === 'employee' ? "Exam Schedule Published" : "Hall Ticket Available"}</h4>
              <p className="text-sm text-slate-500 mt-2">
                {userRole === 'parent' 
                  ? "Your ward's comprehensive progress report for the term is now ready." 
                  : userRole === 'employee' 
                    ? "The invigilation schedule for final semesters." 
                    : "Your hall ticket for the upcoming final semester examinations is now ready for download."}
              </p>
            </div>
            <button 
              className={`btn ${downloadSuccess ? 'btn-outline border-emerald-500 text-emerald-600' : 'btn-primary'} w-full`}
              onClick={handleDownload}
              disabled={isDownloading || downloadSuccess}
            >
              {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />} 
              {downloadSuccess ? " Downloaded Successfully" : userRole === 'parent' ? " Download Report" : userRole === 'employee' ? " Download Schedule" : " Download Hall Ticket"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicPage;
