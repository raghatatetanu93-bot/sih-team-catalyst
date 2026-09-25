import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  CheckCircle,
  Building2,
  ArrowUpRight,
  ArrowRight,
  DollarSign,
  HeartHandshake,
  TrendingUp,
  Users,
  Target,
  X,
  MapPin,
  CalendarDays
} from "lucide-react";

import "./IndustryDashboard.css";

const ACTIVITY = [
  {
    icon: Building2,
    title: "New Partnership Initiated",
    description:
      "Collaboration with BIT Mesra on Smart Water Grid approved.",
    time: "2 hours ago"
  },
  {
    icon: DollarSign,
    title: "Funding Disbursed",
    description:
      "₹50L released for Phase 1 of Rural Education Tablet Rollout.",
    time: "Yesterday"
  },
  {
    icon: CheckCircle,
    title: "Project Milestone Reached",
    description:
      "Traffic Vision AI testing completed successfully in Dhanbad.",
    time: "3 days ago"
  },
  {
    icon: Target,
    title: "Impact Target Achieved",
    description:
      "Smart infrastructure initiative crossed its 10,000 beneficiary target.",
    time: "5 days ago"
  }
];

const PARTNERSHIPS = [
  {
    university: "BIT Mesra",
    project: "Smart Water Grid",
    location: "Ranchi",
    progress: 72
  },
  {
    university: "IIT (ISM) Dhanbad",
    project: "Traffic Vision AI",
    location: "Dhanbad",
    progress: 58
  },
  {
    university: "NIT Jamshedpur",
    project: "Waste Optimization",
    location: "Jamshedpur",
    progress: 41
  }
];

