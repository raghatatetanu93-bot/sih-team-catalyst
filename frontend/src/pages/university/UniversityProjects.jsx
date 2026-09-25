import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  Flag,
  Search,
  TrendingUp,
  CheckCircle2,
  Clock3,
  FolderKanban,
  ArrowRight,
  X,
  Target,
} from "lucide-react";
import api from "../../api";

import "./UniversityProjects.css";

const DEFAULT_UNIVERSITY_PROJECTS = [
  {
    id: 1,
    title: "Smart Water Grid IoT Prototype",
    challenge: "Smart Water Grid Management",
    category: "Water",
    status: "Development",
    progress: 45,
    lead: "Dr. A. Sharma",
    team: 8,
    startDate: "Aug 15, 2026",
    endDate: "Feb 15, 2027",
    impact: "12,500+ citizens",
    description:
      "An IoT-powered water monitoring system designed to detect supply issues, monitor usage, and improve rural water reliability.",
    nextMilestone: "Sensor integration",
  },
  {
    id: 2,
    title: "Offline LMS Application",
    challenge: "Rural Education Offline Portal",
    category: "Education",
    status: "Testing",
    progress: 80,
    lead: "Prof. K. Singh",
    team: 6,
    startDate: "Jul 01, 2026",
    endDate: "Nov 01, 2026",
    impact: "8,400+ students",
    description:
      "An offline-first learning platform that allows students in low-connectivity areas to access educational content and assessments.",
    nextMilestone: "Field testing",
  },
  {
    id: 3,
    title: "Traffic Vision AI",
    challenge: "Traffic Congestion Prediction",
    category: "Infrastructure",
    status: "Research",
    progress: 15,
    lead: "Dr. R. Verma",
    team: 5,
    startDate: "Sep 01, 2026",
    endDate: "May 01, 2027",
    impact: "31,000+ commuters",
    description:
      "A computer-vision based traffic analysis solution designed to identify congestion patterns and support smarter traffic planning.",
    nextMilestone: "Dataset validation",
  },
];

