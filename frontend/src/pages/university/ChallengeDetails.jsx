import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Send } from "lucide-react";

import "./ChallengeDetails.css";

const MOCK_CHALLENGE = {
  id: 1,
  title: "Smart Water Grid Management",
  category: "Water",
  priority: "High",
  location: "Ranchi, Jharkhand",
  reports: 1240,
  duration: "6 Months",
  description: "The city of Ranchi has been experiencing severe water distribution inequalities and frequent pipeline leakages. We need a sensor-based IoT system to detect leakages, measure flow rates, and manage water distribution efficiently in urban areas. The solution should include a centralized dashboard for municipal authorities to monitor water flow in real-time.",
  requirements: [
    "IoT sensor integration expertise",
    "Real-time data processing capabilities",
    "Dashboard development (React/Node preferred)",
    "Experience with municipal infrastructure projects"
  ],
  status: "Open for Applications"
};

function ChallengeDetails() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // In a real app, we would fetch the challenge by ID.
  const challenge = MOCK_CHALLENGE;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <div className="challenge-details-container">
      <Link to="/university/challenges" className="back-link">
        <ArrowLeft size={18} />
        Back to Challenges
      </Link>

      <div className="details-grid">
        <div className="main-content">
          <div className="challenge-header-info">
            <h1>{challenge.title}</h1>
            <div className="tags">
              <span className="category-badge">{challenge.category}</span>
              <span className={`priority-badge ${challenge.priority.toLowerCase()}`}>
                {challenge.priority} Priority
              </span>
            </div>
          </div>

          <h2 className="section-title">Problem Description</h2>
          <p className="description-text">{challenge.description}</p>

          <h2 className="section-title">Required Expertise</h2>
          <ul className="requirements-list">
            {challenge.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="side-panel">
          <div className="info-card">
            <h3>Challenge Overview</h3>
            
            <div className="info-row">
              <span className="info-label">Location</span>
              <span className="info-value">{challenge.location}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Citizens Affected</span>
              <span className="info-value">{challenge.reports}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Est. Duration</span>
              <span className="info-value">{challenge.duration}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status</span>
              <span className="info-value text-green-600 font-semibold">{challenge.status}</span>
            </div>
          </div>

          {!isSubmitted ? (
            <button className="apply-btn" onClick={() => setIsModalOpen(true)}>
              <Send size={18} />
              Apply for Challenge
            </button>
          ) : (
            <div className="info-card" style={{ textAlign: 'center', backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <CheckCircle size={32} color="#16a34a" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ color: '#16a34a', marginBottom: '0.5rem' }}>Application Submitted</h3>
              <p style={{ fontSize: '0.9rem', color: '#15803d' }}>
                The government will review your proposal shortly.
              </p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && !isSubmitted && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Express Interest</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>University / Department Name</label>
                <input type="text" required placeholder="e.g. BIT Mesra, IoT Dept" />
              </div>
              <div className="form-group">
                <label>Proposed Approach Summary</label>
                <textarea rows="4" required placeholder="Briefly describe how you plan to solve this..."></textarea>
              </div>
              <div className="form-group">
                <label>Estimated Timeline</label>
                <input type="text" required placeholder="e.g. 5 Months" />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChallengeDetails;
