import "./ReportDetails.css";
import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react";

function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const reports = {
    1: {
      title: "Water shortage in residential area",
      category: "Water",
      location: "Ranchi, Jharkhand",
      date: "Aug 28, 2026",
      status: "In Progress",
      description:
        "Residents in the area are facing an irregular water supply, affecting their daily household activities.",
      icon: AlertCircle,
    },

    2: {
      title: "Irregular waste collection",
      category: "Sanitation",
      location: "Kanke, Ranchi",
      date: "Aug 22, 2026",
      status: "Under Review",
      description:
        "Waste collection services have been irregular, resulting in accumulated garbage in residential areas.",
      icon: Clock,
    },

    3: {
      title: "Damaged road near main junction",
      category: "Infrastructure",
      location: "Dhanbad",
      date: "Aug 15, 2026",
      status: "Resolved",
      description:
        "The road near the main junction was damaged and causing difficulties for commuters and local residents.",
      icon: CheckCircle,
    },
  };

  const report = reports[id];

  if (!report) {
    return <div>Report not found</div>;
  }

  const Icon = report.icon;

  return (
    <div className="report-details-page">

      <button
        className="back-button"
        onClick={() => navigate("/my-reports")}
      >
        <ArrowLeft size={18} />
        Back to My Reports
      </button>

      <div className="report-details-header">

        <div className="details-icon">
          <Icon size={28} />
        </div>

        <div className="details-title">
          <span className="page-label">REPORT DETAILS</span>

          <h1>{report.title}</h1>

          <span
            className={`status ${report.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {report.status}
          </span>
        </div>

      </div>


      <div className="details-grid">

        <section className="details-main-card">

          <h2>Issue Description</h2>

          <p>{report.description}</p>

          <div className="details-divider"></div>

          <h2>Report Information</h2>

          <div className="details-info-grid">

            <div className="detail-item">
              <MapPin size={18} />

              <div>
                <span>Location</span>
                <strong>{report.location}</strong>
              </div>
            </div>

            <div className="detail-item">
              <Calendar size={18} />

              <div>
                <span>Date Submitted</span>
                <strong>{report.date}</strong>
              </div>
            </div>

            <div className="detail-item">
              <FileText size={18} />

              <div>
                <span>Category</span>
                <strong>{report.category}</strong>
              </div>
            </div>

          </div>

        </section>


        <aside className="report-progress-card">

          <span className="progress-label">
            CURRENT PROGRESS
          </span>

          <h2>Report Status</h2>

          <div className="progress-step completed">
            <div className="step-dot"></div>

            <div>
              <strong>Report Submitted</strong>
              <span>Your issue was successfully submitted.</span>
            </div>
          </div>

          <div className="progress-step completed">
            <div className="step-dot"></div>

            <div>
              <strong>Under Review</strong>
              <span>The issue is being reviewed.</span>
            </div>
          </div>

          <div
            className={`progress-step ${
              report.status === "In Progress"
                ? "completed"
                : ""
            }`}
          >
            <div className="step-dot"></div>

            <div>
              <strong>Action in Progress</strong>
              <span>Authorities are working on the issue.</span>
            </div>
          </div>

          <div
            className={`progress-step ${
              report.status === "Resolved"
                ? "completed"
                : ""
            }`}
          >
            <div className="step-dot"></div>

            <div>
              <strong>Resolved</strong>
              <span>The issue has been successfully resolved.</span>
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
}

export default ReportDetails;