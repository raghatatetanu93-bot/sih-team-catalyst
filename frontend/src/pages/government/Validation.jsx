import { useNavigate } from "react-router-dom";
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
  const validationCases = [
    {
        id: 1,
      title: "Urban Flooding",
      location: "Ranchi",
      category: "Water",
      submittedBy: "Citizen Report",
      submitted: "12 min ago",
      confidence: "96%",
      status: "Pending Validation",
      priority: "High",
    },
    {
        id:2,
      title: "Water Supply Failure",
      location: "Latehar",
      category: "Water",
      submittedBy: "Citizen Report",
      submitted: "28 min ago",
      confidence: "91%",
      status: "Pending Validation",
      priority: "High",
    },
    {
        id:3,
      title: "PHC Staff Shortage",
      location: "Dumka",
      category: "Healthcare",
      submittedBy: "Citizen Report",
      submitted: "1 hour ago",
      confidence: "87%",
      status: "Under Review",
      priority: "Medium",
    },
    {
        id:4,
      title: "Garbage Not Collected",
      location: "Jamshedpur",
      category: "Waste Management",
      submittedBy: "Citizen Report",
      submitted: "2 hours ago",
      confidence: "94%",
      status: "Pending Validation",
      priority: "Low",
    },
  ];

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
          <span>842 Validated</span>
        </div>
      </div>

      <div className="validation-stats">
        <div className="validation-stat">
          <div className="validation-stat-icon blue">
            <Search size={20} />
          </div>
          <div>
            <span>Pending Review</span>
            <strong>126</strong>
          </div>
        </div>

        <div className="validation-stat">
          <div className="validation-stat-icon orange">
            <Clock size={20} />
          </div>
          <div>
            <span>Under Review</span>
            <strong>48</strong>
          </div>
        </div>

        <div className="validation-stat">
          <div className="validation-stat-icon green">
            <CheckCircle size={20} />
          </div>
          <div>
            <span>Validated</span>
            <strong>842</strong>
          </div>
        </div>

        <div className="validation-stat">
          <div className="validation-stat-icon red">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span>High Priority</span>
            <strong>37</strong>
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

          <span>126 cases</span>
        </div>

        <div className="validation-list">
          {validationCases.map((item) => (
            <div className="validation-row" key={item.title}>
              <div className="validation-main">
                <div className="validation-case-icon">
                  <AlertTriangle size={19} />
                </div>

                <div>
                  <div className="validation-title-line">
                    <h3>{item.title}</h3>
                    <span className={`priority ${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </span>
                  </div>

                  <p>
                    <MapPin size={14} />
                    {item.location} · {item.category}
                  </p>

                  <small>
                    <UserCheck size={13} />
                    {item.submittedBy} · {item.submitted}
                  </small>
                </div>
              </div>

              <div className="confidence">
                <span>AI Confidence</span>
                <strong>{item.confidence}</strong>
              </div>

              <div className="validation-status">
                <span className={item.status.toLowerCase().replaceAll(" ", "-")}>
                  {item.status}
                </span>
              </div>
<button
  className="review-button"
  onClick={() => navigate(`/problems/${item.id}`)}
>
  <Eye size={16} />
  Review
</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Validation;