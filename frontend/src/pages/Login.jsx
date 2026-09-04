import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Building, GraduationCap, Briefcase } from 'lucide-react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState('citizen');

  useEffect(() => {
    if (location.state?.targetRole) {
      setSelectedRole(location.state.targetRole);
    }
  }, [location.state]);

  const handleLogin = () => {
    // Mock login by storing role in local storage
    localStorage.setItem('userRole', selectedRole);
    
    // Redirect based on role
    if (selectedRole === 'citizen') navigate('/citizen');
    else if (selectedRole === 'government') navigate('/government');
    else if (selectedRole === 'university') navigate('/university');
    else if (selectedRole === 'industry') navigate('/industry');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p>Select your portal to continue</p>

        <div className="role-buttons">
          <button 
            className={`role-button ${selectedRole === 'citizen' ? 'active' : ''}`}
            onClick={() => setSelectedRole('citizen')}
          >
            <Users size={20} /> Citizen
          </button>
          
          <button 
            className={`role-button ${selectedRole === 'government' ? 'active' : ''}`}
            onClick={() => setSelectedRole('government')}
          >
            <Building size={20} /> Government
          </button>
          
          <button 
            className={`role-button ${selectedRole === 'university' ? 'active' : ''}`}
            onClick={() => setSelectedRole('university')}
          >
            <GraduationCap size={20} /> University
          </button>
          
          <button 
            className={`role-button ${selectedRole === 'industry' ? 'active' : ''}`}
            onClick={() => setSelectedRole('industry')}
          >
            <Briefcase size={20} /> Industry
          </button>
        </div>

        <button className="login-submit" onClick={handleLogin}>
          Enter Portal
        </button>
      </div>
    </div>
  );
};

export default Login;
