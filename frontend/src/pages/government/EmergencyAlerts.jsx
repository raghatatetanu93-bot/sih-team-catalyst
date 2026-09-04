import "./EmergencyAlerts.css";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  MapPin,
  Users,
  Clock3,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";

function EmergencyAlerts() {
    const navigate = useNavigate();
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
    },
  ];

  return (
    <div className="emergency-page">

      {/* HEADER */}
      <div className="emergency-header">
        <div>
          <div className="emergency-heading">
            <div className="emergency-title-icon">
              <ShieldAlert size={22} />
            </div>

            <div>
              <p className="eyebrow">EMERGENCY ESCALATION ENGINE</p>
              <h1>Emergency Alerts</h1>
            </div>
          </div>

          <p className="emergency-subtitle">
            High-risk problems automatically surfaced for urgent
            government review and action.
          </p>
        </div>

        <div className="live-indicator">
          <span></span>
          Live Monitoring
        </div>
      </div>

      {/* ALERT SUMMARY */}
      <div className="emergency-summary">

        <div className="emergency-stat critical">
          <div className="emergency-stat-icon">
            <AlertTriangle size={20} />
          </div>

          <div>
            <span>Critical Alerts</span>
            <strong>12</strong>
            <small>Immediate attention</small>
          </div>
        </div>

        <div className="emergency-stat high">
          <div className="emergency-stat-icon">
            <ShieldAlert size={20} />
          </div>

          <div>
            <span>High-Risk Alerts</span>
            <strong>25</strong>
            <small>Require urgent review</small>
          </div>
        </div>

        <div className="emergency-stat">
          <div className="emergency-stat-icon">
            <Users size={20} />
          </div>

          <div>
            <span>People Potentially Affected</span>
            <strong>18,420</strong>
            <small>Across active alerts</small>
          </div>
        </div>

        <div className="emergency-stat">
          <div className="emergency-stat-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Awaiting Action</span>
            <strong>8</strong>
            <small>Need authority response</small>
          </div>
        </div>

      </div>

      {/* SAFETY NOTICE */}
      <div className="emergency-notice">
        <ShieldAlert size={19} />

        <div>
          <strong>Human-in-the-loop safety principle</strong>

          <p>
            AI identifies potentially high-risk cases and recommends
            escalation. Government officials remain responsible for
            verification, validation and final action.
          </p>
        </div>
      </div>

      {/* ALERT LIST */}
      <section className="alerts-card">

        <div className="alerts-card-header">
          <div>
            <h2>Active High-Risk Cases</h2>

            <p>
              Problems requiring urgent government attention
            </p>
          </div>

          <button className="alert-filter-button">
            All Alerts
          </button>
        </div>

        <div className="alert-list">

          {alerts.map((alert) => (
            <div className="emergency-alert" key={alert.id}>

              {/* ALERT ICON */}
              <div
                className={`alert-severity-icon ${
                  alert.severity === "Critical"
                    ? "critical"
                    : "high"
                }`}
              >
                <AlertTriangle size={21} />
              </div>

              {/* MAIN INFORMATION */}
              <div className="emergency-alert-main">

                <div className="alert-title-row">
                  <h3>{alert.title}</h3>

                  <span
                    className={`emergency-severity ${
                      alert.severity === "Critical"
                        ? "critical"
                        : "high"
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>

                <p className="alert-description">
                  AI detected a potentially high-risk situation
                  requiring urgent review.
                </p>

                <div className="alert-meta">

                  <span>
                    <MapPin size={14} />
                    {alert.location}
                  </span>

                  <span>
                    <Users size={14} />
                    {alert.affected} potentially affected
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

                <strong>
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
                    alert.status
                      .toLowerCase()
                      .replaceAll(" ", "-")
                  }`}
                >
                  {alert.status}
                </span>

                <button
  className="alert-view-button"
  onClick={() => navigate(`/government/problems/${alert.id}`)}
>
  Review
  <ArrowUpRight size={15} />
</button>
              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default EmergencyAlerts;