import { useState } from "react";
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
} from "lucide-react";

function Heatmap() {
    const [showLayers, setShowLayers] = useState(false);
  const locations = [
    {
      id: 1,
      name: "Ranchi",
      district: "Ranchi District",
      problems: 342,
      severity: "High",
      category: "Water",
      x: "48%",
      y: "34%",
    },
    {
      id: 2,
      name: "Latehar",
      district: "Latehar District",
      problems: 184,
      severity: "Critical",
      category: "Water",
      x: "35%",
      y: "43%",
    },
    {
      id: 3,
      name: "West Singhbhum",
      district: "West Singhbhum District",
      problems: 286,
      severity: "High",
      category: "Infrastructure",
      x: "27%",
      y: "69%",
    },
    {
      id: 4,
      name: "Dumka",
      district: "Dumka District",
      problems: 214,
      severity: "Medium",
      category: "Healthcare",
      x: "72%",
      y: "38%",
    },
    {
      id: 5,
      name: "Jamshedpur",
      district: "East Singhbhum District",
      problems: 176,
      severity: "Medium",
      category: "Waste Management",
      x: "75%",
      y: "68%",
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

        <div className="filter-item">
          <Layers size={16} />
          <select defaultValue="state">
            <option value="state">Jharkhand</option>
            <option value="ranchi">Ranchi</option>
            <option value="latehar">Latehar</option>
            <option value="dumka">Dumka</option>
          </select>
        </div>

        <div className="filter-item">
          <MapPin size={16} />
          <select defaultValue="all">
            <option value="all">All Locations</option>
            <option value="district">District</option>
            <option value="city">City</option>
            <option value="village">Village</option>
          </select>
        </div>

        <div className="filter-item">
          <AlertTriangle size={16} />
          <select defaultValue="all">
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="filter-item">
          <Layers size={16} />
          <select defaultValue="all">
            <option value="all">All Categories</option>
            <option value="water">Water</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="healthcare">Healthcare</option>
            <option value="waste">Waste Management</option>
          </select>
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
      <div><span className="layer-dot critical"></span> Critical</div>
      <div><span className="layer-dot high"></span> High</div>
      <div><span className="layer-dot medium"></span> Medium</div>
      <div><span className="layer-dot low"></span> Low</div>
    </div>
  )}
</div>
          </div>

          <div className="map-area">

            {/* Decorative map background */}
            <div className="map-grid"></div>

            <div className="map-shape map-shape-one"></div>
            <div className="map-shape map-shape-two"></div>
            <div className="map-shape map-shape-three"></div>

            {/* LOCATION MARKERS */}
            {locations.map((location) => (
              <button
                key={location.id}
                className={`map-marker ${
                  location.severity.toLowerCase()
                }`}
                style={{
                  left: location.x,
                  top: location.y,
                }}
                title={location.name}
              >
                <span className="marker-pulse"></span>
                <MapPin size={18} />

                <div className="marker-tooltip">
                  <strong>{location.name}</strong>

                  <span>
                    {location.problems} reported problems
                  </span>

                  <small>
                    {location.category} · {location.severity}
                  </small>
                </div>
              </button>
            ))}

            {/* MAP LABELS */}
            <div className="map-label label-ranchi">Ranchi</div>
            <div className="map-label label-latehar">Latehar</div>
            <div className="map-label label-dumka">Dumka</div>
            <div className="map-label label-jamshedpur">
              Jamshedpur
            </div>
            <div className="map-label label-singhbhum">
              West Singhbhum
            </div>

            {/* LEGEND */}
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

          </div>

        </section>

        {/* SIDE PANEL */}
        <aside className="heatmap-side-panel">

          <div className="panel-heading">
            <div>
              <h2>Problem Overview</h2>
              <p>Current distribution</p>
            </div>
          </div>

          <div className="overview-number">
            <strong>1,284</strong>
            <span>Total reported problems</span>
          </div>

          <div className="category-list">

            <div className="category-item">
              <div className="category-icon water">
                <Droplets size={17} />
              </div>

              <div className="category-info">
                <div>
                  <strong>Water</strong>
                  <span>342</span>
                </div>

                <div className="category-progress">
                  <span style={{ width: "78%" }}></span>
                </div>
              </div>
            </div>

            <div className="category-item">
              <div className="category-icon infrastructure">
                <Building2 size={17} />
              </div>

              <div className="category-info">
                <div>
                  <strong>Infrastructure</strong>
                  <span>286</span>
                </div>

                <div className="category-progress">
                  <span style={{ width: "66%" }}></span>
                </div>
              </div>
            </div>

            <div className="category-item">
              <div className="category-icon healthcare">
                <HeartPulse size={17} />
              </div>

              <div className="category-info">
                <div>
                  <strong>Healthcare</strong>
                  <span>214</span>
                </div>

                <div className="category-progress">
                  <span style={{ width: "51%" }}></span>
                </div>
              </div>
            </div>

            <div className="category-item">
              <div className="category-icon waste">
                <Trash2 size={17} />
              </div>

              <div className="category-info">
                <div>
                  <strong>Waste Management</strong>
                  <span>176</span>
                </div>

                <div className="category-progress">
                  <span style={{ width: "43%" }}></span>
                </div>
              </div>
            </div>

          </div>

          {/* HIGHEST CONCENTRATION */}
          <div className="highest-concentration">

            <div className="concentration-icon">
              <AlertTriangle size={18} />
            </div>

            <div>
              <span>Highest concentration</span>

              <strong>Ranchi District</strong>

              <small>
                342 reported problems
              </small>
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
        </div>

        <div className="location-table">

          {locations.map((location, index) => (
            <div className="location-row" key={location.id}>

              <span className="location-rank">
                0{index + 1}
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

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Heatmap;