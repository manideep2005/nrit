/**
 * API Client Simulator
 * This file acts as your network layer. Right now, it simulates network requests 
 * with a delay to mock real backend communication. 
 * To switch to a real API, replace these Promise blocks with actual `fetch()` or `axios()` calls.
 */

// Simulated Network Delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiClient = {
  // --- Employee / Admin Endpoints ---
  getDashboardStats: async () => {
    await delay(800); 
    return [
      { label: 'Total Students', value: '1,248', change: '+2.4%', icon: 'Users', color: '#3b82f6' },
      { label: 'Active Staff', value: '142', change: '+0.8%', icon: 'GraduationCap', color: '#10b981' },
      { label: 'Avg. Attendance', value: '94%', change: '+1.2%', icon: 'Calendar', color: '#f59e0b' },
      { label: 'Revenue (MTD)', value: '$124.5k', change: '+5.4%', icon: 'TrendingUp', color: '#ef4444' },
    ];
  },

  getRecentActivities: async () => {
    await delay(1000);
    return [
      { id: 1, title: 'Curriculum Updated', desc: 'Computer Science Fall 2026 Batch', time: '2 hours ago', user: 'Admin Panel', status: 'Completed' },
      { id: 2, title: 'Exam Schedule Released', desc: 'Mid-term examinations for B.Tech', time: '4 hours ago', user: 'Academic Dept', status: 'Completed' },
    ];
  },

  // --- Student Endpoints ---
  getStudentStats: async () => {
    await delay(700);
    return [
      { label: "Today's Classes", value: '4 Scheduled', change: '', icon: 'Calendar', color: '#3b82f6' },
      { label: 'My Attendance', value: '89%', change: '+2%', icon: 'CheckCircle2', color: '#10b981' },
      { label: 'Upcoming Assignments', value: '2 Due', change: '', icon: 'FileText', color: '#f59e0b' },
      { label: 'Current CGPA', value: '8.4', change: 'Top 15%', icon: 'Award', color: '#8b5cf6' },
    ];
  },

  getStudentFeed: async () => {
    await delay(1100);
    return [
      { id: 1, title: 'Data Structures & Algo (CS101)', desc: 'Lab Session', time: '09:00 AM • Lab 3', icon: 'BookOpen', status: 'Completed', color: 'amber' },
      { id: 2, title: 'Database Management (CS102)', desc: 'Theory', time: '11:00 AM • Room 204', icon: 'Users', status: 'Upcoming', color: 'blue' },
    ];
  },

  // --- Parent Endpoints ---
  getParentStats: async () => {
    await delay(850);
    return [
      { label: "Ward's Attendance", value: '89%', change: 'Good', icon: 'CheckCircle2', color: '#10b981' },
      { label: 'Recent Grade', value: 'A-', change: 'CS101', icon: 'Award', color: '#8b5cf6' },
      { label: 'Pending Fees', value: '$1,200', change: 'Due next week', icon: 'Wallet', color: '#ef4444' },
    ];
  },

  getParentFeed: async () => {
    await delay(900);
    return [
      { id: 1, title: 'Mid-Term Results Published', desc: 'View complete grade report.', time: '2 days ago • Exam Department', icon: 'FileText', status: 'Report Ready', color: 'blue' },
      { id: 2, title: 'Parent-Teacher Meeting Scheduled', desc: 'Prof. Smith confirmed via chat.', time: 'Next Friday, 10:00 AM', icon: 'Users', status: 'Confirmed', color: 'amber' },
    ];
  },

  payFees: async (amount) => {
    await delay(1500); // Simulate processing payment
    return { success: true, transactionId: `TXN-${Math.floor(Math.random() * 100000)}`, message: `Successfully paid $${amount}` };
  },

  // --- Alumni Endpoints ---
  getAlumniStats: async () => {
    await delay(600);
    return [
      { label: 'Upcoming Networking', value: '3 Events', change: '', icon: 'Building', color: '#3b82f6' },
      { label: 'Requested Transcripts', value: 'Status: Ready', change: '', icon: 'FileText', color: '#10b981' },
    ];
  },

  getAlumniFeed: async () => {
    await delay(750);
    return [
      { id: 1, title: 'Annual Tech Meet 2026', desc: 'Registration Open', time: 'June 15, 2026 • Main Campus', icon: 'Building', status: 'Join Now', color: 'blue' },
    ];
  },

  // --- Other Data Modules ---
  getMedicalRecords: async () => {
    await delay(1200);
    return [
      { visit: 'General Checkup', date: 'March 15, 2026', doctor: 'Dr. John Doe', status: 'Completed' },
      { visit: 'Flu Vaccination', date: 'Feb 10, 2026', doctor: 'Campus Clinic', status: 'Completed' }
    ];
  },

  bookCounseling: async (details) => {
    await delay(1200);
    return { success: true, bookingId: `CSL-${Math.floor(Math.random() * 10000)}` };
  },

  getUsers: async () => {
    await delay(1200);
    return [
      { id: 'ADM-001', name: 'Mani Deep', role: 'Super Admin', email: 'mani@nrit.edu', status: 'Active', lastLogin: '10 mins ago' },
      { id: 'STF-042', name: 'Dr. Sarah Smith', role: 'Employee', email: 'sarah@nrit.edu', status: 'Active', lastLogin: '2 hours ago' },
      { id: 'STU-882', name: 'Alex Johnson', role: 'Student', email: 'alex@student.nrit.edu', status: 'Inactive', lastLogin: '3 days ago' },
    ];
  },

  getApplications: async () => {
    await delay(1500);
    return [
      { id: 'APP-2026-001', name: 'Mani Deep', program: 'Computer Science', date: '2026-04-01', status: 'Pending Review', fee: 'Paid' },
      { id: 'APP-2026-002', name: 'Sara Johnson', program: 'Mechanical Engineering', date: '2026-04-02', status: 'Approved', fee: 'Paid' },
      { id: 'APP-2026-003', name: 'Rob Wilson', program: 'Electrical Engineering', date: '2026-04-03', status: 'Rejected', fee: 'Unpaid' },
    ];
  },

  login: async (credentials) => {
    await delay(1000);
    if (!credentials.email || !credentials.password) throw new Error("Invalid credentials");
    return { token: 'mock-jwt-token-12345', user: { email: credentials.email, role: 'student' } };
  }
};
