import { useMemo, useState } from "react";
import "./Heatmap.css";

import {
  Map,
  MapPin,
  Layers,
  Droplets,
  Building2,
  HeartPulse,
  Trash2,
  AlertTriangle,
  Search,
  X,
  Activity,
  Users,
  ChevronRight,
} from "lucide-react";

function Heatmap() {
  const [showLayers, setShowLayers] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [locationFilter, setLocationFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");

  const locations = [
    {
      id: 1,
      name: "Ranchi",
      district: "Ranchi District",
      problems: 342,
      severity: "High",
      category: "Water",
      affected: 1240,
      emergency: 4,
      x: "48%",
      y: "34%",
      description:
        "High concentration of water-related complaints across urban and semi-urban areas.",
    },
    {
      id: 2,
      name: "Latehar",
      district: "Latehar District",
      problems: 184,
      severity: "Critical",
      category: "Water",
      affected: 840,
      emergency: 7,
      x: "35%",
      y: "43%",
      description:
        "Critical water-supply issues with multiple emergency reports requiring attention.",
    },
    {
      id: 3,
      name: "West Singhbhum",
      district: "West Singhbhum District",
      problems: 286,
      severity: "High",
      category: "Infrastructure",
      affected: 980,
      emergency: 3,
      x: "27%",
      y: "69%",
      description:
        "Infrastructure-related problems concentrated around roads, bridges and public facilities.",
    },
    {
      id: 4,
      name: "Dumka",
      district: "Dumka District",
      problems: 214,
      severity: "Medium",
      category: "Healthcare",
      affected: 620,
      emergency: 2,
      x: "72%",
      y: "38%",
      description:
        "Healthcare accessibility and facility-related problems reported across the district.",
    },
    {
      id: 5,
      name: "Jamshedpur",
      district: "East Singhbhum District",
      problems: 176,
      severity: "Medium",
      category: "Waste Management",
      affected: 510,
      emergency: 1,
      x: "75%",
      y: "68%",
      description:
        "Waste collection and sanitation complaints concentrated in urban areas.",
    },
  ];

  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const matchesSearch =
        location.name.toLowerCase().includes(search.toLowerCase()) ||
        location.district.toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        locationFilter === "all" ||
        location.name.toLowerCase() === locationFilter;

      const matchesSeverity =
        severityFilter === "all" ||
        location.severity.toLowerCase() === severityFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        location.category.toLowerCase().replaceAll(" ", "-") === categoryFilter;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSeverity &&
        matchesCategory
      );
    });
  }, [search, locationFilter, severityFilter, categoryFilter]);

  const totalProblems = filteredLocations.reduce(
    (sum, location) => sum + location.problems,
    0
  );

  const totalAffected = filteredLocations.reduce(
    (sum, location) => sum + location.affected,
    0
  );

  const totalEmergency = filteredLocations.reduce(
    (sum, location) => sum + location.emergency,
    0
  );

  const clearFilters = () => {
    setSearch("");
    setLocationFilter("all");
    setSeverityFilter("all");
    setCategoryFilter("all");
  };

  const hasFilters =
    search ||
    locationFilter !== "all" ||
    severityFilter !== "all" ||
    categoryFilter !== "all";

  const categoryData = [
    {
      name: "Water",
      count: 342,
      icon: Droplets,
      className: "water",
    },
    {
      name: "Infrastructure",
      count: 286,
      icon: Building2,
      className: "infrastructure",
    },
    {
      name: "Healthcare",
      count: 214,
      icon: HeartPulse,
      className: "healthcare",
    },
    {
      name: "Waste Management",
      count: 176,
      icon: Trash2,
      className: "waste",
    },
  ];

  return (
    <div className="heatmap-page">

      {/* HEADER */}
      <div className="heatmap-header">
        <div>
          <p className="eyebrow">GEOGRAPHIC PROBLEM INTELLIGENCE</p>

          <h1>Live Problem Heatmap</h1>

          <p className="heatmap-subtitle">
            Identify where societal problems are concentrated across
            Jharkhand and prioritize areas requiring attention.
          </p>
        </div>

        <div className="map-status">
          <span></span>
          Live Problem Data
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="heatmap-filters">

        <div className="heatmap-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search district or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button onClick={() => setSearch("")}>
              <X size={15} />
            </button>
          )}
        </div>

        <div className="filter-item">
          <Layers size={16} />

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="all">All Locations</option>
            <option value="ranchi">Ranchi</option>
            <option value="latehar">Latehar</option>
            <option value="dumka">Dumka</option>
            <option value="jamshedpur">Jamshedpur</option>
            <option value="west singhbhum">West Singhbhum</option>
          </select>
        </div>

        <div className="filter-item">
          <AlertTriangle size={16} />

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="filter-item">
          <Layers size={16} />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="water">Water</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="healthcare">Healthcare</option>
            <option value="waste-management">Waste Management</option>
          </select>
        </div>

        {hasFilters && (
          <button className="clear-filters" onClick={clearFilters}>
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* QUICK STATS */}
      <div className="heatmap-stats">

        <div className="heatmap-stat">
          <div className="stat-icon blue">
            <Activity size={19} />
          </div>

          <div>
            <strong>{totalProblems.toLocaleString()}</strong>
            <span>Reported Problems</span>
          </div>
        </div>

        <div className="heatmap-stat">
          <div className="stat-icon orange">
            <Users size={19} />
          </div>

          <div>
            <strong>{totalAffected.toLocaleString()}</strong>
            <span>People Affected</span>
          </div>
        </div>

        <div className="heatmap-stat">
          <div className="stat-icon red">
            <AlertTriangle size={19} />
          </div>

          <div>
            <strong>{totalEmergency}</strong>
            <span>Emergency Hotspots</span>
          </div>
        </div>

        <div className="heatmap-stat">
          <div className="stat-icon green">
            <MapPin size={19} />
          </div>

          <div>
            <strong>{filteredLocations.length}</strong>
            <span>Active Locations</span>
          </div>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="heatmap-layout">

        {/* MAP */}
        <section className="map-card">

          <div className="map-card-header">

            <div>
              <h2>Problem Concentration</h2>
              <p>
                District and city-level distribution of reported problems
              </p>
            </div>

            <div className="map-layer-wrapper">

              <button
                className="map-layer-button"
                onClick={() => setShowLayers(!showLayers)}
              >
                <Map size={15} />
                Map Layers
              </button>

              {showLayers && (
                <div className="map-layer-menu">

                  <div>
                    <span className="layer-dot critical"></span>
                    Critical
                  </div>

                  <div>
                    <span className="layer-dot high"></span>
                    High
                  </div>

                  <div>
                    <span className="layer-dot medium"></span>
                    Medium
                  </div>

                  <div>
                    <span className="layer-dot low"></span>
                    Low
                  </div>

                </div>
              )}

            </div>
          </div>

          <div className="map-area">

            <div className="map-grid"></div>

            <div className="map-shape map-shape-one"></div>
            <div className="map-shape map-shape-two"></div>
            <div className="map-shape map-shape-three"></div>

            {filteredLocations.map((location) => (
              <button
                key={location.id}
                className={`map-marker ${location.severity.toLowerCase()} ${
                  selectedLocation?.id === location.id ? "selected" : ""
                }`}
                style={{
                  left: location.x,
                  top: location.y,
                }}
                onClick={() => setSelectedLocation(location)}
              >
                <span className="marker-pulse"></span>

                <MapPin size={18} />

                <div className="marker-tooltip">
                  <strong>{location.name}</strong>

                  <span>
                    {location.problems.toLocaleString()} reported problems
                  </span>

                  <small>
                    {location.category} · {location.severity}
                  </small>
                </div>
              </button>
            ))}

            <div className="map-label label-ranchi">Ranchi</div>
            <div className="map-label label-latehar">Latehar</div>
            <div className="map-label label-dumka">Dumka</div>
            <div className="map-label label-jamshedpur">
              Jamshedpur
            </div>
            <div className="map-label label-singhbhum">
              West Singhbhum
            </div>

            <div className="map-legend">

              <strong>Problem Severity</strong>

              <div>
                <span className="legend-dot critical"></span>
                Critical
              </div>

              <div>
                <span className="legend-dot high"></span>
                High
              </div>

              <div>
                <span className="legend-dot medium"></span>
                Medium
              </div>

              <div>
                <span className="legend-dot low"></span>
                Low
              </div>

            </div>

            {/* SELECTED LOCATION */}
            {selectedLocation && (
              <div className="selected-location-card">

                <button
                  className="close-location"
                  onClick={() => setSelectedLocation(null)}
                >
                  <X size={15} />
                </button>

                <div className="selected-location-top">
                  <div
                    className={`selected-location-icon ${selectedLocation.severity.toLowerCase()}`}
                  >
                    <MapPin size={18} />
                  </div>

                  <div>
                    <strong>{selectedLocation.name}</strong>
                    <span>{selectedLocation.district}</span>
                  </div>
                </div>

                <p>{selectedLocation.description}</p>

                <div className="selected-location-metrics">

                  <div>
                    <strong>{selectedLocation.problems}</strong>
                    <span>Problems</span>
                  </div>

                  <div>
                    <strong>{selectedLocation.affected}</strong>
                    <span>Affected</span>
                  </div>

                  <div>
                    <strong>{selectedLocation.emergency}</strong>
                    <span>Emergency</span>
                  </div>

                </div>

                <div
                  className={`selected-severity ${selectedLocation.severity.toLowerCase()}`}
                >
                  {selectedLocation.severity} Priority
                </div>

              </div>
            )}

          </div>

        </section>

        {/* SIDE PANEL */}
        <aside className="heatmap-side-panel">

          <div className="panel-heading">
            <h2>Problem Overview</h2>
            <p>Current geographic distribution</p>
          </div>

          <div className="overview-number">
            <strong>{totalProblems.toLocaleString()}</strong>
            <span>Total reported problems</span>
          </div>

          <div className="category-list">

            {categoryData.map((category) => {
              const Icon = category.icon;

              return (
                <div className="category-item" key={category.name}>

                  <div className={`category-icon ${category.className}`}>
                    <Icon size={17} />
                  </div>

                  <div className="category-info">

                    <div>
                      <strong>{category.name}</strong>
                      <span>{category.count}</span>
                    </div>

                    <div className="category-progress">
                      <span
                        style={{
                          width: `${Math.min(
                            (category.count / 342) * 100,
                            100
                          )}%`,
                        }}
                      ></span>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          <div className="highest-concentration">

            <div className="concentration-icon">
              <AlertTriangle size={18} />
            </div>

            <div>
              <span>Highest concentration</span>
              <strong>Ranchi District</strong>
              <small>342 reported problems</small>
            </div>

          </div>

        </aside>

      </div>

      {/* LOCATION TABLE */}
      <section className="location-summary">

        <div className="location-summary-header">

          <div>
            <h2>Most Affected Locations</h2>

            <p>
              Areas with the highest concentration of reported problems
            </p>
          </div>

          <span className="result-count">
            {filteredLocations.length} locations
          </span>

        </div>

        <div className="location-table">

          {filteredLocations.length === 0 ? (
            <div className="heatmap-empty">
              <MapPin size={30} />
              <strong>No locations found</strong>
              <span>Try changing your filters or search.</span>

              <button onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            filteredLocations.map((location, index) => (

              <button
                className={`location-row ${
                  selectedLocation?.id === location.id ? "active" : ""
                }`}
                key={location.id}
                onClick={() => setSelectedLocation(location)}
              >

                <span className="location-rank">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="location-name">
                  <strong>{location.name}</strong>
                  <small>{location.district}</small>
                </div>

                <span className="location-category">
                  {location.category}
                </span>

                <strong className="location-problems">
                  {location.problems}
                </strong>

                <span
                  className={`location-severity ${
                    location.severity.toLowerCase()
                  }`}
                >
                  {location.severity}
                </span>

                <ChevronRight size={17} />

              </button>

            ))
          )}

        </div>

      </section>

    </div>
  );
}

export default Heatmap;