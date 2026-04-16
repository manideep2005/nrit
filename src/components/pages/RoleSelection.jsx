import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  UserRound, 
  BookMarked,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Share2
} from 'lucide-react';

const roles = [
  { id: 'student', label: 'Student', icon: GraduationCap, color: '#3b82f6', desc: 'Access your courses, attendance, and marks.' },
  { id: 'employee', label: 'Employee', icon: Users, color: '#d97706', desc: 'Faculty and Staff portal for academic & HR management.' },
  { id: 'parent', label: 'Parent', icon: UserRound, color: '#059669', desc: 'Track your ward\'s academic progress and performance.' },
  { id: 'alumni', label: 'Alumni', icon: BookMarked, color: '#10b981', desc: 'Stay connected with the campus and access transcripts.' },
];

const RoleSelection = ({ onSelectRole }) => {
  return (
    <div className="portal-container">
      <div className="portal-header flex flex-col items-center gap-4">
        <div className="logo-group flex items-center justify-center gap-2">
          <div className="logo-icon">NR</div>
          <h1 className="portal-title">NRIT <span>Portal</span></h1>
        </div>
        <p className="portal-tagline text-lg text-center mt-2 max-w-lg">A digital initiative for Faculty, Staff, Students, Parents and Alumni.</p>
      </div>

      <div className="role-grid">
        {roles.map((role) => (
          <div key={role.id} className="role-card card" onClick={() => onSelectRole(role.id)}>
            <div className="role-icon" style={{ backgroundColor: `${role.color}15`, color: role.color }}>
              <role.icon size={32} />
            </div>
            <div className="role-info">
              <h3>{role.label}</h3>
              <p>{role.desc}</p>
            </div>
            <div className="role-action" style={{ backgroundColor: role.color }}>
              <ArrowRight size={20} color="white" />
            </div>
          </div>
        ))}
      </div>

      <div className="portal-footer">
        <div className="spotlight card">
          <div className="spotlight-header">
            <h3><Share2 size={18} /> Spotlight</h3>
            <span className="more-link">More ...</span>
          </div>
          <div className="spotlight-content">
            <div className="news-item">
              <ChevronRight size={16} color="var(--accent)" />
              <p>TRANSCRIPTS FOR NRIT ALUMNI STUDENTS - REGISTRATION OPEN</p>
            </div>
            <div className="news-item">
              <ChevronRight size={16} color="var(--accent)" />
              <p>NRIT UNIVERSITY RANKED NO. 1 IN EMERGING PRIVATE UNIVERSITIES INDIA</p>
            </div>
          </div>
        </div>
        
        <div className="info-section card">
          <div className="info-item">
            <ShieldCheck size={20} color="var(--primary)" />
            <p>NRIT University recognized for Excellence in Outcome Based Education (OBE)</p>
          </div>
          <div className="info-item">
            <ShieldCheck size={20} color="var(--primary)" />
            <p>Rated Diamond (A+) category in the 2026 World Institutional Ranking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
