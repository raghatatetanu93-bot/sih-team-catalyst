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
  Lightbulb,
  X,
  ArrowRight,
  Building2,
} from "lucide-react";

import "./ProblemDetails.css";

function ProblemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/problems/${id}`);
        setProblem(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load problem details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  /* =========================
     VALIDATE
  ========================= */

  const handleValidate = async () => {
    try {
      setActionLoading(true);

      const res = await api.patch(`/problems/${id}`, {
        governmentStatus: "Validated",
      });

      setProblem(res.data);
      setConfirmAction(null);
    } catch (err) {
      console.error(err);
      alert("Failed to validate problem.");
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================
     REJECT
  ========================= */

  const handleReject = async () => {
    try {
      setActionLoading(true);

      const res = await api.patch(`/problems/${id}`, {
        governmentStatus: "Rejected",
      });

      setProblem(res.data);
      setConfirmAction(null);
    } catch (err) {
      console.error(err);
      alert("Failed to reject problem.");
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================
     HELPERS
  ========================= */

  const severity =
    problem?.severity?.toLowerCase() || "medium";

  const status =
    problem?.governmentStatus
      ?.toLowerCase()
      .replace(/\s+/g, "-") || "pending-validation";

  const priorityScore = Number(problem?.priorityScore || 0);

  const getPriorityLabel = () => {
    if (priorityScore >= 80) return "Critical Priority";
    if (priorityScore >= 60) return "High Priority";
    if (priorityScore >= 35) return "Medium Priority";
    return "Low Priority";
  };

  const getPriorityClass = () => {
    if (priorityScore >= 80) return "critical";
    if (priorityScore >= 60) return "high";
    if (priorityScore >= 35) return "medium";
    return "low";
  };

  if (loading) {
    return (
      <div className="problem-details-state">
        <div className="details-loader"></div>
        <span>Loading problem intelligence...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="problem-details-state error">
        <AlertTriangle size={25} />
        <strong>{error}</strong>

        <button onClick={() => navigate("/government/validation")}>
          Back to Validation
        </button>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="problem-details-state">
        <strong>Problem not found.</strong>

        <button onClick={() => navigate("/government/validation")}>
          Back to Validation
        </button>
      </div>
    );
  }

  const isFinalized =
    problem.governmentStatus === "Validated" ||
    problem.governmentStatus === "Rejected";

  return (
    <div className="problem-details-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="details-header">

        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="details-actions">

          {!isFinalized && (
            <>
              <button
                className="reject-button"
                onClick={() => setConfirmAction("reject")}
                disabled={actionLoading}
              >
                Reject
              </button>

              <button
                className="validate-button"
                onClick={() => setConfirmAction("validate")}
                disabled={actionLoading}
              >
                <CheckCircle size={17} />
                Validate Problem
              </button>
            </>
          )}

        </div>

      </div>


      {/* =====================================================
          TITLE
      ===================================================== */}

      <div className="problem-title-section">

        <div className="problem-title-main">

          <div className={`details-danger-icon ${severity}`}>
            <AlertTriangle size={25} />
          </div>

          <div>

            <p className="eyebrow">
              PROBLEM #
              {problem._id
                ?.substring(0, 8)
                .toUpperCase()}
            </p>

            <h1 title={problem.title || problem.category || "Uncategorized Issue"}>
              {problem.title || problem.category || "Uncategorized Issue"}
            </h1>

            <div className="problem-meta">

              <span>
                <MapPin size={15} />
                {problem.location?.address ||
                  "Location unavailable"}
              </span>

              <span>
                <Users size={15} />
                {problem.affectedPopulation || 0} people affected
              </span>

              <span>
                <Clock3 size={15} />
                Reported{" "}
                {problem.createdAt
                  ? new Date(
                      problem.createdAt
                    ).toLocaleDateString()
                  : "Unknown date"}
              </span>

            </div>

          </div>

        </div>


        <div className="details-status-group">

          <span
            className={`severity-badge ${severity}`}
          >
            {problem.severity || "Medium"} Severity
          </span>

          <span
            className={`status-badge ${status}`}
          >
            {problem.governmentStatus ||
              "Pending Validation"}
          </span>

        </div>

      </div>


      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="details-grid">

        {/* ===================================================
            LEFT COLUMN
        =================================================== */}

        <div className="details-main-column">


          {/* PROBLEM SUMMARY */}

          <section className="details-card">

            <div className="card-heading">

              <div className="heading-icon blue">
                <FileText size={19} />
              </div>

              <div>
                <h2>Problem Summary</h2>
                <p>
                  Information submitted by citizens
                </p>
              </div>

            </div>


            <div className="summary-content">

              <div className="info-row">
                <span>Category</span>
                <strong>
                  {problem.category || "Not specified"}
                </strong>
              </div>


              <div className="info-row">
                <span>Location</span>
                <strong>
                  {[problem.location?.address, problem.location?.district]
                    .filter(Boolean)
                    .join(", ") || (typeof problem.location === "string" ? problem.location : "Not specified")}
                </strong>
              </div>


              <div className="info-row">
                <span>Affected Population</span>
                <strong>
                  {problem.affectedPopulation || 0}
                </strong>
              </div>


              <div className="info-row">
                <span>Reported On</span>
                <strong>
                  {problem.createdAt
                    ? new Date(
                        problem.createdAt
                      ).toLocaleDateString()
                    : "Unknown"}
                </strong>
              </div>


              <div className="description-box">

                <span>Citizen Description</span>

                <p>
                  {problem.description ||
                    "No citizen description provided."}
                </p>

              </div>

              {problem.evidenceUrl && (
                <div className="description-box" style={{ marginTop: "16px" }}>
                  <span>Citizen Photo Evidence</span>
                  <div style={{ marginTop: "10px", borderRadius: "12px", overflow: "hidden", maxWidth: "420px", border: "1px solid #e2e8f0" }}>
                    <img
                      src={problem.evidenceUrl}
                      alt="Citizen photo evidence"
                      style={{ width: "100%", maxHeight: "320px", objectFit: "cover", display: "block" }}
                    />
                  </div>
                </div>
              )}

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

                  <p>
                    AI-generated analysis of this problem
                  </p>
                </div>

              </div>

              <div className="ai-badge">
                AI ANALYSIS
              </div>

            </div>


            <div className="ai-warning">

              <ShieldCheck size={17} />

              <span>
                AI-generated fields are read-only.
                Government officials make the final
                validation decision.
              </span>

            </div>


            <div className="ai-analysis-grid">

              <div className="ai-analysis-item">

                <span>Urgency</span>

                <strong>
                  {problem.urgency || "Not available"}
                </strong>

              </div>


              <div className="ai-analysis-item">

                <span>Severity</span>

                <strong
                  className={
                    severity === "high" ||
                    severity === "critical"
                      ? "danger-text"
                      : ""
                  }
                >
                  {problem.severity || "Not available"}
                </strong>

              </div>


              <div className="ai-analysis-item">

                <span>Systemic Cluster</span>

                <strong>
                  {problem.systemicCluster ||
                    "None identified"}
                </strong>

              </div>


              <div className="ai-analysis-item">

                <span>Related Reports</span>

                <strong>
                  {problem.relatedReports?.length || 0}
                  {" "}
                  reports
                </strong>

              </div>

            </div>


            <div className="ai-summary">

              <h3>AI Summary</h3>

              <p>
                {problem.summary ||
                  "No AI summary generated for this report yet."}
              </p>

            </div>

          </section>


          {/* SOLUTION AREA */}

          <section className="details-card solution-main-card">

            <div className="card-heading">

              <div className="heading-icon orange">
                <Lightbulb size={19} />
              </div>

              <div>
                <h2>AI Suggested Solution Area</h2>

                <p>
                  Potential area for intervention
                </p>
              </div>

            </div>


            <div className="solution-highlight">

              <Lightbulb size={20} />

              <div>

                <strong>
                  {problem.suggestedSolutionArea ||
                    "No solution area suggested yet."}
                </strong>

                <span>
                  This recommendation can help identify
                  suitable solution partners after validation.
                </span>

              </div>

            </div>

          </section>

        </div>


        {/* ===================================================
            RIGHT COLUMN
        =================================================== */}

        <aside className="details-side-column">


          {/* PRIORITY */}

          <section className="details-card priority-card">

            <div className="card-heading">

              <div className="heading-icon red">
                <AlertTriangle size={19} />
              </div>

              <div>
                <h2>Priority Assessment</h2>

                <p>
                  Current AI recommendation
                </p>
              </div>

            </div>


            <div className="priority-score">

              <strong>
                {priorityScore}
              </strong>

              <span>/100</span>

            </div>


            <div
              className={`priority-level ${getPriorityClass()}`}
            >
              {getPriorityLabel()}
            </div>


            {problem.emergencyStatus && (
              <div className="emergency-indicator">

                <AlertTriangle size={15} />

                Emergency Status

              </div>
            )}


            <div className="priority-reasons">

              <div>
                <span>Affected population</span>

                <strong>
                  {problem.affectedPopulation || 0}
                </strong>
              </div>


              <div>
                <span>Urgency</span>

                <strong>
                  {problem.urgency || "Unknown"}
                </strong>
              </div>


              <div>
                <span>Severity</span>

                <strong>
                  {problem.severity || "Unknown"}
                </strong>
              </div>

            </div>

          </section>


          {/* RELATED REPORTS */}

          <section className="details-card related-card">

            <div className="card-heading">

              <div className="heading-icon blue">
                <Users size={19} />
              </div>

              <div>
                <h2>Related Reports</h2>

                <p>
                  Similar citizen submissions
                </p>
              </div>

            </div>


            <div className="related-number">

              <strong>
                {problem.relatedReports?.length || 0}
              </strong>

              <span>related reports</span>

            </div>

          </section>


          {/* NEXT ACTION */}

          {!isFinalized && (

            <section className="details-card next-action-card">

              <span className="next-action-label">
                RECOMMENDED NEXT STEP
              </span>

              <h3>
                Government Validation
              </h3>

              <p>
                Review the citizen report and AI
                analysis before making a validation decision.
              </p>


              <button
                className="validate-full-button"
                onClick={() =>
                  setConfirmAction("validate")
                }
                disabled={actionLoading}
              >
                <CheckCircle size={17} />

                Validate Problem

              </button>


              <button
                className="secondary-action reject-secondary"
                onClick={() =>
                  setConfirmAction("reject")
                }
                disabled={actionLoading}
              >
                Reject Problem
              </button>

            </section>

          )}


          {/* VALIDATED STATE */}

          {problem.governmentStatus === "Validated" && (

            <section className="details-card validated-card">

              <div className="validated-icon">
                <CheckCircle size={22} />
              </div>

              <span className="next-action-label">
                PROBLEM VERIFIED
              </span>

              <h3>
                Ready for Solution Matching
              </h3>

              <p>
                This problem has been validated by
                government and can now move into the
                solution matching workflow.
              </p>


              <button
                className="match-button"
                onClick={() =>
                  navigate(
                    "/government/university-matching"
                  )
                }
              >
                <Building2 size={17} />

                Find Solution Partners

                <ArrowRight size={16} />
              </button>

            </section>

          )}


          {/* REJECTED STATE */}

          {problem.governmentStatus === "Rejected" && (

            <section className="details-card rejected-card">

              <div className="rejected-icon">
                <X size={22} />
              </div>

              <span className="next-action-label rejected-label">
                REVIEW COMPLETE
              </span>

              <h3>
                Problem Rejected
              </h3>

              <p>
                This report has been marked as rejected
                during government validation.
              </p>

            </section>

          )}

        </aside>

      </div>


      {/* =====================================================
          CONFIRMATION MODAL
      ===================================================== */}

      {confirmAction && (

        <div
          className="confirmation-overlay"
          onClick={() => {
            if (!actionLoading) {
              setConfirmAction(null);
            }
          }}
        >

          <div
            className="confirmation-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="confirmation-close"
              onClick={() =>
                !actionLoading &&
                setConfirmAction(null)
              }
            >
              <X size={18} />
            </button>


            <div
              className={`confirmation-icon ${
                confirmAction === "validate"
                  ? "success"
                  : "danger"
              }`}
            >
              {confirmAction === "validate" ? (
                <CheckCircle size={25} />
              ) : (
                <AlertTriangle size={25} />
              )}
            </div>


            <h2>
              {confirmAction === "validate"
                ? "Validate this problem?"
                : "Reject this problem?"}
            </h2>


            <p>

              {confirmAction === "validate"
                ? "This will mark the citizen report as verified and make it eligible for solution matching."
                : "This will mark the citizen report as rejected and remove it from the active validation queue."}

            </p>


            <div className="confirmation-actions">

              <button
                className="confirmation-cancel"
                onClick={() =>
                  setConfirmAction(null)
                }
                disabled={actionLoading}
              >
                Cancel
              </button>


              <button
                className={
                  confirmAction === "validate"
                    ? "confirmation-confirm validate-confirm"
                    : "confirmation-confirm reject-confirm"
                }
                onClick={
                  confirmAction === "validate"
                    ? handleValidate
                    : handleReject
                }
                disabled={actionLoading}
              >

                {actionLoading
                  ? "Processing..."
                  : confirmAction === "validate"
                  ? "Confirm Validation"
                  : "Confirm Rejection"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ProblemDetails;