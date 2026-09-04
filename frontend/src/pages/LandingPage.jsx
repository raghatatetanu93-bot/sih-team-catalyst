import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handlePortalClick = (role) => {
    navigate('/login', { state: { targetRole: role } });
  };

  return (
    <div className="landing-page">
      <nav className="landing-navbar">
        <div className="logo">Societal Engine</div>
        <div className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <button onClick={() => navigate('/login')} style={{ background: '#1a56db', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginLeft: '2rem' }}>
            Login
          </button>
        </div>
      </nav>

      <section className="hero-section">
        <h1>Empowering Societal Change</h1>
        <p>A unified platform connecting citizens, government, universities, and industry to solve systemic issues through AI-driven collaboration.</p>
        
        <div className="portal-cards">
          <div className="portal-card" onClick={() => handlePortalClick('citizen')}>
            <Users className="icon" size={48} />
            <h3>Citizen Portal</h3>
            <p>Report issues, track progress, and engage with your community.</p>
          </div>
          <div className="portal-card" onClick={() => handlePortalClick('government')}>
            <Building className="icon" size={48} />
            <h3>Government Portal</h3>
            <p>Validate problems, analyze systemic clusters, and make data-driven decisions.</p>
          </div>
          <div className="portal-card" onClick={() => handlePortalClick('university')}>
            <GraduationCap className="icon" size={48} />
            <h3>University Portal</h3>
            <p>Accept challenges and research systemic problems.</p>
          </div>
          <div className="portal-card" onClick={() => handlePortalClick('industry')}>
            <Briefcase className="icon" size={48} />
            <h3>Industry Portal</h3>
            <p>Support verified projects and track your societal impact.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="flow-container">
          <div className="flow-step">
            <strong>1. Report</strong>
            <p>Citizens submit problems</p>
          </div>
          <ArrowRight className="flow-arrow" />
          <div className="flow-step">
            <strong>2. Analyze & Validate</strong>
            <p>AI groups reports, Govt validates</p>
          </div>
          <ArrowRight className="flow-arrow" />
          <div className="flow-step">
            <strong>3. Research</strong>
            <p>Universities take on challenges</p>
          </div>
          <ArrowRight className="flow-arrow" />
          <div className="flow-step">
            <strong>4. Support & Resolve</strong>
            <p>Industry funds & implements</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 Societal Engine. SIH 2026.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
