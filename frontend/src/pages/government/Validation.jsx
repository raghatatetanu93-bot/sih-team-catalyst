import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./Validation.css";

import {
  CheckCircle,
  Clock3,
  AlertTriangle,
  Search,
  MapPin,
  UserCheck,
  Eye,
  X,
  SlidersHorizontal,
} from "lucide-react";

function Validation() {
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const [activeStat, setActiveStat] = useState("all");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await api.get("/problems");
        setProblems(response.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load validation cases.");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  /* =========================
     COUNTS
  ========================= */

  const pendingCount = problems.filter(
    (p) =>
      p.governmentStatus === "Reported" ||
      p.governmentStatus === "Pending Validation"
  ).length;

  const reviewCount = problems.filter(
    (p) => p.governmentStatus === "Under Review"
  ).length;

  const validatedCount = problems.filter(
    (p) => p.governmentStatus === "Validated"
  ).length;

  const highPriorityCount = problems.filter(
    (p) => p.severity === "High" || p.severity === "Critical"
  ).length;

  /* =========================
     CATEGORIES
  ========================= */

  const categories = useMemo(() => {
    const values = problems
      .map((p) => p.category)
      .filter(Boolean);

    return ["All Categories", ...new Set(values)];
  }, [problems]);

  /* =========================
     FILTERING
  ========================= */

  const filteredProblems = useMemo(() => {
    let result = [...problems];

    /* Search */

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((problem) => {
        return (
          problem.category?.toLowerCase().includes(query) ||
          problem.location?.address?.toLowerCase().includes(query) ||
          problem.description?.toLowerCase().includes(query) ||
          problem.governmentStatus?.toLowerCase().includes(query)
        );
      });
    }

    /* Status */

    if (statusFilter !== "All Status") {
      result = result.filter(
        (problem) => problem.governmentStatus === statusFilter
      );
    }

    /* Priority */

    if (priorityFilter !== "All Priority") {
      result = result.filter(
        (problem) => problem.severity === priorityFilter
      );
    }

    /* Category */

    if (categoryFilter !== "All Categories") {
      result = result.filter(
        (problem) => problem.category === categoryFilter
      );
    }

    /* Stat card filtering */

    if (activeStat === "pending") {
      result = result.filter(
        (p) =>
          p.governmentStatus === "Reported" ||
          p.governmentStatus === "Pending Validation"
      );
    }

    if (activeStat === "review") {
      result = result.filter(
        (p) => p.governmentStatus === "Under Review"
      );
    }

    if (activeStat === "validated") {
      result = result.filter(
        (p) => p.governmentStatus === "Validated"
      );
    }

    if (activeStat === "high") {
      result = result.filter(
        (p) =>
          p.severity === "High" ||
          p.severity === "Critical"
      );
    }

    return result;
  }, [
    problems,
    search,
    statusFilter,
    priorityFilter,
    categoryFilter,
    activeStat,
  ]);

  /* =========================
     CASE COUNT
  ========================= */

  const casesToValidate = filteredProblems.filter(
    (p) =>
      p.governmentStatus !== "Validated" &&
      p.governmentStatus !== "Resolved"
  );

  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All Status");
    setPriorityFilter("All Priority");
    setCategoryFilter("All Categories");
    setActiveStat("all");
  };

  const hasFilters =
    search ||
    statusFilter !== "All Status" ||
    priorityFilter !== "All Priority" ||
    categoryFilter !== "All Categories" ||
    activeStat !== "all";

  /* =========================
     STATUS CLASS
  ========================= */

  const getStatusClass = (status) => {
    if (!status) return "status-pending";

    return `status-${status
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  };

  /* =========================
     PRIORITY CLASS
  ========================= */

  const getPriorityClass = (severity) => {
    if (!severity) return "medium";

    return severity.toLowerCase();
  };

  return (
    <div className="validation-page">

      {/* ================= HEADER ================= */}

      <div className="validation-header">
        <div>
          <p className="eyebrow">PROBLEM VALIDATION</p>

          <h1>Validation Center</h1>

          <p className="validation-subtitle">
            Review AI-processed reports and validate problems
            before government action.
          </p>
        </div>

        <div className="validation-summary">
          <CheckCircle size={17} />
          <span>{validatedCount} Validated</span>
        </div>
      </div>


      {/* ================= STATS ================= */}

      <div className="validation-stats">

        <button
          className={`validation-stat ${
            activeStat === "pending" ? "active" : ""
          }`}
          onClick={() =>
            setActiveStat(
              activeStat === "pending" ? "all" : "pending"
            )
          }
        >
          <div className="validation-stat-icon blue">
            <Search size={20} />
          </div>

          <div>
            <span>Pending Review</span>
            <strong>{pendingCount}</strong>
          </div>
        </button>


        <button
          className={`validation-stat ${
            activeStat === "review" ? "active" : ""
          }`}
          onClick={() =>
            setActiveStat(
              activeStat === "review" ? "all" : "review"
            )
          }
        >
          <div className="validation-stat-icon orange">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Under Review</span>
            <strong>{reviewCount}</strong>
          </div>
        </button>


        <button
          className={`validation-stat ${
            activeStat === "validated" ? "active" : ""
          }`}
          onClick={() =>
            setActiveStat(
              activeStat === "validated" ? "all" : "validated"
            )
          }
        >
          <div className="validation-stat-icon green">
            <CheckCircle size={20} />
          </div>

          <div>
            <span>Validated</span>
            <strong>{validatedCount}</strong>
          </div>
        </button>


        <button
          className={`validation-stat ${
            activeStat === "high" ? "active" : ""
          }`}
          onClick={() =>
            setActiveStat(
              activeStat === "high" ? "all" : "high"
            )
          }
        >
          <div className="validation-stat-icon red">
            <AlertTriangle size={20} />
          </div>

          <div>
            <span>High Priority</span>
            <strong>{highPriorityCount}</strong>
          </div>
        </button>

      </div>


      {/* ================= TOOLBAR ================= */}

      <div className="validation-toolbar">

        <div className="validation-search">
          <Search size={18} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search validation cases..."
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


        <div className="validation-filter">
          <SlidersHorizontal size={15} />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Reported</option>
            <option>Pending Validation</option>
            <option>Under Review</option>
            <option>Validated</option>
            <option>Resolved</option>
          </select>
        </div>


        <div className="validation-filter">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option>All Priority</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>


        <div className="validation-filter">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>


        {hasFilters && (
          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            <X size={14} />
            Clear
          </button>
        )}

      </div>


      {/* ================= MAIN CARD ================= */}

      <div className="validation-card">

        <div className="validation-card-header">

          <div>
            <h2>Cases Requiring Validation</h2>

            <p>
              AI-processed reports awaiting government verification
            </p>
          </div>

          <span>
            {casesToValidate.length} cases
          </span>

        </div>


        {/* LOADING */}

        {loading && (
          <div className="validation-state">
            <div className="loading-spinner"></div>
            <span>Loading validation cases...</span>
          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="validation-state error">
            <AlertTriangle size={22} />
            <span>{error}</span>
          </div>
        )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          casesToValidate.length === 0 && (

            <div className="validation-state">

              <CheckCircle size={30} />

              <strong>No matching cases</strong>

              <span>
                Try changing your filters or search query.
              </span>

              {hasFilters && (
                <button onClick={clearFilters}>
                  Clear Filters
                </button>
              )}

            </div>
          )}


        {/* LIST */}

        {!loading &&
          !error &&
          casesToValidate.length > 0 && (

            <div className="validation-list">

              {casesToValidate.map((item) => (

                <div
                  className="validation-row"
                  key={item._id}
                >

                  {/* MAIN */}

                  <div className="validation-main">

                    <div
                      className={`validation-case-icon ${
                        getPriorityClass(item.severity)
                      }`}
                    >
                      <AlertTriangle size={18} />
                    </div>


                    <div className="validation-main-content">

                      <div className="validation-title-line">

                        <h3 title={item.title || item.category || "Uncategorized"}>
                          {item.title || item.category || "Uncategorized"}
                        </h3>

                        <span
                          className={`priority ${
                            getPriorityClass(item.severity)
                          }`}
                          title={`Severity: ${item.severity || "Medium"}`}
                        >
                          {item.severity || "Medium"}
                        </span>

                      </div>


                      <p title={item.location?.address || item.location || "Location unavailable"}>
                        <MapPin size={13} />

                        {item.location?.address ||
                          item.location ||
                          "Location unavailable"}
                      </p>


                      <small>
                        <UserCheck size={13} />

                        Citizen Report ·{" "}
                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleDateString()
                          : "Date unavailable"}
                      </small>

                    </div>

                  </div>


                  {/* SCORE */}

                  <div className="confidence">

                    <span>Priority Score</span>

                    <strong>
                      {item.priorityScore ?? 0}/100
                    </strong>

                  </div>


                  {/* STATUS */}

                  <div className="validation-status">

                    <span
                      className={getStatusClass(
                        item.governmentStatus
                      )}
                    >
                      {item.governmentStatus ||
                        "Pending Validation"}
                    </span>

                  </div>


                  {/* REVIEW */}

                  <button
                    className="review-button"
                    onClick={() =>
                      navigate(
                        `/government/problems/${item._id}`
                      )
                    }
                  >
                    <Eye size={15} />
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