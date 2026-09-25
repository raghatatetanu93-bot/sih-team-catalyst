import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Community.css";

import {
  Users,
  MapPin,
  Droplets,
  Trash2,
  Construction,
  Heart,
  MessageCircle,
  ArrowRight,
  Search,
  SlidersHorizontal,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Flame,
  TrendingUp,
  Navigation,
  Zap,
  GraduationCap,
  HeartPulse,
  X,
} from "lucide-react";


/* =====================================================
   DEMO MODE
   ===================================================== */

const DEMO_MODE = true;


/* =====================================================
   DEMO COMMUNITY ISSUES
===================================================== */

const demoIssues = [
  {
    id: 1,
    title: "Water shortage affecting rural villages",
    category: "Water",
    location: "Ranchi District",
    reports: 184,
    supporters: 92,
    comments: 24,
    severity: "Critical",
    status: "In Progress",
    affected: 840,
    x: 28,
    y: 30,
    icon: Droplets,
    color: "water",
  },

  {
    id: 2,
    title: "Irregular waste collection",
    category: "Sanitation",
    location: "Dhanbad",
    reports: 126,
    supporters: 67,
    comments: 18,
    severity: "High",
    status: "Under Review",
    affected: 520,
    x: 63,
    y: 25,
    icon: Trash2,
    color: "sanitation",
  },

  {
    id: 3,
    title: "Damaged roads causing travel problems",
    category: "Infrastructure",
    location: "Kanke, Ranchi",
    reports: 96,
    supporters: 54,
    comments: 12,
    severity: "High",
    status: "In Progress",
    affected: 410,
    x: 47,
    y: 57,
    icon: Construction,
    color: "infrastructure",
  },

  {
    id: 4,
    title: "Street lighting failure",
    category: "Electricity",
    location: "Bokaro",
    reports: 74,
    supporters: 38,
    comments: 9,
    severity: "Medium",
    status: "Reported",
    affected: 280,
    x: 77,
    y: 61,
    icon: Zap,
    color: "electricity",
  },

  {
    id: 5,
    title: "Healthcare facility needs attention",
    category: "Healthcare",
    location: "Jamshedpur",
    reports: 61,
    supporters: 42,
    comments: 15,
    severity: "Critical",
    status: "In Progress",
    affected: 630,
    x: 35,
    y: 76,
    icon: HeartPulse,
    color: "healthcare",
  },

  {
    id: 6,
    title: "School infrastructure concerns",
    category: "Education",
    location: "Hazaribagh",
    reports: 48,
    supporters: 31,
    comments: 8,
    severity: "Medium",
    status: "Under Review",
    affected: 190,
    x: 73,
    y: 82,
    icon: GraduationCap,
    color: "education",
  },
];


/* =====================================================
   CATEGORY COLORS
===================================================== */

const categoryClass = {
  Water: "water",
  Sanitation: "sanitation",
  Infrastructure: "infrastructure",
  Electricity: "electricity",
  Healthcare: "healthcare",
  Education: "education",
};


/* =====================================================
   HELPERS
===================================================== */

const getSeverityClass = (severity) => {
  return severity.toLowerCase();
};


const getStatusClass = (status) => {
  return status
    .toLowerCase()
    .replace(/\s+/g, "-");
};


/* =====================================================
   COMPONENT
===================================================== */

