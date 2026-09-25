import React, { useMemo, useState, useEffect } from "react";
import {
  Users,
  Building2,
  IndianRupee,
  TrendingUp,
  Target,
  MapPin,
  CheckCircle,
  ArrowUpRight,
  BarChart3,
  X,
  Award,
  Globe2,
  FolderKanban,
  RefreshCw
} from "lucide-react";
import api from "../../api";
import "./IndustryImpact.css";

const PARTNERS = [
  {
    university: "BIT Mesra",
    project: "Smart Water Grid Prototype",
    location: "Ranchi",
    impact: "18,000+",
    progress: 72,
  },
  {
    university: "IIT (ISM) Dhanbad",
    project: "Traffic Vision AI",
    location: "Dhanbad",
    impact: "2.1 Lakh+",
    progress: 58,
  },
  {
    university: "NIT Jamshedpur",
    project: "Rural Ed-Tech Tablet",
    location: "Jamshedpur",
    impact: "50,000+",
    progress: 64,
  },
];

function IndustryImpact() {
  const [period, setPeriod] = useState("2026");
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/analytics");
      if (res.data) setAnalytics(res.data);
    } catch (err) {
      console.warn("Analytics fetch error in IndustryImpact:", err);
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
    totalFundingCommitted: 3000000,
    totalBeneficiaries: 30729850,
    districtsReached: 9,
  };

  const completionRates = analytics?.completionRates || {
    totalMilestones: 6,
    completedMilestones: 3,
    milestoneCompletionRate: 50,
  };

  const categoryBreakdown = analytics?.categoryBreakdown || [];

  const sectors = useMemo(() => {
    if (categoryBreakdown && categoryBreakdown.length > 0) {
      return categoryBreakdown.map((cat) => ({
        name: cat.category || cat._id,
        projects: cat.count,
        citizens: formatBeneficiaries(cat.beneficiaries),
        funding: `₹${(Math.max(1, cat.count) * 15).toFixed(0)} Lakhs`,
        growth: `+${Math.min(35, Math.max(15, cat.completion || 20))}%`,
        completion: cat.completion || 50,
        description: `Active societal solution addressing ${cat.category || cat._id} with ${cat.validatedCount || 0} validated implementations.`,
      }));
    }
    return [
      {
        name: "Water & Sanitation",
        projects: 5,
        citizens: "48,500+",
        funding: "₹1.2 Cr",
        growth: "+28%",
        completion: 88,
        description: "Technology, IoT and infrastructure initiatives improving water reliability.",
      },
    ];
  }, [categoryBreakdown]);

  const highlights = [
    {
      title: "Smart Water Grid Infrastructure",
      value: formatBeneficiaries(summary.totalBeneficiaries),
      label: "Citizens impacted statewide",
      detail: "IoT-enabled water and infrastructure solutions deployed across Jharkhand districts.",
    },
    {
      title: "Academic-Industry Solutions",
      value: `${summary.totalProjects} Projects`,
      label: "Active solutions",
      detail: "Collaborative initiatives solving validated civic challenges with high social ROI.",
    },
    {
      title: "Milestone Deliverables",
      value: `${completionRates.completedMilestones} Achieved`,
      label: "Delivered milestones",
      detail: "Tangible technical deliverables deployed to field testing and validation.",
    },
  ];

  return (
    <div className="industry-impact-page">
      {/* HEADER */}
      <div className="industry-impact-header">
        <div>
          <span className="impact-eyebrow">INDUSTRY IMPACT CENTER</span>
          <h1>Measure the Impact You Create</h1>
          <p>
            Track how industry partnerships, funding and technology are
            translating into measurable societal outcomes.
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
            Sync Data
          </button>

          <div className="impact-period">
            <span>Reporting Period</span>
            <div className="period-buttons">
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
        </div>
      </div>

      {/* KPI STATS */}
      <div className="impact-kpi-grid">
        <div className="impact-kpi-card">
          <div className="kpi-icon">
            <Users size={22} />
          </div>
          <span>Citizens Impacted</span>
          <strong>{formatBeneficiaries(summary.totalBeneficiaries)}</strong>
          <small>
            <TrendingUp size={14} /> Across validated problems
          </small>
        </div>

        <div className="impact-kpi-card">
          <div className="kpi-icon">
            <FolderKanban size={22} />
          </div>
          <span>Projects Supported</span>
          <strong>{summary.totalProjects}</strong>
          <small>
            <ArrowUpRight size={14} /> Active industry solutions
          </small>
        </div>

        <div className="impact-kpi-card">
          <div className="kpi-icon">
            <IndianRupee size={22} />
          </div>
          <span>Capital Deployed</span>
          <strong>
            {summary.totalFundingCommitted >= 10000000
              ? `₹${(summary.totalFundingCommitted / 10000000).toFixed(2)} Cr`
              : `₹${(summary.totalFundingCommitted / 100000).toFixed(1)} Lakhs`}
          </strong>
          <small>
            <TrendingUp size={14} /> Committed partner funding
          </small>
        </div>

        <div className="impact-kpi-card">
          <div className="kpi-icon">
            <Target size={22} />
          </div>
          <span>Milestone Progress</span>
          <strong>{completionRates.milestoneCompletionRate}%</strong>
          <small>
            <CheckCircle size={14} /> {completionRates.completedMilestones} completed
          </small>
        </div>
      </div>

      {/* PERFORMANCE STRIP */}
      <div className="impact-performance">
        <div className="performance-main">
          <div className="performance-circle">
            <strong>{completionRates.milestoneCompletionRate || 50}</strong>
            <span>%</span>
          </div>

          <div>
            <span className="performance-label">PORTFOLIO IMPACT RATE</span>
            <h2>Industry contribution is creating measurable outcomes</h2>
            <p>
              Funding, technology and partnerships are being directed toward
              high-impact societal challenges across Jharkhand.
            </p>
          </div>
        </div>

        <div className="performance-metrics">
          <div>
            <strong>{summary.districtsReached}</strong>
            <span>Districts reached</span>
          </div>
          <div>
            <strong>{summary.totalPartners || 2}</strong>
            <span>Active partners</span>
          </div>
          <div>
            <strong>{completionRates.milestoneCompletionRate}%</strong>
            <span>Milestone success rate</span>
          </div>
        </div>
      </div>

      {/* IMPACT HIGHLIGHTS */}
      <section className="impact-section">
        <div className="section-heading">
          <div>
            <span>REAL-WORLD OUTCOMES</span>
            <h2>Impact Highlights</h2>
            <p>Examples of industry-supported solutions creating measurable change.</p>
          </div>
        </div>

        <div className="highlight-grid">
          {highlights.map((item) => (
            <div className="highlight-card" key={item.title}>
              <div className="highlight-top">
                <div className="highlight-icon">
                  <Award size={20} />
                </div>
                <ArrowUpRight size={18} />
              </div>

              <h3>{item.title}</h3>
              <strong>{item.value}</strong>
              <span>{item.label}</span>

              <button onClick={() => setSelectedHighlight(item)}>
                View Impact Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTOR BREAKDOWN */}
      <section className="impact-section">
        <div className="section-heading">
          <div>
            <span>PORTFOLIO ANALYSIS</span>
            <h2>Impact by Sector</h2>
            <p>See where industry resources are generating outcomes.</p>
          </div>
        </div>

        <div className="sector-grid">
          {sectors.map((sector) => (
            <div className="sector-card" key={sector.name}>
              <div className="sector-card-top">
                <div>
                  <h3>{sector.name}</h3>
                  <span>{sector.projects} active initiatives</span>
                </div>

                <span className="sector-growth">{sector.growth}</span>
              </div>

              <div className="sector-progress">
                <div className="sector-progress-label">
                  <span>Implementation</span>
                  <strong>{sector.completion}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${sector.completion}%` }}
                  />
                </div>
              </div>

              <div className="sector-data">
                <div>
                  <span>Citizens</span>
                  <strong>{sector.citizens}</strong>
                </div>
                <div>
                  <span>Funding</span>
                  <strong>{sector.funding}</strong>
                </div>
              </div>

              <button
                className="sector-button"
                onClick={() => setSelectedSector(sector)}
              >
                Explore Sector
                <ArrowUpRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* UNIVERSITY PARTNERS */}
      <section className="impact-section">
        <div className="section-heading">
          <div>
            <span>COLLABORATION NETWORK</span>
            <h2>University Partnership Impact</h2>
            <p>
              Industry and academic institutions working together on societal
              innovation.
            </p>
          </div>
        </div>

        <div className="partner-impact-grid">
          {PARTNERS.map((partner) => (
            <div className="partner-impact-card" key={partner.university}>
              <div className="partner-card-header">
                <div className="partner-logo">
                  <Building2 size={20} />
                </div>
                <div>
                  <h4>{partner.university}</h4>
                  <span>{partner.location}</span>
                </div>
              </div>

              <div className="partner-project">
                <span>Active Project</span>
                <p>{partner.project}</p>
              </div>

              <div className="partner-progress">
                <div>
                  <span>Progress</span>
                  <strong>{partner.progress}%</strong>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${partner.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODALS */}
      {selectedSector && (
        <div className="modal-overlay" onClick={() => setSelectedSector(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedSector.name}</h2>
              <button onClick={() => setSelectedSector(null)}>
                <X size={20} />
              </button>
            </div>
            <p>{selectedSector.description}</p>
            <div className="modal-metrics">
              <div>
                <span>Active Projects</span>
                <strong>{selectedSector.projects}</strong>
              </div>
              <div>
                <span>Citizens Reached</span>
                <strong>{selectedSector.citizens}</strong>
              </div>
              <div>
                <span>Funding Allocated</span>
                <strong>{selectedSector.funding}</strong>
              </div>
              <div>
                <span>Implementation</span>
                <strong>{selectedSector.completion}%</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedHighlight && (
        <div className="modal-overlay" onClick={() => setSelectedHighlight(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedHighlight.title}</h2>
              <button onClick={() => setSelectedHighlight(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="highlight-metric-box">
              <strong>{selectedHighlight.value}</strong>
              <span>{selectedHighlight.label}</span>
            </div>
            <p>{selectedHighlight.detail}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndustryImpact;