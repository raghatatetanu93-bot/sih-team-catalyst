import React, { useMemo, useState } from "react";
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
} from "lucide-react";
import "./IndustryImpact.css";

const SECTORS = [
  {
    name: "Water & Sanitation",
    projects: 5,
    citizens: "48,500+",
    funding: "₹1.2 Cr",
    growth: "+28%",
    completion: 88,
    description:
      "Technology, IoT and infrastructure initiatives improving water reliability and sanitation access.",
  },
  {
    name: "Education",
    projects: 4,
    citizens: "52,000+",
    funding: "₹92 L",
    growth: "+24%",
    completion: 82,
    description:
      "Digital learning, offline education and technology access programs supporting students.",
  },
  {
    name: "Smart Cities",
    projects: 3,
    citizens: "2.1 Lakh+",
    funding: "₹1.45 Cr",
    growth: "+35%",
    completion: 76,
    description:
      "AI and technology solutions addressing urban mobility, infrastructure and city management.",
  },
  {
    name: "Healthcare",
    projects: 3,
    citizens: "31,000+",
    funding: "₹68 L",
    growth: "+19%",
    completion: 79,
    description:
      "Industry-supported initiatives expanding access to healthcare and community services.",
  },
  {
    name: "Agriculture",
    projects: 3,
    citizens: "18,500+",
    funding: "₹54 L",
    growth: "+22%",
    completion: 71,
    description:
      "Technology and mentorship programs helping farmers improve productivity and decision-making.",
  },
];

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

const HIGHLIGHTS = [
  {
    title: "Smart Water Grid",
    value: "18,000+",
    label: "Citizens reached",
    detail:
      "IoT-enabled water monitoring is helping improve reliability and identify distribution issues.",
  },
  {
    title: "Traffic Vision AI",
    value: "2.1 Lakh+",
    label: "Commuters impacted",
    detail:
      "AI-based traffic intelligence is being developed to support smarter urban mobility decisions.",
  },
  {
    title: "Rural Ed-Tech",
    value: "50,000+",
    label: "Students targeted",
    detail:
      "Industry support is helping expand access to digital learning resources in underserved regions.",
  },
];

function IndustryImpact() {
  const [period, setPeriod] = useState("2026");
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  const totalProjects = useMemo(
    () => SECTORS.reduce((sum, sector) => sum + sector.projects, 0),
    []
  );

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

      {/* KPI STATS */}
      <div className="impact-kpi-grid">
        <div className="impact-kpi-card">
          <div className="kpi-icon">
            <Users size={22} />
          </div>
          <span>Citizens Impacted</span>
          <strong>3.49 Lakh+</strong>
          <small>
            <TrendingUp size={14} /> +27% from previous period
          </small>
        </div>

        <div className="impact-kpi-card">
          <div className="kpi-icon">
            <FolderIcon />
          </div>
          <span>Projects Supported</span>
          <strong>{totalProjects}</strong>
          <small>
            <ArrowUpRight size={14} /> Across 5 sectors
          </small>
        </div>

        <div className="impact-kpi-card">
          <div className="kpi-icon">
            <IndianRupee size={22} />
          </div>
          <span>Capital Deployed</span>
          <strong>₹4.79 Cr</strong>
          <small>
            <TrendingUp size={14} /> +31% year over year
          </small>
        </div>

        <div className="impact-kpi-card">
          <div className="kpi-icon">
            <Target size={22} />
          </div>
          <span>Impact Score</span>
          <strong>91/100</strong>
          <small>
            <CheckCircle size={14} /> Strong portfolio performance
          </small>
        </div>
      </div>

      {/* PERFORMANCE STRIP */}
      <div className="impact-performance">
        <div className="performance-main">
          <div className="performance-circle">
            <strong>91</strong>
            <span>/100</span>
          </div>

          <div>
            <span className="performance-label">PORTFOLIO IMPACT SCORE</span>
            <h2>Industry contribution is creating measurable outcomes</h2>
            <p>
              Funding, technology and partnerships are being directed toward
              high-impact societal challenges.
            </p>
          </div>
        </div>

        <div className="performance-metrics">
          <div>
            <strong>18</strong>
            <span>Districts reached</span>
          </div>
          <div>
            <strong>15</strong>
            <span>Active partnerships</span>
          </div>
          <div>
            <strong>86%</strong>
            <span>Project success rate</span>
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
          {HIGHLIGHTS.map((item) => (
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
          {SECTORS.map((sector) => (
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
                  <h3>{partner.university}</h3>
                  <span>
                    <MapPin size={13} /> {partner.location}
                  </span>
                </div>
              </div>

              <p>{partner.project}</p>

              <div className="partner-impact-number">
                <span>Citizens impacted</span>
                <strong>{partner.impact}</strong>
              </div>

              <div className="partner-progress">
                <div>
                  <span>Project progress</span>
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

      {/* SUMMARY */}
      <div className="impact-summary">
        <div className="summary-icon">
          <Globe2 size={24} />
        </div>

        <div>
          <span>YOUR PORTFOLIO AT A GLANCE</span>
          <h2>₹4.79 Cr invested → 3.49 Lakh+ people reached</h2>
          <p>
            Continue supporting high-impact projects to expand the reach of
            industry-led societal innovation.
          </p>
        </div>

        <div className="summary-stat">
          <strong>27%</strong>
          <span>Impact growth</span>
        </div>
      </div>

      {/* SECTOR MODAL */}
      {selectedSector && (
        <div
          className="impact-modal-overlay"
          onClick={() => setSelectedSector(null)}
        >
          <div
            className="impact-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedSector(null)}
            >
              <X size={20} />
            </button>

            <span className="modal-eyebrow">SECTOR IMPACT</span>
            <h2>{selectedSector.name}</h2>
            <p>{selectedSector.description}</p>

            <div className="modal-stat-grid">
              <div>
                <strong>{selectedSector.projects}</strong>
                <span>Projects</span>
              </div>
              <div>
                <strong>{selectedSector.citizens}</strong>
                <span>Citizens</span>
              </div>
              <div>
                <strong>{selectedSector.funding}</strong>
                <span>Funding</span>
              </div>
              <div>
                <strong>{selectedSector.completion}%</strong>
                <span>Completion</span>
              </div>
            </div>

            <div className="modal-progress">
              <div>
                <span>Implementation progress</span>
                <strong>{selectedSector.completion}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${selectedSector.completion}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HIGHLIGHT MODAL */}
      {selectedHighlight && (
        <div
          className="impact-modal-overlay"
          onClick={() => setSelectedHighlight(null)}
        >
          <div
            className="impact-modal highlight-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedHighlight(null)}
            >
              <X size={20} />
            </button>

            <div className="modal-highlight-icon">
              <Award size={24} />
            </div>

            <span className="modal-eyebrow">IMPACT HIGHLIGHT</span>
            <h2>{selectedHighlight.title}</h2>

            <div className="modal-big-number">
              <strong>{selectedHighlight.value}</strong>
              <span>{selectedHighlight.label}</span>
            </div>

            <p>{selectedHighlight.detail}</p>

            <button
              className="modal-done"
              onClick={() => setSelectedHighlight(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FolderIcon() {
  return <BarChart3 size={22} />;
}

export default IndustryImpact;