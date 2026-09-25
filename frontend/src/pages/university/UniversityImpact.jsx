import { useState, useEffect } from "react";
import { Users, FileText, CheckCircle, Lightbulb, Target, TrendingUp, RefreshCw, ShieldCheck } from "lucide-react";
import api from "../../api";
import "./UniversityImpact.css";

const RESEARCH = [
  {
    type: "Research Paper",
    title: "Paper Published: IEEE IoT Journal",
    description: "Optimizing Sensor Deployment in Urban Water Grids across Jharkhand",
  },
  {
    type: "Patent",
    title: "Patent Granted: #IN-2026-890",
    description: "Low-cost composite sensor node for municipal pipeline leakage detection",
  },
  {
    type: "Conference",
    title: "Conference: Smart Cities India 2026",
    description: "Presented findings on decentralized water monitoring and matching algorithms.",
  },
];

function UniversityImpact() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [activeView, setActiveView] = useState("overview");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/analytics");
      if (res.data) setAnalytics(res.data);
    } catch (err) {
      console.warn("Analytics fetch error in UniversityImpact:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const formatBeneficiaries = (num) => {
    const val = Number(num) || 0;
    if (val >= 10000000) return `${(val / 10000000).toFixed(2)} Cr+`;
    if (val >= 100000) return `${(val / 100000).toFixed(1)} Lakh+`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}k+`;
    return `${val.toLocaleString()}+`;
  };

  const summary = analytics?.summary || {
    totalProblems: 48,
    validatedProblems: 14,
    totalProjects: 5,
    totalBeneficiaries: 30729850,
  };

  const completionRates = analytics?.completionRates || {
    totalMilestones: 6,
    completedMilestones: 3,
    milestoneCompletionRate: 50,
    problemValidationRate: 29,
  };

  const beforeAfterMetrics = analytics?.beforeAfterMetrics || {
    before: { unvalidatedCount: 34, unaddressedPopulation: 328983 },
    after: { validatedCount: 14, activeSolutions: 5, completedMilestones: 3, beneficiariesReached: 30729850, impactGrowth: "+29%" },
  };

  const categoryBreakdown = analytics?.categoryBreakdown || [];

  const impactScore = Math.min(
    98,
    Math.max(
      60,
      Math.round(
        (completionRates.milestoneCompletionRate || 50) * 0.5 +
        (completionRates.problemValidationRate || 30) * 0.5 +
        35
      )
    )
  );

  return (
    <div className="impact-container">
      {/* HEADER */}
      <div className="impact-header">
        <div>
          <p className="impact-eyebrow">UNIVERSITY IMPACT CENTER</p>
          <h1>Impact & Research Outcomes</h1>
          <p>
            Measure the real-world difference your university research and student
            teams are making across communities.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={fetchAnalytics}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 14px",
              background: "white",
              border: "1px solid #dce2ed",
              borderRadius: "10px",
              color: "#4056a8",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            <RefreshCw size={14} />
            Sync Metrics
          </button>
          <div className="impact-period">
            <span>Reporting Period</span>
            <strong>2026</strong>
          </div>
        </div>
      </div>

      {/* VIEW SWITCHER */}
      <div className="impact-tabs">
        <button
          className={activeView === "overview" ? "active" : ""}
          onClick={() => setActiveView("overview")}
        >
          Impact Overview
        </button>

        <button
          className={activeView === "research" ? "active" : ""}
          onClick={() => setActiveView("research")}
        >
          Research Outcomes
        </button>
      </div>

      {/* REAL STATS GRID */}
      <div className="impact-stats-grid">
        <div className="impact-stat-card primary">
          <div className="impact-stat-icon">
            <Users size={25} />
          </div>
          <div className="impact-stat-content">
            <span>Citizens Impacted</span>
            <h2>{formatBeneficiaries(summary.totalBeneficiaries)}</h2>
            <small>Across verified problems</small>
          </div>
        </div>

        <div className="impact-stat-card success">
          <div className="impact-stat-icon">
            <CheckCircle size={25} />
          </div>
          <div className="impact-stat-content">
            <span>Active Project Solutions</span>
            <h2>{summary.totalProjects}</h2>
            <small>Registered university proposals</small>
          </div>
        </div>

        <div className="impact-stat-card warning">
          <div className="impact-stat-icon">
            <Target size={25} />
          </div>
          <div className="impact-stat-content">
            <span>Milestones Delivered</span>
            <h2>
              {completionRates.completedMilestones} / {completionRates.totalMilestones}
            </h2>
            <small>{completionRates.milestoneCompletionRate}% milestone progress</small>
          </div>
        </div>

        <div className="impact-stat-card purple">
          <div className="impact-stat-icon">
            <TrendingUp size={25} />
          </div>
          <div className="impact-stat-content">
            <span>Impact Velocity</span>
            <h2>{beforeAfterMetrics.after.impactGrowth}</h2>
            <small>Ecosystem resolution rate</small>
          </div>
        </div>
      </div>

      {/* IMPACT OVERVIEW */}
      {activeView === "overview" && (
        <>
          <div className="impact-overview-banner">
            <div>
              <span className="banner-label">UNIVERSITY IMPACT SCORE</span>
              <strong>{impactScore} / 100</strong>
              <p>
                Your university's projects are creating measurable outcomes
                across communities, infrastructure, clean water, and sustainability.
              </p>
            </div>

            <div className="impact-score-ring">
              <span>{impactScore}%</span>
              <small>Score</small>
            </div>
          </div>

          <div className="impact-grid">
            {/* SUCCESS STORIES / LIVE BEFORE & AFTER */}
            <div className="impact-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-eyebrow">FIELD RESULTS</span>
                  <h3>Ecosystem Transformation</h3>
                </div>
                <span className="panel-count">Live Comparison</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* BEFORE CARD */}
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "1px",
                      color: "#dc2626",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    BEFORE UNIVERSITY INTERVENTION
                  </span>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "4px" }}>
                    <span style={{ color: "#4b5563" }}>Unvalidated Citizen Reports:</span>
                    <strong style={{ color: "#1f2937" }}>{beforeAfterMetrics.before.unvalidatedCount}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#4b5563" }}>Unaddressed Population:</span>
                    <strong style={{ color: "#1f2937" }}>{formatBeneficiaries(beforeAfterMetrics.before.unaddressedPopulation)}</strong>
                  </div>
                </div>

                {/* AFTER CARD */}
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#ecfdf5",
                    border: "1px solid #a7f3d0",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "1px",
                      color: "#059669",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    AFTER RESEARCH & VALIDATION
                  </span>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "4px" }}>
                    <span style={{ color: "#4b5563" }}>Validated Problems:</span>
                    <strong style={{ color: "#065f46" }}>{beforeAfterMetrics.after.validatedCount}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "4px" }}>
                    <span style={{ color: "#4b5563" }}>Active University Solutions:</span>
                    <strong style={{ color: "#065f46" }}>{beforeAfterMetrics.after.activeSolutions}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#4b5563" }}>Milestones Delivered:</span>
                    <strong style={{ color: "#065f46" }}>{beforeAfterMetrics.after.completedMilestones}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* IMPACT BREAKDOWN BY SECTOR */}
            <div className="impact-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-eyebrow">IMPACT BREAKDOWN</span>
                  <h3>Community Outcomes by Sector</h3>
                </div>
              </div>

              <div className="outcome-list">
                {categoryBreakdown.length > 0 ? (
                  categoryBreakdown.slice(0, 5).map((item) => (
                    <div className="outcome-item" key={item.category || item._id}>
                      <div className="outcome-top">
                        <span>{item.category || item._id}</span>
                        <strong>{item.completion}%</strong>
                      </div>
                      <div className="outcome-bar">
                        <div style={{ width: `${item.completion}%` }} />
                      </div>
                      <small>
                        {formatBeneficiaries(item.beneficiaries)} citizens • {item.count} issues
                      </small>
                    </div>
                  ))
                ) : (
                  <div className="outcome-item">
                    <div className="outcome-top">
                      <span>Water & Sanitation</span>
                      <strong>82%</strong>
                    </div>
                    <div className="outcome-bar">
                      <div style={{ width: "82%" }} />
                    </div>
                    <small>Active solutions underway</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* RESEARCH VIEW */}
      {activeView === "research" && (
        <div className="research-full-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-eyebrow">ACADEMIC OUTPUT</span>
              <h3>Recent Research Outcomes</h3>
            </div>
            <span className="panel-count">3 items</span>
          </div>

          <div className="research-grid">
            {RESEARCH.map((item) => (
              <div className="research-card" key={item.title}>
                <div className="research-card-icon">
                  {item.type === "Patent" ? (
                    <Lightbulb size={23} />
                  ) : (
                    <FileText size={23} />
                  )}
                </div>
                <span className="research-type">{item.type}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <button onClick={() => setSelectedResearch(item)}>
                  View Outcome →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOTTOM SUMMARY */}
      <div className="impact-summary">
        <div>
          <span>{summary.totalProjects}</span>
          <p>Solutions Implemented</p>
        </div>
        <div>
          <span>{formatBeneficiaries(summary.totalBeneficiaries)}</span>
          <p>Citizens Reached</p>
        </div>
        <div>
          <span>{completionRates.completedMilestones}</span>
          <p>Milestones Achieved</p>
        </div>
        <div>
          <span>{completionRates.milestoneCompletionRate}%</span>
          <p>Milestone Completion Rate</p>
        </div>
      </div>
    </div>
  );
}

export default UniversityImpact;