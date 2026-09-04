import "./IssueDetails.css";
import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  Users,
  Heart,
  MessageCircle,
  Droplets,
  Trash2,
  Construction,
} from "lucide-react";

function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const issues = {
    1: {
      title: "Water shortage affecting rural villages",
      category: "Water",
      location: "Ranchi District",
      reports: 184,
      supporters: 92,
      comments: 24,
      description:
        "Several rural villages in the Ranchi district are experiencing irregular water supply, affecting households and daily activities.",
      icon: Droplets,
    },

    2: {
      title: "Irregular waste collection in residential areas",
      category: "Sanitation",
      location: "Dhanbad",
      reports: 126,
      supporters: 67,
      comments: 18,
      description:
        "Residents have reported irregular waste collection, leading to garbage accumulation and sanitation concerns in residential areas.",
      icon: Trash2,
    },

    3: {
      title: "Damaged roads causing daily travel problems",
      category: "Infrastructure",
      location: "Kanke, Ranchi",
      reports: 96,
      supporters: 54,
      comments: 12,
      description:
        "Damaged roads are causing difficulties for commuters, local residents, and emergency vehicles travelling through the area.",
      icon: Construction,
    },
  };

  const issue = issues[id];

  if (!issue) {
    return <div>Issue not found</div>;
  }

  const Icon = issue.icon;

  return (
    <div className="issue-details-page">

      <button
        className="back-button"
        onClick={() => navigate("/citizen/community")}
      >
        <ArrowLeft size={18} />
        Back to Community
      </button>


      <div className="issue-details-header">

        <div className="issue-details-icon">
          <Icon size={30} />
        </div>

        <div>
          <span className="page-label">COMMUNITY ISSUE</span>

          <h1>{issue.title}</h1>

          <span className="issue-category-badge">
            {issue.category}
          </span>
        </div>

      </div>


      <div className="issue-details-grid">

        {/* MAIN CONTENT */}

        <section className="issue-main-card">

          <h2>About this issue</h2>

          <p>{issue.description}</p>

          <div className="issue-divider"></div>

          <h2>Location</h2>

          <div className="issue-location-detail">
            <MapPin size={20} />
            <span>{issue.location}</span>
          </div>

        </section>


        {/* COMMUNITY SUPPORT */}

        <aside className="issue-support-card">

          <span className="support-label">
            COMMUNITY RESPONSE
          </span>

          <h2>People are talking about this</h2>


          <div className="support-stat">

            <Users size={19} />

            <div>
              <strong>{issue.reports}</strong>
              <span>Citizen Reports</span>
            </div>

          </div>


          <div className="support-stat">

            <Heart size={19} />

            <div>
              <strong>{issue.supporters}</strong>
              <span>Community Supporters</span>
            </div>

          </div>


          <div className="support-stat">

            <MessageCircle size={19} />

            <div>
              <strong>{issue.comments}</strong>
              <span>Community Discussions</span>
            </div>

          </div>


          <button className="support-button">
            <Heart size={18} />
            Support this Issue
          </button>

        </aside>

      </div>

    </div>
  );
}

export default IssueDetails;