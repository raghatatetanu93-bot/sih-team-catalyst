import { useMemo, useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  MapPin,
  Lightbulb,
  ArrowUpRight,
  Building2,
  CheckCircle,
  Target,
  Activity,
  Download,
  X,
  GraduationCap,
  BarChart3,
  Award,
  RefreshCw,
  Clock,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import api from "../../api";
import "./Impact.css";

function Impact() {
  const [period, setPeriod] = useState("2026");
  const [selectedArea, setSelectedArea] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async () => {
    setRefreshing(true);
    try {
      const res = await api.get("/analytics");
      if (res.data) {
        setAnalytics(res.data);
      }
    } catch (err) {
      console.warn("Could not fetch /api/analytics, trying /analytics/dashboard:", err);
      try {
        const fallback = await api.get("/analytics/dashboard");
        if (fallback.data) setAnalytics(fallback.data);
      } catch (fErr) {
        console.error("Failed to load ecosystem analytics:", fErr);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
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
    pendingProblems: 34,
    totalUniversities: 1,
    totalPartners: 2,
    totalProjects: 5,
    totalBeneficiaries: 30729850,
    districtsReached: 9,
    districtCoverage: 38,
  };

  const completionRates = analytics?.completionRates || {
    totalMilestones: 6,
    completedMilestones: 3,
    milestoneCompletionRate: 50,
    problemValidationRate: 29,
    projectImplementationRate: 30,
  };

  const beforeAfterMetrics = analytics?.beforeAfterMetrics || {
    before: {
      label: "Initial Unaddressed State",
      unvalidatedCount: 34,
      unaddressedPopulation: 328983,
      avgResolutionTime: "84+ Days (Uncoordinated)",
    },
    after: {
      label: "Ecosystem Validated & Active",
      validatedCount: 14,
      activeSolutions: 5,
      completedMilestones: 3,
      beneficiariesReached: 30729850,
      completionRate: 50,
      impactGrowth: "+29%",
    },
  };

  const categoryBreakdown = analytics?.categoryBreakdown || [
    {
      _id: "Water & Sanitation",
      category: "Water & Sanitation",
      count: 21,
      validatedCount: 7,
      beneficiaries: 397150,
      completion: 33,
    },
    {
      _id: "Public Health",
      category: "Public Health",
      count: 9,
      validatedCount: 3,
      beneficiaries: 30005683,
      completion: 33,
    },
    {
      _id: "Education",
      category: "Education",
      count: 3,
      validatedCount: 1,
      beneficiaries: 502000,
      completion: 33,
    },
    {
      _id: "Roads & Transport",
      category: "Roads & Transport",
      count: 2,
      validatedCount: 2,
      beneficiaries: 52500,
      completion: 100,
    },
  ];

  const districtBreakdown = analytics?.districtBreakdown || [
    { district: "Ranchi", problems: 39, validated: 12, population: 30940283 },
    { district: "Jamshedpur", problems: 1, validated: 1, population: 60000 },
    { district: "Deoghar", problems: 1, validated: 0, population: 50000 },
    { district: "Bokaro", problems: 2, validated: 0, population: 3500 },
    { district: "Dhanbad", problems: 1, validated: 1, population: 2500 },
  ];

  const totalPeopleFormatted = formatBeneficiaries(summary.totalBeneficiaries);

  return (
    <div className="impact-page">
      {/* HEADER */}
      <div className="impact-header">
        <div>
          <p className="eyebrow">GOVERNMENT & UNIVERSITY IMPACT</p>
          <h1>Impact & Outcomes</h1>
          <p>
            Measure how university-led innovation projects and government
            validation are creating meaningful change across Jharkhand's
            districts.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={fetchAnalytics}
            disabled={refreshing}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "12px 16px",
              border: "1px solid #dce2ed",
              borderRadius: "10px",
              background: "white",
              color: "#4056a8",
              fontSize: "13px",
              fontWeight: "700",
              cursor: refreshing ? "not-allowed" : "pointer",
            }}
            title="Refresh analytics from live database"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "spin-icon" : ""}
            />
            {refreshing ? "Refreshing..." : "Sync Live Data"}
          </button>

          <button
            className="impact-report-button"
            onClick={() => setShowReport(true)}
          >
            <Download size={17} />
            View Full Report
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="impact-stats">
        <div className="impact-stat-card">
          <div className="impact-icon purple">
            <Users size={24} />
          </div>
          <div>
            <span>People Impacted</span>
            <strong>{totalPeopleFormatted}</strong>
            <small>Across verified problems</small>
          </div>
        </div>

        <div className="impact-stat-card">
          <div className="impact-icon blue">
            <Lightbulb size={24} />
          </div>
          <div>
            <span>Active Innovations</span>
            <strong>{summary.totalProjects}</strong>
            <small>University-led initiatives</small>
          </div>
        </div>

        <div className="impact-stat-card">
          <div className="impact-icon green">
            <MapPin size={24} />
          </div>
          <div>
            <span>Districts Reached</span>
            <strong>{summary.districtsReached} / 24</strong>
            <small>{summary.districtCoverage}% district coverage</small>
          </div>
        </div>

        <div className="impact-stat-card">
          <div className="impact-icon orange">
            <TrendingUp size={24} />
          </div>
          <div>
            <span>Impact Growth</span>
            <strong>{beforeAfterMetrics.after.impactGrowth}</strong>
            <small>Validation & milestone rate</small>
          </div>
        </div>
      </div>

      {/* OVERVIEW GRID: PERFORMANCE + BEFORE/AFTER COMPARISON */}
      <div className="impact-overview-grid">
        <div className="impact-summary-card">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">PERFORMANCE</p>
              <h2>Impact Overview</h2>
              <p>Live progress of university innovation and resolution</p>
            </div>

            <div className="period-selector">
              {["2026", "2025"].map((year) => (
                <button
                  key={year}
                  className={period === year ? "active" : ""}
                  onClick={() => setPeriod(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="impact-metrics">
            <div className="metric-row">
              <div className="metric-info">
                <span>Milestones Successfully Completed</span>
                <strong>
                  {completionRates.completedMilestones} /{" "}
                  {completionRates.totalMilestones} Milestones
                </strong>
              </div>
              <div className="metric-bar">
                <div
                  className="metric-fill implemented"
                  style={{
                    width: `${completionRates.milestoneCompletionRate}%`,
                  }}
                />
              </div>
              <small className="metric-footnote">
                {completionRates.milestoneCompletionRate}% milestone completion
                rate
              </small>
            </div>

            <div className="metric-row">
              <div className="metric-info">
                <span>Government Validation Rate</span>
                <strong>
                  {summary.validatedProblems} / {summary.totalProblems} Problems
                </strong>
              </div>
              <div className="metric-bar">
                <div
                  className="metric-fill coverage"
                  style={{
                    width: `${completionRates.problemValidationRate}%`,
                  }}
                />
              </div>
              <small className="metric-footnote">
                {completionRates.problemValidationRate}% of reported issues
                verified by government
              </small>
            </div>

            <div className="metric-row">
              <div className="metric-info">
                <span>Active University Partnerships</span>
                <strong>{summary.totalUniversities} Institutions Active</strong>
              </div>
              <div className="metric-bar">
                <div
                  className="metric-fill university"
                  style={{
                    width: `${Math.min(summary.totalUniversities * 25, 100)}%`,
                  }}
                />
              </div>
              <small className="metric-footnote">
                Engaged in ongoing technical research & deployment
              </small>
            </div>
          </div>
        </div>

        {/* BEFORE / AFTER REAL COMPARISON CARD */}
        <div className="impact-highlight-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div className="highlight-icon">
              <ShieldCheck size={25} />
            </div>

            <p className="highlight-label">BEFORE VS AFTER COMPARISON</p>

            <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>
              {beforeAfterMetrics.after.impactGrowth} Efficiency Gain
            </h2>

            {/* BEFORE BOX */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.8px",
                  fontWeight: "700",
                  color: "#fecdd3",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                BEFORE VALIDATION & MATCHING
              </span>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span>Unaddressed Reports:</span>
                <strong>{beforeAfterMetrics.before.unvalidatedCount}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginTop: "3px" }}>
                <span>Unaddressed Citizens:</span>
                <strong>{formatBeneficiaries(beforeAfterMetrics.before.unaddressedPopulation)}</strong>
              </div>
              <small style={{ color: "#e2e8f0", fontSize: "11px", display: "block", marginTop: "4px" }}>
                Resolution Time: {beforeAfterMetrics.before.avgResolutionTime}
              </small>
            </div>

            {/* AFTER BOX */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                padding: "12px",
                borderRadius: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.8px",
                  fontWeight: "700",
                  color: "#a7f3d0",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                AFTER ECOSYSTEM ACTION
              </span>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span>Validated Problems:</span>
                <strong>{beforeAfterMetrics.after.validatedCount}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginTop: "3px" }}>
                <span>Active Solutions:</span>
                <strong>{beforeAfterMetrics.after.activeSolutions} Projects</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginTop: "3px" }}>
                <span>Completed Milestones:</span>
                <strong>{beforeAfterMetrics.after.completedMilestones} Delivered</strong>
              </div>
            </div>
          </div>

          <div className="highlight-bottom" style={{ marginTop: "16px" }}>
            <div>
              <span>{formatBeneficiaries(beforeAfterMetrics.after.beneficiariesReached)}</span>
              <small>citizens reached by active solutions</small>
            </div>
            <TrendingUp size={22} />
          </div>
        </div>
      </div>

      {/* SECTORS / CATEGORY BREAKDOWN */}
      <div className="impact-areas-section">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">RESEARCH & INNOVATION</p>
            <h2>Impact by Sector</h2>
            <p>Live thematic breakdown of validated issues and solutions</p>
          </div>
          <span className="sector-total">
            {categoryBreakdown.length} sectors active
          </span>
        </div>

        <div className="impact-area-grid">
          {categoryBreakdown.map((area, idx) => {
            const colors = ["blue", "purple", "green", "orange"];
            const color = colors[idx % colors.length];

            return (
              <div
                className="impact-area-card"
                key={area._id || area.category}
                onClick={() => setSelectedArea(area)}
                style={{ cursor: "pointer" }}
              >
                <div className="impact-area-top">
                  <div className={`sector-icon ${color}`}>
                    <Activity size={21} />
                  </div>
                  <span
                    style={{
                      background: area.completion > 50 ? "#ecfdf5" : "#f1f5f9",
                      color: area.completion > 50 ? "#059669" : "#64748b",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "700",
                    }}
                  >
                    {area.completion}% validated
                  </span>
                </div>

                <h3>{area.category || area._id}</h3>
                <p>
                  Targeting {area.count} reported issues across Jharkhand with{" "}
                  {area.validatedCount} officially validated.
                </p>

                <div className="sector-progress">
                  <div>
                    <span>Validation Completion</span>
                    <strong>{area.completion}%</strong>
                  </div>
                  <div className="sector-progress-bar">
                    <div style={{ width: `${area.completion}%` }} />
                  </div>
                </div>

                <div className="impact-area-data">
                  <div>
                    <span>Problems</span>
                    <strong>{area.count}</strong>
                  </div>
                  <div>
                    <span>Beneficiaries</span>
                    <strong>{formatBeneficiaries(area.beneficiaries)}</strong>
                  </div>
                </div>

                <button className="sector-view-button">
                  View Sector Details
                  <ArrowUpRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* DISTRICT-WISE IMPACT BREAKDOWN */}
      <div
        style={{
          background: "white",
          borderRadius: "17px",
          border: "1px solid #e2e7ef",
          padding: "26px",
          marginTop: "25px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <div>
            <p className="section-eyebrow">GEOGRAPHIC DISTRIBUTION</p>
            <h2 style={{ margin: "0 0 5px", fontSize: "22px", color: "#17213a" }}>
              District-Wise Breakdown
            </h2>
            <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
              Real-time problem distribution and population impacted per district
            </p>
          </div>
          <span
            style={{
              padding: "5px 12px",
              background: "#eef2ff",
              color: "#4056a8",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            {districtBreakdown.length} Districts Reporting
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #edf0f5", color: "#64748b" }}>
                <th style={{ padding: "12px 14px", fontWeight: "700" }}>District</th>
                <th style={{ padding: "12px 14px", fontWeight: "700" }}>Total Issues</th>
                <th style={{ padding: "12px 14px", fontWeight: "700" }}>Validated Issues</th>
                <th style={{ padding: "12px 14px", fontWeight: "700" }}>Population Impacted</th>
                <th style={{ padding: "12px 14px", fontWeight: "700" }}>Validation Rate</th>
              </tr>
            </thead>
            <tbody>
              {districtBreakdown.map((dist, idx) => {
                const rate = dist.problems > 0 ? Math.round((dist.validated / dist.problems) * 100) : 0;
                return (
                  <tr
                    key={dist.district || idx}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      backgroundColor: idx % 2 === 0 ? "white" : "#fafbfe",
                    }}
                  >
                    <td style={{ padding: "12px 14px", fontWeight: "700", color: "#1e293b", display: "flex", alignItems: "center", gap: "8px" }}>
                      <MapPin size={16} color="#4056a8" />
                      {dist.district}
                    </td>
                    <td style={{ padding: "12px 14px", color: "#334155" }}>{dist.problems}</td>
                    <td style={{ padding: "12px 14px", color: "#059669", fontWeight: "600" }}>{dist.validated}</td>
                    <td style={{ padding: "12px 14px", color: "#475569" }}>{formatBeneficiaries(dist.population)}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "80px", height: "6px", background: "#edf0f5", borderRadius: "10px", overflow: "hidden" }}>
                          <div style={{ width: `${rate}%`, height: "100%", background: "#4056a8" }}></div>
                        </div>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "#4056a8" }}>{rate}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUMMARY STRIP */}
      <div className="impact-summary-strip">
        <div>
          <Target size={20} />
          <div>
            <strong>{summary.totalProjects}</strong>
            <span>Active Projects</span>
          </div>
        </div>

        <div>
          <Users size={20} />
          <div>
            <strong>{totalPeopleFormatted}</strong>
            <span>Total Beneficiaries</span>
          </div>
        </div>

        <div>
          <GraduationCap size={20} />
          <div>
            <strong>{summary.totalUniversities}</strong>
            <span>University Partners</span>
          </div>
        </div>

        <div>
          <MapPin size={20} />
          <div>
            <strong>{summary.districtsReached}</strong>
            <span>Districts Reached</span>
          </div>
        </div>
      </div>

      {/* AREA MODAL */}
      {selectedArea && (
        <div className="impact-modal-overlay" onClick={() => setSelectedArea(null)}>
          <div className="impact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="impact-modal-close" onClick={() => setSelectedArea(null)}>
              <X size={18} />
            </button>
            <div className="impact-modal-icon">
              <Activity size={24} />
            </div>
            <span className="modal-eyebrow">SECTOR OVERVIEW</span>
            <h2>{selectedArea.category || selectedArea._id}</h2>
            <div className="modal-stats-grid">
              <div>
                <span>Reported Issues</span>
                <strong>{selectedArea.count}</strong>
              </div>
              <div>
                <span>Validated</span>
                <strong>{selectedArea.validatedCount}</strong>
              </div>
              <div>
                <span>Beneficiaries</span>
                <strong>{formatBeneficiaries(selectedArea.beneficiaries)}</strong>
              </div>
              <div>
                <span>Completion</span>
                <strong>{selectedArea.completion}%</strong>
              </div>
            </div>
            <button className="impact-modal-button" onClick={() => setSelectedArea(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      {showReport && (
        <div className="impact-modal-overlay" onClick={() => setShowReport(false)}>
          <div className="report-modal" onClick={(e) => e.stopPropagation()}>
            <button className="impact-modal-close" onClick={() => setShowReport(false)}>
              <X size={18} />
            </button>
            <div className="report-icon">
              <Download size={25} />
            </div>
            <span className="modal-eyebrow">IMPACT REPORT</span>
            <h2>Ecosystem Social Impact Report</h2>
            <p>
              The {period} live report consolidates verified outcomes,
              beneficiary reach across Jharkhand, district coverage, and
              academic-industrial implementation.
            </p>

            <div className="report-items">
              <div>
                <CheckCircle size={17} />
                <span>{summary.totalProjects} active projects deployed</span>
              </div>
              <div>
                <CheckCircle size={17} />
                <span>{totalPeopleFormatted} citizens impacted</span>
              </div>
              <div>
                <CheckCircle size={17} />
                <span>{summary.districtsReached} / 24 districts reached</span>
              </div>
              <div>
                <CheckCircle size={17} />
                <span>{completionRates.completedMilestones} project milestones achieved</span>
              </div>
            </div>

            <button className="impact-modal-button" onClick={() => setShowReport(false)}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Impact;