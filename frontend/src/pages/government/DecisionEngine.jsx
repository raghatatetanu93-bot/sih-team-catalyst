import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Target,
  Zap,
  IndianRupee,
  Clock3,
  ChevronRight,
  X,
  Check,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";

function DecisionEngine() {
  const navigate = useNavigate();

  const [selectedDecision, setSelectedDecision] = useState(null);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [decisionStates, setDecisionStates] = useState({});

  const recommendations = [
    {
      id: "DEC-001",
      title: "Rural Water Supply Crisis",
      location: "West Singhbhum",
      priority: "Critical",
      score: 94,
      impactScore: 96,
      urgency: 98,
      feasibility: 82,
      affected: "48,000+",
      timeline: "0–3 months",
      investment: "₹18–25L",
      recommendation:
        "Immediately deploy a joint water infrastructure task force and assign the challenge to technical institutions.",
      rationale:
        "Multiple citizen reports indicate recurring water reliability problems. The issue affects a large rural population and has strong university capability matches.",
      stakeholder: "Government + Universities",
      institution: "BIT Mesra",
      impact: "High Impact",
      nextAction: "Find Solution Partners",
    },
    {
      id: "DEC-002",
      title: "Urban Flooding in Ranchi",
      location: "Ranchi",
      priority: "High",
      score: 87,
      impactScore: 91,
      urgency: 89,
      feasibility: 79,
      affected: "31,500+",
      timeline: "3–6 months",
      investment: "₹12–18L",
      recommendation:
        "Develop an AI-enabled flood monitoring and early warning system using real-time environmental data.",
      rationale:
        "Flood-related reports show recurring concentration around urban drainage zones. A technology-led intervention could improve early warning and response coordination.",
      stakeholder: "Government + Research Institutions",
      institution: "IIT (ISM) Dhanbad",
      impact: "High Impact",
      nextAction: "Review Solution",
    },
    {
      id: "DEC-003",
      title: "Waste Collection Inefficiency",
      location: "Jamshedpur",
      priority: "Medium",
      score: 72,
      impactScore: 76,
      urgency: 68,
      feasibility: 88,
      affected: "18,000+",
      timeline: "6–9 months",
      investment: "₹7–10L",
      recommendation:
        "Launch a smart waste route optimization project with municipal and university collaboration.",
      rationale:
        "The problem has strong feasibility because existing municipal workflows can be improved using route optimization and operational analytics.",
      stakeholder: "Municipality + Universities",
      institution: "NIT Jamshedpur",
      impact: "Medium Impact",
      nextAction: "Review Solution",
    },
    {
      id: "DEC-004",
      title: "Primary Healthcare Access Gap",
      location: "Latehar",
      priority: "High",
      score: 84,
      impactScore: 93,
      urgency: 86,
      feasibility: 74,
      affected: "22,000+",
      timeline: "3–6 months",
      investment: "₹10–15L",
      recommendation:
        "Pilot a mobile healthcare coordination system connecting underserved communities with healthcare providers.",
      rationale:
        "The combination of population impact and accessibility constraints suggests that a coordinated mobile-first intervention could improve service reach.",
      stakeholder: "Government + Healthcare Institutions",
      institution: "Central University of Jharkhand",
      impact: "High Impact",
      nextAction: "Review Solution",
    },
  ];

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      const matchesPriority =
        priorityFilter === "All" || item.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [search, priorityFilter]);

  const handleDecision = (id, action) => {
    setDecisionStates((prev) => ({
      ...prev,
      [id]: action,
    }));
  };

  const goToMatching = () => {
    navigate("/government/university-matching");
  };

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
          <span className="status-dot"></span>
          <Sparkles size={17} />
          AI Engine Active
        </div>
      </div>

      {/* STATS */}
      <div className="decision-stats">
        <div className="decision-stat">
          <div className="decision-icon purple">
            <Brain size={23} />
          </div>
          <div>
            <span>Problems Analysed</span>
            <strong>156</strong>
            <small>Across all districts</small>
          </div>
        </div>

        <div className="decision-stat">
          <div className="decision-icon red">
            <ShieldAlert size={23} />
          </div>
          <div>
            <span>Critical Issues</span>
            <strong>12</strong>
            <small>Require immediate review</small>
          </div>
        </div>

        <div className="decision-stat">
          <div className="decision-icon blue">
            <TrendingUp size={23} />
          </div>
          <div>
            <span>AI Recommendations</span>
            <strong>38</strong>
            <small>Generated this cycle</small>
          </div>
        </div>

        <div className="decision-stat">
          <div className="decision-icon green">
            <CheckCircle2 size={23} />
          </div>
          <div>
            <span>Success Confidence</span>
            <strong>89%</strong>
            <small>Average confidence</small>
          </div>
        </div>
      </div>

      {/* AI ANALYSIS */}
      <div className="decision-grid">
        <div className="ai-analysis-card">
          <div className="section-heading">
            <div>
              <p className="section-label">AI ANALYSIS</p>
              <h2>Current Societal Intelligence</h2>
            </div>

            <div className="heading-icon">
              <Brain size={23} />
            </div>
          </div>

          <div className="analysis-item">
            <div className="analysis-icon red-bg">
              <AlertTriangle size={19} />
            </div>

            <div>
              <h3>Highest Priority Area</h3>
              <p>Water accessibility and infrastructure reliability</p>
              <strong>Priority Score: 94 / 100</strong>
            </div>
          </div>

          <div className="analysis-item">
            <div className="analysis-icon blue-bg">
              <MapPin size={19} />
            </div>

            <div>
              <h3>Most Affected Region</h3>
              <p>West Singhbhum and surrounding rural districts</p>
              <strong>Estimated Population Impact: 48,000+</strong>
            </div>
          </div>

          <div className="analysis-item">
            <div className="analysis-icon green-bg">
              <Users size={19} />
            </div>

            <div>
              <h3>Recommended Collaboration</h3>
              <p>Government, universities and technical research teams</p>
              <strong>Best Match Confidence: 91%</strong>
            </div>
          </div>
        </div>

        {/* AI ENGINE */}
        <div className="priority-engine-card">
          <div className="engine-glow"></div>

          <div className="engine-icon">
            <Brain size={30} />
          </div>

          <p>AI PRIORITY ENGINE</p>

          <h2>94%</h2>

          <span>Decision Confidence</span>

          <div className="confidence-row">
            <span>Confidence</span>
            <strong>94 / 100</strong>
          </div>

          <div className="confidence-bar">
            <div className="confidence-fill"></div>
          </div>

          <div className="engine-indicators">
            <span>
              <CheckCircle2 size={14} />
              Impact analysed
            </span>
            <span>
              <CheckCircle2 size={14} />
              Urgency analysed
            </span>
            <span>
              <CheckCircle2 size={14} />
              Feasibility analysed
            </span>
          </div>

          <div className="engine-footer">
            <Brain size={14} />
            Based on 12 societal indicators
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

          <button
            className="view-all-button"
            onClick={() => {
              setSearch("");
              setPriorityFilter("All");
            }}
          >
            View All Decisions
            <ArrowRight size={16} />
          </button>
        </div>

        {/* FILTERS */}
        <div className="decision-toolbar">
          <div className="decision-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search problems or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="decision-filter">
            <SlidersHorizontal size={16} />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>
          </div>
        </div>

        <div className="recommendation-count">
          Showing <strong>{filteredRecommendations.length}</strong>{" "}
          AI-generated decisions
        </div>

        <div className="recommendation-list">
          {filteredRecommendations.map((item, index) => {
            const state = decisionStates[item.id];

            return (
              <div
                className={`recommendation-card ${
                  state ? "decision-completed" : ""
                }`}
                key={item.id}
              >
                <div className="recommendation-number">
                  0{index + 1}
                </div>

                <div className="recommendation-content">
                  <div className="recommendation-title">
                    <div>
                      <div className="decision-id">{item.id}</div>

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
                      {item.institution}
                    </span>

                    <span>
                      <Users size={15} />
                      {item.affected} affected
                    </span>
                  </div>

                  {state && (
                    <div className="decision-state">
                      <CheckCircle2 size={15} />
                      Decision marked as {state}
                    </div>
                  )}
                </div>

                <div className="recommendation-actions">
                  <div className="score-circle">
                    <strong>{item.score}</strong>
                    <span>Score</span>
                  </div>

                  <button
                    className="details-button"
                    onClick={() => setSelectedDecision(item)}
                  >
                    Details
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="decision-empty">
            <Search size={32} />
            <h3>No decisions found</h3>
            <p>Try changing your search or priority filter.</p>
          </div>
        )}
      </div>

      {/* DECISION MODAL */}
      {selectedDecision && (
        <div
          className="decision-modal-overlay"
          onClick={() => setSelectedDecision(null)}
        >
          <div
            className="decision-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedDecision(null)}
            >
              <X size={19} />
            </button>

            <div className="modal-top">
              <div>
                <span className="modal-eyebrow">AI DECISION</span>
                <div className="modal-id">{selectedDecision.id}</div>
                <h2>{selectedDecision.title}</h2>

                <span className="modal-location">
                  <MapPin size={15} />
                  {selectedDecision.location}
                </span>
              </div>

              <span
                className={`priority-badge ${selectedDecision.priority.toLowerCase()}`}
              >
                {selectedDecision.priority}
              </span>
            </div>

            {/* SCORE GRID */}
            <div className="decision-score-grid">
              <div>
                <Target size={18} />
                <span>Overall Score</span>
                <strong>{selectedDecision.score}</strong>
              </div>

              <div>
                <AlertTriangle size={18} />
                <span>Urgency</span>
                <strong>{selectedDecision.urgency}</strong>
              </div>

              <div>
                <TrendingUp size={18} />
                <span>Impact</span>
                <strong>{selectedDecision.impactScore}</strong>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Feasibility</span>
                <strong>{selectedDecision.feasibility}</strong>
              </div>
            </div>

            <div className="modal-section">
              <div className="modal-section-title">
                <Lightbulb size={18} />
                AI Recommendation
              </div>

              <p>{selectedDecision.recommendation}</p>
            </div>

            <div className="modal-section rationale">
              <div className="modal-section-title">
                <Brain size={18} />
                Why AI recommends this
              </div>

              <p>{selectedDecision.rationale}</p>
            </div>

            {/* ACTION INFO */}
            <div className="decision-info-grid">
              <div>
                <Users size={17} />
                <span>Affected Population</span>
                <strong>{selectedDecision.affected}</strong>
              </div>

              <div>
                <Clock3 size={17} />
                <span>Suggested Timeline</span>
                <strong>{selectedDecision.timeline}</strong>
              </div>

              <div>
                <IndianRupee size={17} />
                <span>Estimated Investment</span>
                <strong>{selectedDecision.investment}</strong>
              </div>

              <div>
                <GraduationCap size={17} />
                <span>Suggested Institution</span>
                <strong>{selectedDecision.institution}</strong>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="modal-actions">
              <button
                className="reject-button"
                onClick={() =>
                  handleDecision(selectedDecision.id, "Rejected")
                }
              >
                <X size={16} />
                Reject
              </button>

              <button
                className="review-button"
                onClick={() =>
                  handleDecision(selectedDecision.id, "Under Review")
                }
              >
                <Clock3 size={16} />
                Review
              </button>

              <button
                className="approve-button"
                onClick={() =>
                  handleDecision(selectedDecision.id, "Approved")
                }
              >
                <Check size={16} />
                Approve
              </button>
            </div>

            <button className="matching-button" onClick={goToMatching}>
              <GraduationCap size={17} />
              Find Solution Partners
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DecisionEngine;