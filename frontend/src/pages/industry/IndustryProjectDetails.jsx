import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Briefcase, HeartHandshake } from "lucide-react";

import "./IndustryProjectDetails.css";

const MOCK_PROJECT = {
  id: 1,
  title: "Smart Water Grid Prototype",
  category: "Water Management",
  stage: "Prototype",
  location: "Ranchi, Jharkhand",
  university: "BIT Mesra",
  supportReq: "Funding & IoT Hardware",
  reportsAffected: "18,000+",
  duration: "6 Months remaining",
  budgetReq: "₹15 Lakhs",
  description: "The city of Ranchi has been experiencing severe water distribution inequalities and frequent pipeline leakages. BIT Mesra has developed a successful lab prototype of a sensor-based IoT system to detect leakages and measure flow rates. We now need industry support to manufacture the hardware at scale and deploy it across a pilot zone.",
  techUsed: [
    "IoT (LoRaWAN)",
    "React / Node.js Dashboard",
    "PostgreSQL for Time-Series Data",
    "Edge AI for anomaly detection"
  ],
  supportDetails: [
    "Financial funding for manufacturing 500 sensor units.",
    "Expertise in weather-proofing IoT hardware for municipal deployment.",
    "Cloud infrastructure credits for hosting the central dashboard."
  ]
};

function IndustryProjectDetails() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // In a real app, fetch project by id
  const project = MOCK_PROJECT;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <div className="project-details-container">
      <Link to="/industry/projects" className="back-link">
        <ArrowLeft size={18} />
        Back to Projects
      </Link>

      <div className="details-grid">
        <div className="main-content">
          <div className="project-header-info">
            <h1>{project.title}</h1>
            <div className="tags">
              <span className="category-badge">{project.category}</span>
              <span className={`stage-badge ${project.stage.toLowerCase()}`}>
                {project.stage} Stage
              </span>
            </div>
          </div>

          <h2 className="section-title">Project Overview & Context</h2>
          <p className="description-text">{project.description}</p>

          <h2 className="section-title">Technologies Involved</h2>
          <ul className="requirements-list">
            {project.techUsed.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>

          <h2 className="section-title">Support Requirements</h2>
          <ul className="requirements-list">
            {project.supportDetails.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="side-panel">
          <div className="info-card">
            <h3>Project Information</h3>
            
            <div className="info-row">
              <span className="info-label">University</span>
              <span className="info-value">{project.university}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Location</span>
              <span className="info-value">{project.location}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Citizens Affected</span>
              <span className="info-value">{project.reportsAffected}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Funding Required</span>
              <span className="info-value text-green-600 font-semibold">{project.budgetReq}</span>
            </div>
          </div>

          {!isSubmitted ? (
            <>
              <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
                <Briefcase size={18} />
                Offer Support
              </button>
              <button className="secondary-btn" onClick={() => setIsModalOpen(true)}>
                <HeartHandshake size={18} />
                Request Partnership
              </button>
            </>
          ) : (
            <div className="info-card" style={{ textAlign: 'center', backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <CheckCircle size={32} color="#16a34a" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ color: '#16a34a', marginBottom: '0.5rem' }}>Support Request Sent</h3>
              <p style={{ fontSize: '0.9rem', color: '#15803d' }}>
                The project team will contact you shortly to discuss the collaboration.
              </p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && !isSubmitted && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Offer Support / Partnership</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Organization Name</label>
                <input type="text" required placeholder="e.g. TechCorp Innovations" />
              </div>
              <div className="form-group">
                <label>Type of Support</label>
                <select required>
                  <option value="">Select support type...</option>
                  <option value="Funding">Financial Funding</option>
                  <option value="Technology">Technology / Infrastructure</option>
                  <option value="Mentorship">Technical Mentorship</option>
                  <option value="Manufacturing">Manufacturing / Scaling</option>
                </select>
              </div>
              <div className="form-group">
                <label>Proposed Involvement</label>
                <textarea rows="4" required placeholder="Briefly describe how you can help this project..."></textarea>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndustryProjectDetails;
