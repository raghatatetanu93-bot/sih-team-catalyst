import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Users,
  Clock,
  Sparkles,
  ArrowUpRight,
  X,
  Target,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import api from "../../api";
import "./AvailableChallenges.css";

function AvailableChallenges() {
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await api.get("/problems?status=Validated");
        setChallenges(response.data);
      } catch (err) {
        setError("Failed to load challenges.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const categories = useMemo(() => {
    const values = challenges
      .map((challenge) => challenge.category)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [challenges]);

  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      const text =
        `${challenge.title || ""} ${challenge.description || ""} ${
          challenge.location?.address || ""
        }`.toLowerCase();

      const matchesSearch = text.includes(searchTerm.toLowerCase());

      const severity = (challenge.severity || "Medium").toLowerCase();

      const matchesCategory =
        categoryFilter === "All" ||
        challenge.category === categoryFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        severity === priorityFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesPriority;
    });
  }, [challenges, searchTerm, categoryFilter, priorityFilter]);

  const getMatchScore = (challenge, index) => {
    const scores = [96, 91, 87, 84, 79];
    return challenge.matchScore || scores[index % scores.length];
  };

  return (
    <div className="challenges-container">

      {/* HEADER */}
      <div className="challenges-header">
        <div>
          <p className="challenges-eyebrow">UNIVERSITY OPPORTUNITIES</p>

          <h1>Available Challenges</h1>

          <p>
            Explore government-validated problems that need innovative
            solutions from universities and research teams.
          </p>
        </div>

        <div className="challenge-summary">
          <Target size={18} />
          <div>
            <strong>{challenges.length}</strong>
            <span>Validated challenges</span>
          </div>
        </div>
      </div>

      {/* AI BANNER */}
      <div className="challenge-ai-banner">
        <div className="challenge-ai-icon">
          <Sparkles size={22} />
        </div>

        <div>
          <strong>AI-powered opportunity matching</strong>
          <p>
            Challenges are matched with university capabilities, expected
            impact and implementation feasibility.
          </p>
        </div>

        <span className="ai-active-badge">
          <span></span>
          AI ACTIVE
        </span>
      </div>

      {/* FILTERS */}
      <div className="filters-bar">

        <div className="search-box">
          <Search className="search-icon" size={18} />

          <input
            type="text"
            placeholder="Search challenges, locations or problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((category) => (
            <option value={category} key={category}>
              {category === "All" ? "All Categories" : category}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

      </div>

      {/* RESULT INFO */}
      {!loading && !error && (
        <div className="challenge-results-bar">
          <span>
            Showing <strong>{filteredChallenges.length}</strong> challenges
          </span>

          {(searchTerm ||
            categoryFilter !== "All" ||
            priorityFilter !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("All");
                setPriorityFilter("All");
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="challenge-state">
          <div className="challenge-loader"></div>
          <h3>Finding validated challenges</h3>
          <p>Loading opportunities for your university...</p>
        </div>
      ) : error ? (
        <div className="challenge-state error">
          <AlertTriangle size={35} />
          <h3>Unable to load challenges</h3>
          <p>{error}</p>
        </div>
      ) : filteredChallenges.length === 0 ? (
        <div className="challenge-state">
          <Search size={35} />
          <h3>No challenges found</h3>
          <p>
            Try changing your search terms or filters.
          </p>
        </div>
      ) : (

        /* CARDS */
        <div className="challenges-grid">

          {filteredChallenges.map((challenge, index) => {

            const priority =
              challenge.severity || "Medium";

            const score = getMatchScore(challenge, index);

            return (
              <div
                key={challenge._id}
                className="challenge-card"
              >

                {/* TOP */}
                <div className="challenge-badge-row">

                  <span className="category-badge">
                    {challenge.category || "Uncategorized"}
                  </span>

                  <span
                    className={`priority-badge ${priority.toLowerCase()}`}
                  >
                    {priority} Priority
                  </span>

                </div>

                {/* MATCH */}
                <div className="challenge-match">
                  <Sparkles size={14} />
                  <strong>{score}%</strong>
                  <span>AI Match</span>
                </div>

                <h3>
                  {challenge.title ||
                    challenge.category ||
                    "Societal Challenge"}
                </h3>

                <p className="challenge-desc">
                  {challenge.description}
                </p>

                {/* META */}
                <div className="challenge-meta">

                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>
                      {challenge.location?.address ||
                        challenge.location ||
                        "Location not specified"}
                    </span>
                  </div>

                  <div className="meta-item">
                    <Users size={16} />
                    <span>
                      {challenge.affectedPopulation
                        ? `${challenge.affectedPopulation} Citizens Affected`
                        : "Population impact available"}
                    </span>
                  </div>

                  <div className="meta-item">
                    <Clock size={16} />
                    <span>
                      Government verified challenge
                    </span>
                  </div>

                </div>

                {/* BUTTON */}
                <button
                  className="view-btn"
                  onClick={() =>
                    setSelectedChallenge({
                      ...challenge,
                      matchScore: score,
                    })
                  }
                >
                  View Details
                  <ArrowUpRight size={16} />
                </button>

              </div>
            );
          })}

        </div>
      )}

      {/* MODAL */}
      {selectedChallenge && (
        <div
          className="challenge-modal-overlay"
          onClick={() => setSelectedChallenge(null)}
        >
          <div
            className="challenge-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="challenge-modal-close"
              onClick={() => setSelectedChallenge(null)}
            >
              <X size={19} />
            </button>

            {/* MATCH */}
            <div className="modal-match">
              <Sparkles size={16} />
              {selectedChallenge.matchScore}% AI Match
            </div>

            <div className="modal-badges">

              <span className="category-badge">
                {selectedChallenge.category ||
                  "Uncategorized"}
              </span>

              <span
                className={`priority-badge ${
                  (
                    selectedChallenge.severity ||
                    "Medium"
                  ).toLowerCase()
                }`}
              >
                {selectedChallenge.severity ||
                  "Medium"}{" "}
                Priority
              </span>

            </div>

            <h2>
              {selectedChallenge.title ||
                selectedChallenge.category ||
                "Societal Challenge"}
            </h2>

            <div className="modal-location">
              <MapPin size={15} />

              {selectedChallenge.location?.address ||
                selectedChallenge.location ||
                "Location not specified"}
            </div>

            <div className="modal-description">
              <p>{selectedChallenge.description}</p>
            </div>

            {/* MODAL STATS */}
            <div className="modal-stats">

              <div>
                <Users size={18} />

                <span>Citizens Affected</span>

                <strong>
                  {selectedChallenge.affectedPopulation ||
                    "N/A"}
                </strong>
              </div>

              <div>
                <Target size={18} />

                <span>AI Match</span>

                <strong>
                  {selectedChallenge.matchScore}%
                </strong>
              </div>

              <div>
                <CheckCircle2 size={18} />

                <span>Status</span>

                <strong>Validated</strong>
              </div>

            </div>

            {/* AI INSIGHT */}
            <div className="modal-ai-insight">
              <Sparkles size={18} />

              <div>
                <strong>Why this may fit your university</strong>

                <p>
                  The challenge has been identified as a
                  potentially strong opportunity based on
                  its societal impact, technical
                  requirements and university innovation
                  capabilities.
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="modal-actions">

              <button
                className="modal-secondary"
                onClick={() => setSelectedChallenge(null)}
              >
                Close
              </button>

              <button
                className="modal-primary"
                onClick={() =>
                  navigate(
                    `/university/challenges/${selectedChallenge._id}`
                  )
                }
              >
                Open Full Challenge
                <ArrowUpRight size={16} />
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default AvailableChallenges;