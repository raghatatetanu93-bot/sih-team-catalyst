import "./EmergencyAlerts.css";
import {
  AlertTriangle,
  MapPin,
  Users,
  Clock3,
  ArrowUpRight,
  ShieldAlert,
  Search,
  CheckCircle,
  UserPlus,
  Siren,
  MoreVertical,
  X,
  Building2,
  Activity,
  ChevronDown,
} from "lucide-react";
import { useMemo, useState } from "react";

function EmergencyAlerts() {
  const alerts = [
    {
      id: "ALT-001",
      title: "Urban Flooding",
      location: "Ranchi",
      district: "Ranchi District",
      affected: "1,200",
      time: "12 min ago",
      severity: "Critical",
      authority: "Ranchi Municipal Corporation",
      reports: 18,
      status: "Awaiting Action",
      type: "Flood",
      description:
        "Heavy rainfall has caused severe waterlogging across residential areas with multiple citizen reports indicating rapidly increasing water levels.",
      risk:
        "Multiple reports from nearby locations indicate a potentially expanding flood-affected zone.",
    },
    {
      id: "ALT-002",
      title: "Water Supply Failure",
      location: "Latehar",
      district: "Latehar District",
      affected: "840",
      time: "28 min ago",
      severity: "High",
      authority: "Public Health Engineering Department",
      reports: 14,
      status: "Under Review",
      type: "Water Supply",
      description:
        "Multiple villages have reported disruption of water supply for several consecutive days.",
      risk:
        "Extended disruption may affect drinking water availability for vulnerable communities.",
    },
    {
      id: "ALT-003",
      title: "Damaged Bridge",
      location: "West Singhbhum",
      district: "West Singhbhum District",
      affected: "560",
      time: "41 min ago",
      severity: "High",
      authority: "Road Construction Department",
      reports: 9,
      status: "Assigned",
      type: "Infrastructure",
      description:
        "Structural damage to a bridge has created unsafe travel conditions for vehicles.",
      risk:
        "Continued traffic on the damaged structure may increase public safety risk.",
    },
    {
      id: "ALT-004",
      title: "PHC Staff Shortage",
      location: "Dumka",
      district: "Dumka District",
      affected: "320",
      time: "1 hr ago",
      severity: "High",
      authority: "Health Department",
      reports: 7,
      status: "Under Review",
      type: "Healthcare",
      description:
        "A Primary Health Centre has reportedly operated without a doctor for several days.",
      risk:
        "Reduced medical availability may affect urgent healthcare access in the area.",
    },
  ];

  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeSummary, setActiveSummary] = useState("All");

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [alertStates, setAlertStates] = useState({});

  const getAlertState = (alert) =>
    alertStates[alert.id] || {
      status: alert.status,
      acknowledged: false,
      assigned: false,
      escalated: false,
    };

  const updateAlertState = (id, updates) => {
    setAlertStates((prev) => ({
      ...prev,
      [id]: {
        ...getAlertState(
          alerts.find((alert) => alert.id === id)
        ),
        ...updates,
      },
    }));
  };

  /* =====================================================
     FILTERING
     ===================================================== */

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const state = getAlertState(alert);
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        alert.title.toLowerCase().includes(query) ||
        alert.location.toLowerCase().includes(query) ||
        alert.district.toLowerCase().includes(query) ||
        alert.type.toLowerCase().includes(query) ||
        alert.authority.toLowerCase().includes(query);

      const matchesSeverity =
        severityFilter === "All" ||
        alert.severity === severityFilter;

      const matchesStatus =
        statusFilter === "All" ||
        state.status === statusFilter;

      let matchesSummary = true;

      if (activeSummary === "Critical") {
        matchesSummary = alert.severity === "Critical";
      }

      if (activeSummary === "High") {
        matchesSummary =
          alert.severity === "High";
      }

      if (activeSummary === "Awaiting") {
        matchesSummary =
          state.status === "Awaiting Action";
      }

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesStatus &&
        matchesSummary
      );
    });
  }, [
    search,
    severityFilter,
    statusFilter,
    activeSummary,
    alertStates,
  ]);

  const acknowledgeAlert = (alert) => {
    updateAlertState(alert.id, {
      acknowledged: true,
      status: "Acknowledged",
    });

    setOpenMenu(null);
  };

  const assignAlert = (alert) => {
    updateAlertState(alert.id, {
      assigned: true,
      status: "Assigned",
    });

    setOpenMenu(null);
  };

  const escalateAlert = (alert) => {
    updateAlertState(alert.id, {
      escalated: true,
      status: "Escalated",
    });

    setOpenMenu(null);
  };

  return (
    <div className="emergency-page">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="emergency-header">

        <div>
          <div className="emergency-heading">

            <div className="emergency-title-icon">
              <Siren size={24} />
            </div>

            <div>
              <p className="eyebrow">
                EMERGENCY RESPONSE CENTER
              </p>

              <h1>Emergency Alerts</h1>
            </div>

          </div>

          <p className="emergency-subtitle">
            Monitor critical situations, coordinate responses
            and escalate high-risk citizen reports.
          </p>

          <div className="emergency-system-status">

            <span className="system-live">
              <span></span>
              System operational
            </span>

            <span>
              <Activity size={15} />
              Live monitoring
            </span>

            <span>
              <MapPin size={15} />
              24 districts monitored
            </span>

          </div>
        </div>

        <div className="live-indicator">
          <span></span>
          LIVE
        </div>

      </div>

      {/* =====================================================
          SUMMARY
          ===================================================== */}

      <div className="emergency-summary">

        <button
          className={`emergency-stat critical ${
            activeSummary === "Critical"
              ? "summary-active"
              : ""
          }`}
          onClick={() =>
            setActiveSummary(
              activeSummary === "Critical"
                ? "All"
                : "Critical"
            )
          }
        >
          <div className="emergency-stat-icon">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Critical Alerts</span>
            <strong>12</strong>
            <small>Immediate attention</small>
          </div>
        </button>

        <button
          className={`emergency-stat high ${
            activeSummary === "High"
              ? "summary-active"
              : ""
          }`}
          onClick={() =>
            setActiveSummary(
              activeSummary === "High"
                ? "All"
                : "High"
            )
          }
        >
          <div className="emergency-stat-icon">
            <ShieldAlert size={21} />
          </div>

          <div>
            <span>High-Risk Alerts</span>
            <strong>25</strong>
            <small>Require urgent review</small>
          </div>
        </button>

        <div className="emergency-stat">
          <div className="emergency-stat-icon">
            <Users size={21} />
          </div>

          <div>
            <span>People Potentially Affected</span>
            <strong>18,420</strong>
            <small>Across active alerts</small>
          </div>
        </div>

        <button
          className={`emergency-stat ${
            activeSummary === "Awaiting"
              ? "summary-active"
              : ""
          }`}
          onClick={() =>
            setActiveSummary(
              activeSummary === "Awaiting"
                ? "All"
                : "Awaiting"
            )
          }
        >
          <div className="emergency-stat-icon">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Awaiting Action</span>
            <strong>8</strong>
            <small>Need authority response</small>
          </div>
        </button>

      </div>

      {/* =====================================================
          SAFETY NOTICE
          ===================================================== */}

      <div className="emergency-notice">

        <div className="notice-icon">
          <ShieldAlert size={20} />
        </div>

        <div>
          <strong>
            Human-in-the-loop safety principle
          </strong>

          <p>
            AI identifies potentially high-risk cases and
            recommends escalation. Government officials remain
            responsible for verification, validation and final action.
          </p>
        </div>

      </div>

      {/* =====================================================
          MAIN GRID
          ===================================================== */}

      <div className="emergency-content-grid">

        {/* =================================================
            ALERTS
            ================================================= */}

        <section className="alerts-card">

          <div className="alerts-card-header">

            <div>
              <p className="section-kicker">
                PRIORITY QUEUE
              </p>

              <h2>Active Emergency Cases</h2>

              <p>
                {filteredAlerts.length} alerts currently
                require monitoring or response.
              </p>
            </div>

            <div className="alert-header-badge">
              <span></span>
              {filteredAlerts.length} active
            </div>

          </div>

          {/* FILTER TOOLBAR */}

          <div className="alert-toolbar">

            <div className="alert-search">
              <Search size={17} />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search alerts, districts or authorities..."
              />
            </div>

            <select
              value={severityFilter}
              onChange={(e) =>
                setSeverityFilter(e.target.value)
              }
            >
              <option value="All">
                All severity
              </option>
              <option value="Critical">
                Critical
              </option>
              <option value="High">
                High
              </option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All status
              </option>
              <option value="Awaiting Action">
                Awaiting Action
              </option>
              <option value="Under Review">
                Under Review
              </option>
              <option value="Assigned">
                Assigned
              </option>
              <option value="Acknowledged">
                Acknowledged
              </option>
              <option value="Escalated">
                Escalated
              </option>
            </select>

          </div>

          {/* ALERT LIST */}

          <div className="alert-list">

            {filteredAlerts.length === 0 ? (
              <div className="empty-alerts">
                <CheckCircle size={40} />
                <h3>No matching emergency alerts</h3>
                <p>
                  Try changing the search or filters.
                </p>
              </div>
            ) : (
              filteredAlerts.map((alert) => {

                const state = getAlertState(alert);

                return (
                  <div
                    className={`emergency-alert ${
                      alert.severity === "Critical"
                        ? "critical-alert"
                        : ""
                    }`}
                    key={alert.id}
                  >

                    {/* ICON */}

                    <div
                      className={`alert-severity-icon ${
                        alert.severity.toLowerCase()
                      }`}
                    >
                      <AlertTriangle size={21} />
                    </div>

                    {/* MAIN */}

                    <div className="emergency-alert-main">

                      <div className="alert-title-row">

                        <div>
                          <span className="alert-id">
                            {alert.id}
                          </span>

                          <h3>{alert.title}</h3>
                        </div>

                        <span
                          className={`emergency-severity ${
                            alert.severity.toLowerCase()
                          }`}
                        >
                          {alert.severity}
                        </span>

                      </div>

                      <p className="alert-description">
                        {alert.description}
                      </p>

                      <div className="alert-meta">

                        <span>
                          <MapPin size={14} />
                          {alert.location}
                        </span>

                        <span>
                          <Users size={14} />
                          {alert.affected} affected
                        </span>

                        <span>
                          <Clock3 size={14} />
                          {alert.time}
                        </span>

                      </div>

                    </div>

                    {/* AUTHORITY */}

                    <div className="authority-cell">

                      <span>
                        Recommended Authority
                      </span>

                      <strong>
                        <Building2 size={14} />
                        {alert.authority}
                      </strong>

                      <small>
                        {alert.reports} related reports
                      </small>

                    </div>

                    {/* STATUS */}

                    <div className="alert-status-cell">

                      <span
                        className={`alert-status ${
                          state.status
                            .toLowerCase()
                            .replaceAll(" ", "-")
                        }`}
                      >
                        {state.status}
                      </span>

                      <div className="alert-actions">

                        <button
                          className="alert-view-button"
                          onClick={() =>
                            setSelectedAlert(alert)
                          }
                        >
                          Review
                          <ArrowUpRight size={15} />
                        </button>

                        <div className="alert-menu-wrapper">

                          <button
                            className="alert-more-button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === alert.id
                                  ? null
                                  : alert.id
                              )
                            }
                          >
                            <MoreVertical size={17} />
                          </button>

                          {openMenu === alert.id && (
                            <div className="alert-menu">

                              <button
                                onClick={() =>
                                  acknowledgeAlert(alert)
                                }
                              >
                                <CheckCircle size={15} />
                                Acknowledge
                              </button>

                              <button
                                onClick={() =>
                                  assignAlert(alert)
                                }
                              >
                                <UserPlus size={15} />
                                Assign response
                              </button>

                              <button
                                onClick={() =>
                                  escalateAlert(alert)
                                }
                              >
                                <Siren size={15} />
                                Escalate
                              </button>

                            </div>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })
            )}

          </div>

        </section>

        {/* =================================================
            RESPONSE INTELLIGENCE
            ================================================= */}

        <aside className="response-panel">

          <div className="response-panel-header">

            <div className="response-icon">
              <ShieldAlert size={21} />
            </div>

            <div>
              <p>RESPONSE INTELLIGENCE</p>
              <h2>Situation Overview</h2>
            </div>

          </div>

          <div className="response-live">
            <span></span>
            Monitoring active
          </div>

          <div className="response-metrics">

            <div>
              <strong>4</strong>
              <span>Active incidents</span>
            </div>

            <div>
              <strong>2</strong>
              <span>Teams deployed</span>
            </div>

            <div>
              <strong>18.4K</strong>
              <span>Potential impact</span>
            </div>

          </div>

          <div className="response-insight">

            <div className="insight-label">
              <Activity size={16} />
              AI RISK SIGNAL
            </div>

            <h3>
              Water-related emergencies
              require attention
            </h3>

            <p>
              Multiple citizen reports indicate
              concentration of high-risk situations
              around water access and flooding.
            </p>

          </div>

          <div className="response-status-list">

            <div>
              <span className="dot red"></span>
              <span>Critical</span>
              <strong>12</strong>
            </div>

            <div>
              <span className="dot orange"></span>
              <span>High</span>
              <strong>25</strong>
            </div>

            <div>
              <span className="dot green"></span>
              <span>Response assigned</span>
              <strong>17</strong>
            </div>

          </div>

        </aside>

      </div>

      {/* =====================================================
          ALERT DETAILS MODAL
          ===================================================== */}

      {selectedAlert && (
        <div
          className="emergency-modal-overlay"
          onClick={() => setSelectedAlert(null)}
        >

          <div
            className="emergency-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <span className="alert-id">
                  {selectedAlert.id}
                </span>

                <h2>
                  {selectedAlert.title}
                </h2>

                <span
                  className={`emergency-severity ${
                    selectedAlert.severity.toLowerCase()
                  }`}
                >
                  {selectedAlert.severity}
                </span>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedAlert(null)
                }
              >
                <X size={20} />
              </button>

            </div>

            <div className="modal-grid">

              <div className="modal-info-box">
                <MapPin size={18} />
                <span>Location</span>
                <strong>
                  {selectedAlert.location}
                </strong>
                <small>
                  {selectedAlert.district}
                </small>
              </div>

              <div className="modal-info-box">
                <Users size={18} />
                <span>Potential impact</span>
                <strong>
                  {selectedAlert.affected}
                </strong>
                <small>citizens affected</small>
              </div>

              <div className="modal-info-box">
                <Clock3 size={18} />
                <span>Detected</span>
                <strong>
                  {selectedAlert.time}
                </strong>
                <small>
                  {selectedAlert.reports} related reports
                </small>
              </div>

              <div className="modal-info-box">
                <Building2 size={18} />
                <span>Authority</span>
                <strong>
                  {selectedAlert.authority}
                </strong>
              </div>

            </div>

            <div className="modal-section">
              <span>Situation description</span>
              <p>
                {selectedAlert.description}
              </p>
            </div>

            <div className="modal-section ai-risk-box">
              <span>
                <Activity size={15} />
                AI risk assessment
              </span>

              <p>
                {selectedAlert.risk}
              </p>
            </div>

            <div className="modal-actions">

              <button
                onClick={() =>
                  acknowledgeAlert(selectedAlert)
                }
              >
                <CheckCircle size={17} />
                Acknowledge
              </button>

              <button
                onClick={() =>
                  assignAlert(selectedAlert)
                }
              >
                <UserPlus size={17} />
                Assign response
              </button>

              <button
                className="danger-action"
                onClick={() =>
                  escalateAlert(selectedAlert)
                }
              >
                <Siren size={17} />
                Escalate
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default EmergencyAlerts;