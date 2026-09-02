import { useNavigate } from "react-router-dom";
import "./MyReports.css";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  ArrowRight,
} from "lucide-react";

function MyReports() {
  const navigate = useNavigate();
  const reports = [
    {
      title: "Water shortage in residential area",
      category: "Water",
      location: "Ranchi, Jharkhand",
      date: "Aug 28, 2026",
      status: "In Progress",
      icon: AlertCircle,
    },
    {
      title: "Irregular waste collection",
      category: "Sanitation",
      location: "Kanke, Ranchi",
      date: "Aug 22, 2026",
      status: "Under Review",
      icon: Clock,
    },
    {
      title: "Damaged road near main junction",
      category: "Infrastructure",
      location: "Dhanbad",
      date: "Aug 15, 2026",
      status: "Resolved",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="my-reports-page">

      <div className="reports-header">
        <div>
          <span className="page-label">YOUR ACTIVITY</span>
          <h1>My Reports</h1>
          <p>Track the progress of issues you have reported.</p>
        </div>
      </div>

      <div className="reports-stats">

        <div className="report-stat-card">
          <FileText size={22} />
          <div>
            <strong>8</strong>
            <span>Total Reports</span>
          </div>
        </div>

        <div className="report-stat-card">
          <Clock size={22} />
          <div>
            <strong>3</strong>
            <span>Under Review</span>
          </div>
        </div>

        <div className="report-stat-card">
          <AlertCircle size={22} />
          <div>
            <strong>2</strong>
            <span>In Progress</span>
          </div>
        </div>

        <div className="report-stat-card">
          <CheckCircle size={22} />
          <div>
            <strong>3</strong>
            <span>Resolved</span>
          </div>
        </div>

      </div>

      <div className="reports-list-section">

        <div className="reports-list-header">
          <div>
            <h2>Recent Reports</h2>
            <p>Your latest submitted issues.</p>
          </div>

          <button className="filter-button">
            All Reports
          </button>
        </div>

        <div className="reports-list">

          {reports.map((report, index) => {
            const Icon = report.icon;

            return (
              <div className="report-card" key={index}>

                <div className="report-icon">
                  <Icon size={22} />
                </div>

                <div className="report-info">
                  <h3>{report.title}</h3>

                  <div className="report-meta">
                    <span>{report.category}</span>

                    <span className="location">
                      <MapPin size={14} />
                      {report.location}
                    </span>

                    <span>{report.date}</span>
                  </div>
                </div>

                <span
                  className={`status ${report.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {report.status}
                </span>

         <button
  className="report-arrow"
  onClick={() => navigate(`/my-reports/${index + 1}`)}
>
  <ArrowRight size={20} />
</button>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default MyReports;