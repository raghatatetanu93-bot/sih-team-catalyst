import "./ReportDetails.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

import {
  ArrowLeft,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle,
  FileText,
  Clock,
  Droplets,
  Trash2,
  Building2,
  HeartPulse,
  Sparkles,
  Loader2,
  ShieldAlert,
} from "lucide-react";

const getCategoryIcon = (category = "") => {
  const c = String(category).toLowerCase();
  if (c.includes("water")) return Droplets;
  if (c.includes("sanitat") || c.includes("waste") || c.includes("garbage")) return Trash2;
  if (c.includes("infra") || c.includes("road") || c.includes("bridge")) return Building2;
  if (c.includes("health") || c.includes("medic")) return HeartPulse;
  return AlertCircle;
};

function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/problems/" + id);
        setProblem(res.data);
      } catch (err) {
        console.error("Failed to load report:", err);
        setError(err.response?.data?.message || "Report not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="report-details-page">
        <button
          className="back-button"
          onClick={() => navigate("/citizen/reports")}
        >
          <ArrowLeft size={18} />
          Back to My Reports
        </button>
        <div className="report-details-state">
          <Loader2 size={32} className="spin" style={{ animation: "spin 1s linear infinite", color: "#0f766e" }} />
          <span>Loading report details...</span>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="report-details-page">
        <button
          className="back-button"
          onClick={() => navigate("/citizen/reports")}
        >
          <ArrowLeft size={18} />
          Back to My Reports
        </button>
        <div className="report-details-state error">
          <AlertCircle size={36} />
          <h2>Report not found</h2>
          <p>{error || "The requested issue report could not be found or has been removed."}</p>
          <button onClick={() => navigate("/citizen/reports")}>
            Return to My Reports
          </button>
        </div>
      </div>
    );
  }

  const Icon = getCategoryIcon(problem.category);
  const rawStatus = problem.governmentStatus || problem.status || "Reported";
  const statusLower = rawStatus.toLowerCase().trim();
  const statusSlug = statusLower.replace(/[\s_]+/g, "-");

  const title = problem.title || (problem.summary ? (problem.summary.length > 60 ? problem.summary.slice(0, 57) + "..." : problem.summary) : `${problem.category || "Community"} Report`);
  const locationText = [problem.location?.address, problem.location?.district]
    .filter(Boolean)
    .join(", ") || (typeof problem.location === "string" ? problem.location : "Location not specified");

  const dateStr = problem.createdAt
    ? new Date(problem.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recently";

  // Timeline progress checks based on real MongoDB status
  const isUnderReviewOrMore =
    statusLower.includes("review") ||
    statusLower.includes("valid") ||
    statusLower.includes("progress") ||
    statusLower.includes("resolv");

  const isInProgressOrResolved =
    statusLower.includes("progress") ||
    statusLower.includes("resolv");

  const isResolved = statusLower.includes("resolv");

  return (
    <div className="report-details-page">
      <button
        className="back-button"
        onClick={() => navigate("/citizen/reports")}
      >
        <ArrowLeft size={18} />
        Back to My Reports
      </button>

      <div className="report-details-header">
        <div className="details-icon">
          <Icon size={28} />
        </div>

        <div className="details-title">
          <span className="page-label">REPORT DETAILS</span>
          <h1>{title}</h1>
          <span className={`status ${statusSlug}`}>
            {rawStatus}
          </span>
        </div>
      </div>

      <div className="details-grid">
        <section className="details-main-card">
          <h2>Issue Description</h2>
          <p>{problem.description || "No description provided."}</p>

          {problem.evidenceUrl && (
            <>
              <div className="details-divider"></div>
              <h2>Photo Evidence</h2>
              <div style={{ marginTop: "14px", borderRadius: "14px", overflow: "hidden", maxWidth: "480px", border: "1px solid #e2e8f0" }}>
                <img
                  src={problem.evidenceUrl}
                  alt="Citizen photo evidence"
                  style={{ width: "100%", maxHeight: "360px", objectFit: "cover", display: "block" }}
                />
              </div>
            </>
          )}

          <div className="details-divider"></div>

          <h2>Report Information</h2>

          <div className="details-info-grid">
            <div className="detail-item">
              <MapPin size={18} />
              <div>
                <span>Location</span>
                <strong>{locationText}</strong>
              </div>
            </div>

            <div className="detail-item">
              <Calendar size={18} />
              <div>
                <span>Date Submitted</span>
                <strong>{dateStr}</strong>
              </div>
            </div>

            <div className="detail-item">
              <FileText size={18} />
              <div>
                <span>Category</span>
                <strong>{problem.category || "General"}</strong>
              </div>
            </div>

            <div className="detail-item">
              <ShieldAlert size={18} />
              <div>
                <span>Severity</span>
                <strong>{problem.severity || "Medium"}</strong>
              </div>
            </div>
          </div>

          {problem.summary && (
            <>
              <div className="details-divider"></div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", color: "#0f766e" }}>
                <Sparkles size={18} />
                <h2 style={{ margin: 0, fontSize: "18px" }}>AI Summary</h2>
              </div>
              <p style={{ background: "#f0fdfa", padding: "14px 18px", borderRadius: "12px", border: "1px solid #ccfbf1", color: "#134e4a", margin: 0 }}>
                {problem.summary}
              </p>
            </>
          )}
        </section>

        <aside className="report-progress-card">
          <span className="progress-label">CURRENT PROGRESS</span>
          <h2>Report Status</h2>

          <div className="progress-step completed">
            <div className="step-dot"></div>
            <div>
              <strong>Report Submitted</strong>
              <span>Your issue was successfully submitted.</span>
            </div>
          </div>

          <div className={`progress-step ${isUnderReviewOrMore ? "completed" : ""}`}>
            <div className="step-dot"></div>
            <div>
              <strong>Under Review / Validated</strong>
              <span>{isUnderReviewOrMore ? "Authorities have reviewed this report." : "Pending review by government officials."}</span>
            </div>
          </div>

          <div className={`progress-step ${isInProgressOrResolved ? "completed" : ""}`}>
            <div className="step-dot"></div>
            <div>
              <strong>Action in Progress</strong>
              <span>{isInProgressOrResolved ? "Partners / authorities are actively addressing the issue." : "Awaiting assignment for resolution."}</span>
            </div>
          </div>

          <div className={`progress-step ${isResolved ? "completed" : ""}`}>
            <div className="step-dot"></div>
            <div>
              <strong>Resolved</strong>
              <span>{isResolved ? "The issue has been successfully resolved." : "Pending final resolution."}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ReportDetails;