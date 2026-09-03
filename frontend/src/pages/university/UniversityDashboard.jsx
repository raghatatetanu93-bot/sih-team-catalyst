import { Link } from "react-router-dom";
import {
  FolderKanban,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
  Target
} from "lucide-react";

import "./UniversityDashboard.css";

function UniversityDashboard() {
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">UNIVERSITY PORTAL</p>
          <h1>University Dashboard</h1>
          <p className="subtitle">
            Track active projects, discover new challenges, and measure impact.
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
            <FolderKanban size={20} />
          </div>
          <p>Active Projects</p>
          <h2>12</h2>
          <span>Currently in progress</span>
        </div>

        <div className="stat-card success-card">
          <div className="stat-icon">
            <CheckCircle size={20} />
          </div>
          <p>Completed Solutions</p>
          <h2>24</h2>
          <span>Successfully implemented</span>
        </div>

        <div className="stat-card info-card">
          <div className="stat-icon">
            <Target size={20} />
          </div>
          <p>Available Challenges</p>
          <h2>86</h2>
          <span>Government verified</span>
        </div>

        <div className="stat-card warning-card">
          <div className="stat-icon">
            <Clock size={20} />
          </div>
          <p>Pending Applications</p>
          <h2>5</h2>
          <span>Awaiting approval</span>
        </div>
      </div>

      {/* Main content */}
      <div className="dashboard-grid">
        {/* Recent Activity */}
        <section className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Recent Activity</h3>
              <p>Latest updates on your projects and applications</p>
            </div>
            <Link to="/university/projects" className="text-button">
              View all <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="activity-item">
            <div className="activity-icon">
              <FolderKanban size={16} />
            </div>
            <div className="activity-content">
              <h4>Smart Water Grid Pilot</h4>
              <p>Milestone 2 completed: Sensor deployment in Ranchi</p>
            </div>
            <span className="status-badge in-progress">IN PROGRESS</span>
          </div>

          <div className="activity-item">
            <div className="activity-icon">
              <CheckCircle size={16} />
            </div>
            <div className="activity-content">
              <h4>Rural Education Tablet Rollout</h4>
              <p>Project officially marked as completed</p>
            </div>
            <span className="status-badge completed">COMPLETED</span>
          </div>

          <div className="activity-item">
            <div className="activity-icon">
              <AlertTriangle size={16} />
            </div>
            <div className="activity-content">
              <h4>New Challenge Applied</h4>
              <p>Traffic Management System for Dhanbad</p>
            </div>
            <span className="status-badge new">NEW</span>
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
            <Link to="/university/challenges" className="action-btn">
              <span>Explore Challenges</span>
              <ArrowRight size={18} />
            </Link>
            
            <Link to="/university/projects" className="action-btn">
              <span>View My Projects</span>
              <ArrowRight size={18} />
            </Link>

            <Link to="/university/impact" className="action-btn">
              <span>View Impact Metrics</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UniversityDashboard;
