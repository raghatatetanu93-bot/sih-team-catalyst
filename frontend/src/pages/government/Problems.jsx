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
  Eye,
  Flag,
  X,
  RotateCcw,
  Plus,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Problems() {
  const navigate = useNavigate();

  const problems = [
    {
      id: "PRB-1024",
      title: "Urban Flooding",
      description:
        "Heavy rainfall has caused severe waterlogging in residential areas.",
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
      id: "PRB-1025",
      title: "Water Supply Failure",
      description:
        "No water supply from last 5 days in multiple villages.",
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
      id: "PRB-1026",
      title: "Damaged Bridge",
      description:
        "Bridge is damaged making travel unsafe for vehicles.",
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
      id: "PRB-1027",
      title: "PHC Staff Shortage",
      description:
        "Primary Health Center has no doctor for a week.",
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
      id: "PRB-1028",
      title: "Garbage Not Collected",
      description:
        "Garbage piling up on streets for more than a week.",
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

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [severity, setSeverity] = useState("All Severity");
  const [status, setStatus] = useState("All Status");

  const [showFilters, setShowFilters] = useState(false);
  const [activeStat, setActiveStat] = useState("All");

  const [openMenu, setOpenMenu] = useState(null);
  const [flagged, setFlagged] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  /* =====================================================
     FILTERING
     ===================================================== */

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        problem.title.toLowerCase().includes(searchText) ||
        problem.description.toLowerCase().includes(searchText) ||
        problem.location.toLowerCase().includes(searchText) ||
        problem.district.toLowerCase().includes(searchText) ||
        problem.category.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All Categories" ||
        problem.category === category;

      const matchesSeverity =
        severity === "All Severity" ||
        problem.severity === severity;

      const matchesStatus =
        status === "All Status" ||
        problem.status === status;

      let matchesStat = true;

      if (activeStat === "Validated") {
        matchesStat = problem.status === "Validated";
      }

      if (activeStat === "High Risk") {
        matchesStat =
          problem.severity === "High" ||
          problem.status === "High Risk";
      }

      if (activeStat === "Under Review") {
        matchesStat =
          problem.status === "Under Review" ||
          problem.status === "Pending Validation";
      }

      if (activeStat === "Resolved") {
        matchesStat = problem.status === "Resolved";
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSeverity &&
        matchesStatus &&
        matchesStat
      );
    });
  }, [search, category, severity, status, activeStat]);

  /* =====================================================
     PAGINATION
     ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProblems.length / itemsPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * itemsPerPage;

  const visibleProblems = filteredProblems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* =====================================================
     HELPERS
     ===================================================== */

  const resetFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setSeverity("All Severity");
    setStatus("All Status");
    setActiveStat("All");
    setCurrentPage(1);
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  const toggleFlag = (id) => {
    setFlagged((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );

    setOpenMenu(null);
  };

  const clearMenu = () => {
    setOpenMenu(null);
  };

  return (
    <div className="problems-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="problems-header">
        <div>
          <p className="eyebrow">PROBLEM MANAGEMENT</p>

          <h1>Reported Problems</h1>

          <p className="problems-subtitle">
            Review, validate and manage problems reported by citizens
            across the state.
          </p>
        </div>

        <button
          className="new-problem-button"
          onClick={() => {
            alert(
              "New problem creation will be connected to the backend reporting workflow."
            );
          }}
        >
          <Plus size={17} />
          New Problem
        </button>
      </div>

      {/* =====================================================
          SEARCH + FILTER BAR
      ===================================================== */}

      <div className="filter-bar">

        <div className="search-container">
          <Search size={19} />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search problems, locations, keywords..."
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              <X size={15} />
            </button>
          )}
        </div>

        <select
          className="filter-select"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option>All Categories</option>
          <option>Water</option>
          <option>Infrastructure</option>
          <option>Healthcare</option>
          <option>Waste Management</option>
          <option>Education</option>
        </select>

        <select
          className="filter-select"
          value={severity}
          onChange={(e) => {
            setSeverity(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option>All Severity</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          className="filter-select"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option>All Status</option>
          <option>Pending Validation</option>
          <option>High Risk</option>
          <option>Under Review</option>
          <option>Validated</option>
          <option>Resolved</option>
        </select>

        <button
          className={`filters-button ${
            showFilters ? "active-filter-button" : ""
          }`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={17} />
          Filters
        </button>
      </div>

      {/* =====================================================
          ADVANCED FILTER PANEL
      ===================================================== */}

      {showFilters && (
        <div className="advanced-filters">

          <div>
            <span>District</span>

            <select>
              <option>All districts</option>
              <option>Ranchi</option>
              <option>Latehar</option>
              <option>Dumka</option>
              <option>Jamshedpur</option>
              <option>West Singhbhum</option>
            </select>
          </div>

          <div>
            <span>Impact level</span>

            <select>
              <option>All impact levels</option>
              <option>High impact</option>
              <option>Medium impact</option>
              <option>Low impact</option>
            </select>
          </div>

          <div>
            <span>Sort by</span>

            <select>
              <option>Most recent</option>
              <option>Highest severity</option>
              <option>Most affected</option>
            </select>
          </div>

          <button
            className="reset-filters"
            onClick={resetFilters}
          >
            <RotateCcw size={15} />
            Reset filters
          </button>
        </div>
      )}

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="problem-stats">

        <button
          className={`problem-stat ${
            activeStat === "All" ? "selected-stat" : ""
          }`}
          onClick={() => {
            setActiveStat("All");
            setCurrentPage(1);
          }}
        >
          <div className="stat-symbol blue">
            <Search size={21} />
          </div>

          <div>
            <span>Total Reported</span>
            <strong>1,284</strong>
            <small>All citizen reports</small>
          </div>
        </button>

        <button
          className={`problem-stat ${
            activeStat === "Validated" ? "selected-stat" : ""
          }`}
          onClick={() => {
            setActiveStat("Validated");
            setCurrentPage(1);
          }}
        >
          <div className="stat-symbol green">
            <CheckCircle size={21} />
          </div>

          <div>
            <span>Validated</span>
            <strong>842</strong>
            <small>65.6% of total</small>
          </div>
        </button>

        <button
          className={`problem-stat ${
            activeStat === "High Risk" ? "selected-stat" : ""
          }`}
          onClick={() => {
            setActiveStat("High Risk");
            setCurrentPage(1);
          }}
        >
          <div className="stat-symbol red">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>High Risk</span>
            <strong>37</strong>
            <small>Requires immediate action</small>
          </div>
        </button>

        <button
          className={`problem-stat ${
            activeStat === "Under Review" ? "selected-stat" : ""
          }`}
          onClick={() => {
            setActiveStat("Under Review");
            setCurrentPage(1);
          }}
        >
          <div className="stat-symbol orange">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Under Review</span>
            <strong>126</strong>
            <small>Currently in process</small>
          </div>
        </button>

        <button
          className={`problem-stat ${
            activeStat === "Resolved" ? "selected-stat" : ""
          }`}
          onClick={() => {
            setActiveStat("Resolved");
            setCurrentPage(1);
          }}
        >
          <div className="stat-symbol purple">
            <RefreshCw size={21} />
          </div>

          <div>
            <span>Resolved</span>
            <strong>976</strong>
            <small>Problems resolved</small>
          </div>
        </button>

      </div>

      {/* =====================================================
          ACTIVE FILTER SUMMARY
      ===================================================== */}

      {(activeStat !== "All" ||
        search ||
        category !== "All Categories" ||
        severity !== "All Severity" ||
        status !== "All Status") && (
        <div className="active-filter-summary">

          <div>
            <strong>{filteredProblems.length}</strong>
            <span>matching problems</span>
          </div>

          <button onClick={resetFilters}>
            <X size={15} />
            Clear all filters
          </button>

        </div>
      )}

      {/* =====================================================
          TABLE
      ===================================================== */}

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

        {visibleProblems.length === 0 ? (
          <div className="no-problems">
            <Search size={36} />

            <h3>No problems found</h3>

            <p>
              Try changing your search or filter criteria.
            </p>

            <button onClick={resetFilters}>
              Reset filters
            </button>
          </div>
        ) : (
          visibleProblems.map((problem) => {
            const ProblemIcon = problem.icon;

            return (
              <div
                className={`problem-table-row ${
                  flagged.includes(problem.id)
                    ? "flagged-row"
                    : ""
                }`}
                key={problem.id}
              >

                {/* PROBLEM */}

                <div className="problem-title-cell">

                  <div className="problem-type-icon">
                    <ProblemIcon size={20} />
                  </div>

                  <div>
                    <strong>{problem.title}</strong>

                    <p>{problem.description}</p>

                    <small className="problem-id">
                      {problem.id}
                    </small>
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
                  <span
                    className={`category-badge ${problem.category
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {problem.category}
                  </span>
                </div>

                {/* SEVERITY */}

                <div>
                  <span
                    className={`severity-badge ${problem.severity.toLowerCase()}`}
                  >
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
                    onClick={() =>
                      navigate(
                        `/government/problems/${problem.id}`
                      )
                    }
                  >
                    <Eye size={15} />
                    View
                  </button>

                  <div className="more-wrapper">

                    <button
                      className="more-button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === problem.id
                            ? null
                            : problem.id
                        )
                      }
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openMenu === problem.id && (
                      <div className="problem-menu">

                        <button
                          onClick={() => {
                            navigate(
                              `/government/problems/${problem.id}`
                            );
                            clearMenu();
                          }}
                        >
                          <Eye size={15} />
                          View details
                        </button>

                        <button
                          onClick={() =>
                            toggleFlag(problem.id)
                          }
                        >
                          <Flag size={15} />
                          {flagged.includes(problem.id)
                            ? "Remove flag"
                            : "Flag for review"}
                        </button>

                        <button
                          onClick={() => {
                            alert(
                              `${problem.title} marked for government review.`
                            );
                            clearMenu();
                          }}
                        >
                          <AlertTriangle size={15} />
                          Escalate issue
                        </button>

                      </div>
                    )}

                  </div>

                </div>

              </div>
            );
          })
        )}

        {/* =====================================================
            PAGINATION
        ===================================================== */}

        <div className="table-footer">

          <span>
            Showing{" "}
            {filteredProblems.length === 0
              ? 0
              : startIndex + 1}{" "}
            to{" "}
            {Math.min(
              startIndex + itemsPerPage,
              filteredProblems.length
            )}{" "}
            of {filteredProblems.length} matching problems
          </span>

          <div className="pagination">

            <button
              disabled={safePage === 1}
              onClick={() => changePage(safePage - 1)}
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            )
              .slice(0, 5)
              .map((page) => (
                <button
                  key={page}
                  className={
                    safePage === page
                      ? "active-page"
                      : ""
                  }
                  onClick={() => changePage(page)}
                >
                  {page}
                </button>
              ))}

            {totalPages > 5 && (
              <>
                <button disabled>...</button>

                <button
                  className={
                    safePage === totalPages
                      ? "active-page"
                      : ""
                  }
                  onClick={() =>
                    changePage(totalPages)
                  }
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              disabled={safePage === totalPages}
              onClick={() => changePage(safePage + 1)}
            >
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Problems;