import { useState } from "react";
import { Users, FileText, CheckCircle, Lightbulb } from "lucide-react";

import "./UniversityImpact.css";

const STORIES = [
  {
    title: "Solar-Powered Purification in Dumka",
    metrics: ["10,000+ Benefited", "30% Cost Reduction"],
    description:
      "Developed and deployed 50 solar-powered water purification units across off-grid villages, significantly reducing waterborne diseases.",
    category: "Water & Sustainability",
    impact: "10,000+ citizens",
  },
  {
    title: "Crop Yield Prediction AI",
    metrics: ["Statewide Adoption", "15% Yield Increase"],
    description:
      "An AI model that successfully predicted monsoon patterns tailored for local geography, helping farmers optimize their sowing periods.",
    category: "Agriculture & AI",
    impact: "15% yield increase",
  },
];

const RESEARCH = [
  {
    type: "Research Paper",
    title: "Paper Published: IEEE IoT Journal",
    description: "Optimizing Sensor Deployment in Urban Water Grids",
  },
  {
    type: "Patent",
    title: "Patent Granted: #IN-2026-890",
    description: "Low-cost composite material for road pothole repair",
  },
  {
    type: "Conference",
    title: "Conference: Smart Cities India 2026",
    description:
      "Presented findings on decentralized waste management algorithms.",
  },
];

