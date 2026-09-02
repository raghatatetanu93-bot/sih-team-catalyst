import { useNavigate } from "react-router-dom";
import "./CitizenDashboard.css";

import {
  Bell,
  Plus,
  FileText,
  Users,
  AlertTriangle,
  ArrowRight,
  Droplets,
  Trash2,
  Construction,
  MapPin,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

function CitizenDashboard() {
  const navigate = useNavigate();
  const quickActions = [
    {
      title: "Report Issue",
      description: "Tell us what's wrong in your community",
      icon: Plus,
      type: "report",
    },
    {
      title: "My Reports",
      description: "Track your submissions",
      icon: FileText,
      type: "reports",
    },
    {
      title: "Community",
      description: "Explore local issues",
      icon: Users,
      type: "community",
    },
    {
      title: "Emergency",
      description: "Report urgent problems",
      icon: AlertTriangle,
      type: "emergency",
    },
  ];

  const issues = [
    {
      title: "Water shortage affecting rural villages",
      location: "Ranchi District",
      reports: 184,
      icon: Droplets,
      category: "Water",
      type: "water",
    },
    {
      title: "Irregular waste collection in residential areas",
      location: "Dhanbad",
      reports: 126,
      icon: Trash2,
      category: "Sanitation",
      type: "sanitation",
    },
    {
      title: "Damaged roads causing daily travel problems",
      location: "Kanke, Ranchi",
      reports: 96,
      icon: Construction,
      category: "Infrastructure",
      type: "infrastructure",
    },
  ];

  return (
    <div className="citizen-dashboard">

      {/* TOP SECTION */}

      <header className="citizen-header">

        <div>
          <h1>
            Hello, Tanushree <span>👋</span>
          </h1>

          <p>
            What's happening in your community today?
          </p>
        </div>

        <div className="citizen-header-right">

          <button className="notification-button">
            <Bell size={21} />
            <span className="notification-dot"></span>
          </button>

          <div className="citizen-profile">

            <div className="profile-avatar">
              T
            </div>

            <span>Tanushree</span>

            <span className="profile-arrow">⌄</span>

          </div>

        </div>

      </header>


      {/* QUICK ACTIONS */}

      <section className="quick-section">

        <div className="quick-actions">

          {quickActions.map((action) => {

            const Icon = action.icon;

            return (

            <button
  className={`quick-action ${action.type}`}
  key={action.title}
  onClick={() => {
    if (action.type === "report") {
      navigate("/citizen/report-issue");
    }
  }}
>

                <div className="quick-icon">
                  <Icon size={25} />
                </div>

                <div className="quick-text">

                  <strong>
                    {action.title}
                  </strong>

                  <span>
                    {action.description}
                  </span>

                </div>

                <div className="quick-arrow">
                  <ArrowRight size={20} />
                </div>

              </button>

            );

          })}

        </div>

      </section>


      {/* COMMUNITY PULSE */}

      <section className="pulse-section">

        <div className="section-title-row">

          <div>

            <span className="section-label">
              COMMUNITY PULSE
            </span>

            <h2>
              Trending near you 🔥
            </h2>

            <p>
              Issues receiving attention from your community.
            </p>

          </div>


          <button className="explore-button">

            Explore all

            <ArrowRight size={19} />

          </button>

        </div>


        {/* ISSUE CARDS */}

        <div className="issue-grid">

          {issues.map((issue) => {

            const Icon = issue.icon;

            return (

              <article
                className={`issue-card ${issue.type}`}
                key={issue.title}
              >

                <div className="issue-card-top">

                  <div className="issue-icon">

                    <Icon size={24} />

                  </div>


                  <span className="category-badge">

                    {issue.category}

                  </span>

                </div>


                <h3>
                  {issue.title}
                </h3>


                <div className="issue-location">

                  <MapPin size={17} />

                  <span>
                    {issue.location}
                  </span>

                </div>


                <div className="issue-divider"></div>


                <div className="issue-bottom">

                  <div className="report-count">

                    <strong>
                      {issue.reports}
                    </strong>

                    <span>
                      citizen reports
                    </span>

                  </div>


                  <button className="issue-arrow">

                    <ArrowRight size={21} />

                  </button>

                </div>

              </article>

            );

          })}

        </div>

      </section>


      {/* CONTRIBUTION SECTION */}

      <section className="citizen-impact">

        <div className="impact-illustration">

          <div className="sun"></div>

          <div className="plant plant-one"></div>
          <div className="plant plant-two"></div>

          <div className="people-illustration">
            👩‍🤝‍👩
          </div>

        </div>


        <div className="impact-content">

          <span className="impact-label">
            YOUR CONTRIBUTION
          </span>

          <h2>
            Small reports.
            <br />
            Real change.
          </h2>

          <p>
            Every problem you report helps authorities understand
            what communities truly need.
          </p>

        </div>


        <div className="impact-stats">


          <div className="impact-stat">

            <div className="impact-stat-icon">

              <ClipboardList size={25} />

            </div>

            <strong>8</strong>

            <span>
              Problems
              <br />
              Reported
            </span>

          </div>


          <div className="impact-stat">

            <div className="impact-stat-icon">

              <CheckCircle2 size={25} />

            </div>

            <strong>4</strong>

            <span>
              Problems
              <br />
              Resolved
            </span>

          </div>


          <div className="impact-stat">

            <div className="impact-stat-icon purple">

              <Users size={25} />

            </div>

            <strong className="purple-text">
              326
            </strong>

            <span>
              Citizens Potentially
              <br />
              Helped
            </span>

          </div>


        </div>

      </section>

    </div>
  );
}

export default CitizenDashboard;