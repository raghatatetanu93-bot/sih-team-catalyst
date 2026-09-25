import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Briefcase,
  HeartHandshake,
  MapPin,
  Building2,
  Users,
  CalendarDays,
  IndianRupee,
  Cpu,
  ShieldCheck,
  ArrowUpRight,
  X,
} from "lucide-react";
import api from "../../api";

import "./IndustryProjectDetails.css";

const DEFAULT_PROJECT_INFO = {
  id: "PROJ-101",
  title: "Smart Water Grid Prototype",
  category: "Water Management",
  stage: "Prototype",
  location: "Ranchi, Jharkhand",
  university: "BIT Mesra",
  supportReq: "Funding & IoT Hardware",
  reportsAffected: "18,000+",
  duration: "6 Months remaining",
  budgetReq: "₹15 Lakhs",
  progress: 45,
  matchScore: 94,
  description:
    "The city of Ranchi has been experiencing severe water distribution inequalities and frequent pipeline leakages. BIT Mesra has developed a successful lab prototype of a sensor-based IoT system to detect leakages and measure flow rates. We now need industry support to manufacture the hardware at scale and deploy it across a pilot zone.",
  techUsed: [
    "IoT (LoRaWAN)",
    "React / Node.js Dashboard",
    "PostgreSQL for Time-Series Data",
    "Edge AI for anomaly detection",
  ],
  supportDetails: [
    "Financial funding for manufacturing 500 sensor units.",
    "Expertise in weather-proofing IoT hardware for municipal deployment.",
    "Cloud infrastructure credits for hosting the central dashboard.",
  ],
};

