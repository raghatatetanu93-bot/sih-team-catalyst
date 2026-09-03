import { useState } from "react";
import { Plus, CheckCircle } from "lucide-react";

import "./Partnerships.css";

const MOCK_REQUESTS = [
  {
    id: 1,
    name: "BIT Mesra — IoT Lab",
    purpose: "Hardware manufacturing partnership for Smart Water Grid sensors",
    expertise: "IoT Hardware & Manufacturing",
    stage: "Prototype",
    commitment: "6 months",
    date: "Aug 28, 2026",
  },
  {
    id: 2,
    name: "BAU Ranchi — Agri Dept",
    purpose: "Technology mentorship for crop disease ML model",
    expertise: "Machine Learning & Data Science",
    stage: "Research",
    commitment: "4 months",
    date: "Sep 01, 2026",
  },
];

const MOCK_ACTIVE = [
  {
    id: 1,
    partner: "IIT ISM Dhanbad",
    project: "Traffic Vision AI",
    type: "Technology",
    status: "Active",
    duration: "Jan 2026 — Sep 2026",
    progress: 65,
  },
  {
    id: 2,
    partner: "NIT Jamshedpur",
    project: "Rural Ed-Tech Tablet",
    type: "Manufacturing",
    status: "Active",
    duration: "Mar 2026 — Nov 2026",
    progress: 40,
  },
  {
    id: 3,
    partner: "Vinoba Bhave University",
    project: "Solar Water Purification",
    type: "Funding",
    status: "Active",
    duration: "Feb 2026 — Aug 2026",
    progress: 90,
  },
];

function Partnerships() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2500);
  };

  const openModal = () => {
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  return (
    <div className="partnerships-container">
      <div className="partnerships-header">
        <h1>Partnerships & Collaborations</h1>
        <p>
          Manage incoming requests, active partnerships, and initiate new
          collaborations.
        </p>
      </div>

      <div className="partnerships-sections">
        {/* Incoming Requests */}
        <div className="section-panel">
          <div className="section-header">
            <h2>Partnership Requests</h2>
          </div>

          <table className="request-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Purpose</th>
                <th>Expertise Needed</th>
                <th>Stage</th>
                <th>Commitment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_REQUESTS.map((req) => (
                <tr key={req.id}>
                  <td>
                    <strong>{req.name}</strong>
                    <br />
                    <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                      {req.date}
                    </span>
                  </td>
                  <td>{req.purpose}</td>
                  <td>{req.expertise}</td>
                  <td>
                    <span className="status-pill new">{req.stage}</span>
                  </td>
                  <td>{req.commitment}</td>
                  <td>
                    <div className="table-actions">
                      <button className="action-accept">Accept</button>
                      <button className="action-decline">Decline</button>
                      <button className="action-view">Details</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Active Partnerships */}
        <div className="section-panel">
          <div className="section-header">
            <h2>Active Partnerships</h2>
            <button className="initiate-btn" onClick={openModal}>
              <Plus size={16} />
              Initiate Partnership
            </button>
          </div>

          <table className="request-table">
            <thead>
              <tr>
                <th>Partner</th>
                <th>Related Project</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ACTIVE.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.partner}</strong>
                  </td>
                  <td>{p.project}</td>
                  <td>
                    <span
                      className={`type-badge ${p.type.toLowerCase()}`}
                    >
                      {p.type}
                    </span>
                  </td>
                  <td>{p.duration}</td>
                  <td>
                    <div className="partnership-progress">
                      <div className="progress-bar-bg">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${p.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{p.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="status-pill active">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Initiate Partnership Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {!isSubmitted ? (
              <>
                <h2>Initiate a Partnership</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Organization Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. TechCorp Innovations"
                    />
                  </div>
                  <div className="form-group">
                    <label>Partnership Type</label>
                    <select required>
                      <option value="">Select type...</option>
                      <option value="Research">Research Partnership</option>
                      <option value="Technology">Technology Partnership</option>
                      <option value="Funding">Funding Partnership</option>
                      <option value="Implementation">
                        Implementation Partnership
                      </option>
                      <option value="Manufacturing">
                        Manufacturing Partnership
                      </option>
                      <option value="Innovation">Innovation Partnership</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Related Project</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Smart Water Grid"
                    />
                  </div>
                  <div className="form-group">
                    <label>Proposed Contribution</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Describe how you plan to contribute..."
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Expected Duration</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 6 months"
                    />
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                      Send Request
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <CheckCircle
                  size={40}
                  color="#16a34a"
                  style={{ marginBottom: "1rem" }}
                />
                <h3 style={{ color: "#16a34a", marginBottom: "0.5rem" }}>
                  Partnership Request Sent!
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#15803d" }}>
                  The university team will receive your proposal and respond
                  shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Partnerships;