function UniversityImpact() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [activeView, setActiveView] = useState("overview");

  return (
    <div className="impact-container">

      {/* HEADER */}
      <div className="impact-header">
        <div>
          <p className="impact-eyebrow">UNIVERSITY IMPACT CENTER</p>
          <h1>Impact & Research Outcomes</h1>
          <p>
            Measure the real-world difference your university is making.
          </p>
        </div>

        <div className="impact-period">
          <span>Reporting Period</span>
          <strong>2026</strong>
        </div>
      </div>

      {/* VIEW SWITCHER */}
      <div className="impact-tabs">
        <button
          className={activeView === "overview" ? "active" : ""}
          onClick={() => setActiveView("overview")}
        >
          Impact Overview
        </button>

        <button
          className={activeView === "research" ? "active" : ""}
          onClick={() => setActiveView("research")}
        >
          Research Outcomes
        </button>
      </div>

      {/* STATS */}
      <div className="impact-stats-grid">

        <div className="impact-stat-card primary">
          <div className="impact-stat-icon">
            <Users size={25} />
          </div>
          <div className="impact-stat-content">
            <span>Citizens Impacted</span>
            <h2>45,000+</h2>
            <small>Across implemented solutions</small>
          </div>
        </div>

        <div className="impact-stat-card success">
          <div className="impact-stat-icon">
            <CheckCircle size={25} />
          </div>
          <div className="impact-stat-content">
            <span>Projects Implemented</span>
            <h2>24</h2>
            <small>Solutions deployed</small>
          </div>
        </div>

        <div className="impact-stat-card warning">
          <div className="impact-stat-icon">
            <Lightbulb size={25} />
          </div>
          <div className="impact-stat-content">
            <span>Patents Filed</span>
            <h2>8</h2>
            <small>Innovation pipeline</small>
          </div>
        </div>

        <div className="impact-stat-card purple">
          <div className="impact-stat-icon">
            <FileText size={25} />
          </div>
          <div className="impact-stat-content">
            <span>Research Papers</span>
            <h2>15</h2>
            <small>Published research</small>
          </div>
        </div>

      </div>

      {/* IMPACT OVERVIEW */}
      {activeView === "overview" && (
        <>
          <div className="impact-overview-banner">
            <div>
              <span className="banner-label">UNIVERSITY IMPACT SCORE</span>
              <strong>87 / 100</strong>
              <p>
                Your university's projects are creating measurable outcomes
                across communities, infrastructure and sustainability.
              </p>
            </div>

            <div className="impact-score-ring">
              <span>87%</span>
              <small>Impact</small>
            </div>
          </div>

          <div className="impact-grid">

            {/* SUCCESS STORIES */}
            <div className="impact-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-eyebrow">FIELD RESULTS</span>
                  <h3>Success Stories</h3>
                </div>
                <span className="panel-count">2 stories</span>
              </div>

              <div className="stories-list">
                {STORIES.map((story, index) => (
                  <div className="story-card" key={story.title}>

                    <div className="story-top">
                      <span className="story-number">
                        0{index + 1}
                      </span>

                      <span className="story-category">
                        {story.category}
                      </span>
                    </div>

                    <div className="story-title">
                      {story.title}
                    </div>

                    <div className="story-metrics">
                      {story.metrics.map((metric) => (
                        <span className="story-metric" key={metric}>
                          {metric}
                        </span>
                      ))}
                    </div>

                    <p className="story-desc">
                      {story.description}
                    </p>

                    <button
                      className="story-button"
                      onClick={() => setSelectedStory(story)}
                    >
                      View Impact Details →
                    </button>

                  </div>
                ))}
              </div>
            </div>

            {/* IMPACT BREAKDOWN */}
            <div className="impact-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-eyebrow">IMPACT BREAKDOWN</span>
                  <h3>Community Outcomes</h3>
                </div>
              </div>

              <div className="outcome-list">

                <div className="outcome-item">
                  <div className="outcome-top">
                    <span>Water & Sanitation</span>
                    <strong>82%</strong>
                  </div>
                  <div className="outcome-bar">
                    <div style={{ width: "82%" }} />
                  </div>
                  <small>10,000+ citizens reached</small>
                </div>

                <div className="outcome-item">
                  <div className="outcome-top">
                    <span>Agriculture</span>
                    <strong>74%</strong>
                  </div>
                  <div className="outcome-bar">
                    <div style={{ width: "74%" }} />
                  </div>
                  <small>Statewide adoption</small>
                </div>

                <div className="outcome-item">
                  <div className="outcome-top">
                    <span>Infrastructure</span>
                    <strong>68%</strong>
                  </div>
                  <div className="outcome-bar">
                    <div style={{ width: "68%" }} />
                  </div>
                  <small>Multiple districts reached</small>
                </div>

                <div className="outcome-item">
                  <div className="outcome-top">
                    <span>Smart Technology</span>
                    <strong>91%</strong>
                  </div>
                  <div className="outcome-bar">
                    <div style={{ width: "91%" }} />
                  </div>
                  <small>High innovation contribution</small>
                </div>

              </div>
            </div>

          </div>
        </>
      )}

      {/* RESEARCH VIEW */}
      {activeView === "research" && (
        <div className="research-full-panel">

          <div className="panel-heading">
            <div>
              <span className="panel-eyebrow">ACADEMIC OUTPUT</span>
              <h3>Recent Research Outcomes</h3>
            </div>

            <span className="panel-count">15 papers • 8 patents</span>
          </div>

          <div className="research-grid">
            {RESEARCH.map((item) => (
              <div className="research-card" key={item.title}>

                <div className="research-card-icon">
                  {item.type === "Patent" ? (
                    <Lightbulb size={23} />
                  ) : (
                    <FileText size={23} />
                  )}
                </div>

                <span className="research-type">
                  {item.type}
                </span>

                <h4>{item.title}</h4>

                <p>{item.description}</p>

                <button
                  onClick={() => setSelectedResearch(item)}
                >
                  View Outcome →
                </button>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* BOTTOM SUMMARY */}
      <div className="impact-summary">

        <div>
          <span>24</span>
          <p>Solutions Implemented</p>
        </div>

        <div>
          <span>45K+</span>
          <p>Citizens Reached</p>
        </div>

        <div>
          <span>8</span>
          <p>Patents Filed</p>
        </div>

        <div>
          <span>15</span>
          <p>Research Papers</p>
        </div>

      </div>

      {/* STORY MODAL */}
      {selectedStory && (
        <div
          className="impact-modal-overlay"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="impact-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedStory(null)}
            >
              ×
            </button>

            <span className="modal-label">
              SUCCESS STORY
            </span>

            <h2>{selectedStory.title}</h2>

            <span className="modal-category">
              {selectedStory.category}
            </span>

            <div className="modal-impact-number">
              {selectedStory.impact}
            </div>

            <p>{selectedStory.description}</p>

            <div className="modal-metrics">
              {selectedStory.metrics.map((metric) => (
                <div key={metric}>
                  <strong>{metric}</strong>
                  <span>Measured outcome</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RESEARCH MODAL */}
      {selectedResearch && (
        <div
          className="impact-modal-overlay"
          onClick={() => setSelectedResearch(null)}
        >
          <div
            className="impact-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedResearch(null)}
            >
              ×
            </button>

            <span className="modal-label">
              {selectedResearch.type}
            </span>

            <h2>{selectedResearch.title}</h2>

            <p>{selectedResearch.description}</p>

            <div className="research-modal-status">
              <CheckCircle size={18} />
              Recorded in 2026 university outcomes
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UniversityImpact;