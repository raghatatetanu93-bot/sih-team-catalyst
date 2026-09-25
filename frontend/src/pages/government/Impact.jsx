import { useMemo, useState } from "react";
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
} from "lucide-react";

import "./Impact.css";

const IMPACT_DATA = {
  2026: {
    people: "1,66,500+",
    innovations: 42,
    districts: 18,
    growth: "27%",
    implemented: "31 / 42",
    implementationRate: 74,
    districtCoverage: 75,
    universities: 26,
    newBeneficiaries: "+35,000",
  },
  2025: {
    people: "1,31,500+",
    innovations: 34,
    districts: 16,
    growth: "21%",
    implemented: "24 / 34",
    implementationRate: 71,
    districtCoverage: 67,
    universities: 21,
    newBeneficiaries: "+27,000",
  },
};

const IMPACT_AREAS = [
  {
    title: "Rural Development",
    description:
      "Improving essential infrastructure and quality of life in rural communities.",
    projects: 12,
    beneficiaries: "48,000+",
    growth: "+18%",
    completion: 82,
    color: "purple",
    icon: Building2,
  },
  {
    title: "Water & Sanitation",
    description:
      "Creating sustainable solutions for clean water and waste management.",
    projects: 9,
    beneficiaries: "32,500+",
    growth: "+24%",
    completion: 76,
    color: "blue",
    icon: Activity,
  },
  {
    title: "Healthcare Access",
    description:
      "Improving healthcare availability in underserved regions.",
    projects: 7,
    beneficiaries: "21,000+",
    growth: "+15%",
    completion: 69,
    color: "green",
    icon: CheckCircle,
  },
  {
    title: "Smart Cities",
    description:
      "Using technology and innovation to improve urban living.",
    projects: 8,
    beneficiaries: "65,000+",
    growth: "+31%",
    completion: 88,
    color: "orange",
    icon: Target,
  },
];