function IndustryProjectDetails() {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [supportType, setSupportType] = useState("");
  const [orgName, setOrgName] = useState("");
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          const res = await api.get(`/projects/${id}`);
          if (res.data) {
            setProjectData(res.data);
          }
        }
      } catch (err) {
        console.error("Failed to load project details:", err);
      }
    };
    fetchProject();
  }, [id]);

  const project = projectData ? {
    id: projectData._id || id,
    title: projectData.title || DEFAULT_PROJECT_INFO.title,
    category: projectData.problemId?.category || DEFAULT_PROJECT_INFO.category,
    stage: projectData.status || DEFAULT_PROJECT_INFO.stage,
    location: projectData.problemId?.location?.address || projectData.problemId?.district || DEFAULT_PROJECT_INFO.location,
    university: projectData.universityId?.name || (projectData.studentTeam?.length ? projectData.studentTeam.join(", ") : DEFAULT_PROJECT_INFO.university),
    supportReq: DEFAULT_PROJECT_INFO.supportReq,
    reportsAffected: projectData.problemId?.affectedPopulation ? `${projectData.problemId.affectedPopulation.toLocaleString()} citizens` : DEFAULT_PROJECT_INFO.reportsAffected,
    duration: DEFAULT_PROJECT_INFO.duration,
    budgetReq: DEFAULT_PROJECT_INFO.budgetReq,
    progress: projectData.status === "Completed" ? 100 : (projectData.status === "In Progress" ? 65 : 45),
    matchScore: 94,
    description: projectData.proposalDescription || projectData.problemId?.description || DEFAULT_PROJECT_INFO.description,
    techUsed: DEFAULT_PROJECT_INFO.techUsed,
    supportDetails: DEFAULT_PROJECT_INFO.supportDetails,
  } : DEFAULT_PROJECT_INFO;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/partners", {
        companyName: orgName || "Industry Partner",
        sector: project.category || supportType || "CSR Support",
        csrFocusAreas: [project.title || "Societal Solutions"],
        contactEmail: "csr@industry.org",
        committedFunding: 1000000,
      });
    } catch (err) {
      console.error("Failed to submit partner pledge:", err);
    }

    setIsSubmitted(true);

    setTimeout(() => {
      setIsModalOpen(false);
    }, 1800);
  };

  return (
    <div className="project-details-container">

      {/* BACK */}
      <Link to="/industry/projects" className="back-link">
        <ArrowLeft size={18} />
        Back to Projects
      </Link>

      {/* HERO */}
      <div className="project-detail-hero">
        <div className="hero-main">

          <div className="hero-top-row">
            <span className="detail-category">
              {project.category}
            </span>

            <span className="detail-stage">
              {project.stage} Stage
            </span>
          </div>

          <h1>{project.title}</h1>

          <p className="hero-description">
            A technology-driven solution designed to improve water
            distribution reliability and detect infrastructure leakages
            across urban areas.
          </p>

          <div className="hero-meta">
            <span>
              <Building2 size={17} />
              {project.university}
            </span>

            <span>
              <MapPin size={17} />
              {project.location}
            </span>

            <span>
              <Users size={17} />
              {project.reportsAffected} citizens
            </span>
          </div>
        </div>

        <div className="hero-score">
          <div className="score-ring">
            <strong>{project.matchScore}%</strong>
            <span>Match</span>
          </div>

          <p>Industry opportunity match</p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="details-grid">

        {/* LEFT */}
        <main className="main-content">

          {/* OVERVIEW */}
          <section className="detail-section">
            <div className="section-heading">
              <div className="section-icon">
                <ArrowUpRight size={20} />
              </div>

              <div>
                <h2>Project Overview</h2>
                <p>Understanding the problem and proposed solution</p>
              </div>
            </div>

            <p className="description-text">
              {project.description}
            </p>
          </section>

          {/* PROGRESS */}
          <section className="detail-section">
            <div className="section-heading">
              <div className="section-icon">
                <CheckCircle size={20} />
              </div>

              <div>
                <h2>Project Progress</h2>
                <p>Current development status</p>
              </div>
            </div>

            <div className="progress-box">
              <div className="progress-top">
                <span>Prototype Development</span>
                <strong>{project.progress}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className="progress-foot">
                <span>Current Stage</span>
                <span>{project.stage}</span>
              </div>
            </div>
          </section>

          {/* TECHNOLOGY */}
          <section className="detail-section">
            <div className="section-heading">
              <div className="section-icon">
                <Cpu size={20} />
              </div>

              <div>
                <h2>Technologies Involved</h2>
                <p>Technology stack powering the solution</p>
              </div>
            </div>

            <div className="technology-grid">
              {project.techUsed.map((tech, index) => (
                <div className="technology-card" key={index}>
                  <Cpu size={18} />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SUPPORT */}
          <section className="detail-section">
            <div className="section-heading">
              <div className="section-icon">
                <HeartHandshake size={20} />
              </div>

              <div>
                <h2>Support Requirements</h2>
                <p>Where industry partners can contribute</p>
              </div>
            </div>

            <div className="support-list">
              {project.supportDetails.map((req, index) => (
                <div className="support-item" key={index}>
                  <div className="support-check">
                    <CheckCircle size={17} />
                  </div>

                  <span>{req}</span>
                </div>
              ))}
            </div>
          </section>

          {/* IMPACT */}
          <section className="impact-callout">
            <div className="impact-icon">
              <Users size={25} />
            </div>

            <div>
              <span>Potential Social Impact</span>
              <strong>{project.reportsAffected}</strong>
              <p>
                citizens could benefit from improved water monitoring
                and distribution reliability.
              </p>
            </div>
          </section>

        </main>

        {/* RIGHT */}
        <aside className="side-panel">

          {/* PROJECT INFO */}
          <div className="info-card">
            <div className="card-title">
              <h3>Project Information</h3>
            </div>

            <div className="info-row">
              <span className="info-label">
                <Building2 size={16} />
                University
              </span>

              <span className="info-value">
                {project.university}
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">
                <MapPin size={16} />
                Location
              </span>

              <span className="info-value">
                {project.location}
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">
                <Users size={16} />
                Citizens
              </span>

              <span className="info-value">
                {project.reportsAffected}
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">
                <CalendarDays size={16} />
                Duration
              </span>

              <span className="info-value">
                {project.duration}
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">
                <IndianRupee size={16} />
                Funding
              </span>

              <span className="info-value funding-value">
                {project.budgetReq}
              </span>
            </div>
          </div>

          {/* SUPPORT CARD */}
          {!isSubmitted ? (
            <div className="support-card">

              <div className="support-card-icon">
                <HeartHandshake size={24} />
              </div>

              <h3>Help Scale This Solution</h3>

              <p>
                Your organization can provide funding, technology,
                mentorship or infrastructure support.
              </p>

              <button
                className="primary-btn"
                onClick={() => {
                  setSupportType("Funding");
                  setIsModalOpen(true);
                }}
              >
                <Briefcase size={18} />
                Offer Support
              </button>

              <button
                className="secondary-btn"
                onClick={() => {
                  setSupportType("");
                  setIsModalOpen(true);
                }}
              >
                <HeartHandshake size={18} />
                Request Partnership
              </button>

            </div>
          ) : (
            <div className="success-card">

              <div className="success-icon">
                <CheckCircle size={30} />
              </div>

              <h3>Proposal Submitted</h3>

              <p>
                Your support request has been recorded. The project
                team will contact you to discuss the collaboration.
              </p>

              <Link
                to="/industry/projects"
                className="success-link"
              >
                Back to Projects
              </Link>

            </div>
          )}

          {/* SAFETY / TRUST */}
          <div className="trust-card">
            <ShieldCheck size={20} />

            <div>
              <strong>Verified Project</strong>
              <p>
                This project has been validated through the Societal
                Innovation Engine.
              </p>
            </div>
          </div>

        </aside>
      </div>

      {/* MODAL */}
      {isModalOpen && !isSubmitted && (
        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">
              <div>
                <span>Industry Collaboration</span>
                <h2>Offer Support</h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <p className="modal-description">
              Tell the project team how your organization can
              contribute to this solution.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Organization Name</label>

                <input
                  type="text"
                  required
                  placeholder="e.g. TechCorp Innovations"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Type of Support</label>

                <select
                  required
                  value={supportType}
                  onChange={(e) => setSupportType(e.target.value)}
                >
                  <option value="">
                    Select support type...
                  </option>

                  <option value="Funding">
                    Financial Funding
                  </option>

                  <option value="Technology">
                    Technology / Infrastructure
                  </option>

                  <option value="Mentorship">
                    Technical Mentorship
                  </option>

                  <option value="Manufacturing">
                    Manufacturing / Scaling
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Proposed Involvement</label>

                <textarea
                  rows="5"
                  required
                  placeholder="Briefly describe how your organization can help this project..."
                />
              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-btn"
                >
                  Send Proposal
                  <ArrowUpRight size={17} />
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