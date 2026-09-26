import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Projects.css";
import api from "../../api";

import {
  FolderKanban,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  GraduationCap,
  Calendar,
  ArrowUpRight,
  Plus,
  X,
  Users,
  Target,
  ChevronDown,
} from "lucide-react";

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "Rural Water Reliability System",
    problem: "Unreliable water supply across rural villages",
    university: "Birla Institute of Technology, Mesra",
    status: "In Progress",
    progress: 68,
    deadline: "Dec 2026",
    priority: "High",
    faculty: 12,
    students: 18,
    milestones: 7,
    completedMilestones: 5,
    impact: "1,840 people",
  },
  {
    id: 2,
    title: "Smart Flood Monitoring Network",
    problem: "Recurring urban flooding in Ranchi",
    university: "IIT (ISM) Dhanbad",
    status: "In Progress",
    progress: 42,
    deadline: "Jan 2027",
    priority: "High",
    faculty: 9,
    students: 14,
    milestones: 8,
    completedMilestones: 3,
    impact: "12,500 people",
  },
  {
    id: 3,
    title: "Waste Collection Optimization",
    problem: "Irregular garbage collection in urban areas",
    university: "NIT Jamshedpur",
    status: "Planning",
    progress: 18,
    deadline: "Mar 2027",
    priority: "Medium",
    faculty: 7,
    students: 11,
    milestones: 6,
    completedMilestones: 1,
    impact: "8,200 people",
  },
  {
    id: 4,
    title: "Primary Healthcare Access Study",
    problem: "Shortage of healthcare staff in rural PHCs",
    university: "Central University of Jharkhand",
    status: "Completed",
    progress: 100,
    deadline: "Completed",
    priority: "Medium",
    faculty: 8,
    students: 15,
    milestones: 5,
    completedMilestones: 5,
    impact: "5,600 people",
  },
];

