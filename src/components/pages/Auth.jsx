import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  ArrowLeft, 
  UserPlus, 
  LogIn,
  Eye,
  EyeOff,
  Globe
} from 'lucide-react';

const Auth = ({ role, onBack, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const getRoleTitle = () => {
    const titles = {
      student: 'Student Portal',
      employee: 'Employee Portal',
      parent: 'Parent Portal',
      alumni: 'Alumni Portal',
    };
    return titles[role] || 'Academic Portal';
  };

  const handleAuth = (e) => {
    e.preventDefault();
    // Simulate authentication
    console.log(`Authenticating as ${role}:`, formData);
    onLoginSuccess(role);
  };

  return (
    <div className="auth-container">
      <div className="auth-card card">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Roles</span>
        </button>

        <div className="auth-header flex flex-col items-center gap-2 mb-6">
          <div className="role-badge" style={{ backgroundColor: `var(--primary)15`, color: `var(--primary)` }}>
            {role.toUpperCase()}
          </div>
          <h1 className="font-bold text-lg">{isLogin ? 'Sign In' : 'Create Account'}</h1>
          <p className="text-sm text-center">{getRoleTitle()}</p>
        </div>

        <form onSubmit={handleAuth} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-with-icon">
                <User size={18} />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  required 
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Registration Number / Email</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input 
                type="text" 
                placeholder={role === 'student' ? '22BCE****' : 'admin@nrit.edu'} 
                required 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••" 
                required 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button" 
                className="eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isLogin && <a href="#" className="forgot-password">Forgot password?</a>}

          <button type="submit" className="btn btn-primary auth-btn">
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
          </button>
        </form>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        <div className="social-auth">
          <button className="btn btn-outline social-btn">
            <Globe size={18} />
            <span>Google</span>
          </button>
          <button className="btn btn-outline social-btn">
            <LogIn size={18} />
            <span>GitHub</span>
          </button>
        </div>

        <p className="auth-footer">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
