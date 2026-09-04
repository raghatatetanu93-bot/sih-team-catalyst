import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Users, Clock } from "lucide-react";
import api from "../../api";

import "./AvailableChallenges.css";

function AvailableChallenges() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await api.get("/problems?status=Validated");
        setChallenges(response.data);
      } catch (err) {
        setError("Failed to load challenges.");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          challenge.description?.toLowerCase().includes(searchTerm.toLowerCase());
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
          <option value="Healthcare">Healthcare</option>
          <option value="Waste Management">Waste Management</option>
          <option value="Unassigned">Unassigned</option>
        </select>
      </div>

      {loading ? (
        <div style={{ padding: "2rem", textAlign: "center" }}>Loading validated challenges...</div>
      ) : error ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>{error}</div>
      ) : filteredChallenges.length === 0 ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>No challenges found.</div>
      ) : (
        <div className="challenges-grid">
          {filteredChallenges.map(challenge => (
            <div key={challenge._id} className="challenge-card">
              <div className="challenge-badge-row">
                <span className="category-badge">{challenge.category}</span>
                <span className={`priority-badge ${(challenge.severity || 'Medium').toLowerCase()}`}>
                  {challenge.severity || 'Medium'} Priority
                </span>
              </div>

              <h3>{challenge.category || 'Uncategorized Issue'}</h3>
              <p className="challenge-desc">{challenge.description}</p>

              <div className="challenge-meta">
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>{challenge.location?.address}</span>
                </div>
                <div className="meta-item">
                  <Users size={16} />
                  <span>{challenge.affectedPopulation} Citizens Affected</span>
                </div>
              </div>

              <button 
                className="view-btn"
                onClick={() => navigate(`/university/challenges/${challenge._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AvailableChallenges;
