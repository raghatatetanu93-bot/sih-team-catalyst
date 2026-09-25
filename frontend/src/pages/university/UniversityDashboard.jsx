import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FolderKanban,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
  Target,
  Sparkles,
  MapPin,
  Users,
  TrendingUp,
  GraduationCap,
  X,
  ChevronRight,
  Zap,
  Activity,
  Award,
} from "lucide-react";

import "./UniversityDashboard.css";

function UniversityDashboard() {
  const navigate = useNavigate();

  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const recommendedChallenges = [
    {
      id: "CH-1024",
      title: "Rural Water Reliability System",
      location: "West Singhbhum",
      category: "Water & Sanitation",
      match: 96,
      impact: "48,000+",
      deadline: "15 Oct 2026",
      description:
        "Develop a sustainable monitoring and infrastructure solution to improve water reliability across rural communities.",
      skills: "Civil Engineering, IoT, Environmental Engineering",
    },
    {
      id: "CH-1027",
      title: "Smart Flood Monitoring Network",
      location: "Ranchi",
      category: "Disaster Management",
      match: 91,
      impact: "31,500+",
      deadline: "28 Oct 2026",
      description:
        "Build an intelligent flood monitoring and early warning system using environmental and location data.",
      skills: "AI/ML, IoT, Data Analytics",
    },
    {
      id: "CH-1031",
      title: "Waste Route Optimization",
      location: "Jamshedpur",
      category: "Smart Cities",
      match: 87,
      impact: "18,000+",
      deadline: "05 Nov 2026",
      description:
        "Optimize municipal waste collection routes using data-driven planning and operational analytics.",
      skills: "Data Science, Optimization, Urban Planning",
    },
  ];

  const activities = [
    {
      icon: FolderKanban,
      title: "Smart Water Grid Pilot",
      description: "Milestone 2 completed: Sensor deployment in Ranchi",
      status: "IN PROGRESS",
      type: "in-progress",
    },
    {
      icon: CheckCircle,
      title: "Rural Education Tablet Rollout",
      description: "Project officially marked as completed",
      status: "COMPLETED",
      type: "completed",
    },
    {
      icon: AlertTriangle,
      title: "New Challenge Applied",
      description: "Traffic Management System for Dhanbad",
      status: "NEW",
      type: "new",
    },
    {
      icon: Activity,
      title: "Impact Report Updated",
      description: "Your university reached 12,400 beneficiaries",
      status: "IMPACT",
      type: "impact",
    },
  ];

  const projectProgress = [
    {
      name: "Smart Water Grid Pilot",
      progress: 74,
      status: "In Progress",
      deadline: "Dec 2026",
    },
    {
      name: "Rural Education Tablet Rollout",
      progress: 100,
      status: "Completed",
      deadline: "Completed",
    },
    {
      name: "Community Health Access",
      progress: 46,
      status: "In Progress",
      deadline: "Jan 2027",
    },
  ];

  const stats = useMemo(
    () => [
      {
        label: "Active Projects",
        value: "12",
        description: "Currently in progress",
        icon: FolderKanban,
        type: "purple",
      },
      {
        label: "Completed Solutions",
        value: "24",
        description: "Successfully implemented",
        icon: CheckCircle,
        type: "green",
      },
      {
        label: "Available Challenges",
        value: "86",
        description: "Government verified",
        icon: Target,
        type: "blue",
      },
      {
        label: "Pending Applications",
        value: "5",
        description: "Awaiting approval",
        icon: Clock,
        type: "orange",
      },
    ],
    []
  );

  return (
    <div className="university-dashboard">
      {/* HEADER */}
      <div className="university-header">
        <div>
          <p className="university-eyebrow">UNIVERSITY PORTAL</p>

          <h1>University Dashboard</h1>

          <p className="university-subtitle">
            Track active projects, discover new challenges, and measure your
            university's social impact.
          </p>
        </div>

        <div className="university-header-right">
          <div className="university-date">
            <span>REPORTING PERIOD</span>
            <strong>September 2026</strong>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="university-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="university-stat-card" key={stat.label}>
              <div className={`university-stat-icon ${stat.type}`}>
                <Icon size={23} />
              </div>

              <div className="university-stat-content">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.description}</small>
              </div>
            </div>
          );
        })}
      </div>

      {/* PERFORMANCE STRIP */}
      <div className="university-performance">
        <div className="performance-left">
          <div className="performance-icon">
            <Award size={23} />
          </div>

          <div>
            <span>UNIVERSITY IMPACT SCORE</span>
            <strong>87 / 100</strong>
          </div>
        </div>

        <div className="performance-metrics">
          <div>
            <strong>31</strong>
            <span>Projects</span>
          </div>

          <div>
            <strong>12.4K+</strong>
            <span>Beneficiaries</span>
          </div>

          <div>
            <strong>18</strong>
            <span>Districts</span>
          </div>

          <div>
            <strong>94%</strong>
            <span>Success Rate</span>
          </div>
        </div>

        <Link to="/university/impact" className="performance-link">
          View Impact
          <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* MAIN GRID */}
      <div className="university-main-grid">
        {/* RECENT ACTIVITY */}
        <section className="university-card activity-card">
          <div className="university-card-header">
            <div>
              <p className="card-eyebrow">LATEST UPDATES</p>
              <h2>Recent Activity</h2>
              <p>Latest updates on your projects and applications.</p>
            </div>

            <Link to="/university/projects" className="university-text-button">
              View all
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="university-activity-list">
            {activities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div className="university-activity-item" key={index}>
                  <div className={`activity-icon ${activity.type}`}>
                    <Icon size={17} />
                  </div>

                  <div className="activity-content">
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                  </div>

                  <span className={`activity-status ${activity.type}`}>
                    {activity.status}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="university-card quick-card">
          <div className="university-card-header">
            <div>
              <p className="card-eyebrow">WORKSPACE</p>
              <h2>Quick Actions</h2>
              <p>Access important university workflows.</p>
            </div>
          </div>

          <div className="university-quick-actions">
            <Link
              to="/university/challenges"
              className="university-action-button primary"
            >
              <div>
                <Target size={19} />
                <span>Explore Challenges</span>
              </div>
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/university/projects"
              className="university-action-button"
            >
              <div>
                <FolderKanban size={19} />
                <span>View My Projects</span>
              </div>
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/university/impact"
              className="university-action-button"
            >
              <div>
                <TrendingUp size={19} />
                <span>View Impact Metrics</span>
              </div>
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="quick-ai-tip">
            <Sparkles size={17} />

            <div>
              <strong>AI Opportunity Match</strong>
              <p>
                3 new challenges have a match score above 85%.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* LOWER GRID */}
      <div className="university-lower-grid">
        {/* PROJECT PROGRESS */}
        <section className="university-card">
          <div className="university-card-header">
            <div>
              <p className="card-eyebrow">PROJECT PORTFOLIO</p>
              <h2>Project Progress</h2>
              <p>Monitor your university's active innovation projects.</p>
            </div>

            <Link
              to="/university/projects"
              className="university-text-button"
            >
              Manage
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="project-progress-list">
            {projectProgress.map((project) => (
              <div className="project-progress-item" key={project.name}>
                <div className="project-progress-top">
                  <div>
                    <h3>{project.name}</h3>
                    <span>{project.status}</span>
                  </div>

                  <strong>{project.progress}%</strong>
                </div>

                <div className="project-progress-bar">
                  <div style={{ width: `${project.progress}%` }} />
                </div>

                <div className="project-progress-bottom">
                  <span>
                    <Clock size={13} />
                    {project.deadline}
                  </span>

                  {project.progress === 100 && (
                    <span className="completed-label">
                      <CheckCircle size={13} />
                      Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RECOMMENDED CHALLENGES */}
        <section className="university-card challenges-card">
          <div className="university-card-header">
            <div>
              <p className="card-eyebrow">AI MATCHING</p>
              <h2>Recommended Challenges</h2>
              <p>Problems matched to your university's capabilities.</p>
            </div>

            <Link
              to="/university/challenges"
              className="university-text-button"
            >
              Explore
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="recommended-list">
            {recommendedChallenges.map((challenge) => (
              <button
                className="recommended-challenge"
                key={challenge.id}
                onClick={() => setSelectedChallenge(challenge)}
              >
                <div className="challenge-match">
                  <Sparkles size={15} />
                  <strong>{challenge.match}%</strong>
                  <span>match</span>
                </div>

                <div className="challenge-info">
                  <h3>{challenge.title}</h3>

                  <span>
                    <MapPin size={13} />
                    {challenge.location}
                  </span>

                  <small>{challenge.category}</small>
                </div>

                <ChevronRight size={17} />
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* IMPACT SNAPSHOT */}
      <section className="university-impact-banner">
        <div className="impact-banner-left">
          <div className="impact-banner-icon">
            <Users size={25} />
          </div>

          <div>
            <p>YOUR UNIVERSITY'S SOCIAL IMPACT</p>
            <h2>12,400+ people reached through innovation projects</h2>
          </div>
        </div>

        <div className="impact-banner-stats">
          <div>
            <strong>24</strong>
            <span>Solutions</span>
          </div>

          <div>
            <strong>18</strong>
            <span>Districts</span>
          </div>

          <div>
            <strong>87%</strong>
            <span>Impact Score</span>
          </div>
        </div>

        <Link to="/university/impact" className="impact-banner-button">
          Explore Impact
          <ArrowUpRight size={16} />
        </Link>
      </section>

      {/* CHALLENGE MODAL */}
      {selectedChallenge && (
        <div
          className="university-modal-overlay"
          onClick={() => setSelectedChallenge(null)}
        >
          <div
            className="university-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="university-modal-close"
              onClick={() => setSelectedChallenge(null)}
            >
              <X size={19} />
            </button>

            <div className="modal-match">
              <Sparkles size={16} />
              {selectedChallenge.match}% AI Match
            </div>

            <p className="modal-eyebrow">GOVERNMENT VERIFIED CHALLENGE</p>

            <h2>{selectedChallenge.title}</h2>

            <div className="modal-location">
              <MapPin size={15} />
              {selectedChallenge.location}
              <span>•</span>
              {selectedChallenge.category}
            </div>

            <p className="modal-description">
              {selectedChallenge.description}
            </p>

            <div className="modal-stats">
              <div>
                <Users size={17} />
                <span>Potential Impact</span>
                <strong>{selectedChallenge.impact}</strong>
              </div>

              <div>
                <Clock size={17} />
                <span>Application Deadline</span>
                <strong>{selectedChallenge.deadline}</strong>
              </div>

              <div>
                <Zap size={17} />
                <span>Recommended Skills</span>
                <strong>{selectedChallenge.skills}</strong>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="modal-secondary-button"
                onClick={() => setSelectedChallenge(null)}
              >
                Close
              </button>

              <button
                className="modal-primary-button"
                onClick={() => navigate("/university/challenges")}
              >
                Explore Challenge
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UniversityDashboard;