function Projects() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [universityFilter, setUniversityFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectsList, setProjectsList] = useState(DEFAULT_PROJECTS);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        if (res.data && res.data.length > 0) {
          const mapped = res.data.map((p) => ({
            id: p._id,
            _id: p._id,
            title: p.title || "Societal Solution Proposal",
            problem:
              p.problemId?.description ||
              p.proposalDescription ||
              "Addressing prioritized societal issue.",
            university:
              p.universityId?.name || "Birla Institute of Technology, Mesra",
            status:
              p.status === "Submitted"
                ? "In Progress"
                : p.status || "In Progress",
            progress: 50,
            deadline: new Date(p.createdAt || Date.now()).toLocaleDateString(),
            priority: "High",
            faculty: 4,
            students: p.studentTeam?.length || 6,
            milestones: 4,
            completedMilestones: 2,
            impact: p.problemId?.affectedPopulation
              ? `${Number(p.problemId.affectedPopulation).toLocaleString()} people`
              : "12,000 people",
          }));
          setProjectsList(mapped);
        }
      } catch (err) {
        console.warn("Could not fetch government projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const universities = [
    ...new Set(projectsList.map((project) => project.university)),
  ];

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(search) ||
        project.problem.toLowerCase().includes(search) ||
        project.university.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      const matchesUniversity =
        universityFilter === "All" ||
        project.university === universityFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        project.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesUniversity &&
        matchesPriority
      );
    });
  }, [
    searchTerm,
    statusFilter,
    universityFilter,
    priorityFilter,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setUniversityFilter("All");
    setPriorityFilter("All");
  };

  return (
    <div className="projects-page">

      {/* HEADER */}
      <div className="projects-header">

        <div>
          <p className="eyebrow">PROJECT MANAGEMENT</p>

          <h1>Societal Innovation Projects</h1>

          <p>
            Track projects created to solve validated societal challenges
            across Jharkhand.
          </p>
        </div>

        <button
          className="create-project-button"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={17} />
          Create Project
        </button>

      </div>

      {/* STATS */}
      <div className="project-stats">

        <div className="project-stat">
          <div className="project-stat-icon blue">
            <FolderKanban size={21} />
          </div>

          <div>
            <span>Total Projects</span>
            <strong>42</strong>
          </div>
        </div>

        <div className="project-stat">
          <div className="project-stat-icon orange">
            <Clock size={21} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>24</strong>
          </div>
        </div>

        <div className="project-stat">
          <div className="project-stat-icon green">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Completed</span>
            <strong>13</strong>
          </div>
        </div>

        <div className="project-stat">
          <div className="project-stat-icon red">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>High Priority</span>
            <strong>8</strong>
          </div>
        </div>

      </div>

      {/* TOOLBAR */}
      <div className="projects-toolbar">

        <div className="projects-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search projects, problems or universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="project-filter">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Planning">Planning</option>
            <option value="Completed">Completed</option>
          </select>

          <ChevronDown size={14} />
        </div>

        <div className="project-filter">
          <select
            value={universityFilter}
            onChange={(e) => setUniversityFilter(e.target.value)}
          >
            <option value="All">All Universities</option>

            {universities.map((university) => (
              <option key={university} value={university}>
                {university}
              </option>
            ))}
          </select>

          <ChevronDown size={14} />
        </div>

        <div className="project-filter">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <ChevronDown size={14} />
        </div>

        {(searchTerm ||
          statusFilter !== "All" ||
          universityFilter !== "All" ||
          priorityFilter !== "All") && (
          <button
            className="clear-project-filters"
            onClick={clearFilters}
          >
            Clear
          </button>
        )}

      </div>

      {/* PROJECT LIST */}
      <div className="projects-card">

        <div className="projects-card-header">

          <div>
            <h2>Active Projects</h2>

            <p>
              Government-monitored innovation projects
            </p>
          </div>

          <span>
            {filteredProjects.length} projects
          </span>

        </div>

        <div className="projects-list">

          {filteredProjects.length > 0 ? (

            filteredProjects.map((project) => (

              <div
                className="project-row"
                key={project.id}
              >

                {/* PROJECT INFO */}
                <div className="project-main">

                  <div className="project-icon">
                    <FolderKanban size={21} />
                  </div>

                  <div>

                    <div className="project-title-row">

                      <h3 title={project.title}>{project.title}</h3>

                      <span
                        className={`project-priority ${project.priority.toLowerCase()}`}
                        title={`Priority: ${project.priority}`}
                      >
                        {project.priority}
                      </span>

                    </div>

                    <p title={project.problem}>
                      {project.problem}
                    </p>

                    <small title={project.university}>
                      <GraduationCap size={14} />
                      {project.university}
                    </small>

                  </div>

                </div>

                {/* PROGRESS */}
                <div className="project-progress">

                  <div className="progress-label">
                    <span>Progress</span>
                    <strong>{project.progress}%</strong>
                  </div>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />

                  </div>

                  <small className="milestone-text">
                    {project.completedMilestones}/
                    {project.milestones} milestones completed
                  </small>

                </div>

                {/* STATUS */}
                <div className="project-meta">

                  <span
                    className={`project-status ${project.status
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {project.status}
                  </span>

                  <small>
                    <Calendar size={14} />
                    {project.deadline}
                  </small>

                  <small>
                    <Users size={14} />
                    {project.students} students
                  </small>

                </div>

                {/* VIEW */}
                <button
                  className="project-view-button"
                  onClick={() => setSelectedProject(project)}
                >
                  View Project
                  <ArrowUpRight size={15} />
                </button>

              </div>

            ))

          ) : (

            <div className="projects-empty">

              <FolderKanban size={36} />

              <h3>No projects found</h3>

              <p>
                Try changing your search or filters.
              </p>

              <button onClick={clearFilters}>
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </div>

      {/* PROJECT DETAIL MODAL */}
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
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
            >
              <X size={18} />
            </button>

            <div className="project-modal-icon">
              <FolderKanban size={26} />
            </div>

            <span className="modal-eyebrow">
              PROJECT DETAILS
            </span>

            <h2>{selectedProject.title}</h2>

            <p className="modal-problem">
              {selectedProject.problem}
            </p>

            <div className="modal-status-row">

              <span
                className={`project-status ${selectedProject.status
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
              >
                {selectedProject.status}
              </span>

              <span
                className={`project-priority ${selectedProject.priority.toLowerCase()}`}
              >
                {selectedProject.priority} Priority
              </span>

            </div>

            {/* PROGRESS */}
            <div className="modal-progress">

              <div>
                <span>Project Progress</span>
                <strong>{selectedProject.progress}%</strong>
              </div>

              <div className="modal-progress-bar">
                <div
                  style={{
                    width: `${selectedProject.progress}%`,
                  }}
                />
              </div>

            </div>

            {/* STATS */}
            <div className="modal-project-stats">

              <div>
                <GraduationCap size={18} />
                <strong>{selectedProject.faculty}</strong>
                <span>Faculty</span>
              </div>

              <div>
                <Users size={18} />
                <strong>{selectedProject.students}</strong>
                <span>Students</span>
              </div>

              <div>
                <Target size={18} />
                <strong>
                  {selectedProject.completedMilestones}/
                  {selectedProject.milestones}
                </strong>
                <span>Milestones</span>
              </div>

            </div>

            {/* UNIVERSITY */}
            <div className="modal-info-block">

              <span>UNIVERSITY PARTNER</span>

              <strong>
                <GraduationCap size={16} />
                {selectedProject.university}
              </strong>

            </div>

            {/* IMPACT */}
            <div className="modal-info-block">

              <span>EXPECTED / REPORTED IMPACT</span>

              <strong>
                <Users size={16} />
                {selectedProject.impact}
              </strong>

            </div>

            {/* DEADLINE */}
            <div className="modal-info-block">

              <span>PROJECT DEADLINE</span>

              <strong>
                <Calendar size={16} />
                {selectedProject.deadline}
              </strong>

            </div>

            <button
              className="open-project-button"
              onClick={() =>
                navigate(`/government/projects/${selectedProject.id}`)
              }
            >
              Open Full Project
              <ArrowUpRight size={16} />
            </button>

          </div>

        </div>

      )}

      {/* CREATE PROJECT MODAL */}
      {showCreateModal && (

        <div
          className="project-modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >

          <div
            className="create-project-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="project-modal-close"
              onClick={() => setShowCreateModal(false)}
            >
              <X size={18} />
            </button>

            <div className="create-project-icon">
              <Plus size={25} />
            </div>

            <span className="modal-eyebrow">
              PROJECT CREATION
            </span>

            <h2>Create Innovation Project</h2>

            <p>
              Projects should be created after a validated societal
              problem has been matched with a suitable university or
              solution partner.
            </p>

            <div className="create-flow">

              <div>
                <span>01</span>
                <strong>Validated Problem</strong>
              </div>

              <div>
                <span>02</span>
                <strong>University Match</strong>
              </div>

              <div>
                <span>03</span>
                <strong>Project Setup</strong>
              </div>

            </div>

            <button
              className="open-matching-button"
              onClick={() => {
                setShowCreateModal(false);
                navigate("/government/university-matching");
              }}
            >
              Go to University Matching
              <ArrowUpRight size={16} />
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Projects;