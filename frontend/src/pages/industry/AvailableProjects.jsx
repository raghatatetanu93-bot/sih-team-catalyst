import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building2, Briefcase } from "lucide-react";
import api from "../../api";

import "./AvailableProjects.css";

function AvailableProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (err) {
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || (project.problemId && project.problemId.category === categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="available-projects-container">
      <div className="projects-header">
        <h1>Available Projects</h1>
        <p>Discover high-impact societal projects seeking industry support and collaboration.</p>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select 
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Water">Water</option>
          <option value="Smart Cities">Smart Cities</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Waste Management">Waste Management</option>
          <option value="Unassigned">Unassigned</option>
        </select>
      </div>

      {loading ? (
        <div style={{ padding: "2rem", textAlign: "center" }}>Loading projects...</div>
      ) : error ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>{error}</div>
      ) : filteredProjects.length === 0 ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>No projects found.</div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project._id} className="project-card">
              <div className="project-badge-row">
                <span className="category-badge">{project.problemId?.category || 'General'}</span>
                <span className={`stage-badge ${(project.status || 'Submitted').toLowerCase()}`}>
                  {project.status || 'Submitted'}
                </span>
              </div>

              <h3>{project.title}</h3>
              <p className="project-desc">{project.proposalDescription}</p>

              <div className="project-meta">
                <div className="meta-item">
                  <Building2 size={16} />
                  <span>{project.universityId?.name || 'Assigned University'}</span>
                </div>
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>{project.problemId?.location?.address || 'Location Unspecified'}</span>
                </div>
                <div className="meta-item">
                  <Briefcase size={16} />
                  <span><strong>Faculty:</strong> {project.facultyMentor}</span>
                </div>
              </div>

              <button 
                className="view-btn"
                onClick={() => navigate(`/industry/projects/${project._id}`)}
              >
                View Project
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AvailableProjects;
