import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import {
  ArrowLeft,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Users,
  FileText,
  Sparkles,
  ShieldCheck,
  Clock3,
  Image as ImageIcon,
  Lightbulb,
} from "lucide-react";
import "./ProblemDetails.css";

function ProblemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/problems/${id}`);
        setProblem(response.data);
      } catch (err) {
        setError("Failed to load problem details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const handleValidate = async () => {
    try {
      setActionLoading(true);
      const res = await api.patch(`/problems/${id}`, { governmentStatus: 'Validated' });
      setProblem(res.data);
    } catch (err) {
      alert("Failed to validate problem.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading(true);
      const res = await api.patch(`/problems/${id}`, { governmentStatus: 'Rejected' });
      setProblem(res.data);
    } catch (err) {
      alert("Failed to reject problem.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (error) return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;
  if (!problem) return <div style={{ padding: "2rem" }}>Problem not found.</div>;

  return (
    <div className="problem-details-page">
      {/* HEADER */}
      <div className="details-header">
        <button
          className="back-button"
          onClick={() => navigate("/government/validation")}
        >
          <ArrowLeft size={18} />
          Back to Validation
        </button>

        <div className="details-actions">
          {problem.governmentStatus !== 'Validated' && problem.governmentStatus !== 'Rejected' && (
            <>
              <button className="reject-button" onClick={handleReject} disabled={actionLoading}>
                Reject
              </button>

              <button className="validate-button" onClick={handleValidate} disabled={actionLoading}>
                <CheckCircle size={17} />
                {actionLoading ? "Processing..." : "Validate Problem"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* TITLE SECTION */}
      <div className="problem-title-section">
        <div className="problem-title-main">
          <div className="details-danger-icon">
            <AlertTriangle size={25} />
          </div>

          <div>
            <p className="eyebrow">PROBLEM #{problem._id.substring(0, 8).toUpperCase()}</p>

            <h1>{problem.category || 'Uncategorized Issue'}</h1>

            <div className="problem-meta">
              <span>
                <MapPin size={16} />
                {problem.location?.address}
              </span>
              <span>
                <Users size={16} />
                {problem.affectedPopulation} people affected
              </span>
              <span>
                <Clock3 size={16} />
                Reported {new Date(problem.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="details-status-group">
          <span className={`severity-badge ${(problem.severity || 'medium').toLowerCase()}`}>
            {problem.severity?.toUpperCase()} SEVERITY
          </span>

          <span className={`status-badge ${(problem.governmentStatus || 'pending').toLowerCase().replaceAll(" ", "-")}`}>
            {problem.governmentStatus}
          </span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="details-grid">
        {/* LEFT COLUMN */}
        <div className="details-main-column">
          {/* PROBLEM SUMMARY */}
          <section className="details-card">
            <div className="card-heading">
              <div className="heading-icon blue">
                <FileText size={19} />
              </div>
              <div>
                <h2>Problem Summary</h2>
                <p>Information submitted by citizens</p>
              </div>
            </div>

            <div className="summary-content">
              <div className="info-row">
                <span>Category</span>
                <strong>{problem.category}</strong>
              </div>
              <div className="info-row">
                <span>Location</span>
                <strong>{problem.location?.address}</strong>
              </div>
              <div className="description-box">
                <span>Citizen Description</span>
                <p>{problem.description}</p>
              </div>
            </div>
          </section>

          {/* AI INTELLIGENCE */}
          <section className="details-card ai-card">
            <div className="ai-header">
              <div className="ai-title">
                <div className="heading-icon ai">
                  <Sparkles size={19} />
                </div>
                <div>
                  <h2>AI Problem Intelligence</h2>
                  <p>AI-generated analysis of this problem</p>
                </div>
              </div>
            </div>

            <div className="ai-warning">
              <ShieldCheck size={18} />
              <span>
                AI-generated fields — read-only for government validation.
              </span>
            </div>

            <div className="ai-analysis-grid">
              <div className="ai-analysis-item">
                <span>Urgency</span>
                <strong>{problem.urgency}</strong>
              </div>
              <div className="ai-analysis-item">
                <span>Severity</span>
                <strong className={problem.severity === 'High' || problem.severity === 'Critical' ? "danger-text" : ""}>{problem.severity}</strong>
              </div>
              <div className="ai-analysis-item">
                <span>Systemic Cluster</span>
                <strong>{problem.systemicCluster || 'None identified'}</strong>
              </div>
              <div className="ai-analysis-item">
                <span>Related reports</span>
                <strong>{problem.relatedReports?.length || 0} reports</strong>
              </div>
            </div>

            <div className="ai-summary">
              <h3>AI Summary</h3>
              <p>{problem.summary || 'No AI summary generated for this report yet.'}</p>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <aside className="details-side-column">
          {/* PRIORITY */}
          <section className="details-card priority-card">
            <div className="card-heading">
              <div className="heading-icon red">
                <AlertTriangle size={19} />
              </div>
              <div>
                <h2>Priority Assessment</h2>
                <p>Current AI recommendation</p>
              </div>
            </div>

            <div className="priority-score">
              <strong>{problem.priorityScore || 0}</strong>
              <span>/100</span>
            </div>
            
            {problem.emergencyStatus && (
              <span className="priority-label" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>
                EMERGENCY STATUS
              </span>
            )}

            <div className="priority-reasons">
              <div>
                <span>Affected population</span>
                <strong>{problem.affectedPopulation}</strong>
              </div>
              <div>
                <span>Urgency</span>
                <strong>{problem.urgency}</strong>
              </div>
            </div>
          </section>

          {/* POSSIBLE SOLUTIONS */}
          <section className="details-card">
            <div className="card-heading">
              <div className="heading-icon orange">
                <Lightbulb size={19} />
              </div>
              <div>
                <h2>AI Suggested Solution Area</h2>
              </div>
            </div>

            <div className="solution-list">
              <div className="solution-item">
                <span>
                  {problem.suggestedSolutionArea || 'No solution area suggested yet.'}
                </span>
              </div>
            </div>
          </section>

          {/* NEXT ACTION */}
          {problem.governmentStatus !== 'Validated' && (
            <section className="details-card next-action-card">
              <span className="next-action-label">RECOMMENDED NEXT STEP</span>
              <h3>Government Validation</h3>
              <p>Review the evidence and AI analysis before validating this problem.</p>
              <button className="validate-full-button" onClick={handleValidate} disabled={actionLoading}>
                <CheckCircle size={17} />
                {actionLoading ? "Processing..." : "Validate Problem"}
              </button>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

export default ProblemDetails;