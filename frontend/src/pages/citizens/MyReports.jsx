import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./MyReports.css";

import {
  FileText,
  Clock3,
  CheckCircle2,
  AlertCircle,
  MapPin,
  ArrowRight,
  Search,
  SlidersHorizontal,
  CalendarDays,
  Plus,
  Droplets,
  Trash2,
  Construction,
  GraduationCap,
  HeartPulse,
  Zap,
  TrendingUp,
  Target,
  Sparkles,
  ChevronDown,
} from "lucide-react";


/* =====================================================
   DEMO MODE
   ===================================================== */

const DEMO_MODE = true;


/* =====================================================
   DEMO DATA
   ===================================================== */

const demoStatuses = [
  "In Progress",
  "Resolved",
  "Under Review",
  "In Progress",
  "Reported",
  "Resolved",
  "Under Review",
  "In Progress",
];

const demoSeverities = [
  "High",
  "Critical",
  "Medium",
  "High",
  "Low",
  "Medium",
  "Critical",
  "Medium",
];

const demoCategories = [
  "Water & Sanitation",
  "Education",
  "Roads & Infrastructure",
  "Waste Management",
  "Public Health",
  "Electricity",
  "Public Safety",
  "Environment",
];

const demoLocations = [
  "Pune",
  "Lonavala",
  "Pimpri-Chinchwad",
  "Hinjewadi",
  "Kothrud",
  "Shivajinagar",
  "Wakad",
  "Baner",
];

const demoDescriptions = [
  "Water supply issue reported by residents in the area.",
  "Infrastructure issue affecting students and staff.",
  "Damaged road surface creating difficulties for commuters.",
  "Garbage accumulation requiring municipal attention.",
  "Public healthcare facility requires immediate attention.",
  "Street electricity issue reported by local residents.",
  "Safety concern reported by citizens in the locality.",
  "Environmental issue requiring community intervention.",
];


/* =====================================================
   HELPERS
   ===================================================== */

const normalizeStatus = (report) => {
  const raw = report.governmentStatus || report.status || "Reported";

  const value = String(raw)
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .trim();

  if (value.includes("resolve")) return "Resolved";
  if (value.includes("progress")) return "In Progress";
  if (value.includes("review")) return "Under Review";

  if (
    value.includes("submit") ||
    value.includes("report")
  ) {
    return "Reported";
  }

  return raw;
};


const getSeverity = (report) => {
  const value = String(
    report.severity || "Medium"
  ).toLowerCase();

  if (value.includes("critical")) return "Critical";
  if (value.includes("high")) return "High";
  if (value.includes("low")) return "Low";

  return "Medium";
};


const getIssueIcon = (category = "") => {
  const value = category.toLowerCase();

  if (value.includes("water")) {
    return Droplets;
  }

  if (value.includes("waste")) {
    return Trash2;
  }

  if (
    value.includes("road") ||
    value.includes("infrastructure")
  ) {
    return Construction;
  }

  if (
    value.includes("education") ||
    value.includes("school")
  ) {
    return GraduationCap;
  }

  if (
    value.includes("health") ||
    value.includes("hospital")
  ) {
    return HeartPulse;
  }

  if (
    value.includes("electric") ||
    value.includes("power")
  ) {
    return Zap;
  }

  return FileText;
};


const formatDate = (date) => {
  if (!date) return "9 Sept 2026";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "9 Sept 2026";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};


const getStatusClass = (status) => {
  return String(status)
    .toLowerCase()
    .replace(/\s+/g, "-");
};


/* =====================================================
   ENRICH BACKEND REPORTS
   ===================================================== */

const enrichReports = (reports) => {
  if (!DEMO_MODE) {
    return reports;
  }

  return reports.map((report, index) => {
    const demoIndex =
      index % demoStatuses.length;

    return {
      ...report,

      demoStatus:
        demoStatuses[demoIndex],

      demoSeverity:
        demoSeverities[demoIndex],

      demoCategory:
        report.category ||
        demoCategories[demoIndex],

      demoLocation:
        report.location?.address ||
        demoLocations[demoIndex],

      demoDescription:
        report.description ||
        demoDescriptions[demoIndex],
    };
  });
};


/* =====================================================
   COMPONENT
   ===================================================== */

