import "./Notifications.css";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Clock,
  MessageCircle,
  Trash2,
} from "lucide-react";

function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Your report is now in progress",
      message:
        "The water shortage issue you reported is currently being addressed by the concerned authorities.",
      time: "10 minutes ago",
      icon: Clock,
      type: "progress",
      unread: true,
    },
    {
      id: 2,
      title: "Issue resolved successfully",
      message:
        "The damaged road near the main junction has been marked as resolved.",
      time: "2 hours ago",
      icon: CheckCircle,
      type: "resolved",
      unread: true,
    },
    {
      id: 3,
      title: "New emergency alert nearby",
      message:
        "Heavy rainfall warning has been issued for your area. Please stay safe.",
      time: "5 hours ago",
      icon: AlertTriangle,
      type: "emergency",
      unread: false,
    },
    {
      id: 4,
      title: "New community activity",
      message:
        "24 citizens have supported an issue you are following.",
      time: "Yesterday",
      icon: MessageCircle,
      type: "community",
      unread: false,
    },
  ];

  return (
    <div className="notifications-page">

      <div className="notifications-header">

        <div>
          <span className="page-label">STAY UPDATED</span>

          <h1>Notifications</h1>

          <p>
            Stay informed about your reports, community activity,
            and important updates.
          </p>
        </div>

        <div className="notifications-header-icon">
          <Bell size={28} />
        </div>

      </div>


      <div className="notifications-actions">

        <div>
          <h2>Recent Updates</h2>
          <p>Here's what's happening with your activity.</p>
        </div>

        <button className="mark-read-button">
          Mark all as read
        </button>

      </div>


      <div className="notifications-list">

        {notifications.map((notification) => {

          const Icon = notification.icon;

          return (

            <div
              className={`notification-card ${
                notification.unread ? "unread" : ""
              }`}
              key={notification.id}
            >

              <div
                className={`notification-icon ${notification.type}`}
              >
                <Icon size={22} />
              </div>


              <div className="notification-content">

                <div className="notification-top">

                  <h3>{notification.title}</h3>

                  {notification.unread && (
                    <span className="unread-dot"></span>
                  )}

                </div>

                <p>{notification.message}</p>

                <span className="notification-time">
                  {notification.time}
                </span>

              </div>

            </div>

          );

        })}

      </div>


      <div className="notification-settings">

        <Bell size={20} />

        <div>
          <h3>Notification preferences</h3>

          <p>
            Choose which updates you want to receive from Societal Engine.
          </p>
        </div>

        <button>
          Manage
        </button>

      </div>

    </div>
  );
}

export default Notifications;