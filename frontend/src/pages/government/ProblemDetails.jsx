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
import { useNavigate } from "react-router-dom";
import "./ProblemDetails.css";

function ProblemDetails() {
  const navigate = useNavigate();

  return (
    <div className="problem-details-page">

      {/* HEADER */}
      <div className="details-header">
        <button
          className="back-button"
          onClick={() => navigate("/problems")}
        >
          <ArrowLeft size={18} />
          Back to Problems
        </button>

        <div className="details-actions">
          <button className="reject-button">
            Reject
          </button>

          <button className="modify-button">
            Modify
          </button>

          <button className="validate-button">
            <CheckCircle size={17} />
            Validate Problem
          </button>
        </div>
      </div>

      {/* TITLE SECTION */}
      <div className="problem-title-section">

        <div className="problem-title-main">
          <div className="details-danger-icon">
            <AlertTriangle size={25} />
          </div>

          <div>
            <p className="eyebrow">PROBLEM #PRB-1024</p>

            <h1>Urban Flooding</h1>

            <div className="problem-meta">

              <span>
                <MapPin size={16} />
                Ranchi
              </span>

              <span>
                <Users size={16} />
                1,200 people affected
              </span>

              <span>
                <Clock3 size={16} />
                Reported May 24, 2026
              </span>

            </div>
          </div>
        </div>

        <div className="details-status-group">

          <span className="severity-badge high">
            HIGH SEVERITY
          </span>

          <span className="status-badge pending-validation">
            Pending Validation
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
                <strong>Water</strong>
              </div>

              <div className="info-row">
                <span>Location</span>
                <strong>Ranchi, Jharkhand</strong>
              </div>

              <div className="info-row">
                <span>Estimated affected population</span>
                <strong>1,200+</strong>
              </div>

              <div className="description-box">
                <span>Citizen Description</span>

                <p>
                  Heavy rainfall has caused severe waterlogging
                  across multiple residential areas. Roads are
                  flooded and residents are facing difficulty
                  accessing essential services.
                </p>
              </div>

            </div>

          </section>

          {/* EVIDENCE */}
          <section className="details-card">

            <div className="card-heading">

              <div className="heading-icon purple">
                <ImageIcon size={19} />
              </div>

              <div>
                <h2>Evidence & Verification</h2>
                <p>Supporting information submitted with the report</p>
              </div>

            </div>

            <div className="evidence-grid">

              <div className="evidence-item">
                <ImageIcon size={22} />
                <div>
                  <strong>12 Photos</strong>
                  <span>Citizen uploaded</span>
                </div>
              </div>

              <div className="evidence-item">
                <MapPin size={22} />
                <div>
                  <strong>Location Verified</strong>
                  <span>GPS coordinates available</span>
                </div>
              </div>

              <div className="evidence-item">
                <Users size={22} />
                <div>
                  <strong>18 Related Reports</strong>
                  <span>Nearby citizens reported similar issues</span>
                </div>
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

              <span className="ai-confidence">
                92% confidence
              </span>

            </div>

            <div className="ai-warning">
              <ShieldCheck size={18} />

              <span>
                AI-generated recommendation — requires government
                validation before final action.
              </span>
            </div>

            <div className="ai-analysis-grid">

              <div className="ai-analysis-item">
                <span>Problem Classification</span>
                <strong>Urban Waterlogging / Flooding</strong>
              </div>

              <div className="ai-analysis-item">
                <span>Severity</span>
                <strong className="danger-text">High</strong>
              </div>

              <div className="ai-analysis-item">
                <span>Estimated affected population</span>
                <strong>1,200+</strong>
              </div>

              <div className="ai-analysis-item">
                <span>Related reports</span>
                <strong>18 reports</strong>
              </div>

            </div>

            <div className="ai-summary">

              <h3>AI Analysis</h3>

              <p>
                Multiple reports indicate that the flooding is
                concentrated around residential areas in Ranchi.
                The repeated reports and uploaded evidence suggest
                this may represent a broader drainage and
                stormwater-management issue rather than an
                isolated incident.
              </p>

            </div>

          </section>

          {/* POSSIBLE SOLUTIONS */}
          <section className="details-card">

            <div className="card-heading">

              <div className="heading-icon orange">
                <Lightbulb size={19} />
              </div>

              <div>
                <h2>Possible Solution Areas</h2>
                <p>AI-suggested areas for further investigation</p>
              </div>

            </div>

            <div className="solution-list">

              <div className="solution-item">
                <strong>Drainage Improvement</strong>
                <span>
                  Assess blocked or insufficient drainage capacity.
                </span>
              </div>

              <div className="solution-item">
                <strong>Stormwater Management</strong>
                <span>
                  Explore improved rainwater collection and routing.
                </span>
              </div>

              <div className="solution-item">
                <strong>Early Warning System</strong>
                <span>
                  Consider rainfall and water-level monitoring.
                </span>
              </div>

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
              <strong>87</strong>
              <span>/100</span>
            </div>

            <span className="priority-label">
              HIGH PRIORITY
            </span>

            <div className="priority-reasons">

              <div>
                <span>Affected population</span>
                <strong>High</strong>
              </div>

              <div>
                <span>Urgency</span>
                <strong>High</strong>
              </div>

              <div>
                <span>Evidence</span>
                <strong>Strong</strong>
              </div>

              <div>
                <span>Related reports</span>
                <strong>18</strong>
              </div>

            </div>

          </section>

          {/* RELATED REPORTS */}
          <section className="details-card">

            <div className="card-heading">

              <div className="heading-icon blue">
                <Users size={19} />
              </div>

              <div>
                <h2>Related Reports</h2>
                <p>Potentially related citizen reports</p>
              </div>

            </div>

            <div className="related-number">
              18
              <span>similar reports</span>
            </div>

            <button className="secondary-action">
              View Related Reports
            </button>

          </section>

          {/* NEXT ACTION */}
          <section className="details-card next-action-card">

            <span className="next-action-label">
              RECOMMENDED NEXT STEP
            </span>

            <h3>
              Government Validation
            </h3>

            <p>
              Review the evidence and AI analysis before
              validating this problem.
            </p>

            <button
              className="validate-full-button"
            >
              <CheckCircle size={17} />
              Validate Problem
            </button>

          </section>

        </aside>

      </div>

    </div>
  );
}

export default ProblemDetails;