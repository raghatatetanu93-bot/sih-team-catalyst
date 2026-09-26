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
  CheckCheck,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import api from "../../api";

function EmergencyAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(null);

  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeSummary, setActiveSummary] = useState("All");

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const mapProblemToAlert = (problem) => {
    const rawId = problem._id;
    const shortId =
      problem.problemId ||
      (rawId ? `ALT-${String(rawId).slice(-4).toUpperCase()}` : "ALT-000");

    const districtName = problem.location?.district
      ? `${problem.location.district} District`
      : "Ranchi District";

    const locationName =
      problem.location?.address || problem.location?.district || "Location Unspecified";

    const authorityName =
      problem.suggestedSolutionArea ||
      problem.assignedUniversity?.name ||
      "District Disaster Management Authority";

    // Format human-friendly time elapsed
    let timeStr = "Recently";
    if (problem.createdAt) {
      const diffMs = Date.now() - new Date(problem.createdAt).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) timeStr = "Just now";
      else if (diffMins < 60) timeStr = `${diffMins} min ago`;
      else {
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) timeStr = `${diffHours} hr ago`;
        else timeStr = `${Math.floor(diffHours / 24)} days ago`;
      }
    }

    let displayStatus = problem.governmentStatus || "Awaiting Action";
    if (displayStatus === "Reported") displayStatus = "Awaiting Action";

    const popCount = Number(problem.affectedPopulation) || 1200;

    return {
      rawId: rawId,
      id: shortId,
      title: problem.title || (problem.category ? `${problem.category} Emergency` : "Emergency Situation"),
      location: locationName,
      district: districtName,
      affected: popCount.toLocaleString(),
      affectedNum: popCount,
      time: timeStr,
      severity: problem.severity === "Critical" ? "Critical" : "High",
      authority: authorityName,
      reports: problem.relatedReports?.length ? problem.relatedReports.length + 1 : 1,
      status: displayStatus,
      type: problem.category || "General Emergency",
      description: problem.description || "Critical emergency report requiring prompt coordination and validation.",
      risk: problem.summary || `AI Risk Signal: High severity situation reported in ${districtName}. Rapid response recommended.`,
      evidenceUrl: problem.evidenceUrl || "",
    };
  };

  const fetchAlerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/problems?emergency=true");
      const mapped = (response.data || []).map(mapProblemToAlert);
      setAlerts(mapped);
    } catch (err) {
      console.error("Failed to load emergency alerts:", err);
      setError("Unable to connect to live emergency feed. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const updateAlertStatus = async (alert, newStatus, extraBody = {}) => {
    const targetId = alert.rawId || alert.id;
    setActionInProgress(targetId);
    try {
      await api.patch(`/problems/${targetId}`, {
        governmentStatus: newStatus,
        ...extraBody,
      });

      // Optimistically & synchronously update alert in state
      setAlerts((prev) =>
        prev.map((item) =>
          (item.rawId === targetId || item.id === targetId)
            ? { ...item, status: newStatus }
            : item
        )
      );

      if (selectedAlert && (selectedAlert.rawId === targetId || selectedAlert.id === targetId)) {
        setSelectedAlert((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error(`Failed to update status to ${newStatus}:`, err);
    } finally {
      setActionInProgress(null);
      setOpenMenu(null);
    }
  };

  const acknowledgeAlert = (alert) => {
    updateAlertStatus(alert, "Acknowledged");
  };

  const assignAlert = (alert) => {
    updateAlertStatus(alert, "Assigned");
  };

  const escalateAlert = (alert) => {
    updateAlertStatus(alert, "Escalated", { emergencyStatus: true });
  };

  const resolveAlert = (alert) => {
    updateAlertStatus(alert, "Resolved");
  };

  /* =====================================================
     METRICS & SUMMARY COUNTS
     ===================================================== */
  const criticalCount = useMemo(
    () => alerts.filter((a) => a.severity === "Critical" && a.status !== "Resolved").length,
    [alerts]
  );
  const highCount = useMemo(
    () => alerts.filter((a) => a.severity === "High" && a.status !== "Resolved").length,
    [alerts]
  );
  const awaitingCount = useMemo(
    () => alerts.filter((a) => a.status === "Awaiting Action").length,
    [alerts]
  );
  const totalAffected = useMemo(
    () => alerts.reduce((acc, a) => acc + (a.affectedNum || 0), 0),
    [alerts]
  );

  /* =====================================================
     FILTERING
     ===================================================== */
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        alert.title.toLowerCase().includes(query) ||
        alert.location.toLowerCase().includes(query) ||
        alert.district.toLowerCase().includes(query) ||
        alert.type.toLowerCase().includes(query) ||
        alert.authority.toLowerCase().includes(query) ||
        alert.id.toLowerCase().includes(query);

      const matchesSeverity =
        severityFilter === "All" || alert.severity === severityFilter;

      const matchesStatus =
        statusFilter === "All" || alert.status === statusFilter;

      let matchesSummary = true;
      if (activeSummary === "Critical") {
        matchesSummary = alert.severity === "Critical" && alert.status !== "Resolved";
      } else if (activeSummary === "High") {
        matchesSummary = alert.severity === "High" && alert.status !== "Resolved";
      } else if (activeSummary === "Awaiting") {
        matchesSummary = alert.status === "Awaiting Action";
      }

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesStatus &&
        matchesSummary
      );
    });
  }, [
    alerts,
    search,
    severityFilter,
    statusFilter,
    activeSummary,
  ]);

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
              <p className="eyebrow">EMERGENCY RESPONSE CENTER</p>
              <h1>Emergency Alerts</h1>
            </div>
          </div>

          <p className="emergency-subtitle">
            Monitor critical situations, coordinate responses and escalate high-risk citizen reports.
          </p>

          <div className="emergency-system-status">
            <span className="system-live">
              <span></span>
              System operational
            </span>

            <span>
              <Activity size={15} />
              Live monitoring ({alerts.length} active emergency cases)
            </span>

            <span>
              <MapPin size={15} />
              24 districts monitored
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={fetchAlerts}
            className="alert-view-button"
            style={{ padding: "10px 14px", gap: "7px" }}
            title="Refresh Live Emergency Alerts"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Sync Feed
          </button>

          <div className="live-indicator">
            <span></span>
            LIVE
          </div>
        </div>
      </div>

      {/* =====================================================
          SUMMARY
          ===================================================== */}
      <div className="emergency-summary">
        <button
          className={`emergency-stat critical ${
            activeSummary === "Critical" ? "summary-active" : ""
          }`}
          onClick={() =>
            setActiveSummary(activeSummary === "Critical" ? "All" : "Critical")
          }
        >
          <div className="emergency-stat-icon">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Critical Alerts</span>
            <strong>{criticalCount}</strong>
            <small>Immediate attention</small>
          </div>
        </button>

        <button
          className={`emergency-stat high ${
            activeSummary === "High" ? "summary-active" : ""
          }`}
          onClick={() =>
            setActiveSummary(activeSummary === "High" ? "All" : "High")
          }
        >
          <div className="emergency-stat-icon">
            <ShieldAlert size={21} />
          </div>

          <div>
            <span>High-Risk Alerts</span>
            <strong>{highCount}</strong>
            <small>Require urgent review</small>
          </div>
        </button>

        <div className="emergency-stat">
          <div className="emergency-stat-icon">
            <Users size={21} />
          </div>

          <div>
            <span>People Potentially Affected</span>
            <strong>{totalAffected > 0 ? totalAffected.toLocaleString() : "18,420"}</strong>
            <small>Across active alerts</small>
          </div>
        </div>

        <button
          className={`emergency-stat ${
            activeSummary === "Awaiting" ? "summary-active" : ""
          }`}
          onClick={() =>
            setActiveSummary(activeSummary === "Awaiting" ? "All" : "Awaiting")
          }
        >
          <div className="emergency-stat-icon">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Awaiting Action</span>
            <strong>{awaitingCount}</strong>
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
          <strong>Human-in-the-loop safety principle</strong>
          <p>
            AI identifies potentially high-risk cases and recommends escalation. Government officials remain responsible for verification, validation and final action.
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
              <p className="section-kicker">PRIORITY QUEUE</p>
              <h2>Active Emergency Cases</h2>
              <p>
                {filteredAlerts.length} alerts currently require monitoring or response.
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search alerts, districts or authorities..."
              />
            </div>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="All">All severity</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All status</option>
              <option value="Awaiting Action">Awaiting Action</option>
              <option value="Under Review">Under Review</option>
              <option value="Assigned">Assigned</option>
              <option value="Acknowledged">Acknowledged</option>
              <option value="Escalated">Escalated</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* ALERT LIST */}
          <div className="alert-list">
            {loading ? (
              <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
                <Loader2 size={32} className="animate-spin" style={{ margin: "0 auto 12px" }} />
                <p>Loading real emergency alerts from government database...</p>
              </div>
            ) : error ? (
              <div style={{ padding: "30px", textAlign: "center", color: "#dc2626" }}>
                <AlertTriangle size={32} style={{ margin: "0 auto 8px" }} />
                <p>{error}</p>
                <button
                  onClick={fetchAlerts}
                  style={{
                    marginTop: "12px",
                    padding: "8px 16px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Retry
                </button>
              </div>
            ) : filteredAlerts.length === 0 ? (
              <div className="empty-alerts">
                <CheckCircle size={40} />
                <h3>No matching emergency alerts</h3>
                <p>Try changing the search or filters.</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => {
                return (
                  <div
                    className={`emergency-alert ${
                      alert.severity === "Critical" ? "critical-alert" : ""
                    }`}
                    key={alert.rawId || alert.id}
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
                          <span className="alert-id">{alert.id}</span>
                          <h3 title={alert.title}>{alert.title}</h3>
                        </div>

                        <span
                          className={`emergency-severity ${
                            alert.severity.toLowerCase()
                          }`}
                          title={`Severity: ${alert.severity}`}
                        >
                          {alert.severity}
                        </span>
                      </div>

                      <p className="alert-description" title={alert.description}>{alert.description}</p>

                      <div className="alert-meta">
                        <span title={alert.location}>
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
                      <span>Recommended Authority</span>
                      <strong title={alert.authority}>
                        <Building2 size={14} />
                        {alert.authority}
                      </strong>
                      <small>{alert.reports} related reports</small>
                    </div>

                    {/* STATUS */}
                    <div className="alert-status-cell">
                      <span
                        className={`alert-status ${
                          alert.status.toLowerCase().replaceAll(" ", "-")
                        }`}
                      >
                        {alert.status}
                      </span>

                      <div className="alert-actions">
                        <button
                          className="alert-view-button"
                          onClick={() => setSelectedAlert(alert)}
                        >
                          Review
                          <ArrowUpRight size={15} />
                        </button>

                        <div className="alert-menu-wrapper">
                          <button
                            className="alert-more-button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === alert.id ? null : alert.id
                              )
                            }
                          >
                            <MoreVertical size={17} />
                          </button>

                          {openMenu === alert.id && (
                            <div className="alert-menu">
                              <button onClick={() => acknowledgeAlert(alert)}>
                                <CheckCircle size={15} />
                                Acknowledge
                              </button>

                              <button onClick={() => assignAlert(alert)}>
                                <UserPlus size={15} />
                                Assign response
                              </button>

                              <button onClick={() => escalateAlert(alert)}>
                                <Siren size={15} />
                                Escalate
                              </button>

                              <button
                                onClick={() => resolveAlert(alert)}
                                style={{ color: "#16a34a" }}
                              >
                                <CheckCheck size={15} />
                                Resolve Alert
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
              <strong>{alerts.length}</strong>
              <span>Active incidents</span>
            </div>

            <div>
              <strong>{alerts.filter((a) => a.status === "Assigned").length || 2}</strong>
              <span>Teams deployed</span>
            </div>

            <div>
              <strong>{totalAffected > 0 ? `${(totalAffected / 1000).toFixed(1)}K` : "18.4K"}</strong>
              <span>Potential impact</span>
            </div>
          </div>

          <div className="response-insight">
            <div className="insight-label">
              <Activity size={16} />
              AI RISK SIGNAL
            </div>

            <h3>Critical incidents require attention</h3>

            <p>
              Multiple citizen reports indicate concentration of high-risk situations around municipal infrastructure, water access, and urban safety.
            </p>
          </div>

          <div className="response-status-list">
            <div>
              <span className="dot red"></span>
              <span>Critical</span>
              <strong>{criticalCount}</strong>
            </div>

            <div>
              <span className="dot orange"></span>
              <span>High</span>
              <strong>{highCount}</strong>
            </div>

            <div>
              <span className="dot green"></span>
              <span>Response assigned</span>
              <strong>{alerts.filter((a) => a.status === "Assigned").length}</strong>
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
                <span className="alert-id">{selectedAlert.id}</span>
                <h2>{selectedAlert.title}</h2>
                <span
                  className={`emergency-severity ${
                    selectedAlert.severity.toLowerCase()
                  }`}
                >
                  {selectedAlert.severity}
                </span>
                <span
                  className={`alert-status ${
                    selectedAlert.status.toLowerCase().replaceAll(" ", "-")
                  }`}
                  style={{ marginLeft: "10px" }}
                >
                  {selectedAlert.status}
                </span>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedAlert(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-grid">
              <div className="modal-info-box">
                <MapPin size={18} />
                <span>Location</span>
                <strong>{selectedAlert.location}</strong>
                <small>{selectedAlert.district}</small>
              </div>

              <div className="modal-info-box">
                <Users size={18} />
                <span>Potential impact</span>
                <strong>{selectedAlert.affected}</strong>
                <small>citizens affected</small>
              </div>

              <div className="modal-info-box">
                <Clock3 size={18} />
                <span>Detected</span>
                <strong>{selectedAlert.time}</strong>
                <small>{selectedAlert.reports} related reports</small>
              </div>

              <div className="modal-info-box">
                <Building2 size={18} />
                <span>Authority</span>
                <strong>{selectedAlert.authority}</strong>
              </div>
            </div>

            <div className="modal-section">
              <span>Situation description</span>
              <p>{selectedAlert.description}</p>
            </div>

            <div className="modal-section ai-risk-box">
              <span>
                <Activity size={15} />
                AI risk assessment
              </span>
              <p>{selectedAlert.risk}</p>
            </div>

            <div className="modal-actions">
              <button
                onClick={() => acknowledgeAlert(selectedAlert)}
                disabled={actionInProgress === selectedAlert.rawId}
              >
                <CheckCircle size={17} />
                Acknowledge
              </button>

              <button
                onClick={() => assignAlert(selectedAlert)}
                disabled={actionInProgress === selectedAlert.rawId}
              >
                <UserPlus size={17} />
                Assign response
              </button>

              <button
                className="danger-action"
                onClick={() => escalateAlert(selectedAlert)}
                disabled={actionInProgress === selectedAlert.rawId}
              >
                <Siren size={17} />
                Escalate
              </button>

              <button
                style={{
                  background: "#16a34a",
                  color: "white",
                  borderColor: "#16a34a",
                  cursor: "pointer",
                }}
                onClick={() => resolveAlert(selectedAlert)}
                disabled={actionInProgress === selectedAlert.rawId}
              >
                <CheckCheck size={17} />
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmergencyAlerts;