import { Users, FileText, CheckCircle, Lightbulb } from "lucide-react";

import "./UniversityImpact.css";

function UniversityImpact() {
  return (
    <div className="impact-container">
      <div className="impact-header">
        <h1>Impact & Research Outcomes</h1>
        <p>Measure the real-world difference your university is making.</p>
      </div>

      <div className="impact-stats-grid">
        <div className="impact-stat-card primary">
          <div className="impact-stat-icon">
            <Users size={24} />
          </div>
          <h2>45,000+</h2>
          <p>Citizens Impacted</p>
        </div>

        <div className="impact-stat-card success">
          <div className="impact-stat-icon">
            <CheckCircle size={24} />
          </div>
          <h2>24</h2>
          <p>Projects Implemented</p>
        </div>

        <div className="impact-stat-card warning">
          <div className="impact-stat-icon">
            <Lightbulb size={24} />
          </div>
          <h2>8</h2>
          <p>Patents Filed</p>
        </div>

        <div className="impact-stat-card purple">
          <div className="impact-stat-icon">
            <FileText size={24} />
          </div>
          <h2>15</h2>
          <p>Research Papers</p>
        </div>
      </div>

      <div className="impact-grid">
        <div className="impact-panel">
          <h3>Success Stories</h3>
          
          <div className="story-card">
            <div className="story-title">Solar-Powered Purification in Dumka</div>
            <div className="story-metrics">
              <span className="story-metric">10,000+ Benefited</span>
              <span className="story-metric">30% Cost Reduction</span>
            </div>
            <p className="story-desc">
              Developed and deployed 50 solar-powered water purification units across off-grid villages, significantly reducing waterborne diseases.
            </p>
          </div>

          <div className="story-card">
            <div className="story-title">Crop Yield Prediction AI</div>
            <div className="story-metrics">
              <span className="story-metric">Statewide Adoption</span>
              <span className="story-metric">15% Yield Increase</span>
            </div>
            <p className="story-desc">
              An AI model that successfully predicted monsoon patterns tailored for local geography, helping farmers optimize their sowing periods.
            </p>
          </div>
        </div>

        <div className="impact-panel">
          <h3>Recent Research Outcomes</h3>
          
          <div className="research-item">
            <div className="research-icon">
              <FileText size={20} />
            </div>
            <div className="research-content">
              <h4>Paper Published: IEEE IoT Journal</h4>
              <p>Optimizing Sensor Deployment in Urban Water Grids</p>
            </div>
          </div>

          <div className="research-item">
            <div className="research-icon">
              <Lightbulb size={20} />
            </div>
            <div className="research-content">
              <h4>Patent Granted: #IN-2026-890</h4>
              <p>Low-cost composite material for road pothole repair</p>
            </div>
          </div>

          <div className="research-item">
            <div className="research-icon">
              <FileText size={20} />
            </div>
            <div className="research-content">
              <h4>Conference: Smart Cities India 2026</h4>
              <p>Presented findings on decentralized waste management algorithms.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityImpact;