function Impact() {
  const [period, setPeriod] = useState("2026");
  const [selectedArea, setSelectedArea] = useState(null);
  const [showReport, setShowReport] = useState(false);

  const data = IMPACT_DATA[period];

  const totals = useMemo(() => {
    return {
      projects: IMPACT_AREAS.reduce(
        (sum, area) => sum + area.projects,
        0
      ),
      beneficiaries: data.people,
      sectors: IMPACT_AREAS.length,
    };
  }, [data]);

  return (
    <div className="impact-page">

      {/* HEADER */}
      <div className="impact-header">
        <div>
          <p className="eyebrow">UNIVERSITY IMPACT</p>

          <h1>Impact & Outcomes</h1>

          <p>
            Measure how university-led innovation projects are creating
            meaningful change across communities.
          </p>
        </div>

        <button
          className="impact-report-button"
          onClick={() => setShowReport(true)}
        >
          <Download size={17} />
          View Full Report
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="impact-stats">

        <div className="impact-stat-card">
          <div className="impact-icon purple">
            <Users size={24} />
          </div>

          <div>
            <span>People Impacted</span>
            <strong>{data.people}</strong>
            <small>Across project communities</small>
          </div>
        </div>

        <div className="impact-stat-card">
          <div className="impact-icon blue">
            <Lightbulb size={24} />
          </div>

          <div>
            <span>Active Innovations</span>
            <strong>{data.innovations}</strong>
            <small>University-led initiatives</small>
          </div>
        </div>

        <div className="impact-stat-card">
          <div className="impact-icon green">
            <MapPin size={24} />
          </div>

          <div>
            <span>Districts Reached</span>
            <strong>{data.districts}</strong>
            <small>Communities reached</small>
          </div>
        </div>

        <div className="impact-stat-card">
          <div className="impact-icon orange">
            <TrendingUp size={24} />
          </div>

          <div>
            <span>Impact Growth</span>
            <strong>{data.growth}</strong>
            <small>Compared to previous period</small>
          </div>
        </div>

      </div>

      {/* OVERVIEW */}
      <div className="impact-overview-grid">

        <div className="impact-summary-card">

          <div className="section-heading">
            <div>
              <p className="section-eyebrow">PERFORMANCE</p>
              <h2>Impact Overview</h2>
              <p>
                Progress of university innovation initiatives
              </p>
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
                <span>Projects Successfully Implemented</span>
                <strong>{data.implemented}</strong>
              </div>

              <div className="metric-bar">
                <div
                  className="metric-fill implemented"
                  style={{
                    width: `${data.implementationRate}%`,
                  }}
                />
              </div>

              <small className="metric-footnote">
                {data.implementationRate}% implementation rate
              </small>
            </div>

            <div className="metric-row">
              <div className="metric-info">
                <span>District Coverage</span>
                <strong>{data.districts} / 24</strong>
              </div>

              <div className="metric-bar">
                <div
                  className="metric-fill coverage"
                  style={{
                    width: `${data.districtCoverage}%`,
                  }}
                />
              </div>

              <small className="metric-footnote">
                {data.districtCoverage}% district coverage
              </small>
            </div>

            <div className="metric-row">
              <div className="metric-info">
                <span>University Participation</span>
                <strong>{data.universities} Institutions</strong>
              </div>

              <div className="metric-bar">
                <div
                  className="metric-fill university"
                  style={{
                    width: `${Math.min(
                      data.universities * 3.15,
                      100
                    )}%`,
                  }}
                />
              </div>

              <small className="metric-footnote">
                Growing academic participation
              </small>
            </div>

          </div>
        </div>

        {/* HIGHLIGHT */}
        <div className="impact-highlight-card">

          <div className="highlight-icon">
            <TrendingUp size={25} />
          </div>

          <p className="highlight-label">
            {period} IMPACT HIGHLIGHT
          </p>

          <h2>
            {data.growth} growth in societal impact
          </h2>

          <p>
            University innovation projects are reaching more communities
            and converting research into practical solutions.
          </p>

          <div className="highlight-bottom">

            <div>
              <span>{data.newBeneficiaries}</span>
              <small>new beneficiaries reached</small>
            </div>

            <TrendingUp size={22} />
          </div>

        </div>
      </div>

      {/* SECTORS */}
      <div className="impact-areas-section">

        <div className="section-heading">

          <div>
            <p className="section-eyebrow">RESEARCH & INNOVATION</p>

            <h2>Impact by Sector</h2>

            <p>
              How university innovation is contributing across societal areas
            </p>
          </div>

          <span className="sector-total">
            {totals.sectors} sectors
          </span>

        </div>

        <div className="impact-area-grid">

          {IMPACT_AREAS.map((area) => {
            const Icon = area.icon;

            return (
              <div
                className="impact-area-card"
                key={area.title}
                onClick={() => setSelectedArea(area)}
              >

                <div className="impact-area-top">

                  <div className={`sector-icon ${area.color}`}>
                    <Icon size={21} />
                  </div>

                  <span>{area.growth}</span>
                </div>

                <h3>{area.title}</h3>

                <p>{area.description}</p>

                <div className="sector-progress">

                  <div>
                    <span>Completion</span>
                    <strong>{area.completion}%</strong>
                  </div>

                  <div className="sector-progress-bar">
                    <div
                      style={{
                        width: `${area.completion}%`,
                      }}
                    />
                  </div>

                </div>

                <div className="impact-area-data">

                  <div>
                    <span>Projects</span>
                    <strong>{area.projects}</strong>
                  </div>

                  <div>
                    <span>Beneficiaries</span>
                    <strong>{area.beneficiaries}</strong>
                  </div>

                </div>

                <button className="sector-view-button">
                  View sector impact
                  <ArrowUpRight size={14} />
                </button>

              </div>
            );
          })}

        </div>
      </div>

      {/* SUMMARY */}
      <div className="impact-summary-strip">

        <div>
          <Target size={20} />

          <div>
            <strong>{data.implemented.split(" / ")[0]}</strong>
            <span>Projects implemented</span>
          </div>
        </div>

        <div>
          <Users size={20} />

          <div>
            <strong>{totals.beneficiaries}</strong>
            <span>Total beneficiaries</span>
          </div>
        </div>

        <div>
          <GraduationCap size={20} />

          <div>
            <strong>{data.universities}</strong>
            <span>University partners</span>
          </div>
        </div>

        <div>
          <MapPin size={20} />

          <div>
            <strong>{data.districts}</strong>
            <span>Districts reached</span>
          </div>
        </div>

      </div>

      {/* EXTRA INSIGHT */}
      <div className="impact-insight-banner">

        <div className="insight-icon">
          <BarChart3 size={23} />
        </div>

        <div>
          <span>UNIVERSITY PERFORMANCE INSIGHT</span>

          <h3>
            Smart Cities currently shows the highest sector completion
            at 88%.
          </h3>

          <p>
            Water & Sanitation follows at 76%, while Healthcare Access
            represents an important area for continued research and
            implementation.
          </p>
        </div>

        <div className="insight-score">
          <Award size={20} />
          <strong>88%</strong>
          <span>Top completion</span>
        </div>

      </div>

      {/* SECTOR MODAL */}
      {selectedArea && (() => {
        const SelectedIcon = selectedArea.icon;

        return (
          <div
            className="impact-modal-overlay"
            onClick={() => setSelectedArea(null)}
          >
            <div
              className="impact-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                className="impact-modal-close"
                onClick={() => setSelectedArea(null)}
              >
                <X size={18} />
              </button>

              <div
                className={`impact-modal-icon ${selectedArea.color}`}
              >
                <SelectedIcon size={27} />
              </div>

              <span className="modal-eyebrow">
                SECTOR IMPACT
              </span>

              <h2>{selectedArea.title}</h2>

              <p className="impact-modal-description">
                {selectedArea.description}
              </p>

              <div className="impact-modal-stats">

                <div>
                  <strong>{selectedArea.projects}</strong>
                  <span>Projects</span>
                </div>

                <div>
                  <strong>{selectedArea.beneficiaries}</strong>
                  <span>Beneficiaries</span>
                </div>

                <div>
                  <strong>{selectedArea.growth}</strong>
                  <span>Growth</span>
                </div>

              </div>

              <div className="impact-modal-progress">

                <div>
                  <span>Project completion</span>
                  <strong>
                    {selectedArea.completion}%
                  </strong>
                </div>

                <div className="sector-progress-bar large">
                  <div
                    style={{
                      width: `${selectedArea.completion}%`,
                    }}
                  />
                </div>

              </div>

              <button
                className="impact-modal-button"
                onClick={() => setSelectedArea(null)}
              >
                Close
              </button>

            </div>
          </div>
        );
      })()}

      {/* REPORT MODAL */}
      {showReport && (
        <div
          className="impact-modal-overlay"
          onClick={() => setShowReport(false)}
        >
          <div
            className="report-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="impact-modal-close"
              onClick={() => setShowReport(false)}
            >
              <X size={18} />
            </button>

            <div className="report-icon">
              <Download size={25} />
            </div>

            <span className="modal-eyebrow">
              IMPACT REPORT
            </span>

            <h2>
              University Social Impact Report
            </h2>

            <p>
              The {period} report consolidates project outcomes,
              beneficiary reach, district coverage, sector performance
              and university participation.
            </p>

            <div className="report-items">

              <div>
                <CheckCircle size={17} />
                <span>
                  {data.implemented} projects implemented
                </span>
              </div>

              <div>
                <CheckCircle size={17} />
                <span>
                  {data.people} people impacted
                </span>
              </div>

              <div>
                <CheckCircle size={17} />
                <span>
                  {data.districts} districts reached
                </span>
              </div>

              <div>
                <CheckCircle size={17} />
                <span>
                  {data.universities} university partners
                </span>
              </div>

            </div>

            <button
              className="impact-modal-button"
              onClick={() => setShowReport(false)}
            >
              Continue
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Impact;