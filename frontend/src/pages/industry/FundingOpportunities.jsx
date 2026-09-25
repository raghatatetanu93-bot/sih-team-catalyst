import { useMemo, useState } from "react";
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
  Target,
  Users,
  ArrowUpRight,
  X,
  Send,
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
    match: 96,
    description:
      "Scale an IoT-based water monitoring system designed to detect pipeline leakages and improve distribution reliability.",
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
    match: 92,
    description:
      "AI-powered traffic monitoring and congestion prediction system seeking cloud infrastructure and technology support.",
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
    match: 89,
    description:
      "Affordable learning tablets designed to improve digital education access in underserved rural communities.",
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
    match: 86,
    description:
      "Solar-powered water purification technology aimed at improving access to safe drinking water in rural areas.",
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
    match: 83,
    description:
      "Machine-learning application helping farmers identify crop diseases and receive early intervention guidance.",
  },
];

function FundingOpportunities() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [supportFilter, setSupportFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredOpps = useMemo(() => {
    return MOCK_OPPORTUNITIES.filter((opp) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        opp.project.toLowerCase().includes(search) ||
        opp.university.toLowerCase().includes(search) ||
        opp.category.toLowerCase().includes(search) ||
        opp.location.toLowerCase().includes(search);

      const matchesSupport =
        supportFilter === "All" ||
        opp.supportType === supportFilter;

      const matchesStage =
        stageFilter === "All" ||
        opp.stage === stageFilter;

      return (
        matchesSearch &&
        matchesSupport &&
        matchesStage
      );
    });
  }, [searchTerm, supportFilter, stageFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setSupportFilter("All");
    setStageFilter("All");
  };

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
      setIsSubmitted(false);
    }, 2200);
  };

  const getSupportClass = (type) => {
    return type.toLowerCase();
  };

  return (
    <div className="funding-container">

      {/* HEADER */}
      <div className="funding-header">

        <div>
          <span className="page-eyebrow">
            INDUSTRY FUNDING HUB
          </span>

          <h1>Funding & Support Opportunities</h1>

          <p>
            Discover projects seeking financial, technical, infrastructure
            or strategic support from industry partners.
          </p>
        </div>

        <div className="funding-header-badge">
          <Target size={20} />

          <div>
            <strong>Impact-Driven Capital</strong>
            <span>Support solutions with measurable social impact</span>
          </div>
        </div>

      </div>

      {/* STATS */}
      <div className="funding-stats-grid">

        <div className="funding-stat-card">
          <div className="funding-stat-icon blue">
            <Briefcase size={21} />
          </div>

          <div>
            <h2>18</h2>
            <p>Total Opportunities</p>
            <small>Open for industry support</small>
          </div>
        </div>

        <div className="funding-stat-card">
          <div className="funding-stat-icon green">
            <DollarSign size={21} />
          </div>

          <div>
            <h2>₹1.2 Cr</h2>
            <p>Total Funding Needed</p>
            <small>Across listed opportunities</small>
          </div>
        </div>

        <div className="funding-stat-card">
          <div className="funding-stat-icon purple">
            <Cpu size={21} />
          </div>

          <div>
            <h2>6</h2>
            <p>Seeking Technology</p>
            <small>Infrastructure & technical support</small>
          </div>
        </div>

        <div className="funding-stat-card">
          <div className="funding-stat-icon amber">
            <Wrench size={21} />
          </div>

          <div>
            <h2>4</h2>
            <p>Ready for Scaling</p>
            <small>Solutions approaching deployment</small>
          </div>
        </div>

      </div>

      {/* EXPLORE PANEL */}
      <div className="funding-explore-panel">

        <div className="explore-heading">
          <div>
            <h2>Explore Support Opportunities</h2>
            <p>
              Find projects that align with your organization's
              capabilities and resources.
            </p>
          </div>

          {(searchTerm ||
            supportFilter !== "All" ||
            stageFilter !== "All") && (
            <button
              className="clear-filters"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="filters-bar">

          <div className="search-box">
            <Search className="search-icon" size={18} />

            <input
              type="text"
              placeholder="Search projects, universities or locations..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <select
            className="filter-select"
            value={supportFilter}
            onChange={(e) =>
              setSupportFilter(e.target.value)
            }
          >
            <option value="All">All Support Types</option>
            <option value="Funding">Financial Funding</option>
            <option value="Technology">Technology Access</option>
            <option value="Infrastructure">
              Infrastructure
            </option>
            <option value="Manufacturing">
              Manufacturing
            </option>
            <option value="Mentorship">
              Technical Mentorship
            </option>
          </select>

          <select
            className="filter-select"
            value={stageFilter}
            onChange={(e) =>
              setStageFilter(e.target.value)
            }
          >
            <option value="All">All Stages</option>
            <option value="Prototype">Prototype</option>
            <option value="Testing">Testing</option>
            <option value="Pilot">Pilot</option>
            <option value="Scaling">Scaling</option>
          </select>

        </div>

        <div className="funding-result-row">
          <span>
            Showing{" "}
            <strong>{filteredOpps.length}</strong>{" "}
            opportunities
          </span>

          <span>
            Ranked by industry opportunity relevance
          </span>
        </div>

      </div>

      {/* OPPORTUNITIES */}
      {filteredOpps.length === 0 ? (
        <div className="funding-empty">

          <DollarSign size={40} />

          <h3>No opportunities found</h3>

          <p>
            Try changing your search or filters to discover
            more support opportunities.
          </p>

          <button
            onClick={clearFilters}
            className="reset-btn"
          >
            Reset Filters
          </button>

        </div>
      ) : (
        <div className="opportunity-grid">

          {filteredOpps.map((opp) => (
            <div
              key={opp.id}
              className="opportunity-card"
            >

              {/* TOP */}
              <div className="opp-badge-row">

                <span
                  className={`support-badge ${getSupportClass(
                    opp.supportType
                  )}`}
                >
                  {opp.supportType}
                </span>

                <span className="category-badge">
                  {opp.category}
                </span>

              </div>

              {/* MATCH */}
              <div className="opportunity-match">

                <div className="match-left">
                  <Target size={15} />
                  <span>Industry Match</span>
                </div>

                <strong>{opp.match}%</strong>

              </div>

              {/* TITLE */}
              <h3>{opp.project}</h3>

              <p className="opportunity-description">
                {opp.description}
              </p>

              {/* META */}
              <div className="opp-meta">

                <div className="opp-meta-item">
                  <Building2 size={16} />
                  <div>
                    <span>University</span>
                    <strong>{opp.university}</strong>
                  </div>
                </div>

                <div className="opp-meta-item">
                  <MapPin size={16} />
                  <div>
                    <span>Location</span>
                    <strong>{opp.location}</strong>
                  </div>
                </div>

                <div className="opp-meta-item">
                  <DollarSign size={16} />
                  <div>
                    <span>Support Requirement</span>
                    <strong>{opp.fundingReq}</strong>
                  </div>
                </div>

                <div className="opp-meta-item">
                  <Briefcase size={16} />
                  <div>
                    <span>Stage / Impact</span>
                    <strong>
                      {opp.stage} • {opp.impact}
                    </strong>
                  </div>
                </div>

              </div>

              {/* ACTIONS */}
              <div className="opp-actions">

                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(
                      `/industry/projects/${opp.id}`
                    )
                  }
                >
                  View Project
                  <ArrowUpRight size={15} />
                </button>

                <button
                  className="support-btn"
                  onClick={() =>
                    handleOfferSupport(opp)
                  }
                >
                  Offer Support
                  <HandshakeIcon />
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            {!isSubmitted ? (
              <>
                <div className="modal-header">

                  <div>
                    <span>INDUSTRY CONTRIBUTION</span>
                    <h2>Offer Support</h2>
                  </div>

                  <button
                    className="modal-close"
                    onClick={() =>
                      setIsModalOpen(false)
                    }
                  >
                    <X size={20} />
                  </button>

                </div>

                <div className="selected-project">

                  <Target size={19} />

                  <div>
                    <span>Selected Project</span>
                    <strong>
                      {selectedProject?.project}
                    </strong>
                    <small>
                      {selectedProject?.university}
                    </small>
                  </div>

                </div>

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
                      <option value="">
                        Select type...
                      </option>

                      <option value="Funding">
                        Financial Funding
                      </option>

                      <option value="Technology">
                        Technology Access
                      </option>

                      <option value="Infrastructure">
                        Infrastructure
                      </option>

                      <option value="Manufacturing">
                        Manufacturing
                      </option>

                      <option value="Mentorship">
                        Technical Mentorship
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      Amount / Resource Offered
                    </label>

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
                      rows="4"
                      placeholder="Describe your proposed contribution..."
                    />
                  </div>

                  <div className="modal-actions">

                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() =>
                        setIsModalOpen(false)
                      }
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="submit-btn"
                    >
                      Submit Offer
                      <Send size={16} />
                    </button>

                  </div>

                </form>
              </>
            ) : (
              <div className="success-card">

                <div className="success-icon">
                  <CheckCircle size={34} />
                </div>

                <h3>
                  Support Offer Submitted!
                </h3>

                <p>
                  The team at{" "}
                  <strong>
                    {selectedProject?.university}
                  </strong>{" "}
                  will be notified and can contact you
                  to discuss the collaboration.
                </p>

                <button
                  className="success-close"
                  onClick={() =>
                    setIsModalOpen(false)
                  }
                >
                  Done
                </button>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

/* Small inline icon component to avoid adding another dependency */
function HandshakeIcon() {
  return <Users size={15} />;
}

export default FundingOpportunities;