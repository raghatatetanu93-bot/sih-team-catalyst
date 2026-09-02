import "./Impact.css";
import {
  TrendingUp,
  Users,
  MapPin,
  Lightbulb,
  ArrowUpRight,
  Building2,
} from "lucide-react";

function Impact() {
  const impactAreas = [
    {
      title: "Rural Development",
      description:
        "Improving essential infrastructure and quality of life in rural communities.",
      projects: 12,
      beneficiaries: "48,000+",
      growth: "+18%",
    },
    {
      title: "Water & Sanitation",
      description:
        "Creating sustainable solutions for clean water and waste management.",
      projects: 9,
      beneficiaries: "32,500+",
      growth: "+24%",
    },
    {
      title: "Healthcare Access",
      description:
        "Improving healthcare availability in underserved regions.",
      projects: 7,
      beneficiaries: "21,000+",
      growth: "+15%",
    },
    {
      title: "Smart Cities",
      description:
        "Using technology and innovation to improve urban living.",
      projects: 8,
      beneficiaries: "65,000+",
      growth: "+31%",
    },
  ];

  return (
    <div className="impact-page">
      <div className="impact-header">
        <div>
          <p className="eyebrow">SOCIAL IMPACT</p>

          <h1>Impact & Outcomes</h1>

          <p>
            Measure how innovation projects are creating meaningful change
            across Jharkhand.
          </p>
        </div>

        <button className="impact-report-button">
          View Full Report
          <ArrowUpRight size={17} />
        </button>
      </div>

      {/* MAIN IMPACT STATS */}

      <div className="impact-stats">
        <div className="impact-stat-card">
          <div className="impact-icon purple">
            <Users size={24} />
          </div>

          <div>
            <span>People Impacted</span>
            <strong>1,66,500+</strong>
            <small>Across Jharkhand</small>
          </div>
        </div>

        <div className="impact-stat-card">
          <div className="impact-icon blue">
            <Lightbulb size={24} />
          </div>

          <div>
            <span>Active Innovations</span>
            <strong>42</strong>
            <small>Government-supported projects</small>
          </div>
        </div>

        <div className="impact-stat-card">
          <div className="impact-icon green">
            <MapPin size={24} />
          </div>

          <div>
            <span>Districts Reached</span>
            <strong>18</strong>
            <small>Out of 24 districts</small>
          </div>
        </div>

        <div className="impact-stat-card">
          <div className="impact-icon orange">
            <TrendingUp size={24} />
          </div>

          <div>
            <span>Impact Growth</span>
            <strong>27%</strong>
            <small>Compared to last quarter</small>
          </div>
        </div>
      </div>

      {/* OVERVIEW SECTION */}

      <div className="impact-overview-grid">
        <div className="impact-summary-card">
          <div className="section-heading">
            <div>
              <h2>Impact Overview</h2>
              <p>Progress of societal innovation initiatives</p>
            </div>

            <span className="impact-period">2026</span>
          </div>

          <div className="impact-metrics">
            <div className="metric-row">
              <div className="metric-info">
                <span>Projects Successfully Implemented</span>
                <strong>31 / 42</strong>
              </div>

              <div className="metric-bar">
                <div
                  className="metric-fill implemented"
                  style={{ width: "74%" }}
                ></div>
              </div>
            </div>

            <div className="metric-row">
              <div className="metric-info">
                <span>District Coverage</span>
                <strong>18 / 24</strong>
              </div>

              <div className="metric-bar">
                <div
                  className="metric-fill coverage"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            <div className="metric-row">
              <div className="metric-info">
                <span>University Participation</span>
                <strong>26 Institutions</strong>
              </div>

              <div className="metric-bar">
                <div
                  className="metric-fill university"
                  style={{ width: "82%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="impact-highlight-card">
          <div className="highlight-icon">
            <TrendingUp size={25} />
          </div>

          <p className="highlight-label">THIS QUARTER</p>

          <h2>27% increase in societal impact</h2>

          <p>
            Innovation projects are reaching more communities and solving
            challenges faster than the previous quarter.
          </p>

          <div className="highlight-bottom">
            <span>+35,000</span>
            <small>new beneficiaries reached</small>
          </div>
        </div>
      </div>

      {/* IMPACT AREAS */}

      <div className="impact-areas-section">
        <div className="section-heading">
          <div>
            <h2>Impact by Sector</h2>
            <p>How innovation is contributing across different societal areas</p>
          </div>
        </div>

        <div className="impact-area-grid">
          {impactAreas.map((area) => (
            <div className="impact-area-card" key={area.title}>
              <div className="impact-area-top">
                <div className="sector-icon">
                  <Building2 size={20} />
                </div>

                <span>{area.growth}</span>
              </div>

              <h3>{area.title}</h3>

              <p>{area.description}</p>

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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Impact;