import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./Validation.css";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  MapPin,
  UserCheck,
  Eye,
} from "lucide-react";

function Validation() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await api.get("/problems");
        setProblems(response.data);
      } catch (err) {
        setError("Failed to load problems.");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const pendingCount = problems.filter(p => p.governmentStatus === 'Reported' || p.governmentStatus === 'Pending Validation').length;
  const reviewCount = problems.filter(p => p.governmentStatus === 'Under Review').length;
  const validatedCount = problems.filter(p => p.governmentStatus === 'Validated').length;
  const highPriorityCount = problems.filter(p => p.severity === 'High' || p.severity === 'Critical').length;

  const casesToValidate = problems.filter(p => p.governmentStatus !== 'Validated' && p.governmentStatus !== 'Resolved');

  return (
    <div className="validation-page">
      <div className="validation-header">
        <div>
          <p className="eyebrow">PROBLEM VALIDATION</p>
          <h1>Validation Center</h1>
          <p className="validation-subtitle">
            Review AI-processed reports and validate problems before government action.
          </p>
        </div>

        <div className="validation-summary">
          <CheckCircle size={18} />
          <span>{validatedCount} Validated</span>
        </div>
      </div>

      <div className="validation-stats">
        <div className="validation-stat">
          <div className="validation-stat-icon blue">
            <Search size={20} />
          </div>
          <div>
            <span>Pending Review</span>
            <strong>{pendingCount}</strong>
          </div>
        </div>

        <div className="validation-stat">
          <div className="validation-stat-icon orange">
            <Clock size={20} />
          </div>
          <div>
            <span>Under Review</span>
            <strong>{reviewCount}</strong>
          </div>
        </div>

        <div className="validation-stat">
          <div className="validation-stat-icon green">
            <CheckCircle size={20} />
          </div>
          <div>
            <span>Validated</span>
            <strong>{validatedCount}</strong>
          </div>
        </div>

        <div className="validation-stat">
          <div className="validation-stat-icon red">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span>High Priority</span>
            <strong>{highPriorityCount}</strong>
          </div>
        </div>
      </div>

      <div className="validation-toolbar">
        <div className="validation-search">
          <Search size={18} />
          <input placeholder="Search validation cases..." />
        </div>

        <button>All Status ▾</button>
        <button>All Priority ▾</button>
        <button>All Categories ▾</button>
      </div>

      <div className="validation-card">
        <div className="validation-card-header">
          <div>
            <h2>Cases Requiring Validation</h2>
            <p>AI-processed reports awaiting government verification</p>
          </div>

          <span>{casesToValidate.length} cases</span>
        </div>

        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center" }}>Loading cases...</div>
        ) : error ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>{error}</div>
        ) : casesToValidate.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>No pending cases.</div>
        ) : (
          <div className="validation-list">
            {casesToValidate.map((item) => (
              <div className="validation-row" key={item._id}>
                <div className="validation-main">
                  <div className="validation-case-icon">
                    <AlertTriangle size={19} />
                  </div>

                  <div>
                    <div className="validation-title-line">
                      <h3>{item.category}</h3>
                      <span className={`priority ${(item.severity || 'Medium').toLowerCase()}`}>
                        {item.severity}
                      </span>
                    </div>

                    <p>
                      <MapPin size={14} />
                      {item.location?.address} · {item.category}
                    </p>

                    <small>
                      <UserCheck size={13} />
                      Citizen Report · {new Date(item.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>

                <div className="confidence">
                  <span>Priority Score</span>
                  <strong>{item.priorityScore}/100</strong>
                </div>

                <div className="validation-status">
                  <span className={(item.governmentStatus || 'Pending').toLowerCase().replaceAll(" ", "-")}>
                    {item.governmentStatus}
                  </span>
                </div>
                
                <button
                  className="review-button"
                  onClick={() => navigate(`/government/problems/${item._id}`)}
                >
                  <Eye size={16} />
                  Review
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Validation;