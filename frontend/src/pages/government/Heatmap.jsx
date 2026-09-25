import React, { useMemo, useState, useEffect } from "react";
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
  RefreshCw,
  Loader2,
} from "lucide-react";
import api from "../../api";

// Approximate coordinates for Jharkhand's districts
const DISTRICT_COORDINATES = {
  ranchi: { lat: 23.3441, lng: 85.3096, name: "Ranchi", district: "Ranchi District" },
  dhanbad: { lat: 23.7957, lng: 86.4304, name: "Dhanbad", district: "Dhanbad District" },
  jamshedpur: { lat: 22.8046, lng: 86.2029, name: "Jamshedpur", district: "East Singhbhum District" },
  "east singhbhum": { lat: 22.8046, lng: 86.2029, name: "Jamshedpur", district: "East Singhbhum District" },
  bokaro: { lat: 23.6693, lng: 86.1511, name: "Bokaro", district: "Bokaro District" },
  deoghar: { lat: 24.4826, lng: 86.7001, name: "Deoghar", district: "Deoghar District" },
  hazaribagh: { lat: 23.9925, lng: 85.3637, name: "Hazaribagh", district: "Hazaribagh District" },
  dumka: { lat: 24.2677, lng: 87.2497, name: "Dumka", district: "Dumka District" },
  latehar: { lat: 23.7441, lng: 84.5022, name: "Latehar", district: "Latehar District" },
  giridih: { lat: 24.1895, lng: 86.3072, name: "Giridih", district: "Giridih District" },
  ramgarh: { lat: 23.6300, lng: 85.5126, name: "Ramgarh", district: "Ramgarh District" },
  "west singhbhum": { lat: 22.5500, lng: 85.8100, name: "West Singhbhum", district: "West Singhbhum District" },
  gumla: { lat: 23.0435, lng: 84.5417, name: "Gumla", district: "Gumla District" },
  palamu: { lat: 24.0435, lng: 84.0700, name: "Palamu", district: "Palamu District" },
  garhwa: { lat: 24.1610, lng: 83.8119, name: "Garhwa", district: "Garhwa District" },
  chatra: { lat: 24.2100, lng: 84.8700, name: "Chatra", district: "Chatra District" },
  koderma: { lat: 24.4670, lng: 85.5940, name: "Koderma", district: "Koderma District" },
  jamtara: { lat: 23.9630, lng: 86.8020, name: "Jamtara", district: "Jamtara District" },
  godda: { lat: 24.8270, lng: 87.2120, name: "Godda", district: "Godda District" },
  sahibganj: { lat: 25.2425, lng: 87.6534, name: "Sahibganj", district: "Sahibganj District" },
  pakur: { lat: 24.6330, lng: 87.8490, name: "Pakur", district: "Pakur District" },
  lohardaga: { lat: 23.4300, lng: 84.6800, name: "Lohardaga", district: "Lohardaga District" },
  simdega: { lat: 22.6100, lng: 84.5100, name: "Simdega", district: "Simdega District" },
  khunti: { lat: 23.0700, lng: 85.2800, name: "Khunti", district: "Khunti District" },
  seraikela: { lat: 22.7000, lng: 85.9300, name: "Seraikela", district: "Seraikela Kharsawan District" },
  "seraikela kharsawan": { lat: 22.7000, lng: 85.9300, name: "Seraikela", district: "Seraikela Kharsawan District" },
};

// Project geographic (lat, lng) to canvas CSS percentage (x, y)
const projectCoordinates = (lat, lng) => {
  const minLng = 83.2;
  const maxLng = 88.0;
  const minLat = 22.0;
  const maxLat = 25.4;

  const boundedLng = Math.max(minLng, Math.min(maxLng, lng));
  const boundedLat = Math.max(minLat, Math.min(maxLat, lat));

  // Map to 10% - 90% space inside card
  const xPercent = 10 + ((boundedLng - minLng) / (maxLng - minLng)) * 80;
  const yPercent = 10 + ((maxLat - boundedLat) / (maxLat - minLat)) * 80;

  return {
    x: `${xPercent.toFixed(1)}%`,
    y: `${yPercent.toFixed(1)}%`,
  };
};

