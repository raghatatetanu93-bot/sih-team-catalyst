import { Link } from "react-router-dom";
import { Users, Calendar, Flag } from "lucide-react";

import "./UniversityProjects.css";

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Smart Water Grid IoT Prototype",
    challenge: "Smart Water Grid Management",
    category: "Water",
    status: "Development",
    progress: 45,
    lead: "Dr. A. Sharma",
    startDate: "Aug 15, 2026",
    endDate: "Feb 15, 2027",
  },
  {
    id: 2,
    title: "Offline LMS Application",
    challenge: "Rural Education Offline Portal",
    category: "Education",
    status: "Testing",
    progress: 80,
    lead: "Prof. K. Singh",
    startDate: "Jul 01, 2026",
    endDate: "Nov 01, 2026",
  },
  {
    id: 3,
    title: "Traffic Vision AI",
    challenge: "Traffic Congestion Prediction",
    category: "Infrastructure",
    status: "Research",
    progress: 15,
    lead: "Dr. R. Verma",
    startDate: "Sep 01, 2026",
    endDate: "May 01, 2027",
  }
];

function UniversityProjects() {
  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>My Projects</h1>
        <p>Track and manage your university's ongoing solutions for societal challenges.</p>
      </div>

      <div className="projects-grid">
        {MOCK_PROJECTS.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-card-header">
              <div>
                <h3>{project.title}</h3>
                <span className="project-category">{project.category}</span>
              </div>
              <span className={`status-badge ${project.status.toLowerCase()}`}>
                {project.status.toUpperCase()}
              </span>
            </div>

            <div className="project-progress">
              <div className="progress-header">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="project-meta">
              <div className="meta-row">
                <Flag size={16} />
                <span><strong>Challenge:</strong> {project.challenge}</span>
              </div>
              <div className="meta-row">
                <Users size={16} />
                <span><strong>Lead:</strong> {project.lead}</span>
              </div>
              <div className="meta-row">
                <Calendar size={16} />
                <span>{project.startDate} — {project.endDate}</span>
              </div>
            </div>

            <Link to={`/university/projects/${project.id}`} className="view-project-btn">
              View Collaboration Space
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UniversityProjects;
