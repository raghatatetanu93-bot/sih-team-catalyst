import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Projects.css";


import {
  FolderKanban,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  GraduationCap,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: "Rural Water Reliability System",
      problem: "Unreliable water supply across rural villages",
      university: "Birla Institute of Technology, Mesra",
      status: "In Progress",
      progress: 68,
      deadline: "Dec 2026",
      priority: "High",
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
    },
  ];

  // SEARCH FILTER
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        <button className="create-project-button">
          + Create Project
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
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>


        <button>All Status ▾</button>

        <button>All Universities ▾</button>

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

          <span>{filteredProjects.length} projects</span>

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
                    <FolderKanban size={20} />
                  </div>


                  <div>

                    <div className="project-title-row">

                      <h3>{project.title}</h3>

                      <span
                        className={`project-priority ${project.priority.toLowerCase()}`}
                      >
                        {project.priority}
                      </span>

                    </div>


                    <p>
                      {project.problem}
                    </p>


                    <small>

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

                </div>


                {/* VIEW BUTTON */}

               <button
  className="project-view-button"
  onClick={() => navigate(`/government/projects/${project.id}`)}
>
  View Project
  <ArrowUpRight size={15} />
</button>

              </div>

            ))

          ) : (

            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "#64748b",
              }}
            >
              No projects found.
            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Projects;