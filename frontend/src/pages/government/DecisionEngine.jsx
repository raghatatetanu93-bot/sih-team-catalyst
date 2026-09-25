import React, { useMemo, useState, useEffect } from "react";
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
  Clock3,
  ChevronRight,
  X,
  Check,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  Lightbulb,
  IndianRupee,
  RefreshCw,
  Loader2,
} from "lucide-react";
import api from "../../api";

// Helper to normalize population impact into 0 - 100 score
const normalizePopulation = (pop) => {
  const count = Number(pop) || 0;
  if (count >= 20000) return 100;
  if (count >= 10000) return 90;
  if (count >= 5000) return 80;
  if (count >= 2000) return 70;
  if (count >= 1000) return 60;
  if (count >= 500) return 50;
  if (count >= 100) return 40;
  if (count > 0) return 30;
  return 20;
};

// Compute dynamic weighted Decision Score (0 - 100)
const computeDecisionScore = (problem) => {
  const severityMap = { critical: 100, high: 75, medium: 50, low: 25 };
  const urgencyMap = { critical: 100, high: 75, medium: 50, low: 25 };

  const sVal = severityMap[String(problem.severity || '').toLowerCase()] || 50;
  const uVal = urgencyMap[String(problem.urgency || '').toLowerCase()] || 50;
  const pScore = typeof problem.priorityScore === 'number' ? problem.priorityScore : 50;
  const popScore = normalizePopulation(problem.affectedPopulation);

  // Weighted sum: Severity (25%) + Urgency (25%) + AI PriorityScore (30%) + Population (20%)
  const composite = Math.round(sVal * 0.25 + uVal * 0.25 + pScore * 0.30 + popScore * 0.20);
  return Math.min(100, Math.max(10, composite));
};

