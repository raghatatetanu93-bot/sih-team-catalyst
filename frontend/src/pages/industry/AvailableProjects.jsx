import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building2, Briefcase } from "lucide-react";

import "./AvailableProjects.css";

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Smart Water Grid Prototype",
    category: "Water Management",
    stage: "Prototype",
    location: "Ranchi, Jharkhand",
    university: "BIT Mesra",
    supportReq: "Funding & IoT Hardware",
    description: "A sensor-based IoT system developed to detect leakages and manage water distribution efficiently. Seeking industry partners for hardware manufacturing and scaling."
  },
  {
    id: 2,
    title: "Traffic Vision AI",
    category: "Smart Cities",
    stage: "Testing",
    location: "Dhanbad",
    university: "IIT ISM Dhanbad",
    supportReq: "Cloud Infrastructure",
    description: "AI/ML models that use existing camera feeds to predict and optimize traffic light timings dynamically. Need cloud computing credits and deployment expertise."
  },
  {
    id: 3,
    title: "Rural Ed-Tech Tablet",
    category: "Education",
    stage: "Pilot",
    location: "Gumla District",
    university: "NIT Jamshedpur",
    supportReq: "Manufacturing Support",
    description: "Low-cost, offline-first educational tablet designed for rural areas without internet access. Looking for a hardware manufacturing partner."
  }
];

function AvailableProjects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredProjects = MOCK_PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || project.category === categoryFilter;
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
          <option value="Water Management">Water Management</option>
          <option value="Smart Cities">Smart Cities</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
        </select>
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-badge-row">
              <span className="category-badge">{project.category}</span>
              <span className={`stage-badge ${project.stage.toLowerCase()}`}>
                {project.stage}
              </span>
            </div>

            <h3>{project.title}</h3>
            <p className="project-desc">{project.description}</p>

            <div className="project-meta">
              <div className="meta-item">
                <Building2 size={16} />
                <span>{project.university}</span>
              </div>
              <div className="meta-item">
                <MapPin size={16} />
                <span>{project.location}</span>
              </div>
              <div className="meta-item">
                <Briefcase size={16} />
                <span><strong>Needs:</strong> {project.supportReq}</span>
              </div>
            </div>

            <button 
              className="view-btn"
              onClick={() => navigate(`/industry/projects/${project.id}`)}
            >
              View Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableProjects;
