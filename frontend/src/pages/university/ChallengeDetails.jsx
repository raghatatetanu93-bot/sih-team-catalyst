import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Send,
  MapPin,
  Users,
  Clock,
  Sparkles,
  AlertCircle,
  Loader2,
  Building2,
  Calendar,
  ShieldAlert,
  FileText,
  X,
} from "lucide-react";
import api from "../../api";
import "./ChallengeDetails.css";

function ChallengeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    universityName: "Birsa Agricultural University",
    facultyMentor: "",
    studentTeam: "",
    proposalDescription: "",
    timeline: "6 Months",
  });

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/problems/" + id);
        setChallenge(res.data);

        // Prepopulate default proposal title
        const defaultTitle = res.data.title || res.data.summary || `${res.data.category || "Community"} Innovation Proposal`;
        setFormData((prev) => ({
          ...prev,
          title: `Solution: ${defaultTitle}`,
        }));
      } catch (err) {
        console.error("Failed to load challenge:", err);
        setError(err.response?.data?.message || "Challenge not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchChallenge();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.proposalDescription.trim()) {
      setSubmitError("Please provide a proposed approach summary.");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      const universityId =
        challenge?.assignedUniversity?._id ||
        (typeof challenge?.assignedUniversity === "string" ? challenge.assignedUniversity : null);

      const teamArray = formData.studentTeam
        ? formData.studentTeam.split(",").map((s) => s.trim()).filter(Boolean)
        : ["University Student Innovation Team"];

      const payload = {
        problemId: challenge?._id || id,
        universityId: universityId,
        title: formData.title.trim() || `Proposal: ${challenge?.title || challenge?.category || "Societal Solution"}`,
        proposalDescription: formData.proposalDescription.trim(),
        facultyMentor: formData.facultyMentor.trim() || (formData.universityName ? `Faculty Advisor (${formData.universityName})` : "Faculty Mentor"),
        studentTeam: teamArray,
        status: "Submitted",
      };

      const res = await api.post("/projects", payload);
      console.log("Proposal successfully persisted to MongoDB:", res.data);

      setIsSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2500);
    } catch (err) {
      console.error("Failed to submit proposal:", err);
      setSubmitError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to submit application. Please verify all fields."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="challenge-details-container">
        <Link to="/university/challenges" className="back-link">
          <ArrowLeft size={18} />
          Back to Challenges
        </Link>
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <Loader2 size={36} className="spin" style={{ animation: "spin 1s linear infinite", color: "#3b82f6", margin: "0 auto 16px" }} />
          <h2 style={{ color: "#334155" }}>Loading Challenge Details...</h2>
          <p style={{ color: "#64748b" }}>Retrieving problem data from the engine.</p>
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="challenge-details-container">
        <Link to="/university/challenges" className="back-link">
          <ArrowLeft size={18} />
          Back to Challenges
        </Link>
        <div style={{ textAlign: "center", padding: "80px 20px", background: "white", borderRadius: "12px", border: "1px solid #fee2e2" }}>
          <AlertCircle size={40} color="#ef4444" style={{ margin: "0 auto 16px" }} />
          <h2 style={{ color: "#991b1b" }}>Challenge Not Found</h2>
          <p style={{ color: "#64748b", maxWidth: "450px", margin: "8px auto 20px" }}>
            {error || "The requested societal challenge is not available or has been modified."}
          </p>
          <Link to="/university/challenges" style={{ display: "inline-block", padding: "10px 20px", background: "#3b82f6", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: "600" }}>
            View Available Challenges
          </Link>
        </div>
      </div>
    );
  }

  const title = challenge.title || (challenge.summary ? (challenge.summary.length > 60 ? challenge.summary.slice(0, 57) + "..." : challenge.summary) : `${challenge.category || "Societal"} Challenge`);
  const category = challenge.category || "Community Innovation";
  const priority = challenge.severity || "Medium";
  const locationText = [challenge.location?.address, challenge.location?.district]
    .filter(Boolean)
    .join(", ") || (typeof challenge.location === "string" ? challenge.location : "Jharkhand");
  const affectedCount = challenge.affectedPopulation
    ? Number(challenge.affectedPopulation).toLocaleString("en-IN")
    : "1,200+";

  const requirements = challenge.suggestedSolutionArea
    ? [
        challenge.suggestedSolutionArea,
        `Applied research & prototyping in ${category}`,
        "Field pilot validation and community engagement",
        "Sensor/Software development and performance monitoring",
      ]
    : [
        `Domain knowledge and expertise in ${category}`,
        "Faculty supervision and student research team",
        "Field deployment and technical feasibility assessment",
        "Implementation roadmap and impact tracking",
      ];

  const assignedUniName = challenge.assignedUniversity?.name || (typeof challenge.assignedUniversity === "string" ? "Assigned Partner University" : null);

  return (
    <div className="challenge-details-container">
      <Link to="/university/challenges" className="back-link">
        <ArrowLeft size={18} />
        Back to Challenges
      </Link>

      <div className="details-grid">
        <div className="main-content">
          <div className="challenge-header-info">
            <h1>{title}</h1>
            <div className="tags">
              <span className="category-badge">{category}</span>
              <span className={`priority-badge ${priority.toLowerCase()}`}>
                {priority} Priority
              </span>
              {assignedUniName && (
                <span className="category-badge" style={{ background: "#f0fdf4", color: "#166534" }}>
                  Assigned to: {assignedUniName}
                </span>
              )}
            </div>
          </div>

          <h2 className="section-title">Problem Description</h2>
          <p className="description-text">{challenge.description || "No citizen description provided."}</p>

          {challenge.evidenceUrl && (
            <div style={{ marginBottom: "2rem" }}>
              <h2 className="section-title">Field Evidence / Photo</h2>
              <div style={{ maxWidth: "450px", borderRadius: "10px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                <img src={challenge.evidenceUrl} alt="Challenge evidence" style={{ width: "100%", maxHeight: "280px", objectFit: "cover", display: "block" }} />
              </div>
            </div>
          )}

          {challenge.summary && (
            <div style={{ marginBottom: "2rem" }}>
              <h2 className="section-title">AI Problem Intelligence</h2>
              <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", padding: "16px 20px", borderRadius: "10px", color: "#0369a1" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", marginBottom: "6px" }}>
                  <Sparkles size={16} />
                  <span>Executive Summary</span>
                </div>
                <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.6 }}>{challenge.summary}</p>
              </div>
            </div>
          )}

          <h2 className="section-title">Recommended Expertise & Scope</h2>
          <ul className="requirements-list">
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="side-panel">
          <div className="info-card">
            <h3>Challenge Overview</h3>

            <div className="info-row">
              <span className="info-label">Location</span>
              <span className="info-value">{locationText}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Citizens Affected</span>
              <span className="info-value">{affectedCount}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Est. Duration</span>
              <span className="info-value">6 Months</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status</span>
              <span className="info-value text-green-600 font-semibold">{challenge.governmentStatus || "Open for Applications"}</span>
            </div>
          </div>

          {!isSubmitted ? (
            <button className="apply-btn" onClick={() => setIsModalOpen(true)}>
              <Send size={18} />
              Apply for Challenge
            </button>
          ) : (
            <div className="info-card" style={{ textAlign: "center", backgroundColor: "#f0fdf4", borderColor: "#bbf7d0" }}>
              <CheckCircle size={32} color="#16a34a" style={{ margin: "0 auto 1rem" }} />
              <h3 style={{ color: "#16a34a", marginBottom: "0.5rem" }}>Proposal Submitted!</h3>
              <p style={{ fontSize: "0.9rem", color: "#15803d" }}>
                Your solution has been persisted and is now visible to industry partners in the Available Projects portal.
              </p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && !isSubmitted && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ margin: 0 }}>Submit Solution Proposal</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            {submitError && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "12px", borderRadius: "8px", color: "#991b1b", marginBottom: "1rem", fontSize: "0.9rem" }}>
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Proposal Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. IoT Smart Sensor Leakage Detection & Automated Shutoff"
                />
              </div>

              <div className="form-group">
                <label>University / Department *</label>
                <input
                  type="text"
                  name="universityName"
                  required
                  value={formData.universityName}
                  onChange={handleChange}
                  placeholder="e.g. Birsa Agricultural University / Dept of Tech"
                />
              </div>

              <div className="form-group">
                <label>Faculty Mentor / Advisor *</label>
                <input
                  type="text"
                  name="facultyMentor"
                  required
                  value={formData.facultyMentor}
                  onChange={handleChange}
                  placeholder="e.g. Dr. R. K. Sharma, Head of Research"
                />
              </div>

              <div className="form-group">
                <label>Student Research Team (comma-separated)</label>
                <input
                  type="text"
                  name="studentTeam"
                  value={formData.studentTeam}
                  onChange={handleChange}
                  placeholder="e.g. Ankit Kumar, Priya Roy, Rahul Verma"
                />
              </div>

              <div className="form-group">
                <label>Proposed Approach & Technical Methodology *</label>
                <textarea
                  name="proposalDescription"
                  rows="4"
                  required
                  value={formData.proposalDescription}
                  onChange={handleChange}
                  placeholder="Describe your technical methodology, sensor hardware, software architecture, and field implementation..."
                ></textarea>
              </div>

              <div className="form-group">
                <label>Estimated Timeline</label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="e.g. 6 Months"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="spin" style={{ animation: "spin 1s linear infinite", display: "inline-block", marginRight: "6px" }} />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
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
