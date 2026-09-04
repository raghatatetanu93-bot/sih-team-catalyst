import { Link } from "react-router-dom";
import {
  FolderKanban,
  CheckCircle,
  Building2,
  BarChart3,
  ArrowUpRight,
  ArrowRight,
  DollarSign,
  HeartHandshake
} from "lucide-react";

import "./IndustryDashboard.css";

function IndustryDashboard() {
  return (
    <div className="industry-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">INDUSTRY PORTAL</p>
          <h1>TechCorp Innovations</h1>
          <p className="subtitle">
            Technology Sector • Empowering communities through digital infrastructure
          </p>
        </div>

        <div className="header-date">
          September 2026
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <HeartHandshake size={20} />
          </div>
          <p>Active Partnerships</p>
          <h2>8</h2>
          <span>With 5 universities</span>
        </div>

        <div className="stat-card success-card">
          <div className="stat-icon">
            <CheckCircle size={20} />
          </div>
          <p>Projects Supported</p>
          <h2>14</h2>
          <span>Impacting 120k+ citizens</span>
        </div>

        <div className="stat-card purple-card">
          <div className="stat-icon">
            <DollarSign size={20} />
          </div>
          <p>Funding Committed</p>
          <h2>₹4.5 Cr</h2>
          <span>For 2026-2027 cycle</span>
        </div>

        <div className="stat-card warning-card">
          <div className="stat-icon">
            <FolderKanban size={20} />
          </div>
          <p>Projects Completed</p>
          <h2>6</h2>
          <span>Successfully scaled</span>
        </div>
      </div>

      {/* Main content */}
      <div className="dashboard-grid">
        {/* Recent Activity */}
        <section className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Recent Activity</h3>
              <p>Updates on your partnerships and supported projects</p>
            </div>
            <Link to="/industry/projects" className="text-button">
              View all <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="activity-item">
            <div className="activity-icon">
              <Building2 size={16} />
            </div>
            <div className="activity-content">
              <h4>New Partnership Initiated</h4>
              <p>Collaboration with BIT Mesra on Smart Water Grid approved.</p>
            </div>
            <span className="time-stamp">2 hours ago</span>
          </div>

          <div className="activity-item">
            <div className="activity-icon">
              <DollarSign size={16} />
            </div>
            <div className="activity-content">
              <h4>Funding Disbursed</h4>
              <p>₹50L released for Phase 1 of Rural Education Tablet Rollout.</p>
            </div>
            <span className="time-stamp">Yesterday</span>
          </div>

          <div className="activity-item">
            <div className="activity-icon">
              <CheckCircle size={16} />
            </div>
            <div className="activity-content">
              <h4>Project Milestone Reached</h4>
              <p>Traffic Vision AI testing completed successfully in Dhanbad.</p>
            </div>
            <span className="time-stamp">3 days ago</span>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Quick Actions</h3>
              <p>Navigate to key areas</p>
            </div>
          </div>

          <div className="quick-actions">
            <Link to="/industry/projects" className="action-btn">
              <span>Explore Projects</span>
              <ArrowRight size={18} />
            </Link>
            
            <Link to="/industry/funding" className="action-btn">
              <span>Funding Opportunities</span>
              <ArrowRight size={18} />
            </Link>

            <Link to="/industry/support" className="action-btn">
              <span>View Partnerships</span>
              <ArrowRight size={18} />
            </Link>
            
            <Link to="/industry/impact" className="action-btn">
              <span>View Impact</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default IndustryDashboard;