function Community() {
  const navigate = useNavigate();

  const [issues, setIssues] = useState(
    demoIssues
  );

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [showFilters, setShowFilters] =
    useState(false);

  const [selectedIssue, setSelectedIssue] =
    useState(null);


  /* =====================================================
     BACKEND FETCH
     We keep demo data if backend is unavailable.
  ===================================================== */

  useEffect(() => {

    const fetchIssues = async () => {

      if (DEMO_MODE) {
        return;
      }

      try {

        // Uncomment when your backend response
        // structure is ready.

        // const response = await api.get("/problems");
        // setIssues(response.data);

      } catch (error) {

        console.error(
          "Failed to load community issues:",
          error
        );

      }

    };

    fetchIssues();

  }, []);


  /* =====================================================
     FILTERED ISSUES
  ===================================================== */

  const filteredIssues = useMemo(() => {

    const query =
      search.toLowerCase().trim();

    return issues.filter((issue) => {

      const matchesCategory =
        categoryFilter === "All" ||
        issue.category === categoryFilter;

      const searchableText = [
        issue.title,
        issue.category,
        issue.location,
        issue.severity,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query ||
        searchableText.includes(query);

      return (
        matchesCategory &&
        matchesSearch
      );

    });

  }, [
    issues,
    search,
    categoryFilter,
  ]);


  /* =====================================================
     TOTALS
  ===================================================== */

  const totalReports = issues.reduce(
    (sum, issue) =>
      sum + issue.reports,
    0
  );

  const totalSupporters = issues.reduce(
    (sum, issue) =>
      sum + issue.supporters,
    0
  );

  const criticalIssues =
    issues.filter(
      (issue) =>
        issue.severity === "Critical"
    ).length;


  /* =====================================================
     CATEGORIES
  ===================================================== */

  const categories = [
    "All",
    ...new Set(
      issues.map(
        (issue) => issue.category
      )
    ),
  ];


  /* =====================================================
     TRENDING
  ===================================================== */

  const trendingIssues = [
    ...issues,
  ]
    .sort(
      (a, b) =>
        b.supporters -
        a.supporters
    )
    .slice(0, 3);


  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
  };


  return (

    <div className="community-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <section className="community-header">

        <div>

          <span className="page-label">
            COMMUNITY PORTAL
          </span>

          <h1>
            Community
          </h1>

          <p>
            Discover problems reported by citizens,
            explore what's happening around your
            community, and support issues that matter.
          </p>

        </div>


        <div className="community-header-actions">

          <div className="community-header-stat">
            <Users size={17} />

            <div>
              <strong>
                {totalSupporters}
              </strong>

              <span>
                Citizens engaged
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          COMMUNITY OVERVIEW
      ================================================= */}

      <section className="community-overview">

        <div className="overview-main">

          <div className="overview-icon">
            <Users size={22} />
          </div>

          <div>

            <span>
              YOUR COMMUNITY
            </span>

            <h2>
              Your voice can create
              collective impact.
            </h2>

            <p>
              When citizens report and support
              the same problem, authorities can
              better understand its impact.
            </p>

          </div>

        </div>


        <div className="overview-stats">

          <div>
            <strong>
              1,248
            </strong>

            <span>
              Active Citizens
            </span>
          </div>

          <div>
            <strong>
              {totalReports}
            </strong>

            <span>
              Community Reports
            </span>
          </div>

          <div>
            <strong>
              148
            </strong>

            <span>
              Resolved Issues
            </span>
          </div>

        </div>

      </section>


      {/* =================================================
          MAP + TRENDING
      ================================================= */}

      <section className="community-intelligence">


        {/* MAP */}

        <div className="community-map-section">

          <div className="map-header">

            <div>

              <span className="section-label">
                LIVE ISSUE MAP
              </span>

              <h2>
                What's happening around you?
              </h2>

            </div>


            <div className="map-legend">

              <span>
                <i className="legend critical" />
                Critical
              </span>

              <span>
                <i className="legend high" />
                High
              </span>

              <span>
                <i className="legend medium" />
                Medium
              </span>

            </div>

          </div>


          {/* VISUAL MAP */}

          <div className="community-map">


            {/* MAP BACKGROUND */}

            <div className="map-grid" />

            <div className="map-road road-1" />
            <div className="map-road road-2" />
            <div className="map-road road-3" />
            <div className="map-road road-4" />
            <div className="map-road road-5" />


            {/* MAP AREAS */}

            <span className="map-area area-1">
              RANCHI
            </span>

            <span className="map-area area-2">
              DHANBAD
            </span>

            <span className="map-area area-3">
              BOKARO
            </span>

            <span className="map-area area-4">
              JAMSHEDPUR
            </span>


            {/* MARKERS */}

            {issues.map((issue) => (

              <button
                key={issue.id}
                className={`map-marker ${getSeverityClass(
                  issue.severity
                )} ${
                  selectedIssue?.id ===
                  issue.id
                    ? "selected"
                    : ""
                }`}
                style={{
                  left: `${issue.x}%`,
                  top: `${issue.y}%`,
                }}
                onClick={() =>
                  setSelectedIssue(issue)
                }
              >

                <span>
                  <issue.icon size={14} />
                </span>

              </button>

            ))}


            {/* SELECTED ISSUE POPUP */}

            {selectedIssue && (

              <div className="map-popup">

                <button
                  className="popup-close"
                  onClick={() =>
                    setSelectedIssue(null)
                  }
                >
                  <X size={14} />
                </button>

                <div className="popup-icon">
                  <selectedIssue.icon
                    size={18}
                  />
                </div>

                <div>

                  <span>
                    {selectedIssue.category}
                  </span>

                  <h3>
                    {selectedIssue.title}
                  </h3>

                  <p>
                    <MapPin size={12} />
                    {selectedIssue.location}
                  </p>

                </div>

              </div>

            )}


            {/* MAP CONTROLS */}

            <div className="map-controls">

              <button>
                +
              </button>

              <button>
                −
              </button>

            </div>


            <div className="map-location-button">
              <Navigation size={16} />
            </div>


            <div className="map-label">
              <span className="live-dot" />
              {issues.length} active issue areas
            </div>

          </div>

        </div>


        {/* TRENDING */}

        <aside className="trending-panel">

          <div className="trending-header">

            <div>

              <span className="section-label">
                COMMUNITY PULSE
              </span>

              <h2>
                Trending Issues
              </h2>

            </div>

            <Flame
              size={22}
              className="flame-icon"
            />

          </div>


          <p className="trending-description">
            Problems receiving the most attention
            from citizens.
          </p>


          <div className="trending-list">

            {trendingIssues.map(
              (issue, index) => {

                const Icon = issue.icon;

                return (

                  <div
                    className="trending-item"
                    key={issue.id}
                    onClick={() =>
                      navigate(
                        `/citizen/community/${issue.id}`
                      )
                    }
                  >

                    <div className="trending-rank">
                      0{index + 1}
                    </div>


                    <div
                      className={`trending-icon ${issue.color}`}
                    >
                      <Icon size={18} />
                    </div>


                    <div className="trending-info">

                      <h3>
                        {issue.title}
                      </h3>

                      <span>
                        <Users size={12} />
                        {issue.supporters}
                        {" "}supporters
                      </span>

                    </div>


                    <ArrowRight
                      size={16}
                      className="trending-arrow"
                    />

                  </div>

                );

              }
            )}

          </div>


          <div className="community-pulse">

            <div className="pulse-icon">
              <TrendingUp size={18} />
            </div>

            <div>

              <strong>
                Community engagement is up
              </strong>

              <span>
                Citizens are actively supporting
                local issues.
              </span>

            </div>

          </div>

        </aside>

      </section>


      {/* =================================================
          DISCOVER ISSUES
      ================================================= */}

      <section className="community-issues-section">


        <div className="community-section-header">

          <div>

            <span className="section-label">
              DISCOVER ISSUES
            </span>

            <h2>
              Problems that need attention
            </h2>

            <p>
              Explore issues reported by citizens
              across the community.
            </p>

          </div>


          <button
            className={`community-filter ${
              showFilters
                ? "active"
                : ""
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
                  ? "rotate"
                  : ""
              }
            />

          </button>

        </div>


        {/* SEARCH */}

        <div className="community-search">

          <Search size={18} />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search issues, locations or categories..."
          />

        </div>


        {/* FILTER PANEL */}

        {showFilters && (

          <div className="community-filter-panel">

            <div>

              <label>
                CATEGORY
              </label>

              <div className="category-pills">

                {categories.map(
                  (category) => (

                    <button
                      key={category}
                      className={
                        categoryFilter ===
                        category
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setCategoryFilter(
                          category
                        )
                      }
                    >
                      {category}
                    </button>

                  )
                )}

              </div>

            </div>


            {(search ||
              categoryFilter !==
                "All") && (

              <button
                className="clear-community"
                onClick={clearFilters}
              >
                Clear filters
              </button>

            )}

          </div>

        )}


        {/* ISSUE GRID */}

        <div className="community-issues-grid">

          {filteredIssues.map(
            (issue) => {

              const Icon = issue.icon;

              return (

                <article
                  className={`community-issue-card ${issue.color}`}
                  key={issue.id}
                >


                  {/* TOP */}

                  <div className="community-card-top">

                    <div className="community-issue-icon">
                      <Icon size={23} />
                    </div>

                    <span className="community-category">
                      {issue.category}
                    </span>

                  </div>


                  {/* TITLE */}

                  <h3>
                    {issue.title}
                  </h3>


                  {/* SEVERITY */}

                  <div className="issue-severity-row">

                    <span
                      className={`issue-severity ${getSeverityClass(
                        issue.severity
                      )}`}
                    >
                      <AlertTriangle size={11} />
                      {issue.severity}
                    </span>

                    <span
                      className={`issue-status ${getStatusClass(
                        issue.status
                      )}`}
                    >
                      {issue.status}
                    </span>

                  </div>


                  {/* LOCATION */}

                  <div className="community-location">

                    <MapPin size={15} />

                    <span>
                      {issue.location}
                    </span>

                  </div>


                  <div className="community-divider" />


                  {/* ENGAGEMENT */}

                  <div className="community-engagement">

                    <div className="engagement-item">

                      <Users size={16} />

                      <span>
                        {issue.reports}
                        {" "}reports
                      </span>

                    </div>


                    <div className="engagement-item">

                      <Heart size={16} />

                      <span>
                        {issue.supporters}
                      </span>

                    </div>


                    <div className="engagement-item">

                      <MessageCircle size={16} />

                      <span>
                        {issue.comments}
                      </span>

                    </div>

                  </div>


                  {/* AFFECTED */}

                  <div className="affected-row">

                    <div className="affected-avatar">
                      <Users size={14} />
                    </div>

                    <span>
                      <strong>
                        {issue.affected}+
                      </strong>
                      {" "}citizens potentially affected
                    </span>

                  </div>


                  {/* BUTTON */}

                  <button
                    className="view-community-issue"
                    onClick={() =>
                      navigate(
                        `/citizen/community/${issue.id}`
                      )
                    }
                  >

                    View Issue

                    <ArrowRight size={17} />

                  </button>

                </article>

              );

            }
          )}

        </div>


        {filteredIssues.length === 0 && (

          <div className="community-empty">

            <Search size={28} />

            <h3>
              No issues found
            </h3>

            <p>
              Try changing your search
              or category filter.
            </p>

            <button
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

        )}

      </section>


      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      <section className="community-cta">

        <div className="cta-icon">
          <AlertTriangle size={22} />
        </div>

        <div>

          <span>
            SEE SOMETHING THAT NEEDS ATTENTION?
          </span>

          <h2>
            Your report could be the first step
            toward solving it.
          </h2>

        </div>

        <button
          onClick={() =>
            navigate("/citizen/report")
          }
        >
          Report an Issue
          <ArrowRight size={17} />
        </button>

      </section>

    </div>
  );
}

export default Community;