import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  DollarSign,
  Building2,
  MapPin,
  Briefcase,
  Cpu,
  Wrench,
  CheckCircle,
} from "lucide-react";

import "./FundingOpportunities.css";

const MOCK_OPPORTUNITIES = [
  {
    id: 1,
    project: "Smart Water Grid Prototype",
    university: "BIT Mesra",
    category: "Water Management",
    supportType: "Funding",
    fundingReq: "₹15 Lakhs",
    stage: "Prototype",
    impact: "18,000 citizens",
    location: "Ranchi",
  },
  {
    id: 2,
    project: "Traffic Vision AI",
    university: "IIT ISM Dhanbad",
    category: "Smart Cities",
    supportType: "Technology",
    fundingReq: "₹8 Lakhs (Cloud Credits)",
    stage: "Testing",
    impact: "2.1 lakh commuters",
    location: "Dhanbad",
  },
  {
    id: 3,
    project: "Rural Ed-Tech Tablet",
    university: "NIT Jamshedpur",
    category: "Education",
    supportType: "Manufacturing",
    fundingReq: "₹25 Lakhs",
    stage: "Pilot",
    impact: "50,000 students",
    location: "Gumla District",
  },
  {
    id: 4,
    project: "Solar Water Purification Unit",
    university: "Vinoba Bhave University",
    category: "Healthcare",
    supportType: "Infrastructure",
    fundingReq: "₹12 Lakhs",
    stage: "Scaling",
    impact: "15 villages",
    location: "Dumka",
  },
  {
    id: 5,
    project: "Crop Disease Identification App",
    university: "BAU Ranchi",
    category: "Agriculture",
    supportType: "Mentorship",
    fundingReq: "₹5 Lakhs",
    stage: "Prototype",
    impact: "3,200 farmers",
    location: "Statewide",
  },
];

function FundingOpportunities() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [supportFilter, setSupportFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredOpps = MOCK_OPPORTUNITIES.filter((opp) => {
    const matchesSearch = opp.project
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSupport =
      supportFilter === "All" || opp.supportType === supportFilter;
    return matchesSearch && matchesSupport;
  });

  const handleOfferSupport = (opp) => {
    setSelectedProject(opp);
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2500);
  };

  return (
    <div className="funding-container">
      <div className="funding-header">
        <h1>Funding & Support Opportunities</h1>
        <p>
          Discover projects seeking financial, technical, or strategic support
          from industry.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="funding-stats-grid">
        <div className="funding-stat-card">
          <div className="funding-stat-icon blue">
            <DollarSign size={22} />
          </div>
          <h2>18</h2>
          <p>Total Opportunities</p>
        </div>
        <div className="funding-stat-card">
          <div className="funding-stat-icon green">
            <DollarSign size={22} />
          </div>
          <h2>₹1.2 Cr</h2>
          <p>Total Funding Needed</p>
        </div>
        <div className="funding-stat-card">
          <div className="funding-stat-icon purple">
            <Cpu size={22} />
          </div>
          <h2>6</h2>
          <p>Seeking Technology</p>
        </div>
        <div className="funding-stat-card">
          <div className="funding-stat-icon amber">
            <Wrench size={22} />
          </div>
          <h2>4</h2>
          <p>Ready for Scaling</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={supportFilter}
          onChange={(e) => setSupportFilter(e.target.value)}
        >
          <option value="All">All Support Types</option>
          <option value="Funding">Financial Funding</option>
          <option value="Technology">Technology Access</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Mentorship">Technical Mentorship</option>
        </select>
      </div>

      {/* Opportunities Grid */}
      <div className="opportunity-grid">
        {filteredOpps.map((opp) => (
          <div key={opp.id} className="opportunity-card">
            <div className="opp-badge-row">
              <span
                className={`support-badge ${opp.supportType.toLowerCase()}`}
              >
                {opp.supportType}
              </span>
              <span className="category-badge">{opp.category}</span>
            </div>

            <h3>{opp.project}</h3>

            <div className="opp-meta">
              <div className="opp-meta-item">
                <Building2 size={16} />
                <span>{opp.university}</span>
              </div>
              <div className="opp-meta-item">
                <MapPin size={16} />
                <span>{opp.location}</span>
              </div>
              <div className="opp-meta-item">
                <DollarSign size={16} />
                <span>
                  <strong>Requirement:</strong> {opp.fundingReq}
                </span>
              </div>
              <div className="opp-meta-item">
                <Briefcase size={16} />
                <span>
                  <strong>Stage:</strong> {opp.stage} •{" "}
                  <strong>Impact:</strong> {opp.impact}
                </span>
              </div>
            </div>

            <div className="opp-actions">
              <button
                className="view-btn"
                onClick={() => navigate(`/industry/projects/${opp.id}`)}
              >
                View Project
              </button>
              <button
                className="support-btn"
                onClick={() => handleOfferSupport(opp)}
              >
                Offer Support
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Support Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {!isSubmitted ? (
              <>
                <h2>Offer Support</h2>
                <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
                  {selectedProject?.project}
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Organization Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. TechCorp Innovations"
                    />
                  </div>
                  <div className="form-group">
                    <label>Support Type</label>
                    <select required>
                      <option value="">Select type...</option>
                      <option value="Funding">Financial Funding</option>
                      <option value="Technology">Technology Access</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Mentorship">Technical Mentorship</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Amount / Resource Offered</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ₹10 Lakhs or 200 Cloud Credits"
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name and designation"
                    />
                  </div>
                  <div className="form-group">
                    <label>Additional Message</label>
                    <textarea
                      rows="3"
                      placeholder="Any additional details..."
                    ></textarea>
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                      Submit Offer
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="success-card">
                <CheckCircle
                  size={40}
                  color="#16a34a"
                  style={{ marginBottom: "1rem" }}
                />
                <h3>Support Offer Submitted!</h3>
                <p>
                  The project team at {selectedProject?.university} will be
                  notified and will reach out to discuss the collaboration.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FundingOpportunities;
