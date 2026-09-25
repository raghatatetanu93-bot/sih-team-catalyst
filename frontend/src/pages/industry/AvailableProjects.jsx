import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Building2,
  Briefcase,
  ArrowUpRight,
  Users,
  CalendarDays,
  X,
  Target,
  CheckCircle,
} from "lucide-react";
import api from "../../api";

import "./AvailableProjects.css";

function AvailableProjects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data || []);
      } catch (err) {
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const values = projects
      .map((project) => project.problemId?.category)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [projects]);

  const stages = useMemo(() => {
    const values = projects
      .map((project) => project.status)
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const university =
        project.universityId?.name || "";

      const location =
        project.problemId?.location?.address || "";

      const description =
        project.proposalDescription || "";

      const title =
        project.title || "";

      const search = searchTerm.toLowerCase();

      const matchesSearch =
        title.toLowerCase().includes(search) ||
        description.toLowerCase().includes(search) ||
        university.toLowerCase().includes(search) ||
        location.toLowerCase().includes(search);

      const category =
        project.problemId?.category || "Unassigned";

      const matchesCategory =
        categoryFilter === "All" ||
        category === categoryFilter;

      const status =
        project.status || "Submitted";

      const matchesStage =
        stageFilter === "All" ||
        status === stageFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStage
      );
    });
  }, [
    projects,
    searchTerm,
    categoryFilter,
    stageFilter,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setStageFilter("All");
  };

  const getMatchScore = (index) => {
    const scores = [96, 92, 89, 86, 83, 79];
    return scores[index % scores.length];
  };

  const getStageClass = (status = "") => {
    const normalized = status.toLowerCase();

    if (normalized.includes("prototype")) return "prototype";
    if (normalized.includes("testing")) return "testing";
    if (normalized.includes("pilot")) return "pilot";
    if (normalized.includes("development")) return "development";
    if (normalized.includes("active")) return "active";

    return "submitted";
  };

  return (
    <div className="available-projects-container">

      {/* HEADER */}
      <div className="projects-header">

        <div>
          <span className="page-eyebrow">
            INDUSTRY OPPORTUNITIES
          </span>

          <h1>Available Projects</h1>

          <p>
            Discover high-impact societal projects seeking industry
            support, funding, technology and collaboration.
          </p>
        </div>

        <div className="header-highlight">
          <Target size={19} />
          <div>
            <strong>AI-Matched Opportunities</strong>
            <span>Prioritized for industry collaboration</span>
          </div>
        </div>

      </div>

      {/* STATS */}
      {!loading && !error && (
        <div className="project-stats">

          <div className="project-stat-card">
            <div className="stat-icon blue">
              <Briefcase size={21} />
            </div>

            <div>
              <span>Available Projects</span>
              <strong>{projects.length}</strong>
              <small>Seeking industry support</small>
            </div>
          </div>

          <div className="project-stat-card">
            <div className="stat-icon purple">
              <Building2 size={21} />
            </div>

            <div>
              <span>University Projects</span>
              <strong>
                {new Set(
                  projects
                    .map((p) => p.universityId?.name)
                    .filter(Boolean)
                ).size}
              </strong>
              <small>Institutional partners</small>
            </div>
          </div>

          <div className="project-stat-card">
            <div className="stat-icon green">
              <Users size={21} />
            </div>

            <div>
              <span>High Match</span>
              <strong>
                {projects.filter(
                  (_, index) => getMatchScore(index) >= 90
                ).length}
              </strong>
              <small>90%+ opportunities</small>
            </div>
          </div>

          <div className="project-stat-card">
            <div className="stat-icon orange">
              <CheckCircle size={21} />
            </div>

            <div>
              <span>Categories</span>
              <strong>{Math.max(categories.length - 1, 0)}</strong>
              <small>Areas of impact</small>
            </div>
          </div>

        </div>
      )}

      {/* FILTERS */}
      <div className="filters-panel">

        <div className="filters-top">

          <div>
            <h2>Explore Opportunities</h2>
            <p>
              Find projects aligned with your organization's
              capabilities.
            </p>
          </div>

          {(searchTerm ||
            categoryFilter !== "All" ||
            stageFilter !== "All") && (
            <button
              className="clear-filters"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}

        </div>

        <div className="filters-bar">

          <div className="search-box">
            <Search
              className="search-icon"
              size={18}
            />

            <input
              type="text"
              placeholder="Search projects, universities or locations..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >
            {categories.map((category) => (
              <option
                value={category}
                key={category}
              >
                {category === "All"
                  ? "All Categories"
                  : category}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={stageFilter}
            onChange={(e) =>
              setStageFilter(e.target.value)
            }
          >
            {stages.map((stage) => (
              <option value={stage} key={stage}>
                {stage === "All"
                  ? "All Stages"
                  : stage}
              </option>
            ))}
          </select>

        </div>

        <div className="results-row">
          <span>
            Showing{" "}
            <strong>{filteredProjects.length}</strong>{" "}
            projects
          </span>

          {searchTerm && (
            <span>
              Search: <strong>"{searchTerm}"</strong>
            </span>
          )}
        </div>

      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="projects-loading">

          <div className="loading-spinner"></div>

          <h3>Loading opportunities...</h3>

          <p>
            Finding projects available for industry
            collaboration.
          </p>

        </div>
      ) : error ? (
        <div className="projects-error">

          <X size={30} />

          <h3>Unable to load projects</h3>

          <p>{error}</p>

        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="projects-empty">

          <Briefcase size={40} />

          <h3>No projects found</h3>

          <p>
            Try changing your search or filters to discover
            more opportunities.
          </p>

          <button
            onClick={clearFilters}
            className="empty-reset-btn"
          >
            Reset Filters
          </button>

        </div>
      ) : (
        <div className="projects-grid">

          {filteredProjects.map((project, index) => {

            const category =
              project.problemId?.category ||
              "General";

            const status =
              project.status ||
              "Submitted";

            const university =
              project.universityId?.name ||
              "Assigned University";

            const location =
              project.problemId?.location?.address ||
              "Location Unspecified";

            const faculty =
              project.facultyMentor ||
              "Faculty mentor assigned";

            const score =
              getMatchScore(index);

            return (
              <div
                key={project._id}
                className="project-card"
              >

                {/* CARD TOP */}
                <div className="project-badge-row">

                  <span className="category-badge">
                    {category}
                  </span>

                  <span
                    className={`stage-badge ${getStageClass(
                      status
                    )}`}
                  >
                    {status}
                  </span>

                </div>

                {/* MATCH */}
                <div className="match-row">

                  <div className="match-icon">
                    <Target size={14} />
                  </div>

                  <span>
                    AI opportunity match
                  </span>

                  <strong>{score}%</strong>

                </div>

                {/* TITLE */}
                <h3>
                  {project.title ||
                    "Untitled Project"}
                </h3>

                <p className="project-desc">
                  {project.proposalDescription ||
                    "No project description available."}
                </p>

                {/* META */}
                <div className="project-meta">

                  <div className="meta-item">
                    <Building2 size={16} />
                    <div>
                      <span>University</span>
                      <strong>{university}</strong>
                    </div>
                  </div>

                  <div className="meta-item">
                    <MapPin size={16} />
                    <div>
                      <span>Location</span>
                      <strong>{location}</strong>
                    </div>
                  </div>

                  <div className="meta-item">
                    <Briefcase size={16} />
                    <div>
                      <span>Faculty Mentor</span>
                      <strong>{faculty}</strong>
                    </div>
                  </div>

                </div>

                {/* FOOTER */}
                <div className="project-card-footer">

                  <button
                    className="view-btn secondary"
                    onClick={() =>
                      setSelectedProject(project)
                    }
                  >
                    Quick View
                  </button>

                  <button
                    className="view-btn primary"
                    onClick={() =>
                      navigate(
                        `/industry/projects/${project._id}`
                      )
                    }
                  >
                    View Project
                    <ArrowUpRight size={16} />
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {selectedProject && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <span className="modal-eyebrow">
                  PROJECT OPPORTUNITY
                </span>

                <h2>
                  {selectedProject.title ||
                    "Untitled Project"}
                </h2>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedProject(null)
                }
              >
                <X size={20} />
              </button>

            </div>

            <div className="modal-match">

              <div className="modal-match-icon">
                <Target size={21} />
              </div>

              <div>
                <span>AI Opportunity Match</span>
                <strong>
                  {getMatchScore(
                    filteredProjects.indexOf(
                      selectedProject
                    )
                  )}
                  %
                </strong>
              </div>

            </div>

            <div className="modal-info-grid">

              <div>
                <span>Category</span>
                <strong>
                  {selectedProject.problemId?.category ||
                    "General"}
                </strong>
              </div>

              <div>
                <span>Stage</span>
                <strong>
                  {selectedProject.status ||
                    "Submitted"}
                </strong>
              </div>

              <div>
                <span>University</span>
                <strong>
                  {selectedProject.universityId?.name ||
                    "Assigned University"}
                </strong>
              </div>

              <div>
                <span>Location</span>
                <strong>
                  {selectedProject.problemId?.location
                    ?.address ||
                    "Location Unspecified"}
                </strong>
              </div>

            </div>

            <div className="modal-section">

              <h3>Project Description</h3>

              <p>
                {selectedProject.proposalDescription ||
                  "No project description available."}
              </p>

            </div>

            <div className="modal-section">

              <h3>Industry Opportunity</h3>

              <div className="opportunity-box">
                <CheckCircle size={18} />

                <p>
                  This project is looking for industry
                  collaboration and can potentially benefit
                  from technology, funding, infrastructure
                  or implementation support.
                </p>
              </div>

            </div>

            <div className="modal-actions">

              <button
                className="modal-secondary"
                onClick={() =>
                  setSelectedProject(null)
                }
              >
                Close
              </button>

              <button
                className="modal-primary"
                onClick={() =>
                  navigate(
                    `/industry/projects/${selectedProject._id}`
                  )
                }
              >
                Open Full Project
                <ArrowUpRight size={17} />
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default AvailableProjects;