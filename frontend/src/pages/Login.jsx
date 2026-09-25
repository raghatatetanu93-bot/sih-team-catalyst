import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, Building, GraduationCap, Briefcase } from 'lucide-react';
import api from '../api';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState('citizen');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state?.targetRole) {
      setSelectedRole(location.state.targetRole);
    }
  }, [location.state]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      // Call backend to authenticate and issue real signed JWT
      const response = await api.post('/auth/login', { role: selectedRole });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', (user.role || selectedRole).toLowerCase());
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      if (selectedRole === 'citizen') navigate('/citizen');
      else if (selectedRole === 'government') navigate('/government');
      else if (selectedRole === 'university') navigate('/university');
      else if (selectedRole === 'industry') navigate('/industry');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back</h2>
        <p>Select your portal to continue</p>

        {error && (
          <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div className="role-buttons">
          <button 
            className={`role-button ${selectedRole === 'citizen' ? 'active' : ''}`}
            onClick={() => setSelectedRole('citizen')}
            type="button"
          >
            <Users size={20} /> Citizen
          </button>
          
          <button 
            className={`role-button ${selectedRole === 'government' ? 'active' : ''}`}
            onClick={() => setSelectedRole('government')}
            type="button"
          >
            <Building size={20} /> Government
          </button>
          
          <button 
            className={`role-button ${selectedRole === 'university' ? 'active' : ''}`}
            onClick={() => setSelectedRole('university')}
            type="button"
          >
            <GraduationCap size={20} /> University
          </button>
          
          <button 
            className={`role-button ${selectedRole === 'industry' ? 'active' : ''}`}
            onClick={() => setSelectedRole('industry')}
            type="button"
          >
            <Briefcase size={20} /> Industry
          </button>
        </div>

        <button className="login-submit" onClick={handleLogin} disabled={loading}>
          {loading ? 'Authenticating...' : 'Enter Portal'}
        </button>
      </div>
    </div>
  );
};

export default Login;
