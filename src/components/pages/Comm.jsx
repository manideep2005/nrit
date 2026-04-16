import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Megaphone, 
  History, 
  Mail, 
  Phone, 
  User,
  Filter,
  MoreVertical,
  Plus,
  CheckCheck,
  Check
} from 'lucide-react';

const Communication = () => {
  const [activeTab, setActiveTab] = useState('announcements');

  const renderContent = () => {
    switch (activeTab) {
      case 'announcements': return <AnnouncementsView />;
      case 'messages': return <MessagesView />;
      case 'logs': return <CommunicationLogsView />;
      default: return <AnnouncementsView />;
    }
  };

  return (
    <div className="comm-container animate-in">
      <div className="sub-nav-header">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            <Megaphone size={18} />
            <span>Announcements</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <MessageSquare size={18} />
            <span>Support Chat</span>
          </button>
          <button 
            className={`nav-tab ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            <History size={18} />
            <span>Auto Logs</span>
          </button>
        </div>
      </div>

      <div className="module-content mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

const AnnouncementsView = () => {
  const announcements = [
    { title: 'Annual Cultural Fest 2026 - Registrations Open!', sender: 'Event Committee', date: 'April 05, 2026', tag: 'Events', priority: 'High', content: 'Get ready for NRIT Pulse! Registrations for all cultural and technical events are now live on the portal.' },
    { title: 'Semester 4 Exam Schedule Released', sender: 'Exam Cell', date: 'April 02, 2026', tag: 'Academic', priority: 'Urgent', content: 'The final timetable for the semester-end examinations is now published in the Academic module.' },
    { title: 'New Library Timings - Effective from Monday', sender: 'Administration', date: 'March 30, 2026', tag: 'Campus', priority: 'Normal', content: 'To support exam preparation, the library will now remain open until 10:00 PM on weekdays.' },
  ];

  return (
    <div className="announcements-grid flex flex-col gap-4">
      {announcements.map((ann, i) => (
        <div key={i} className="ann-card card flex flex-col gap-3 group relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-1 h-full ${ann.priority === 'Urgent' ? 'bg-red-500' : ann.priority === 'High' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
          <div className="flex justify-between items-start">
             <div className="flex gap-2">
               <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 rounded text-slate-500">{ann.tag}</span>
               {ann.priority === 'Urgent' && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-red-50 rounded text-red-500">Urgent</span>}
             </div>
             <span className="text-xs text-slate-400 font-medium">{ann.date}</span>
          </div>
          <h4 className="text-xl m-0 group-hover:text-amber-600 transition-colors uppercase tracking-tight">{ann.title}</h4>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{ann.content}</p>
          <div className="flex justify-between items-center border-t pt-4">
             <div className="flex items-center gap-2">
               <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                 <User size={14} />
               </div>
               <span className="text-xs font-semibold text-slate-500">{ann.sender}</span>
             </div>
             <button className="btn-text text-amber-600">Read More</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const MessagesView = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello Mani, how can I help you today regarding your application?', time: '10:40 AM', sender: 'admin' },
    { text: 'I wanted to know if my 12th marksheet verification is done.', time: '10:42 AM', sender: 'user' },
    { text: 'Yes, your document verification is complete. You can proceed to the enrollment section.', time: '10:45 AM', sender: 'admin' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'user'
    };
    setMessages([...messages, newMsg]);
    setInputText('');
    
    // Auto-reply simulation
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: 'Thank you for your message. An advisor will get back to you shortly.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'admin'
      }]);
    }, 1500);
  };

  const chats = [
    { name: 'Admin Helpdesk', lastMsg: messages[messages.length-1].text, time: 'Now', unread: 0, online: true },
    { name: 'Dr. Sarah Smith', lastMsg: 'Please submit the assignment by tomorrow.', time: 'Yesterday', unread: 2, online: false },
    { name: 'Finance Office', lastMsg: 'Receipt #9921 has been generated.', time: 'April 02', unread: 0, online: true },
  ];

  return (
    <div className="messages-view card p-0 flex h-[600px] overflow-hidden">
      <div className="chats-list w-80 border-r flex flex-col hidden md:flex">
        <div className="p-4 border-b">
           <div className="search-bar sm bg-slate-50 flex items-center gap-2 px-3 py-2 rounded-lg border">
             <Search size={14} className="text-slate-400" />
             <input type="text" placeholder="Search chats..." className="bg-transparent border-none text-sm focus:outline-none" />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, i) => (
            <div key={i} className={`p-4 flex gap-3 hover:bg-slate-50 cursor-pointer border-b ${i === 0 ? 'bg-amber-50/50' : ''}`}>
               <div className="relative">
                 <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 overflow-hidden">
                    <User size={24} />
                 </div>
                 {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>}
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm truncate">{chat.name}</span>
                    <span className="text-[10px] text-slate-400">{chat.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate m-0">{chat.lastMsg}</p>
               </div>
               {chat.unread > 0 && <div className="bg-amber-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{chat.unread}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-window flex-1 flex flex-col bg-slate-50/30">
        <div className="p-4 bg-white border-b flex justify-between items-center shadow-sm">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center">
               <User size={20} />
             </div>
             <div>
               <h4 className="m-0 text-sm">Admin Helpdesk</h4>
               <span className="text-[10px] text-emerald-500 font-bold">Online</span>
             </div>
           </div>
           <button className="icon-btn" onClick={() => alert('Chat settings opening...')}>
             <MoreVertical size={20} />
           </button>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`message p-3 rounded-2xl border shadow-sm max-w-[70%] animate-in ${
                msg.sender === 'user' 
                ? 'bg-amber-500 text-white rounded-br-none self-end border-amber-600 shadow-md' 
                : 'bg-white text-slate-800 rounded-tl-none self-start'
              }`}
            >
               <p className="m-0 text-sm leading-relaxed">{msg.text}</p>
               <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'user' ? 'justify-end text-white/70' : 'text-slate-400'}`}>
                 <span className="text-[9px] block uppercase font-bold">{msg.time}</span>
                 {msg.sender === 'user' && <CheckCheck size={10} />}
               </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t flex gap-4">
           <button className="icon-btn bg-slate-100 rounded-lg p-2" onClick={() => alert('Attachment upload opening...')}>
             <Plus size={20} />
           </button>
           <input 
             type="text" 
             placeholder="Type your message here..." 
             className="flex-1 bg-slate-50 border-none px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amber-500/20" 
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
           />
           <button 
             className="icon-btn bg-amber-500 text-white rounded-lg px-4 hover:bg-amber-600 transition-all disabled:bg-slate-300"
             onClick={handleSendMessage}
             disabled={!inputText.trim()}
           >
             <Send size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};


const CommunicationLogsView = () => (
  <div className="logs-view card p-0 overflow-hidden">
    <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
       <h3>Automated Communication History</h3>
       <div className="flex gap-2">
         <button className="btn btn-outline btn-sm"><Filter size={14} /> Filter Logs</button>
       </div>
    </div>
    <div className="table-responsive">
       <table className="custom-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Channel</th>
              <th>Trigger Event</th>
              <th>Recipient</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {[
              { time: 'Today, 10:45 AM', channel: 'In-App', event: 'Doc Verification', user: 'Self', status: 'Delivered' },
              { time: 'Yesterday, 02:30 PM', channel: 'WhatsApp', event: 'Fee Reminder', user: 'Self', status: 'Read' },
              { time: 'April 02, 09:15 AM', channel: 'Email', event: 'Application Update', user: 'Self', status: 'Clicked' },
              { time: 'March 28, 11:00 AM', channel: 'SMS', event: 'OTP Verification', user: 'Self', status: 'Delivered' },
            ].map((log, i) => (
              <tr key={i}>
                <td className="text-xs text-slate-500">{log.time}</td>
                <td>
                  <div className="flex items-center gap-2">
                    {log.channel === 'WhatsApp' ? <MessageSquare size={14} className="text-emerald-500" /> : log.channel === 'Email' ? <Mail size={14} className="text-blue-500" /> : <Phone size={14} className="text-slate-500" />}
                    <span className="text-sm font-medium">{log.channel}</span>
                  </div>
                </td>
                <td className="font-semibold">{log.event}</td>
                <td className="text-sm">{log.user}</td>
                <td><span className={`badge ${log.status === 'Read' || log.status === 'Clicked' ? 'success' : 'info'}`} style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>{log.status}</span></td>
                <td><button className="btn-text text-xs">View Content</button></td>
              </tr>
            ))}
          </tbody>
       </table>
    </div>
  </div>
);

export default Communication;
