import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  MapPin,
  Brain,
  Activity,
  Users,
  Building2,
  Droplets,
  HeartPulse,
  GraduationCap,
  Trash2,
  ShieldAlert,
  ChevronRight,
  Radio,
  Target,
  Zap,
} from "lucide-react";

import "./GovernmentDashboard.css";

function GovernmentDashboard() {
    const navigate = useNavigate();
  const [chartPeriod, setChartPeriod] = useState("6M");
  const criticalCases = [
    {
      title: "Urban Flooding",
      location: "Ranchi",
      affected: "1,200",
      risk: "CRITICAL",
      type: "flood",
    },
    {
      title: "Water Supply Failure",
      location: "Latehar",
      affected: "840",
      risk: "HIGH",
      type: "water",
    },
    {
      title: "Damaged Bridge",
      location: "West Singhbhum",
      affected: "560",
      risk: "HIGH",
      type: "infrastructure",
    },
  ];

  const categories = [
    {
      name: "Water",
      count: 342,
      percentage: 82,
      icon: Droplets,
    },
    {
      name: "Infrastructure",
      count: 286,
      percentage: 68,
      icon: Building2,
    },
    {
      name: "Healthcare",
      count: 214,
      percentage: 52,
      icon: HeartPulse,
    },
    {
      name: "Waste Management",
      count: 176,
      percentage: 42,
      icon: Trash2,
    },
    {
      name: "Education",
      count: 148,
      percentage: 35,
      icon: GraduationCap,
    },
  ];

  const districts = [
    { name: "Ranchi", value: 86, level: "critical" },
    { name: "Latehar", value: 72, level: "high" },
    { name: "East Singhbhum", value: 68, level: "high" },
    { name: "West Singhbhum", value: 61, level: "high" },
    { name: "Hazaribagh", value: 48, level: "medium" },
    { name: "Bokaro", value: 43, level: "medium" },
    { name: "Dumka", value: 36, level: "medium" },
    { name: "Deoghar", value: 29, level: "low" },
  ];

  const clusters = [
    {
      number: "01",
      title: "Rural Water Reliability",
      reports: "47 related reports",
      locations: "12 locations",
      affected: "8,420",
      risk: "High impact",
    },
    {
      number: "02",
      title: "Urban Flooding",
      reports: "31 related reports",
      locations: "8 locations",
      affected: "5,240",
      risk: "Critical",
    },
    {
      number: "03",
      title: "Rural Healthcare Access",
      reports: "24 related reports",
      locations: "6 locations",
      affected: "3,180",
      risk: "Moderate",
    },
  ];

  const departments = [
    {
      name: "Water & Sanitation",
      value: 78,
      unresolved: 18,
      icon: Droplets,
    },
    {
      name: "Healthcare",
      value: 64,
      unresolved: 27,
      icon: HeartPulse,
    },
    {
      name: "Infrastructure",
      value: 59,
      unresolved: 34,
      icon: Building2,
    },
    {
      name: "Education",
      value: 82,
      unresolved: 11,
      icon: GraduationCap,
    },
  ];

  return (
    <div className="government-dashboard">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="gov-header">
        <div className="gov-header-left">
          <div className="gov-eyebrow">
            <span className="gov-live-dot"></span>
            JHARKHAND SOCIETAL INTELLIGENCE CENTER
          </div>

          <h1>Government Command Center</h1>

          <p>
            Real-time intelligence on citizen problems, critical situations,
            interventions and societal impact.
          </p>

          <div className="gov-header-meta">
            <span>
              <Radio size={15} />
              System operational
            </span>

            <span>
              <Clock size={15} />
              Last synced 4 min ago
            </span>

            <span>
              <MapPin size={15} />
              24 districts monitored
            </span>
          </div>
        </div>

        <div className="gov-header-right">
          <div className="gov-date">
            <span>REPORTING PERIOD</span>
            <strong>September 2026</strong>
          </div>

          <div className="gov-sync">
            <Activity size={17} />
            <span>LIVE</span>
          </div>
        </div>
      </header>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <section className="gov-kpi-grid">

        <div className="gov-kpi-card">
          <div className="kpi-top">
            <div className="kpi-icon blue">
              <FileText size={22} />
            </div>

            <span className="kpi-trend positive">
              <TrendingUp size={14} />
              12.4%
            </span>
          </div>

          <span className="kpi-label">Citizen Reports</span>
          <strong className="kpi-number">1,284</strong>
          <span className="kpi-description">
            Total reports received this period
          </span>
        </div>

        <div className="gov-kpi-card">
          <div className="kpi-top">
            <div className="kpi-icon green">
              <CheckCircle size={22} />
            </div>

            <span className="kpi-trend positive">
              <TrendingUp size={14} />
              8.7%
            </span>
          </div>

          <span className="kpi-label">Validated Reports</span>
          <strong className="kpi-number">842</strong>
          <span className="kpi-description">
            Government verified cases
          </span>

          <div className="kpi-progress">
            <div style={{ width: "65.6%" }}></div>
          </div>

          <small>65.6% of all reports validated</small>
        </div>

        <div className="gov-kpi-card danger">
          <div className="kpi-top">
            <div className="kpi-icon red">
              <AlertTriangle size={22} />
            </div>

            <span className="kpi-trend danger-trend">
              Needs attention
            </span>
          </div>

          <span className="kpi-label">Critical Issues</span>
          <strong className="kpi-number">37</strong>
          <span className="kpi-description">
            Require immediate government review
          </span>
        </div>

        <div className="gov-kpi-card">
          <div className="kpi-top">
            <div className="kpi-icon orange">
              <Clock size={22} />
            </div>

            <span className="kpi-trend negative">
              <TrendingDown size={14} />
              4.2%
            </span>
          </div>

          <span className="kpi-label">Unresolved</span>
          <strong className="kpi-number">126</strong>
          <span className="kpi-description">
            Active cases awaiting resolution
          </span>
        </div>

      </section>

      {/* =====================================================
          CRITICAL SITUATION + AI
      ===================================================== */}

      <section className="command-grid">

        <div className="critical-panel">

          <div className="panel-title-row">
            <div>
              <div className="panel-kicker red-text">
                <span></span>
                IMMEDIATE ATTENTION
              </div>

              <h2>Critical situations</h2>

              <p>
                Cases with the highest potential citizen impact.
              </p>
            </div>

            <button
  className="outline-action"
  onClick={() => navigate("/government/emergency-alerts")}
>
  View all
  <ArrowUpRight size={16} />
</button>
          </div>

          <div className="critical-list">
            {criticalCases.map((item) => (
              <div
  className="critical-case"
  key={item.title}
  onClick={() => navigate("/government/emergency-alerts")}
  role="button"
  tabIndex={0}
>

                <div className={`critical-icon ${item.type}`}>
                  <AlertTriangle size={21} />
                </div>

                <div className="critical-info">
                  <h3>{item.title}</h3>

                  <span>
                    <MapPin size={13} />
                    {item.location}
                  </span>

                  <small>
                    {item.affected} citizens potentially affected
                  </small>
                </div>

                <div className="critical-right">
                  <span
                    className={`risk-badge ${
                      item.risk === "CRITICAL"
                        ? "critical"
                        : "high"
                    }`}
                  >
                    {item.risk}
                  </span>

                  <ChevronRight size={19} />
                </div>

              </div>
            ))}
          </div>

          <button
  className="critical-footer"
  onClick={() => navigate("/government/emergency-alerts")}
>
            <ShieldAlert size={17} />
            Open emergency response center
            <ArrowUpRight size={15} />
          </button>
        </div>

        {/* AI PANEL */}

        <div className="ai-panel">

          <div className="ai-glow"></div>

          <div className="ai-header">
            <div className="ai-icon">
              <Brain size={23} />
            </div>

            <div>
              <span>AI INTELLIGENCE ENGINE</span>
              <h2>Situation Intelligence</h2>
            </div>

            <div className="ai-status">
              <span></span>
              ACTIVE
            </div>
          </div>

          <div className="ai-detection">
            <div className="ai-detection-top">
              <Zap size={17} />
              AI detected 3 emerging clusters
            </div>

            <h3>Water reliability is becoming a systemic issue</h3>

            <p>
              Multiple related reports across Ranchi, Latehar and
              surrounding districts indicate a recurring water
              accessibility pattern.
            </p>

            <div className="ai-metrics">
              <div>
                <strong>47</strong>
                <span>related reports</span>
              </div>

              <div>
                <strong>12</strong>
                <span>locations</span>
              </div>

              <div>
                <strong>8.4K</strong>
                <span>potential impact</span>
              </div>
            </div>

           <button
  className="ai-action"
  onClick={() => navigate("/government/decision-engine")}
>
  View AI analysis
  <ArrowUpRight size={16} />
</button>
          </div>

        </div>

      </section>

      {/* =====================================================
          DISTRICT ACTIVITY + CATEGORIES
      ===================================================== */}

      <section className="intelligence-grid">

        {/* Districts */}

        <div className="district-panel">

          <div className="panel-title-row">
            <div>
              <div className="panel-kicker blue-text">
                DISTRICT MONITORING
              </div>

              <h2>Problem intensity by district</h2>

              <p>
                Current concentration of reported societal problems.
              </p>
            </div>

            <button
  className="text-action"
  onClick={() => navigate("/government/heatmap")}
>
  Open heatmap
  <ArrowUpRight size={15} />
</button>
          </div>

          <div className="district-visual">

            <div className="district-grid">
              {districts.map((district) => (
                <div
                  className={`district-box ${district.level}`}
                  key={district.name}
                >
                  <div className="district-top">
                    <MapPin size={15} />
                    <strong>{district.value}</strong>
                  </div>

                  <span>{district.name}</span>

                  <div className="district-bar">
                    <div
                      style={{
                        width: `${district.value}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="district-legend">
              <span>
                <i className="legend-dot critical"></i>
                Critical
              </span>

              <span>
                <i className="legend-dot high"></i>
                High
              </span>

              <span>
                <i className="legend-dot medium"></i>
                Moderate
              </span>

              <span>
                <i className="legend-dot low"></i>
                Low
              </span>
            </div>

          </div>
        </div>

        {/* Categories */}

        <div className="category-panel">

          <div className="panel-title-row">
            <div>
              <div className="panel-kicker blue-text">
                PROBLEM LANDSCAPE
              </div>

              <h2>Problems by domain</h2>

              <p>Where citizen reports are concentrated.</p>
            </div>
          </div>

          <div className="category-list-new">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <div className="category-row" key={category.name}>

                  <div className="category-icon">
                    <Icon size={18} />
                  </div>

                  <div className="category-main">
                    <div className="category-name">
                      <span>{category.name}</span>
                      <strong>{category.count}</strong>
                    </div>

                    <div className="category-progress">
                      <div
                        style={{
                          width: `${category.percentage}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <span className="category-percentage">
                    {category.percentage}%
                  </span>

                </div>
              );
            })}
          </div>

        </div>

      </section>

      {/* =====================================================
          TRENDS + DEPARTMENT RESPONSE
      ===================================================== */}

      <section className="analytics-grid">

        <div className="trend-panel">

          <div className="panel-title-row">
            <div>
              <div className="panel-kicker blue-text">
                REPORTING TRENDS
              </div>

              <h2>Citizen problems over time</h2>

              <p>Monthly reporting activity across all categories.</p>
            </div>

            <div className="chart-filter">
  <button
    className={chartPeriod === "6M" ? "active" : ""}
    onClick={() => setChartPeriod("6M")}
  >
    6M
  </button>

  <button
    className={chartPeriod === "1Y" ? "active" : ""}
    onClick={() => setChartPeriod("1Y")}
  >
    1Y
  </button>
</div>
          </div>

          <div className="fake-chart">

            <div className="chart-y">
              <span>400</span>
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>

            <div className="chart-area">

              <div className="chart-grid-line one"></div>
              <div className="chart-grid-line two"></div>
              <div className="chart-grid-line three"></div>
              <div className="chart-grid-line four"></div>

              <svg
                className="trend-svg"
                viewBox="0 0 700 240"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="areaGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#2f6df6"
                      stopOpacity="0.22"
                    />
                    <stop
                      offset="100%"
                      stopColor="#2f6df6"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="M0 180 L110 160 L220 170 L330 120 L440 135 L550 80 L700 55 L700 240 L0 240 Z"
                  fill="url(#areaGradient)"
                />

                <path
                  d="M0 180 L110 160 L220 170 L330 120 L440 135 L550 80 L700 55"
                  fill="none"
                  stroke="#2f6df6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle cx="0" cy="180" r="5" fill="#2f6df6" />
                <circle cx="110" cy="160" r="5" fill="#2f6df6" />
                <circle cx="220" cy="170" r="5" fill="#2f6df6" />
                <circle cx="330" cy="120" r="5" fill="#2f6df6" />
                <circle cx="440" cy="135" r="5" fill="#2f6df6" />
                <circle cx="550" cy="80" r="5" fill="#2f6df6" />
                <circle cx="700" cy="55" r="5" fill="#2f6df6" />
              </svg>

              <div className="chart-x">
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
              </div>

            </div>
          </div>

        </div>

        {/* Departments */}

        <div className="department-panel">

          <div className="panel-title-row">
            <div>
              <div className="panel-kicker blue-text">
                RESPONSE CAPACITY
              </div>

              <h2>Department response</h2>

              <p>Current resolution progress.</p>
            </div>
          </div>

          <div className="department-list">

            {departments.map((department) => {
              const Icon = department.icon;

              return (
                <div className="department-row" key={department.name}>

                  <div className="department-icon">
                    <Icon size={18} />
                  </div>

                  <div className="department-main">
                    <div className="department-name">
                      <span>{department.name}</span>
                      <strong>{department.value}%</strong>
                    </div>

                    <div className="department-progress">
                      <div
                        style={{
                          width: `${department.value}%`,
                        }}
                      ></div>
                    </div>

                    <small>
                      {department.unresolved} unresolved cases
                    </small>
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          SYSTEMIC PROBLEMS
      ===================================================== */}

      <section className="clusters-panel">

        <div className="panel-title-row">
          <div>
            <div className="panel-kicker purple-text">
              AI-DERIVED INSIGHTS
            </div>

            <h2>Top systemic problems</h2>

            <p>
              Larger societal issues identified by clustering related
              citizen reports.
            </p>
          </div>

          <button
  className="text-action"
  onClick={() => navigate("/government/problems")}
>
  Explore all clusters
  <ArrowUpRight size={15} />
</button>
        </div>

        <div className="cluster-grid">

          {clusters.map((cluster) => (
            <div
  className="cluster-card"
  key={cluster.number}
  onClick={() => navigate("/government/problems")}
>

              <div className="cluster-card-top">
                <span className="cluster-number">
                  {cluster.number}
                </span>

                <span className="cluster-risk">
                  {cluster.risk}
                </span>
              </div>

              <h3>{cluster.title}</h3>

              <p>
                {cluster.reports} • {cluster.locations}
              </p>

              <div className="cluster-impact">
                <Users size={17} />
                <div>
                  <strong>{cluster.affected}</strong>
                  <span>potentially affected</span>
                </div>
              </div>

              <button
  onClick={(e) => {
    e.stopPropagation();
    navigate("/government/problems");
  }}
>
  View cluster
  <ChevronRight size={16} />
</button>


            </div>
          ))}

        </div>

      </section>

      {/* =====================================================
          BOTTOM IMPACT BAR
      ===================================================== */}

      <section className="impact-command">

        <div className="impact-title">
          <div className="impact-symbol">
            <Target size={23} />
          </div>

          <div>
            <span>GOVERNMENT IMPACT</span>
            <h2>Turning reports into measurable action</h2>
          </div>
        </div>

        <div className="impact-metrics">

          <div>
            <strong>842</strong>
            <span>Problems resolved</span>
          </div>

          <div>
            <strong>18,420</strong>
            <span>Citizens impacted</span>
          </div>

          <div>
            <strong>74</strong>
            <span>Institutions involved</span>
          </div>

          <div>
            <strong>91%</strong>
            <span>Validation accuracy</span>
          </div>

        </div>

      </section>

    </div>
  );
}

export default GovernmentDashboard;