function MyReports() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [showFilters, setShowFilters] =
    useState(false);


  /* =====================================================
     FETCH REPORTS
     ===================================================== */

  const fetchReports = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/problems");

      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.data)
        ? response.data.data
        : [];

      setReports(enrichReports(data));

    } catch (error) {
      console.error(
        "Failed to fetch reports:",
        error
      );

      setReports([]);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchReports();
  }, []);


  /* =====================================================
     DISPLAY REPORTS
     ===================================================== */

  const displayReports = useMemo(() => {
    return reports.map((report) => ({
      ...report,

      category: DEMO_MODE
        ? report.demoCategory
        : report.category ||
          "Community Issue",

      status: DEMO_MODE
        ? report.demoStatus
        : normalizeStatus(report),

      severity: DEMO_MODE
        ? report.demoSeverity
        : getSeverity(report),

      location: DEMO_MODE
        ? report.demoLocation
        : report.location?.address ||
          "Location unavailable",

      description: DEMO_MODE
        ? report.demoDescription
        : report.description ||
          "Community issue reported.",
    }));
  }, [reports]);


  /* =====================================================
     STATS
     ===================================================== */

  const stats = useMemo(() => {
    return {
      total: displayReports.length,

      review: displayReports.filter(
        (report) =>
          report.status === "Under Review"
      ).length,

      progress: displayReports.filter(
        (report) =>
          report.status === "In Progress"
      ).length,

      resolved: displayReports.filter(
        (report) =>
          report.status === "Resolved"
      ).length,
    };
  }, [displayReports]);


  /* =====================================================
     CATEGORIES
     ===================================================== */

  const categories = useMemo(() => {
    return [
      ...new Set(
        displayReports
          .map((report) => report.category)
          .filter(Boolean)
      ),
    ];
  }, [displayReports]);


  /* =====================================================
     FILTERED REPORTS
     ===================================================== */

  const filteredReports = useMemo(() => {
    const query =
      search.toLowerCase().trim();

    return displayReports
      .filter((report) => {

        const matchesStatus =
          statusFilter === "All" ||
          report.status === statusFilter;

        const matchesCategory =
          categoryFilter === "All" ||
          report.category === categoryFilter;

        const searchableText = [
          report.category,
          report.description,
          report.location,
          report.status,
          report.severity,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          !query ||
          searchableText.includes(query);

        return (
          matchesStatus &&
          matchesCategory &&
          matchesSearch
        );
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );

  }, [
    displayReports,
    search,
    statusFilter,
    categoryFilter,
  ]);


  /* =====================================================
     CLEAR FILTERS
     ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
  };


  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <div className="my-reports-page">


      {/* ================================================
          PAGE HEADER
      ================================================= */}

      <div className="reports-top">

        <div className="reports-header">

          <span className="page-label">
            CITIZEN PORTAL
          </span>

          <h1>
            My Reports
          </h1>

          <p>
            Track your civic contributions and
            see how your reports are progressing.
          </p>

        </div>


        <button
          className="new-report-btn"
          onClick={() =>
            navigate("/citizen/report")
          }
        >
          <Plus size={18} />
          Report New Issue
        </button>

      </div>


      {/* ================================================
          CIVIC IMPACT BANNER
      ================================================= */}

      <div className="impact-banner">

        <div className="impact-left">

          <div className="impact-sparkle">
            <Sparkles size={21} />
          </div>

          <div>

            <span className="impact-label">
              YOUR CIVIC IMPACT
            </span>

            <h2>
              You're helping make your
              community better.
            </h2>

            <p>
              Every report helps authorities
              identify problems and prioritize action.
            </p>

          </div>

        </div>


        <div className="impact-metrics">

          <div className="impact-metric">
            <strong>
              {stats.resolved}
            </strong>

            <span>
              Issues resolved
            </span>
          </div>


          <div className="impact-divider" />


          <div className="impact-metric">
            <strong>
              78%
            </strong>

            <span>
              Impact score
            </span>
          </div>


          <div className="impact-divider" />


          <div className="impact-metric">
            <strong>
              +240
            </strong>

            <span>
              Community points
            </span>
          </div>

        </div>

      </div>


      {/* ================================================
          STAT CARDS
      ================================================= */}

      <div className="reports-stats">


        {/* TOTAL */}

        <div className="report-stat-card total-card">

          <div className="stat-icon">
            <FileText size={22} />
          </div>

          <div>
            <strong>
              {stats.total}
            </strong>

            <span>
              Total Reports
            </span>
          </div>

          <div className="stat-decoration">
            <TrendingUp size={16} />
          </div>

        </div>


        {/* REVIEW */}

        <div className="report-stat-card review-card">

          <div className="stat-icon">
            <Clock3 size={22} />
          </div>

          <div>
            <strong>
              {stats.review}
            </strong>

            <span>
              Under Review
            </span>
          </div>

        </div>


        {/* PROGRESS */}

        <div className="report-stat-card progress-card">

          <div className="stat-icon">
            <Target size={22} />
          </div>

          <div>
            <strong>
              {stats.progress}
            </strong>

            <span>
              In Progress
            </span>
          </div>

        </div>


        {/* RESOLVED */}

        <div className="report-stat-card resolved-card">

          <div className="stat-icon">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <strong>
              {stats.resolved}
            </strong>

            <span>
              Resolved
            </span>
          </div>

        </div>

      </div>


      {/* ================================================
          REPORTS SECTION
      ================================================= */}

      <div className="reports-section">


        {/* SECTION HEADER */}

        <div className="section-header">

          <div>

            <div className="section-title-row">

              <h2>
                Your Reports
              </h2>

              <span className="count-badge">
                {filteredReports.length}
              </span>

            </div>

            <p>
              Follow the journey of every issue
              you've reported.
            </p>

          </div>


          <button
            className={`filter-button ${
              showFilters ? "active" : ""
            }`}
            onClick={() =>
              setShowFilters(!showFilters)
            }
          >
            <SlidersHorizontal size={16} />

            Filters

            <ChevronDown
              size={14}
              className={
                showFilters
                  ? "rotate-icon"
                  : ""
              }
            />
          </button>

        </div>


        {/* SEARCH */}

        <div className="search-wrapper">

          <Search size={18} />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search your reports..."
          />

        </div>


        {/* FILTER PANEL */}

        {showFilters && (

          <div className="filter-panel">

            <div>

              <label>
                STATUS
              </label>

              <div className="filter-pills">

                {[
                  "All",
                  "Reported",
                  "Under Review",
                  "In Progress",
                  "Resolved",
                ].map((status) => (

                  <button
                    key={status}
                    className={
                      statusFilter === status
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      setStatusFilter(status)
                    }
                  >
                    {status}
                  </button>

                ))}

              </div>

            </div>


            <div>

              <label>
                CATEGORY
              </label>

              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(
                    event.target.value
                  )
                }
              >

                <option value="All">
                  All Categories
                </option>

                {categories.map(
                  (category) => (

                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>

                  )
                )}

              </select>

            </div>


            {(search ||
              statusFilter !== "All" ||
              categoryFilter !== "All") && (

              <button
                className="clear-btn"
                onClick={clearFilters}
              >
                Clear
              </button>

            )}

          </div>

        )}


        {/* ================================================
            REPORT GRID
        ================================================= */}

        <div className="reports-grid">

          {loading ? (

            [1, 2, 3, 4].map(
              (item) => (

                <div
                  className="report-skeleton"
                  key={item}
                >

                  <div className="skeleton-top" />

                  <div className="skeleton-title" />

                  <div className="skeleton-text" />

                  <div className="skeleton-bottom" />

                </div>

              )
            )

          ) : filteredReports.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                <FileText size={29} />
              </div>

              <h3>
                No reports found
              </h3>

              <p>
                Try changing your search
                or filters.
              </p>

              <button
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          ) : (

            filteredReports.map(
              (report, index) => {

                const Icon =
                  getIssueIcon(
                    report.category
                  );

                const steps = [
                  "Reported",
                  "Under Review",
                  "In Progress",
                  "Resolved",
                ];

                const currentStep =
                  steps.indexOf(
                    report.status
                  );

                return (

                  <div
                    className="modern-report-card"
                    key={
                      report._id ||
                      `${index}-${report.category}`
                    }
                    onClick={() => {

                      if (report._id) {
                        navigate(
                          `/citizen/reports/${report._id}`
                        );
                      }

                    }}
                  >


                    {/* CARD TOP */}

                    <div className="card-top">

                      <div className="issue-icon">
                        <Icon size={23} />
                      </div>


                      <div className="card-top-info">

                        <div className="category-row">

                          <span className="category">
                            {report.category}
                          </span>

                          <span
                            className={`severity ${report.severity.toLowerCase()}`}
                          >
                            {report.severity}
                          </span>

                        </div>

                        <span className="report-id">
                          REPORT #
                          {String(index + 1).padStart(
                            3,
                            "0"
                          )}
                        </span>

                      </div>


                      <button
                        className="card-arrow"
                        onClick={(event) => {

                          event.stopPropagation();

                          if (report._id) {
                            navigate(
                              `/citizen/reports/${report._id}`
                            );
                          }

                        }}
                      >
                        <ArrowRight size={19} />
                      </button>

                    </div>


                    {/* DESCRIPTION */}

                    <p className="card-description">
                      {report.description}
                    </p>


                    {/* META */}

                    <div className="card-meta">

                      <span>
                        <MapPin size={14} />
                        {report.location}
                      </span>

                      <span>
                        <CalendarDays size={14} />
                        {formatDate(
                          report.createdAt
                        )}
                      </span>

                    </div>


                    {/* STATUS */}

                    <div className="card-status-row">

                      <span
                        className={`status-badge status-${getStatusClass(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>


                      {report.status ===
                        "Resolved" && (

                        <span className="resolved-text">

                          <CheckCircle2 size={14} />

                          Issue resolved

                        </span>

                      )}

                    </div>


                    {/* PROGRESS */}

                    <div className="mini-progress">

                      {steps.map(
                        (step, stepIndex) => (

                          <React.Fragment
                            key={step}
                          >

                            <div
                              className={`mini-step ${
                                stepIndex <=
                                currentStep
                                  ? "active"
                                  : ""
                              }`}
                            >

                              <div className="mini-dot">

                                {stepIndex <
                                currentStep ? (
                                  <CheckCircle2
                                    size={10}
                                  />
                                ) : null}

                              </div>

                              <span>
                                {step}
                              </span>

                            </div>


                            {stepIndex <
                              steps.length - 1 && (

                              <div
                                className={`mini-line ${
                                  stepIndex <
                                  currentStep
                                    ? "active"
                                    : ""
                                }`}
                              />

                            )}

                          </React.Fragment>

                        )
                      )}

                    </div>

                  </div>

                );

              }
            )

          )}

        </div>

      </div>

    </div>
  );
}

export default MyReports;