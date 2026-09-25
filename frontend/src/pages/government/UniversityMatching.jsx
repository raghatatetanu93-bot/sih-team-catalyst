import { useMemo, useState } from "react";
import {
  GraduationCap,
  Search,
  MapPin,
  Users,
  FlaskConical,
  BriefcaseBusiness,
  Star,
  ArrowUpRight,
  CheckCircle,
  X,
  Building2,
  Target,
  Clock3,
  ChevronDown,
  Check,
} from "lucide-react";

import "./UniversityMatching.css";

function UniversityMatching() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [capacityFilter, setCapacityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("match");

  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [confirmUniversity, setConfirmUniversity] = useState(null);
  const [matchedUniversity, setMatchedUniversity] = useState(null);
  const [showChangeProblem, setShowChangeProblem] = useState(false);

  const matches = [
    {
      id: 1,
      university: "Birla Institute of Technology, Mesra",
      location: "Ranchi",
      expertise: "Water & Environmental Engineering",
      match: 96,
      faculty: 12,
      projects: 28,
      capacity: "Available",
      research: "Water systems, environmental engineering and rural infrastructure",
      reason:
        "Strong expertise in water systems and environmental research with relevant faculty and previous projects.",
    },
    {
      id: 2,
      university: "IIT (ISM) Dhanbad",
      location: "Dhanbad",
      expertise: "Infrastructure & Civil Engineering",
      match: 91,
      faculty: 9,
      projects: 21,
      capacity: "Available",
      research:
        "Infrastructure planning, civil engineering and sustainable development",
      reason:
        "Relevant infrastructure research and civil engineering capability.",
    },
    {
      id: 3,
      university: "Central University of Jharkhand",
      location: "Ranchi",
      expertise: "Environmental Science & Sustainability",
      match: 87,
      faculty: 8,
      projects: 17,
      capacity: "Limited",
      research:
        "Environmental science, sustainability and community development",
      reason:
        "Strong sustainability and environmental research alignment.",
    },
    {
      id: 4,
      university: "National Institute of Technology, Jamshedpur",
      location: "Jamshedpur",
      expertise: "Technology & Smart Infrastructure",
      match: 84,
      faculty: 11,
      projects: 24,
      capacity: "Limited",
      research:
        "Smart infrastructure, technology systems and engineering solutions",
      reason:
        "Strong technical capabilities for smart infrastructure solutions.",
    },
  ];

  const locations = [...new Set(matches.map((item) => item.location))];

  const filteredMatches = useMemo(() => {
    let result = matches.filter((item) => {
      const text = `${item.university} ${item.location} ${item.expertise}`
        .toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());
      const matchesLocation =
        locationFilter === "All" || item.location === locationFilter;
      const matchesCapacity =
        capacityFilter === "All" || item.capacity === capacityFilter;

      return matchesSearch && matchesLocation && matchesCapacity;
    });

    if (sortBy === "match") {
      result.sort((a, b) => b.match - a.match);
    }

    if (sortBy === "faculty") {
      result.sort((a, b) => b.faculty - a.faculty);
    }

    if (sortBy === "projects") {
      result.sort((a, b) => b.projects - a.projects);
    }

    return result;
  }, [search, locationFilter, capacityFilter, sortBy]);

  const handleMatch = (university) => {
    setMatchedUniversity(university);
    setConfirmUniversity(null);
  };

  return (
    <div className="matching-page">

      {/* HEADER */}
      <div className="matching-header">
        <div>
          <p className="eyebrow">AI RESOURCE MATCHING</p>

          <div className="matching-title-row">
            <div className="matching-title-icon">
              <GraduationCap size={24} />
            </div>

            <div>
              <h1>University & Student Matching</h1>
            </div>
          </div>

          <p className="matching-subtitle">
            Match validated societal challenges with universities and
            student teams that have the right expertise and resources.
          </p>
        </div>

        <div className="matching-ai-status">
          <span></span>
          AI Matching Active
        </div>
      </div>

      {/* SELECTED PROBLEM */}
      <section className="selected-problem">
        <div className="selected-problem-icon">
          <FlaskConical size={22} />
        </div>

        <div className="selected-problem-content">
          <span>Selected Validated Problem</span>

          <h2>Rural Water Reliability</h2>

          <p>
            Multiple reports indicate unreliable water supply, dry
            borewells and low pipeline pressure across affected villages.
          </p>

          <div className="problem-tags">
            <span>Water</span>
            <span>Ranchi District</span>
            <span>1,840 potentially affected</span>
          </div>
        </div>

        <button
          className="change-problem-button"
          onClick={() => setShowChangeProblem(true)}
        >
          Change Problem
        </button>
      </section>

      {/* MATCHING CRITERIA */}
      <section className="criteria-card">
        <div className="section-heading">
          <div>
            <h2>AI Matching Criteria</h2>
            <p>
              Recommendations are generated using multiple signals.
            </p>
          </div>
        </div>

        <div className="criteria-grid">
          <div className="criteria-item">
            <GraduationCap size={18} />
            <div>
              <strong>Domain Expertise</strong>
              <span>35%</span>
            </div>
          </div>

          <div className="criteria-item">
            <Users size={18} />
            <div>
              <strong>Faculty Expertise</strong>
              <span>25%</span>
            </div>
          </div>

          <div className="criteria-item">
            <BriefcaseBusiness size={18} />
            <div>
              <strong>Previous Projects</strong>
              <span>20%</span>
            </div>
          </div>

          <div className="criteria-item">
            <FlaskConical size={18} />
            <div>
              <strong>Research Capability</strong>
              <span>10%</span>
            </div>
          </div>

          <div className="criteria-item">
            <CheckCircle size={18} />
            <div>
              <strong>Current Capacity</strong>
              <span>10%</span>
            </div>
          </div>
        </div>
      </section>

      {/* MATCH RESULTS */}
      <section className="matches-card">

        <div className="matches-header">
          <div>
            <h2>Recommended Institutions</h2>
            <p>
              AI-ranked universities based on the selected problem.
            </p>
          </div>

          <div className="match-count">
            {filteredMatches.length} matches
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="matching-toolbar">

          <div className="matching-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search universities or expertise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="matching-select">
            <MapPin size={15} />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="All">All locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>

          <div className="matching-select">
            <Users size={15} />
            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
            >
              <option value="All">All capacity</option>
              <option value="Available">Available</option>
              <option value="Limited">Limited</option>
            </select>
            <ChevronDown size={14} />
          </div>

          <div className="matching-select">
            <Star size={15} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="match">Highest match</option>
              <option value="faculty">Most faculty</option>
              <option value="projects">Most projects</option>
            </select>
            <ChevronDown size={14} />
          </div>

        </div>

        {/* ROWS */}
        <div className="match-list">

          {filteredMatches.length === 0 ? (
            <div className="matching-empty">
              <Search size={30} />
              <h3>No universities found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          ) : (
            filteredMatches.map((match, index) => (
              <div className="match-row" key={match.id}>

                <div className="match-rank">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="university-main">

                  <div className="university-icon">
                    <GraduationCap size={22} />
                  </div>

                  <div>
                    <div className="university-name-row">
                      <h3>{match.university}</h3>

                      {index === 0 && (
                        <span className="best-match">
                          Best Match
                        </span>
                      )}
                    </div>

                    <p>
                      <MapPin size={14} />
                      {match.location}
                    </p>

                    <span className="expertise">
                      {match.expertise}
                    </span>
                  </div>

                </div>

                {/* SCORE */}
                <div className="match-score">
                  <div className="score-circle">
                    <strong>{match.match}%</strong>
                  </div>
                  <span>Match Score</span>
                </div>

                {/* CAPABILITY */}
                <div className="capability">

                  <div>
                    <Users size={14} />
                    <span>{match.faculty} faculty</span>
                  </div>

                  <div>
                    <BriefcaseBusiness size={14} />
                    <span>{match.projects} related projects</span>
                  </div>

                  <span
                    className={`capacity ${match.capacity.toLowerCase()}`}
                  >
                    {match.capacity}
                  </span>

                </div>

                {/* ACTION */}
                <div className="match-actions">

                  <button
                    className="match-view-button"
                    onClick={() => setSelectedUniversity(match)}
                  >
                    View Profile
                    <ArrowUpRight size={15} />
                  </button>

                  <button
                    className="match-assign-button"
                    onClick={() => setConfirmUniversity(match)}
                    disabled={
                      matchedUniversity?.id === match.id
                    }
                  >
                    {matchedUniversity?.id === match.id ? (
                      <>
                        <Check size={15} />
                        Matched
                      </>
                    ) : (
                      <>
                        Match
                        <CheckCircle size={15} />
                      </>
                    )}
                  </button>

                </div>

              </div>
            ))
          )}

        </div>
      </section>

      {/* MATCHED UNIVERSITY */}
      {matchedUniversity && (
        <section className="matched-success-card">

          <div className="matched-success-icon">
            <CheckCircle size={23} />
          </div>

          <div>
            <span>UNIVERSITY MATCHED</span>
            <h3>{matchedUniversity.university}</h3>
            <p>
              This institution has been selected as a potential solution
              partner for the validated problem.
            </p>
          </div>

          <button
            className="matched-project-button"
            onClick={() => alert("Project creation flow opened.")}
          >
            Continue to Project
            <ArrowUpRight size={16} />
          </button>

        </section>
      )}

      {/* WHY MATCH */}
      <section className="why-match-card">

        <div className="why-match-icon">
          <Star size={20} />
        </div>

        <div>
          <strong>
            Why {filteredMatches[0]?.university || "this university"} is
            highly recommended
          </strong>

          <p>
            {filteredMatches[0]?.reason ||
              "No matching explanation is available for the current filters."}
          </p>
        </div>

      </section>

      {/* PROFILE MODAL */}
      {selectedUniversity && (
        <div
          className="matching-modal-overlay"
          onClick={() => setSelectedUniversity(null)}
        >
          <div
            className="matching-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedUniversity(null)}
            >
              <X size={18} />
            </button>

            <div className="modal-university-icon">
              <GraduationCap size={30} />
            </div>

            <span className="modal-eyebrow">
              UNIVERSITY PROFILE
            </span>

            <h2>{selectedUniversity.university}</h2>

            <div className="modal-location">
              <MapPin size={15} />
              {selectedUniversity.location}
            </div>

            <div className="modal-score">
              <div>
                <span>AI MATCH SCORE</span>
                <strong>{selectedUniversity.match}%</strong>
              </div>

              <div className="modal-score-track">
                <div
                  style={{
                    width: `${selectedUniversity.match}%`,
                  }}
                />
              </div>
            </div>

            <div className="modal-stats">

              <div>
                <Users size={18} />
                <strong>{selectedUniversity.faculty}</strong>
                <span>Faculty</span>
              </div>

              <div>
                <BriefcaseBusiness size={18} />
                <strong>{selectedUniversity.projects}</strong>
                <span>Related Projects</span>
              </div>

              <div>
                <FlaskConical size={18} />
                <strong>{selectedUniversity.capacity}</strong>
                <span>Capacity</span>
              </div>

            </div>

            <div className="modal-section">
              <span>CORE EXPERTISE</span>
              <p>{selectedUniversity.expertise}</p>
            </div>

            <div className="modal-section">
              <span>RESEARCH CAPABILITY</span>
              <p>{selectedUniversity.research}</p>
            </div>

            <div className="modal-section">
              <span>WHY THIS MATCH</span>
              <p>{selectedUniversity.reason}</p>
            </div>

            <button
              className="modal-match-button"
              onClick={() => {
                setSelectedUniversity(null);
                setConfirmUniversity(selectedUniversity);
              }}
            >
              <CheckCircle size={17} />
              Match This University
            </button>

          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {confirmUniversity && (
        <div className="matching-modal-overlay">

          <div className="confirm-modal">

            <div className="confirm-icon">
              <Target size={24} />
            </div>

            <h2>Confirm University Match</h2>

            <p>
              Are you sure you want to match{" "}
              <strong>{confirmUniversity.university}</strong>{" "}
              with the selected societal challenge?
            </p>

            <div className="confirm-problem">
              <span>SELECTED PROBLEM</span>
              <strong>Rural Water Reliability</strong>
            </div>

            <div className="confirm-actions">
              <button
                className="cancel-button"
                onClick={() => setConfirmUniversity(null)}
              >
                Cancel
              </button>

              <button
                className="confirm-button"
                onClick={() => handleMatch(confirmUniversity)}
              >
                <CheckCircle size={16} />
                Confirm Match
              </button>
            </div>

          </div>

        </div>
      )}

      {/* CHANGE PROBLEM MODAL */}
      {showChangeProblem && (
        <div
          className="matching-modal-overlay"
          onClick={() => setShowChangeProblem(false)}
        >
          <div
            className="confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="confirm-icon">
              <Building2 size={24} />
            </div>

            <h2>Change Selected Problem</h2>

            <p>
              Problem selection is currently connected to the validated
              problem workflow. Choose a different validated problem from
              the Problems or Validation section.
            </p>

            <button
              className="modal-match-button"
              onClick={() => setShowChangeProblem(false)}
            >
              <Check size={16} />
              Continue
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default UniversityMatching;