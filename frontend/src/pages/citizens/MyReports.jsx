import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
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
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get("/problems");
        setReports(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

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

          {loading ? (
            <div style={{ padding: "2rem", textAlign: "center" }}>Loading reports...</div>
          ) : reports.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>No reports found.</div>
          ) : (
            reports.map((report, index) => {
              const Icon = report.severity === "Critical" ? AlertCircle : (report.governmentStatus === "Resolved" ? CheckCircle : Clock);

              return (
                <div className="report-card" key={report._id}>

                  <div className="report-icon">
                    <Icon size={22} />
                  </div>

                  <div className="report-info">
                    <h3>{report.category || 'Unassigned Problem'}</h3>

                    <div className="report-meta">
                      <span>{report.category}</span>

                      <span className="location">
                        <MapPin size={14} />
                        {report.location?.address}
                      </span>

                      <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <span
                    className={`status ${(report.governmentStatus || 'Reported')
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {report.governmentStatus || 'Reported'}
                  </span>

           <button
    className="report-arrow"
    onClick={() => navigate(`/citizen/reports/${report._id}`)}
  >
    <ArrowRight size={20} />
  </button>

                </div>
              );
            })
          )}

        </div>

      </div>

    </div>
  );
}

export default MyReports;