function IndustryDashboard() {
  const [showFunding, setShowFunding] = useState(false);
  const [showPartnerships, setShowPartnerships] = useState(false);

  return (
    <div className="industry-dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">INDUSTRY PORTAL</p>

          <h1>TechCorp Innovations</h1>

          <p className="subtitle">
            Technology Sector • Empowering communities through digital
            infrastructure
          </p>
        </div>

        <div className="header-date">
          <CalendarDays size={15} />
          <span>September 2026</span>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="stats-grid">

        <div className="stat-card partnership-stat">
          <div className="stat-top">
            <div className="stat-icon">
              <HeartHandshake size={21} />
            </div>

            <span className="stat-trend">
              <TrendingUp size={13} />
              +14%
            </span>
          </div>

          <p>Active Partnerships</p>
          <h2>8</h2>
          <span>With 5 universities</span>
        </div>

        <div className="stat-card success-card">
          <div className="stat-top">
            <div className="stat-icon">
              <CheckCircle size={21} />
            </div>

            <span className="stat-trend positive">
              <TrendingUp size={13} />
              +22%
            </span>
          </div>

          <p>Projects Supported</p>
          <h2>14</h2>
          <span>Impacting 120k+ citizens</span>
        </div>

        <div className="stat-card purple-card">
          <div className="stat-top">
            <div className="stat-icon">
              <DollarSign size={21} />
            </div>

            <span className="stat-trend">
              FY 26-27
            </span>
          </div>

          <p>Funding Committed</p>
          <h2>₹4.5 Cr</h2>
          <span>For 2026–2027 cycle</span>
        </div>

        <div className="stat-card warning-card">
          <div className="stat-top">
            <div className="stat-icon">
              <FolderKanban size={21} />
            </div>

            <span className="stat-trend positive">
              6 scaled
            </span>
          </div>

          <p>Projects Completed</p>
          <h2>6</h2>
          <span>Successfully scaled</span>
        </div>

      </div>

      {/* PERFORMANCE STRIP */}
      <div className="industry-performance">

        <div className="performance-intro">
          <span>PORTFOLIO PERFORMANCE</span>
          <strong>Strong community impact</strong>
        </div>

        <div className="performance-item">
          <div className="performance-icon">
            <Users size={18} />
          </div>

          <div>
            <strong>120K+</strong>
            <span>Citizens Reached</span>
          </div>
        </div>

        <div className="performance-item">
          <div className="performance-icon">
            <Building2 size={18} />
          </div>

          <div>
            <strong>5</strong>
            <span>University Partners</span>
          </div>
        </div>

        <div className="performance-item">
          <div className="performance-icon">
            <Target size={18} />
          </div>

          <div>
            <strong>86%</strong>
            <span>Portfolio Success</span>
          </div>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="dashboard-grid">

        {/* RECENT ACTIVITY */}
        <section className="dashboard-card activity-card">

          <div className="card-header">
            <div>
              <span className="card-eyebrow">LATEST UPDATES</span>
              <h3>Recent Activity</h3>
              <p>
                Updates on your partnerships and supported projects
              </p>
            </div>

            <Link
              to="/industry/projects"
              className="text-button"
            >
              View projects
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="activity-list">

            {ACTIVITY.map((item, index) => {
              const Icon = item.icon;

              return (
                <div className="activity-item" key={index}>

                  <div className="activity-icon">
                    <Icon size={17} />
                  </div>

                  <div className="activity-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>

                  <span className="time-stamp">
                    {item.time}
                  </span>

                </div>
              );
            })}

          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="dashboard-card">

          <div className="card-header">
            <div>
              <span className="card-eyebrow">WORKSPACE</span>
              <h3>Quick Actions</h3>
              <p>Access key areas of your portfolio</p>
            </div>
          </div>

          <div className="quick-actions">

            <Link
              to="/industry/projects"
              className="action-btn"
            >
              <div className="action-left">
                <FolderKanban size={18} />
                <span>Explore Projects</span>
              </div>

              <ArrowRight size={17} />
            </Link>

            <button
              className="action-btn"
              onClick={() => setShowFunding(true)}
            >
              <div className="action-left">
                <DollarSign size={18} />
                <span>Funding Opportunities</span>
              </div>

              <ArrowRight size={17} />
            </button>

            <button
              className="action-btn"
              onClick={() => setShowPartnerships(true)}
            >
              <div className="action-left">
                <HeartHandshake size={18} />
                <span>View Partnerships</span>
              </div>

              <ArrowRight size={17} />
            </button>

            <Link
              to="/industry/impact"
              className="action-btn"
            >
              <div className="action-left">
                <TrendingUp size={18} />
                <span>View Impact</span>
              </div>

              <ArrowRight size={17} />
            </Link>

          </div>

        </section>

      </div>

      {/* ACTIVE PARTNERSHIPS */}
      <section className="dashboard-card partnerships-card">

        <div className="card-header">
          <div>
            <span className="card-eyebrow">PARTNER NETWORK</span>
            <h3>Active University Partnerships</h3>
            <p>
              Track progress across your current collaboration portfolio.
            </p>
          </div>

          <button
            className="outline-button"
            onClick={() => setShowPartnerships(true)}
          >
            View all
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="partnership-grid">

          {PARTNERSHIPS.map((partner) => (
            <div
              className="partnership-item"
              key={partner.university}
            >

              <div className="partnership-top">
                <div className="university-avatar">
                  {partner.university
                    .split(" ")
                    .slice(0, 2)
                    .map(word => word[0])
                    .join("")}
                </div>

                <span className="active-label">
                  ACTIVE
                </span>
              </div>

              <h4>{partner.university}</h4>

              <p>{partner.project}</p>

              <div className="partnership-location">
                <MapPin size={13} />
                {partner.location}
              </div>

              <div className="partnership-progress">

                <div className="progress-label">
                  <span>Project Progress</span>
                  <strong>{partner.progress}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    style={{ width: `${partner.progress}%` }}
                  />
                </div>

              </div>

            </div>
          ))}

        </div>
      </section>

      {/* FUNDING MODAL */}
      {showFunding && (
        <div
          className="industry-modal-overlay"
          onClick={() => setShowFunding(false)}
        >
          <div
            className="industry-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setShowFunding(false)}
            >
              <X size={18} />
            </button>

            <span className="modal-eyebrow">
              FUNDING PORTFOLIO
            </span>

            <h2>Funding Opportunities</h2>

            <p>
              Current funding allocation available across your
              social-impact portfolio.
            </p>

            <div className="funding-highlight">
              <span>Total Committed</span>
              <strong>₹4.5 Cr</strong>
            </div>

            <div className="funding-row">
              <span>Education initiatives</span>
              <strong>₹1.4 Cr</strong>
            </div>

            <div className="funding-row">
              <span>Water & infrastructure</span>
              <strong>₹1.8 Cr</strong>
            </div>

            <div className="funding-row">
              <span>Technology & AI</span>
              <strong>₹1.3 Cr</strong>
            </div>

          </div>
        </div>
      )}

      {/* PARTNERSHIP MODAL */}
      {showPartnerships && (
        <div
          className="industry-modal-overlay"
          onClick={() => setShowPartnerships(false)}
        >
          <div
            className="industry-modal partnership-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setShowPartnerships(false)}
            >
              <X size={18} />
            </button>

            <span className="modal-eyebrow">
              PARTNER NETWORK
            </span>

            <h2>University Partnerships</h2>

            <p>
              Your current institutional collaboration network.
            </p>

            <div className="modal-partner-list">

              {PARTNERSHIPS.map((partner) => (
                <div
                  className="modal-partner"
                  key={partner.university}
                >
                  <div>
                    <strong>{partner.university}</strong>
                    <span>{partner.project}</span>
                  </div>

                  <strong>{partner.progress}%</strong>
                </div>
              ))}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default IndustryDashboard;