function UniversityProjects() {
  const [projectsList, setProjectsList] = useState(DEFAULT_UNIVERSITY_PROJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        if (res.data && res.data.length > 0) {
          const mapped = res.data.map((p) => ({
            id: p._id,
            _id: p._id,
            title: p.title || "Innovation Solution Proposal",
            challenge:
              p.problemId?.title ||
              p.problemId?.category ||
              "Societal Solution Challenge",
            category: p.problemId?.category || "Infrastructure",
            status:
              p.status === "Submitted"
                ? "Development"
                : p.status || "Development",
            progress: 50,
            lead: p.facultyMentor || "Faculty Mentor",
            team: p.studentTeam?.length || 4,
            startDate: new Date(p.createdAt || Date.now()).toLocaleDateString(),
            endDate: "Ongoing",
            impact: p.problemId?.affectedPopulation
              ? `${Number(p.problemId.affectedPopulation).toLocaleString()}+ citizens`
              : "10,000+ citizens",
            description:
              p.proposalDescription ||
              p.problemId?.description ||
              "Ongoing university-led technical development.",
            nextMilestone: "Prototype Validation",
          }));
          setProjectsList(mapped);
        }
      } catch (err) {
        console.warn("Could not fetch remote projects, using fallback:", err);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(search) ||
        project.challenge.toLowerCase().includes(search) ||
        project.lead.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || project.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [projectsList, searchTerm, statusFilter, categoryFilter]);

  const totalProjects = projectsList.length;

  const activeProjects = projectsList.filter(
    (project) => project.status !== "Completed"
  ).length;

  const testingProjects = projectsList.filter(
    (project) => project.status === "Testing"
  ).length;

  const averageProgress = Math.round(
    projectsList.reduce((sum, project) => sum + (project.progress || 0), 0) /
      (projectsList.length || 1)
  );

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setCategoryFilter("All");
  };

  return (
    <div className="projects-container">
      {/* HEADER */}
      <div className="projects-header">
        <div>
          <p className="projects-eyebrow">UNIVERSITY PROJECTS</p>
          <h1>My Projects</h1>
          <p>
            Track and manage your university's ongoing solutions for
            societal challenges.
          </p>
        </div>

        <div className="project-header-badge">
          <FolderKanban size={18} />
          {totalProjects} Active Initiatives
        </div>
      </div>

      {/* STATS */}
      <div className="project-stats">
        <div className="project-stat-card">
          <div className="project-stat-icon blue">
            <FolderKanban size={21} />
          </div>
          <div>
            <span>Total Projects</span>
            <strong>{totalProjects}</strong>
          </div>
        </div>

        <div className="project-stat-card">
          <div className="project-stat-icon green">
            <TrendingUp size={21} />
          </div>
          <div>
            <span>Active Projects</span>
            <strong>{activeProjects}</strong>
          </div>
        </div>

        <div className="project-stat-card">
          <div className="project-stat-icon purple">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>In Testing</span>
            <strong>{testingProjects}</strong>
          </div>
        </div>

        <div className="project-stat-card">
          <div className="project-stat-icon orange">
            <Target size={21} />
          </div>
          <div>
            <span>Average Progress</span>
            <strong>{averageProgress}%</strong>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="projects-toolbar">
        <div className="project-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search projects, challenges or leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Research">Research</option>
          <option value="Development">Development</option>
          <option value="Testing">Testing</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Water">Water</option>
          <option value="Education">Education</option>
          <option value="Infrastructure">Infrastructure</option>
        </select>

        {(searchTerm ||
          statusFilter !== "All" ||
          categoryFilter !== "All") && (
          <button
            className="clear-project-filters"
            onClick={clearFilters}
          >
            <X size={15} />
            Clear
          </button>
        )}
      </div>

      {/* RESULT INFO */}
      <div className="projects-result-row">
        <span>
          Showing <strong>{filteredProjects.length}</strong> projects
        </span>

        <span className="project-average">
          Average completion: <strong>{averageProgress}%</strong>
        </span>
      </div>

      {/* PROJECTS */}
      {filteredProjects.length === 0 ? (
        <div className="projects-empty">
          <FolderKanban size={42} />
          <h3>No projects found</h3>
          <p>
            Try changing your search or filters to find another project.
          </p>
          <button onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card"
            >
              {/* CARD TOP */}
              <div className="project-card-header">
                <div className="project-card-title">
                  <div className="project-category-row">
                    <span className="project-category">
                      {project.category}
                    </span>

                    <span
                      className={`status-badge ${project.status.toLowerCase()}`}
                    >
                      {project.status.toUpperCase()}
                    </span>
                  </div>

                  <h3>{project.title}</h3>

                  <p className="challenge-name">
                    <Flag size={14} />
                    {project.challenge}
                  </p>
                </div>
              </div>

              {/* PROGRESS */}
              <div className="project-progress">
                <div className="progress-header">
                  <span>Project Progress</span>
                  <strong>{project.progress}%</strong>
                </div>

                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  ></div>
                </div>

                <div className="progress-foot">
                  <span>
                    {project.progress >= 75
                      ? "Near completion"
                      : project.progress >= 40
                      ? "Good progress"
                      : "Early stage"}
                  </span>

                  <span>{project.nextMilestone}</span>
                </div>
              </div>

              {/* META */}
              <div className="project-meta">
                <div className="meta-row">
                  <Users size={16} />
                  <span>
                    <strong>Lead:</strong> {project.lead}
                  </span>
                </div>

                <div className="meta-row">
                  <Users size={16} />
                  <span>
                    <strong>Team:</strong> {project.team} members
                  </span>
                </div>

                <div className="meta-row">
                  <Calendar size={16} />
                  <span>
                    {project.startDate} — {project.endDate}
                  </span>
                </div>
              </div>

              {/* FOOTER */}
              <div className="project-card-footer">
                <div>
                  <span>Expected Impact</span>
                  <strong>{project.impact}</strong>
                </div>

                <button
                  className="details-button"
                  onClick={() => setSelectedProject(project)}
                >
                  Details
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              <X size={19} />
            </button>

            <div className="modal-category">
              {selectedProject.category}
            </div>

            <h2>{selectedProject.title}</h2>

            <p className="modal-challenge">
              Solving: <strong>{selectedProject.challenge}</strong>
            </p>

            <div className="modal-progress-box">
              <div className="modal-progress-top">
                <span>Overall Progress</span>
                <strong>
                  {selectedProject.progress}%
                </strong>
              </div>

              <div className="modal-progress-bar">
                <div
                  style={{
                    width: `${selectedProject.progress}%`,
                  }}
                ></div>
              </div>
            </div>

            <p className="modal-description">
              {selectedProject.description}
            </p>

            <div className="modal-details-grid">
              <div>
                <span>Project Lead</span>
                <strong>{selectedProject.lead}</strong>
              </div>

              <div>
                <span>Team Size</span>
                <strong>{selectedProject.team} members</strong>
              </div>

              <div>
                <span>Start Date</span>
                <strong>{selectedProject.startDate}</strong>
              </div>

              <div>
                <span>End Date</span>
                <strong>{selectedProject.endDate}</strong>
              </div>

              <div>
                <span>Expected Impact</span>
                <strong>{selectedProject.impact}</strong>
              </div>

              <div>
                <span>Next Milestone</span>
                <strong>{selectedProject.nextMilestone}</strong>
              </div>
            </div>

            <Link
              to={`/university/projects/${selectedProject.id}`}
              className="modal-collab-button"
            >
              Open Collaboration Space
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UniversityProjects;