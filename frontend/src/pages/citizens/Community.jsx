import { useNavigate } from "react-router-dom";
import "./Community.css";
import {
  Users,
  MapPin,
  Droplets,
  Trash2,
  Construction,
  Heart,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

function Community() {
  const navigate = useNavigate();

  const communityIssues = [
    {
      title: "Water shortage affecting rural villages",
      category: "Water",
      location: "Ranchi District",
      reports: 184,
      supporters: 92,
      comments: 24,
      icon: Droplets,
      color: "water",
    },
    {
      title: "Irregular waste collection in residential areas",
      category: "Sanitation",
      location: "Dhanbad",
      reports: 126,
      supporters: 67,
      comments: 18,
      icon: Trash2,
      color: "sanitation",
    },
    {
      title: "Damaged roads causing daily travel problems",
      category: "Infrastructure",
      location: "Kanke, Ranchi",
      reports: 96,
      supporters: 54,
      comments: 12,
      icon: Construction,
      color: "infrastructure",
    },
  ];

  return (
    <div className="community-page">

      {/* HEADER */}

      <section className="community-header">

        <div>
          <span className="page-label">COMMUNITY SPACE</span>

          <h1>Community</h1>

          <p>
            Explore issues raised by citizens and support the problems
            that matter to your community.
          </p>
        </div>

        <div className="community-header-icon">
          <Users size={28} />
        </div>

      </section>


      {/* INTRO CARD */}

      <section className="community-intro">

        <div className="community-intro-text">

          <span>TOGETHER WE MAKE A DIFFERENCE</span>

          <h2>Your community. Your voice.</h2>

          <p>
            Discover problems reported around you and help bring
            attention to issues that deserve action.
          </p>

        </div>

        <div className="community-intro-stats">

          <div>
            <strong>1,248</strong>
            <span>Active Citizens</span>
          </div>

          <div>
            <strong>326</strong>
            <span>Issues Reported</span>
          </div>

          <div>
            <strong>148</strong>
            <span>Issues Resolved</span>
          </div>

        </div>

      </section>


      {/* ISSUES */}

      <section className="community-issues-section">

        <div className="community-section-header">

          <div>
            <span className="section-label">DISCOVER ISSUES</span>

            <h2>What's happening near you?</h2>

            <p>
              Problems receiving attention from your community.
            </p>
          </div>

          <button className="community-filter">
            All Categories
          </button>

        </div>


        <div className="community-issues-grid">

          {communityIssues.map((issue, index) => {

            const Icon = issue.icon;

            return (

              <article
                className={`community-issue-card ${issue.color}`}
                key={index}
              >

                <div className="community-card-top">

                  <div className="community-issue-icon">
                    <Icon size={24} />
                  </div>

                  <span className="community-category">
                    {issue.category}
                  </span>

                </div>


                <h3>{issue.title}</h3>


                <div className="community-location">

                  <MapPin size={15} />

                  <span>{issue.location}</span>

                </div>


                <div className="community-divider"></div>


                <div className="community-engagement">

                  <div className="engagement-item">

                    <Users size={16} />

                    <span>{issue.reports} reports</span>

                  </div>


                  <div className="engagement-item">

                    <Heart size={16} />

                    <span>{issue.supporters}</span>

                  </div>


                  <div className="engagement-item">

                    <MessageCircle size={16} />

                    <span>{issue.comments}</span>

                  </div>

                </div>


              <button
  className="view-community-issue"
  onClick={() => navigate(`/community/${index + 1}`)}
>
  View Issue
  <ArrowRight size={17} />
</button>

              </article>

            );

          })}

        </div>

      </section>

    </div>
  );
}

export default Community;