function DecisionEngine() {
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDecision, setSelectedDecision] = useState(null);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [decisionStates, setDecisionStates] = useState({});

  const fetchValidatedProblems = async () => {
    setLoading(true);
    setError(null);
    try {
      // Pull problems from API specifically filtering for validated problems
      const res = await api.get("/problems?status=Validated");
      setProblems(res.data || []);
    } catch (err) {
      console.error("Failed to load validated problems for Decision Engine:", err);
      setError("Unable to load validated problems from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValidatedProblems();
  }, []);

  // Compute recommendations dynamically sorted by weighted decision score
  const recommendations = useMemo(() => {
    if (!problems || problems.length === 0) return [];

    return [...problems]
      .sort((a, b) => computeDecisionScore(b) - computeDecisionScore(a))
      .map((problem, index) => {
        const rawId = problem._id;
        const shortId =
          problem.problemId ||
          (rawId ? `DEC-${String(rawId).slice(-3).toUpperCase()}` : `DEC-00${index + 1}`);

        const score = computeDecisionScore(problem);

        const sVal =
          { critical: 100, high: 75, medium: 50, low: 25 }[
            String(problem.severity || '').toLowerCase()
          ] || 50;
        const uVal =
          { critical: 100, high: 75, medium: 50, low: 25 }[
            String(problem.urgency || '').toLowerCase()
          ] || 50;
        const popScore = normalizePopulation(problem.affectedPopulation);

        const priority =
          score >= 85 ? "Critical" : score >= 70 ? "High" : score >= 50 ? "Medium" : "Low";

        const locationName = problem.location?.district
          ? `${problem.location.district} District`
          : problem.location?.address || "Jharkhand";

        const institution =
          problem.assignedUniversity?.name ||
          (problem.suggestedSolutionArea
            ? `${problem.suggestedSolutionArea} Research Lab`
            : "BIT Mesra / Technical Institute");

        let timeline = "3–6 months";
        let investment = "₹10–15L";
        if (score >= 85) {
          timeline = "0–3 months";
          investment = "₹18–25L";
        } else if (score < 65) {
          timeline = "6–9 months";
          investment = "₹5–8L";
        }

        return {
          rawId,
          id: shortId,
          title:
            problem.title ||
            (problem.category ? `${problem.category} Intervention` : "Societal Challenge"),
          location: locationName,
          priority,
          score,
          impactScore: Math.min(100, Math.round((sVal + popScore) / 2)),
          urgency: uVal,
          feasibility: Math.min(100, Math.max(65, 100 - Math.round(sVal * 0.2))),
          affected: problem.affectedPopulation
            ? `${Number(problem.affectedPopulation).toLocaleString()}+`
            : "1,000+",
          affectedNum: Number(problem.affectedPopulation) || 0,
          timeline,
          investment,
          recommendation:
            problem.suggestedSolutionArea ||
            problem.summary ||
            "Deploy a coordinated civic task force with university engineering partner teams for rapid solutioning.",
          rationale:
            problem.summary ||
            `Validated problem in ${locationName} has an assessed priority score of ${score}/100. High societal impact with strong university collaboration potential.`,
          stakeholder: "Government + Technical Institutions",
          institution,
          impact: score >= 75 ? "High Impact" : "Medium Impact",
          nextAction: "Find Solution Partners",
        };
      });
  }, [problems]);

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());

      const matchesPriority =
        priorityFilter === "All" || item.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [recommendations, search, priorityFilter]);

  const handleDecision = (id, action) => {
    setDecisionStates((prev) => ({
      ...prev,
      [id]: action,
    }));
  };

  const goToMatching = () => {
    navigate("/government/university-matching");
  };

  // Top indicators
  const highestRecommendation = recommendations[0] || null;
  const criticalCount = recommendations.filter((r) => r.priority === "Critical").length;
  const avgConfidence = recommendations.length
    ? Math.round(recommendations.reduce((sum, r) => sum + r.score, 0) / recommendations.length)
    : 89;

  return (
    <div className="decision-page">
      {/* HEADER */}
      <div className="decision-header">
        <div>
          <p className="eyebrow">AI DECISION INTELLIGENCE</p>
          <h1>Societal Decision Engine</h1>
          <p>
            AI-powered recommendations to help government prioritize validated societal problems, allocate resources, and identify the best innovation pathways.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={fetchValidatedProblems}
            className="ai-status"
            style={{ cursor: "pointer", border: "none" }}
            title="Refresh Decision Engine Recommendations"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Sync Engine
          </button>

          <div className="ai-status">
            <span className="status-dot"></span>
            <Sparkles size={17} />
            AI Engine Active ({recommendations.length} Validated Cases)
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="decision-stats">
        <div className="decision-stat">
          <div className="decision-icon purple">
            <Brain size={23} />
          </div>
          <div>
            <span>Validated Analysed</span>
            <strong>{recommendations.length}</strong>
            <small>Across all districts</small>
          </div>
        </div>

        <div className="decision-stat">
          <div className="decision-icon red">
            <ShieldAlert size={23} />
          </div>
          <div>
            <span>Critical Priority</span>
            <strong>{criticalCount}</strong>
            <small>Require immediate review</small>
          </div>
        </div>

        <div className="decision-stat">
          <div className="decision-icon blue">
            <TrendingUp size={23} />
          </div>
          <div>
            <span>AI Pathways</span>
            <strong>{recommendations.length}</strong>
            <small>Ranked by impact & urgency</small>
          </div>
        </div>

        <div className="decision-stat">
          <div className="decision-icon green">
            <CheckCircle2 size={23} />
          </div>
          <div>
            <span>Decision Confidence</span>
            <strong>{highestRecommendation ? `${highestRecommendation.score}%` : `${avgConfidence}%`}</strong>
            <small>Average confidence: {avgConfidence}%</small>
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
              <h3>Highest Priority Focus Area</h3>
              <p>{highestRecommendation ? highestRecommendation.title : "Water accessibility and infrastructure reliability"}</p>
              <strong>Priority Score: {highestRecommendation ? highestRecommendation.score : 94} / 100</strong>
            </div>
          </div>

          <div className="analysis-item">
            <div className="analysis-icon blue-bg">
              <MapPin size={19} />
            </div>

            <div>
              <h3>Most Critical Region</h3>
              <p>{highestRecommendation ? highestRecommendation.location : "West Singhbhum and surrounding districts"}</p>
              <strong>Estimated Population Impact: {highestRecommendation ? highestRecommendation.affected : "48,000+"}</strong>
            </div>
          </div>

          <div className="analysis-item">
            <div className="analysis-icon green-bg">
              <Users size={19} />
            </div>

            <div>
              <h3>Recommended Collaboration Partner</h3>
              <p>{highestRecommendation ? highestRecommendation.institution : "Government, universities and technical research teams"}</p>
              <strong>Match Confidence: {highestRecommendation ? `${highestRecommendation.score}%` : "91%"}</strong>
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

          <h2>{highestRecommendation ? `${highestRecommendation.score}%` : "94%"}</h2>

          <span>Top Priority Score</span>

          <div className="confidence-row">
            <span>Overall Index</span>
            <strong>{highestRecommendation ? `${highestRecommendation.score} / 100` : "94 / 100"}</strong>
          </div>

          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{ width: `${highestRecommendation ? highestRecommendation.score : 94}%` }}
            ></div>
          </div>

          <div className="engine-indicators">
            <span>
              <CheckCircle2 size={14} />
              Severity weighted
            </span>
            <span>
              <CheckCircle2 size={14} />
              Urgency weighted
            </span>
            <span>
              <CheckCircle2 size={14} />
              Population weighted
            </span>
          </div>

          <div className="engine-footer">
            <Brain size={14} />
            Dynamic weighted synthesis of validated cases
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
              Recommended innovation pathways based on urgency, impact, severity and affected population.
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
              placeholder="Search problems, locations or IDs..."
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
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="recommendation-count">
          Showing <strong>{filteredRecommendations.length}</strong> validated cases ranked by AI Decision Engine
        </div>

        {loading ? (
          <div style={{ padding: "50px", textAlign: "center", color: "#64748b" }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: "0 auto 12px" }} />
            <p>Evaluating validated problems and computing AI decision priorities...</p>
          </div>
        ) : error ? (
          <div style={{ padding: "30px", textAlign: "center", color: "#dc2626" }}>
            <AlertTriangle size={32} style={{ margin: "0 auto 8px" }} />
            <p>{error}</p>
            <button
              onClick={fetchValidatedProblems}
              style={{
                marginTop: "12px",
                padding: "8px 16px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="recommendation-list">
            {filteredRecommendations.map((item, index) => {
              const state = decisionStates[item.id];

              return (
                <div
                  className={`recommendation-card ${
                    state ? "decision-completed" : ""
                  }`}
                  key={item.rawId || item.id}
                >
                  <div className="recommendation-number">
                    {String(index + 1).padStart(2, "0")}
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
        )}

        {!loading && filteredRecommendations.length === 0 && (
          <div className="decision-empty">
            <Search size={32} />
            <h3>No validated decisions found</h3>
            <p>Ensure problems are marked as "Validated" by Government officials to appear in the Decision Engine queue.</p>
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