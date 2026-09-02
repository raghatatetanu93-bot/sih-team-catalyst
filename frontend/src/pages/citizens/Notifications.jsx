import "./Notifications.css";
import {
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
} from "lucide-react";

function Notifications() {
  const notifications = [
    {
      title: "Your report is now under review",
      message:
        "The water shortage issue you reported has been assigned for review.",
      time: "10 minutes ago",
      type: "review",
      icon: Clock,
    },
    {
      title: "Issue status updated",
      message:
        "Your report regarding damaged roads has been marked as resolved.",
      time: "2 hours ago",
      type: "resolved",
      icon: CheckCircle,
    },
    {
      title: "Emergency alert near your area",
      message:
        "Heavy rainfall warning has been issued for your district.",
      time: "5 hours ago",
      type: "emergency",
      icon: AlertTriangle,
    },
    {
      title: "Report successfully submitted",
      message:
        "Your community issue report has been successfully registered.",
      time: "Yesterday",
      type: "report",
      icon: FileText,
    },
  ];

  return (
    <div className="notifications-page">

      <div className="notifications-header">
        <div>
          <span className="page-label">STAY UPDATED</span>
          <h1>Notifications</h1>
          <p>Stay informed about your reports and community activity.</p>
        </div>

        <div className="notifications-header-icon">
          <Bell size={28} />
        </div>
      </div>

      <div className="notifications-summary">

        <div className="notification-summary-card">
          <Bell size={22} />
          <div>
            <strong>4</strong>
            <span>New Notifications</span>
          </div>
        </div>

        <div className="notification-summary-card">
          <CheckCircle size={22} />
          <div>
            <strong>12</strong>
            <span>Read Notifications</span>
          </div>
        </div>

      </div>

      <div className="notifications-list-section">

        <div className="notifications-list-header">
          <div>
            <h2>Recent Notifications</h2>
            <p>Latest updates related to your activity.</p>
          </div>

          <button className="mark-read-button">
            Mark all as read
          </button>
        </div>

        <div className="notifications-list">

          {notifications.map((notification, index) => {
            const Icon = notification.icon;

            return (
              <div
                className={`notification-card ${notification.type}`}
                key={index}
              >

                <div className="notification-icon">
                  <Icon size={22} />
                </div>

                <div className="notification-content">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>

                  <span className="notification-time">
                    {notification.time}
                  </span>
                </div>

                {index < 2 && (
                  <span className="notification-dot"></span>
                )}

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default Notifications;