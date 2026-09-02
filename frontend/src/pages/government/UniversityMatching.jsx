import { useNavigate } from "react-router-dom";
import "./UniversityMatching.css";
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
} from "lucide-react";

function UniversityMatching() {
    const navigate = useNavigate();

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
      reason: "Strong expertise in water systems and environmental research.",
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
      reason: "Relevant infrastructure research and civil engineering capability.",
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
      reason: "Strong sustainability and environmental research alignment.",
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
      reason: "Strong technical capabilities for smart infrastructure solutions.",
    },
  ];

  return (
    <div className="matching-page">

      {/* HEADER */}
      <div className="matching-header">
        <div>
          <p className="eyebrow">AI RESOURCE MATCHING</p>

          <div className="matching-title-row">
            <div className="matching-title-icon">
              <GraduationCap size={22} />
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
          <FlaskConical size={20} />
        </div>

        <div className="selected-problem-content">
          <span>Selected Validated Problem</span>

          <h2>Rural Water Reliability</h2>

          <p>
            Multiple reports indicate unreliable water supply,
            dry borewells and low pipeline pressure across affected
            villages.
          </p>

          <div className="problem-tags">
            <span>Water</span>
            <span>Ranchi District</span>
            <span>1,840 potentially affected</span>
          </div>
        </div>

        <button className="change-problem-button">
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
            4 matches
          </div>
        </div>

        <div className="match-list">

          {matches.map((match, index) => (
            <div className="match-row" key={match.id}>

              {/* RANK */}

              <div className="match-rank">
                0{index + 1}
              </div>

              {/* UNIVERSITY */}

              <div className="university-main">

                <div className="university-icon">
                  <GraduationCap size={21} />
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

              {/* MATCH SCORE */}

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
                  className={`capacity ${
                    match.capacity.toLowerCase()
                  }`}
                >
                  {match.capacity}
                </span>

              </div>

              {/* ACTION */}

             <button
  className="match-view-button"
  onClick={() => navigate(`/university-profile/${match.id}`)}
>
  View Profile
  <ArrowUpRight size={15} />
</button>
            </div>
          ))}

        </div>

      </section>

      {/* WHY THIS MATCH */}

      <section className="why-match-card">

        <div className="why-match-icon">
          <Star size={20} />
        </div>

        <div>
          <strong>Why BIT Mesra is the top recommendation</strong>

          <p>
            The AI identified strong alignment between the problem's
            water-system requirements and the institution's existing
            environmental engineering expertise, faculty capability
            and previous related projects.
          </p>
        </div>

      </section>

    </div>
  );
}

export default UniversityMatching;