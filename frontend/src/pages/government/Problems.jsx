import "./Problems.css";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock3,
  RefreshCw,
  MoreVertical,
  Droplets,
  Building2,
  HeartPulse,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Problems() {
    const navigate = useNavigate();
  const problems = [
    {
      title: "Urban Flooding",
      description: "Heavy rainfall has caused severe waterlogging in residential areas.",
      location: "Ranchi",
      district: "Ranchi District",
      category: "Water",
      icon: Droplets,
      severity: "High",
      affected: "1,200",
      status: "Pending Validation",
      date: "May 24, 2026",
      time: "10:24 AM",
    },
    {
      title: "Water Supply Failure",
      description: "No water supply from last 5 days in multiple villages.",
      location: "Latehar",
      district: "Latehar District",
      category: "Water",
      icon: Droplets,
      severity: "High",
      affected: "840",
      status: "High Risk",
      date: "May 24, 2026",
      time: "09:15 AM",
    },
    {
      title: "Damaged Bridge",
      description: "Bridge is damaged making travel unsafe for vehicles.",
      location: "West Singhbhum",
      district: "West Singhbhum District",
      category: "Infrastructure",
      icon: Building2,
      severity: "Medium",
      affected: "560",
      status: "Under Review",
      date: "May 24, 2026",
      time: "08:15 AM",
    },
    {
      title: "PHC Staff Shortage",
      description: "Primary Health Center has no doctor for a week.",
      location: "Dumka",
      district: "Dumka District",
      category: "Healthcare",
      icon: HeartPulse,
      severity: "Medium",
      affected: "320",
      status: "Pending Validation",
      date: "May 23, 2026",
      time: "06:30 PM",
    },
    {
      title: "Garbage Not Collected",
      description: "Garbage piling up on streets for more than a week.",
      location: "Jamshedpur",
      district: "East Singhbhum District",
      category: "Waste Management",
      icon: Trash2,
      severity: "Low",
      affected: "210",
      status: "Validated",
      date: "May 23, 2026",
      time: "04:10 PM",
    },
  ];

  return (
    <div className="problems-page">

      {/* PAGE HEADER */}
      <div className="problems-header">
        <div>
          <p className="eyebrow">PROBLEM MANAGEMENT</p>

          <h1>Reported Problems</h1>

          <p className="problems-subtitle">
            Review and manage problems reported by citizens across the state.
          </p>
        </div>

        <button className="new-problem-button">
          + New Problem
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">

        <div className="search-container">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search problems, locations, keywords..."
          />
        </div>

        <button className="filter-select">
          <Building2 size={17} />
          All Categories
          <ChevronDown size={16} />
        </button>

        <button className="filter-select">
          <AlertTriangle size={17} />
          All Severity
          <ChevronDown size={16} />
        </button>

        <button className="filter-select">
          <CheckCircle size={17} />
          All Status
          <ChevronDown size={16} />
        </button>

        <button className="filters-button">
          <SlidersHorizontal size={17} />
          Filters
        </button>

      </div>

      {/* STATISTICS */}
      <div className="problem-stats">

        <div className="problem-stat">
          <div className="stat-symbol blue">
            <Search size={21} />
          </div>

          <div>
            <span>Total Reported</span>
            <strong>1,284</strong>
            <small>All time</small>
          </div>
        </div>

        <div className="problem-stat">
          <div className="stat-symbol green">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Validated</span>
            <strong>842</strong>
            <small>65.6% of total</small>
          </div>
        </div>

        <div className="problem-stat">
          <div className="stat-symbol red">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>High Risk</span>
            <strong>37</strong>
            <small>Requires immediate action</small>
          </div>
        </div>

        <div className="problem-stat">
          <div className="stat-symbol orange">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Under Review</span>
            <strong>126</strong>
            <small>Currently in process</small>
          </div>
        </div>

        <div className="problem-stat">
          <div className="stat-symbol purple">
            <RefreshCw size={21} />
          </div>

          <div>
            <span>Resolved</span>
            <strong>976</strong>
            <small>Problems resolved</small>
          </div>
        </div>

      </div>

      {/* PROBLEMS TABLE */}
      <div className="problems-table-card">

        <div className="table-header">
          <span>PROBLEM</span>
          <span>LOCATION</span>
          <span>CATEGORY</span>
          <span>SEVERITY</span>
          <span>AFFECTED</span>
          <span>STATUS</span>
          <span>REPORTED ON</span>
          <span>ACTIONS</span>
        </div>

        {problems.map((problem) => {
          const ProblemIcon = problem.icon;

          return (
            <div className="problem-table-row" key={problem.title}>

              {/* PROBLEM */}
              <div className="problem-title-cell">

                <div className="problem-type-icon">
                  <ProblemIcon size={20} />
                </div>

                <div>
                  <strong>{problem.title}</strong>

                  <p>{problem.description}</p>
                </div>

              </div>

              {/* LOCATION */}
              <div className="location-cell">
                <div>
                  <MapPin size={15} />
                  <strong>{problem.location}</strong>
                </div>

                <small>{problem.district}</small>
              </div>

              {/* CATEGORY */}
              <div>
                <span className={`category-badge ${problem.category
                  .toLowerCase()
                  .replace(" ", "-")}`}>
                  {problem.category}
                </span>
              </div>

              {/* SEVERITY */}
              <div>
                <span className={`severity-badge ${problem.severity.toLowerCase()}`}>
                  {problem.severity}
                </span>
              </div>

              {/* AFFECTED */}
              <div className="affected-cell">
                <strong>{problem.affected}</strong>
                <small>people</small>
              </div>

              {/* STATUS */}
              <div>
                <span
                  className={`status-badge ${problem.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {problem.status}
                </span>
              </div>

              {/* DATE */}
              <div className="date-cell">
                <strong>{problem.date}</strong>
                <small>{problem.time}</small>
              </div>

              {/* ACTION */}
              <div className="action-cell">
                <button
  className="view-button"
  onClick={() => navigate("/problems/PRB-1024")}
>
  View
</button>

                <button className="more-button">
                  <MoreVertical size={18} />
                </button>
              </div>

            </div>
          );
        })}

        {/* PAGINATION */}
        <div className="table-footer">

          <span>
            Showing 1 to 5 of 1,284 problems
          </span>

          <div className="pagination">

            <button>
              <ChevronLeft size={17} />
            </button>

            <button className="active-page">
              1
            </button>

            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>257</button>

            <button>
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Problems;