function Heatmap() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showLayers, setShowLayers] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [locationFilter, setLocationFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchProblems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/problems");
      setProblems(res.data || []);
    } catch (err) {
      console.error("Failed to load problems for heatmap:", err);
      setError("Failed to fetch live problems from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  // Aggregate problems per district into map locations
  const locations = useMemo(() => {
    if (!problems || problems.length === 0) return [];

    const districtGroups = {};

    problems.forEach((problem) => {
      const rawDist = (problem.location?.district || "").trim();
      let normalizedKey = rawDist.toLowerCase();

      // Direct lookup
      let info = DISTRICT_COORDINATES[normalizedKey];

      // Address substring match fallback
      if (!info) {
        const addr = (problem.location?.address || "").toLowerCase();
        for (const [key, val] of Object.entries(DISTRICT_COORDINATES)) {
          if (addr.includes(key) || rawDist.toLowerCase().includes(key)) {
            normalizedKey = key;
            info = val;
            break;
          }
        }
      }

      // Default fallback
      if (!info) {
        normalizedKey = "ranchi";
        info = DISTRICT_COORDINATES["ranchi"];
      }

      if (!districtGroups[normalizedKey]) {
        districtGroups[normalizedKey] = {
          key: normalizedKey,
          name: info.name,
          district: info.district,
          defaultLat: info.lat,
          defaultLng: info.lng,
          problems: [],
        };
      }

      districtGroups[normalizedKey].problems.push(problem);
    });

    return Object.values(districtGroups)
      .map((group, idx) => {
        const groupProblems = group.problems;
        const count = groupProblems.length;

        // Determine dominant severity
        const severities = groupProblems.map((p) => p.severity);
        let severity = "Low";
        if (severities.includes("Critical")) severity = "Critical";
        else if (severities.includes("High")) severity = "High";
        else if (severities.includes("Medium")) severity = "Medium";

        // Determine dominant category
        const catCounts = {};
        groupProblems.forEach((p) => {
          const c = p.category || "General";
          catCounts[c] = (catCounts[c] || 0) + 1;
        });
        const dominantCategory = Object.keys(catCounts).reduce(
          (a, b) => (catCounts[a] >= catCounts[b] ? a : b),
          "General"
        );

        // Coordinates: calculate average of problem lat/lng or district default
        const validCoords = groupProblems
          .filter(
            (p) =>
              typeof p.location?.lat === "number" &&
              typeof p.location?.lng === "number" &&
              p.location.lat !== 0 &&
              p.location.lng !== 0
          )
          .map((p) => ({ lat: p.location.lat, lng: p.location.lng }));

        let lat = group.defaultLat;
        let lng = group.defaultLng;

        if (validCoords.length > 0) {
          lat =
            validCoords.reduce((sum, c) => sum + c.lat, 0) / validCoords.length;
          lng =
            validCoords.reduce((sum, c) => sum + c.lng, 0) / validCoords.length;
        }

        const { x, y } = projectCoordinates(lat, lng);

        const affected = groupProblems.reduce(
          (sum, p) => sum + (Number(p.affectedPopulation) || 50),
          0
        );

        const emergency = groupProblems.filter(
          (p) => p.emergencyStatus
        ).length;

        return {
          id: idx + 1,
          key: group.key,
          name: group.name,
          district: group.district,
          problems: count,
          severity,
          category: dominantCategory,
          affected,
          emergency,
          x,
          y,
          lat,
          lng,
          description: `${count} reported ${
            count === 1 ? "problem" : "problems"
          } in ${group.district}. Dominant focus area: ${dominantCategory}. Active emergencies: ${emergency}.`,
        };
      })
      .sort((a, b) => b.problems - a.problems);
  }, [problems]);

  const filteredLocations = useMemo(() => {
    return locations.filter((location) => {
      const matchesSearch =
        location.name.toLowerCase().includes(search.toLowerCase()) ||
        location.district.toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        locationFilter === "all" ||
        location.name.toLowerCase() === locationFilter.toLowerCase();

      const matchesSeverity =
        severityFilter === "all" ||
        location.severity.toLowerCase() === severityFilter.toLowerCase();

      const matchesCategory =
        categoryFilter === "all" ||
        location.category.toLowerCase().replaceAll(" ", "-") === categoryFilter ||
        location.category.toLowerCase() === categoryFilter;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSeverity &&
        matchesCategory
      );
    });
  }, [locations, search, locationFilter, severityFilter, categoryFilter]);

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

  // Category breakdown computed dynamically from actual problems
  const categoryData = useMemo(() => {
    const counts = {};
    problems.forEach((p) => {
      const c = p.category || "Unassigned";
      counts[c] = (counts[c] || 0) + 1;
    });

    const icons = {
      "Water & Sanitation": { icon: Droplets, className: "water" },
      Water: { icon: Droplets, className: "water" },
      Infrastructure: { icon: Building2, className: "infrastructure" },
      "Roads & Transport": { icon: Building2, className: "infrastructure" },
      Healthcare: { icon: HeartPulse, className: "healthcare" },
      "Public Health": { icon: HeartPulse, className: "healthcare" },
      "Waste Management": { icon: Trash2, className: "waste" },
      "Power & Energy": { icon: AlertTriangle, className: "infrastructure" },
      Education: { icon: Activity, className: "water" },
    };

    return Object.entries(counts)
      .map(([name, count]) => {
        const meta = icons[name] || { icon: Activity, className: "infrastructure" };
        return {
          name,
          count,
          icon: meta.icon,
          className: meta.className,
        };
      })
      .sort((a, b) => b.count - a.count);
  }, [problems]);

  const highestDistrict = useMemo(() => {
    if (!locations || locations.length === 0) return null;
    return locations[0]; // Already sorted descending by problems
  }, [locations]);

  return (
    <div className="heatmap-page">
      {/* HEADER */}
      <div className="heatmap-header">
        <div>
          <span className="eyebrow">GEOGRAPHIC INCIDENT MONITORING</span>
          <h1>Live Problem Heatmap</h1>
          <p className="heatmap-subtitle">
            Visualize real-time problem distribution and severity clusters across Jharkhand districts.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={fetchProblems}
            className="map-layer-button"
            style={{ padding: "9px 14px" }}
            title="Refresh Heatmap Data"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Sync Data
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="heatmap-filters">
        <div className="heatmap-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search district, city or region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")} aria-label="Clear search">
              <X size={15} />
            </button>
          )}
        </div>

        <div className="heatmap-selects">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="all">All locations</option>
            {locations.map((loc) => (
              <option key={loc.name} value={loc.name.toLowerCase()}>
                {loc.name} ({loc.problems})
              </option>
            ))}
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="all">All severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All categories</option>
            {categoryData.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name} ({cat.count})
              </option>
            ))}
          </select>

          {hasFilters && (
            <button className="clear-filters" onClick={clearFilters}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="heatmap-stats">
        <div className="heatmap-stat">
          <div className="stat-icon-wrapper red">
            <AlertTriangle size={20} />
          </div>
          <div>
            <strong>{totalProblems.toLocaleString()}</strong>
            <span>Total Reported</span>
          </div>
        </div>

        <div className="heatmap-stat">
          <div className="stat-icon-wrapper orange">
            <Activity size={20} />
          </div>
          <div>
            <strong>
              {filteredLocations.filter((l) => l.severity === "Critical").length}
            </strong>
            <span>Critical Districts</span>
          </div>
        </div>

        <div className="heatmap-stat">
          <div className="stat-icon-wrapper blue">
            <Users size={20} />
          </div>
          <div>
            <strong>{totalEmergency.toLocaleString()}</strong>
            <span>Emergency Escalations</span>
          </div>
        </div>

        <div className="heatmap-stat">
          <div className="stat-icon-wrapper green">
            <MapPin size={20} />
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
                District and city-level distribution of reported problems across Jharkhand
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

            {loading ? (
              <div style={{ position: "absolute", top: "45%", left: "45%", transform: "translate(-50%, -50%)", color: "#64748b", textAlign: "center", zIndex: 20 }}>
                <Loader2 size={32} className="animate-spin" style={{ margin: "0 auto 8px" }} />
                <span>Loading real location markers...</span>
              </div>
            ) : error ? (
              <div style={{ position: "absolute", top: "45%", left: "45%", transform: "translate(-50%, -50%)", color: "#dc2626", textAlign: "center", zIndex: 20 }}>
                <span>{error}</span>
              </div>
            ) : (
              filteredLocations.map((location) => (
                <React.Fragment key={location.id}>
                  {/* Dynamic District Label positioned right above the marker */}
                  <span
                    className="map-label"
                    style={{
                      left: location.x,
                      top: `calc(${location.y} - 28px)`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {location.name} ({location.problems})
                  </span>

                  <button
                    className={`map-marker ${location.severity.toLowerCase()} ${
                      selectedLocation?.id === location.id ? "selected" : ""
                    }`}
                    style={{
                      left: location.x,
                      top: location.y,
                    }}
                    onClick={() => setSelectedLocation(location)}
                    title={`${location.name}: ${location.problems} problems (${location.severity})`}
                  >
                    <span className="marker-pulse"></span>
                    <MapPin size={17} />
                  </button>
                </React.Fragment>
              ))
            )}

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
                    <strong>{selectedLocation.affected.toLocaleString()}</strong>
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
              const maxCount = categoryData[0]?.count || 1;

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
                            (category.count / maxCount) * 100,
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
              <strong>{highestDistrict?.district || "Ranchi District"}</strong>
              <small>{highestDistrict?.problems || 0} reported problems</small>
            </div>
          </div>
        </aside>
      </div>

      {/* LOCATION TABLE */}
      <section className="location-summary">
        <div className="location-summary-header">
          <div>
            <h2>Most Affected Locations</h2>
            <p>Areas with the highest concentration of reported problems</p>
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

              <button onClick={clearFilters}>Clear filters</button>
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

                <span className="location-category">{location.category}</span>

                <strong className="location-problems">
                  {location.problems}
                </strong>

                <span
                  className={`location-severity ${location.severity.toLowerCase()}`}
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