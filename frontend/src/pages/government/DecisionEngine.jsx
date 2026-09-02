import "./DecisionEngine.css";

import {
  Brain,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Users,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Building2,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

function DecisionEngine() {
  const recommendations = [
    {
      title: "Rural Water Supply Crisis",
      location: "West Singhbhum",
      priority: "Critical",
      score: 94,
      recommendation:
        "Immediately deploy a joint water infrastructure task force and assign the challenge to technical institutions.",
      stakeholder: "Government + Universities",
      impact: "High Impact",
    },
    {
      title: "Urban Flooding in Ranchi",
      location: "Ranchi",
      priority: "High",
      score: 87,
      recommendation:
        "Develop an AI-enabled flood monitoring and early warning system using real-time environmental data.",
      stakeholder: "Government + Research Institutions",
      impact: "High Impact",
    },
    {
      title: "Waste Collection Inefficiency",
      location: "Jamshedpur",
      priority: "Medium",
      score: 72,
      recommendation:
        "Launch a smart waste route optimization project with municipal and university collaboration.",
      stakeholder: "Municipality + Universities",
      impact: "Medium Impact",
    },
  ];

  return (
    <div className="decision-page">
      {/* HEADER */}

      <div className="decision-header">
        <div>
          <p className="eyebrow">AI DECISION INTELLIGENCE</p>

          <h1>Societal Decision Engine</h1>

          <p>
            AI-powered recommendations to help government prioritize problems,
            allocate resources, and identify the best innovation pathways.
          </p>
        </div>

        <div className="ai-status">
          <Sparkles size={18} />
          AI Engine Active
        </div>
      </div>

      {/* TOP INSIGHT CARDS */}

      <div className="decision-stats">
        <div className="decision-stat">
          <div className="decision-icon purple">
            <Brain size={22} />
          </div>

          <div>
            <span>Problems Analysed</span>
            <strong>156</strong>
          </div>
        </div>

        <div className="decision-stat">
          <div className="decision-icon red">
            <ShieldAlert size={22} />
          </div>

          <div>
            <span>Critical Issues</span>
            <strong>12</strong>
          </div>
        </div>

        <div className="decision-stat">
          <div className="decision-icon blue">
            <TrendingUp size={22} />
          </div>

          <div>
            <span>AI Recommendations</span>
            <strong>38</strong>
          </div>
        </div>

        <div className="decision-stat">
          <div className="decision-icon green">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <span>Success Confidence</span>
            <strong>89%</strong>
          </div>
        </div>
      </div>

      {/* AI ANALYSIS SECTION */}

      <div className="decision-grid">
        <div className="ai-analysis-card">
          <div className="section-heading">
            <div>
              <p className="section-label">AI ANALYSIS</p>
              <h2>Current Societal Intelligence</h2>
            </div>

            <Brain size={25} />
          </div>

          <div className="analysis-item">
            <div className="analysis-icon">
              <AlertTriangle size={19} />
            </div>

            <div>
              <h3>Highest Priority Area</h3>
              <p>Water accessibility and infrastructure reliability</p>
              <strong>Priority Score: 94 / 100</strong>
            </div>
          </div>

          <div className="analysis-item">
            <div className="analysis-icon">
              <MapPin size={19} />
            </div>

            <div>
              <h3>Most Affected Region</h3>
              <p>West Singhbhum and surrounding rural districts</p>
              <strong>Estimated Population Impact: 48,000+</strong>
            </div>
          </div>

          <div className="analysis-item">
            <div className="analysis-icon">
              <Users size={19} />
            </div>

            <div>
              <h3>Recommended Collaboration</h3>
              <p>Government, universities and technical research teams</p>
              <strong>Best Match Confidence: 91%</strong>
            </div>
          </div>
        </div>

        {/* AI PRIORITY CARD */}

        <div className="priority-engine-card">
          <div className="engine-glow"></div>

          <div className="engine-icon">
            <Brain size={30} />
          </div>

          <p>AI PRIORITY ENGINE</p>

          <h2>94%</h2>

          <span>Decision Confidence</span>

          <div className="confidence-bar">
            <div className="confidence-fill"></div>
          </div>

          <div className="engine-footer">
            <span>Based on 12 societal indicators</span>
          </div>
        </div>
      </div>

      {/* RECOMMENDATIONS */}

      <div className="recommendations-section">
        <div className="recommendations-header">
          <div>
            <p className="eyebrow">AI RECOMMENDATIONS</p>
            <h2>Priority Actions</h2>
            <span>
              Recommended innovation pathways based on urgency, impact and
              available resources.
            </span>
          </div>

          <button className="view-all-button">
            View All Decisions
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="recommendation-list">
          {recommendations.map((item, index) => (
            <div className="recommendation-card" key={index}>
              <div className="recommendation-number">
                0{index + 1}
              </div>

              <div className="recommendation-content">
                <div className="recommendation-title">
                  <div>
                    <h3>{item.title}</h3>

                    <span className="location">
                      <MapPin size={14} />
                      {item.location}
                    </span>
                  </div>

                  <span
                    className={`priority-badge ${item.priority.toLowerCase()}`}
                  >
                    {item.priority}
                  </span>
                </div>

                <p>{item.recommendation}</p>

                <div className="recommendation-meta">
                  <span>
                    <Building2 size={15} />
                    {item.stakeholder}
                  </span>

                  <span>
                    <GraduationCap size={15} />
                    {item.impact}
                  </span>
                </div>
              </div>

              <div className="score-circle">
                <strong>{item.score}</strong>
                <span>Score</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DecisionEngine;