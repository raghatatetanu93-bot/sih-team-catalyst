import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Users, Clock } from "lucide-react";

import "./AvailableChallenges.css";

const MOCK_CHALLENGES = [
  {
    id: 1,
    title: "Smart Water Grid Management",
    category: "Water",
    priority: "High",
    location: "Ranchi, Jharkhand",
    reports: 1240,
    duration: "6 Months",
    description: "Develop a sensor-based IoT system to detect leakages and manage water distribution efficiently in urban areas."
  },
  {
    id: 2,
    title: "Rural Education Offline Portal",
    category: "Education",
    priority: "Medium",
    location: "Gumla District",
    reports: 850,
    duration: "4 Months",
    description: "Create an offline-first learning platform for rural schools with limited internet connectivity."
  },
  {
    id: 3,
    title: "Traffic Congestion Prediction",
    category: "Infrastructure",
    priority: "High",
    location: "Dhanbad",
    reports: 2100,
    duration: "8 Months",
    description: "Use AI/ML on existing camera feeds to predict and optimize traffic light timings dynamically."
  },
  {
    id: 4,
    title: "Crop Disease Identification App",
    category: "Agriculture",
    priority: "Medium",
    location: "Statewide",
    reports: 3200,
    duration: "5 Months",
    description: "Develop a mobile app utilizing computer vision to identify common crop diseases from photos taken by farmers."
  }
];

function AvailableChallenges() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredChallenges = MOCK_CHALLENGES.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || challenge.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="challenges-container">
      <div className="challenges-header">
        <h1>Available Challenges</h1>
        <p>Explore government-validated problems needing innovative solutions.</p>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search challenges..." 
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
          <option value="Education">Education</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Agriculture">Agriculture</option>
        </select>
      </div>

      <div className="challenges-grid">
        {filteredChallenges.map(challenge => (
          <div key={challenge.id} className="challenge-card">
            <div className="challenge-badge-row">
              <span className="category-badge">{challenge.category}</span>
              <span className={`priority-badge ${challenge.priority.toLowerCase()}`}>
                {challenge.priority} Priority
              </span>
            </div>

            <h3>{challenge.title}</h3>
            <p className="challenge-desc">{challenge.description}</p>

            <div className="challenge-meta">
              <div className="meta-item">
                <MapPin size={16} />
                <span>{challenge.location}</span>
              </div>
              <div className="meta-item">
                <Users size={16} />
                <span>{challenge.reports} Citizens Affected</span>
              </div>
              <div className="meta-item">
                <Clock size={16} />
                <span>Est. {challenge.duration}</span>
              </div>
            </div>

            <button 
              className="view-btn"
              onClick={() => navigate(`/university/challenges/${challenge.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableChallenges;
