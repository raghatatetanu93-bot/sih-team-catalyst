import { useMemo, useState } from "react";
import {
  Plus,
  CheckCircle,
  XCircle,
  Eye,
  Handshake,
  Search,
  Clock3,
  Building2,
  CalendarDays,
  Users,
  X,
  Send,
  ArrowUpRight,
} from "lucide-react";

import "./Partnerships.css";

const INITIAL_REQUESTS = [
  {
    id: 1,
    name: "BIT Mesra — IoT Lab",
    purpose:
      "Hardware manufacturing partnership for Smart Water Grid sensors",
    expertise: "IoT Hardware & Manufacturing",
    stage: "Prototype",
    commitment: "6 months",
    date: "Aug 28, 2026",
    type: "Manufacturing",
  },
  {
    id: 2,
    name: "BAU Ranchi — Agri Dept",
    purpose: "Technology mentorship for crop disease ML model",
    expertise: "Machine Learning & Data Science",
    stage: "Research",
    commitment: "4 months",
    date: "Sep 01, 2026",
    type: "Technology",
  },
  {
    id: 3,
    name: "Central University of Jharkhand",
    purpose: "Funding support for rural healthcare access study",
    expertise: "Healthcare & Impact Research",
    stage: "Planning",
    commitment: "8 months",
    date: "Sep 08, 2026",
    type: "Funding",
  },
];

const ACTIVE_PARTNERSHIPS = [
  {
    id: 1,
    partner: "IIT ISM Dhanbad",
    project: "Traffic Vision AI",
    type: "Technology",
    status: "Active",
    duration: "Jan 2026 — Sep 2026",
    progress: 65,
    team: "8 members",
  },
  {
    id: 2,
    partner: "NIT Jamshedpur",
    project: "Rural Ed-Tech Tablet",
    type: "Manufacturing",
    status: "Active",
    duration: "Mar 2026 — Nov 2026",
    progress: 40,
    team: "12 members",
  },
  {
    id: 3,
    partner: "Vinoba Bhave University",
    project: "Solar Water Purification",
    type: "Funding",
    status: "Active",
    duration: "Feb 2026 — Aug 2026",
    progress: 90,
    team: "6 members",
  },
];

function Partnerships() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch =
        request.name.toLowerCase().includes(search.toLowerCase()) ||
        request.purpose.toLowerCase().includes(search.toLowerCase()) ||
        request.expertise.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" || request.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "New" && request.stage) ||
        statusFilter === request.stage;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [requests, search, typeFilter, statusFilter]);

  const handleAccept = (id) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
    setActionMessage("Partnership request accepted successfully.");
    setTimeout(() => setActionMessage(""), 2500);
  };

  const handleDecline = (id) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
    setActionMessage("Partnership request declined.");
    setTimeout(() => setActionMessage(""), 2500);
  };

  const openModal = () => {
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
    }, 2200);
  };

  return (
    <div className="partnerships-container">

      {/* HEADER */}
      <div className="partnerships-header">
        <div>
          <span className="page-eyebrow">INDUSTRY COLLABORATION</span>

          <h1>Partnerships & Collaborations</h1>

          <p>
            Manage incoming requests, active partnerships, and initiate
            new collaborations with universities and innovation teams.
          </p>
        </div>

        <button className="initiate-btn" onClick={openModal}>
          <Plus size={18} />
          Initiate Partnership
        </button>
      </div>

      {/* TOAST */}
      {actionMessage && (
        <div className="action-toast">
          <CheckCircle size={18} />
          {actionMessage}
        </div>
      )}

      {/* KPI CARDS */}
      <div className="partnership-stats">

        <div className="partnership-stat-card">
          <div className="stat-icon blue">
            <Handshake size={21} />
          </div>

          <div>
            <span>Active Partnerships</span>
            <strong>{ACTIVE_PARTNERSHIPS.length}</strong>
            <small>Across 3 institutions</small>
          </div>
        </div>

        <div className="partnership-stat-card">
          <div className="stat-icon orange">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Pending Requests</span>
            <strong>{requests.length}</strong>
            <small>Awaiting response</small>
          </div>
        </div>

        <div className="partnership-stat-card">
          <div className="stat-icon purple">
            <Building2 size={21} />
          </div>

          <div>
            <span>University Partners</span>
            <strong>8</strong>
            <small>5 active projects</small>
          </div>
        </div>

        <div className="partnership-stat-card">
          <div className="stat-icon green">
            <Users size={21} />
          </div>

          <div>
            <span>People Engaged</span>
            <strong>126</strong>
            <small>Across partnerships</small>
          </div>
        </div>

      </div>

      <div className="partnerships-sections">

        {/* REQUESTS */}
        <div className="section-panel">

          <div className="section-header">
            <div>
              <h2>Partnership Requests</h2>
              <p>
                Review incoming collaboration opportunities from
                university teams.
              </p>
            </div>
          </div>

          {/* TOOLBAR */}
          <div className="partnership-toolbar">

            <div className="partnership-search">
              <Search size={18} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search requests..."
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Technology">Technology</option>
              <option value="Funding">Funding</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Research">Research</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Stages</option>
              <option value="New">New</option>
              <option value="Prototype">Prototype</option>
              <option value="Research">Research</option>
              <option value="Planning">Planning</option>
            </select>

          </div>

          <div className="result-count">
            Showing <strong>{filteredRequests.length}</strong> partnership
            requests
          </div>

          {/* TABLE */}
          {filteredRequests.length > 0 ? (
            <div className="table-wrapper">
              <table className="request-table">

                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Purpose</th>
                    <th>Expertise</th>
                    <th>Stage</th>
                    <th>Commitment</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequests.map((req) => (
                    <tr key={req.id}>

                      <td>
                        <div className="organization-cell">
                          <div className="organization-icon">
                            <Building2 size={17} />
                          </div>

                          <div>
                            <strong>{req.name}</strong>
                            <span>{req.date}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="purpose-text">
                          {req.purpose}
                        </span>
                      </td>

                      <td>
                        <span className="expertise-text">
                          {req.expertise}
                        </span>
                      </td>

                      <td>
                        <span className="status-pill new">
                          {req.stage}
                        </span>
                      </td>

                      <td>
                        <span className="commitment">
                          <CalendarDays size={14} />
                          {req.commitment}
                        </span>
                      </td>

                      <td>
                        <div className="table-actions">

                          <button
                            className="action-accept"
                            onClick={() => handleAccept(req.id)}
                            title="Accept"
                          >
                            <CheckCircle size={15} />
                            Accept
                          </button>

                          <button
                            className="action-decline"
                            onClick={() => handleDecline(req.id)}
                            title="Decline"
                          >
                            <XCircle size={15} />
                            Decline
                          </button>

                          <button
                            className="action-view"
                            onClick={() => setSelectedRequest(req)}
                            title="View details"
                          >
                            <Eye size={15} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          ) : (
            <div className="empty-state">
              <Handshake size={38} />
              <h3>No partnership requests found</h3>
              <p>
                Try changing your search or filters.
              </p>
            </div>
          )}

        </div>

        {/* ACTIVE PARTNERSHIPS */}
        <div className="section-panel">

          <div className="section-header">
            <div>
              <h2>Active Partnerships</h2>
              <p>
                Track progress across your ongoing collaborations.
              </p>
            </div>
          </div>

          <div className="active-partnership-grid">

            {ACTIVE_PARTNERSHIPS.map((partnership) => (
              <div
                className="active-partnership-card"
                key={partnership.id}
              >

                <div className="active-card-top">

                  <div className="partner-avatar">
                    <Building2 size={19} />
                  </div>

                  <span className="status-pill active">
                    Active
                  </span>

                </div>

                <h3>{partnership.partner}</h3>

                <p className="active-project">
                  {partnership.project}
                </p>

                <div className="partnership-type-row">
                  <span
                    className={`type-badge ${partnership.type.toLowerCase()}`}
                  >
                    {partnership.type}
                  </span>

                  <span className="team-count">
                    <Users size={14} />
                    {partnership.team}
                  </span>
                </div>

                <div className="active-duration">
                  <CalendarDays size={15} />
                  {partnership.duration}
                </div>

                <div className="progress-heading">
                  <span>Project Progress</span>
                  <strong>{partnership.progress}%</strong>
                </div>

                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${partnership.progress}%`,
                    }}
                  />
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* REQUEST DETAILS MODAL */}
      {selectedRequest && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedRequest(null)}
        >
          <div
            className="details-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-top">
              <div>
                <span>PARTNERSHIP REQUEST</span>
                <h2>{selectedRequest.name}</h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedRequest(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="request-detail-grid">

              <div>
                <span>Purpose</span>
                <strong>{selectedRequest.purpose}</strong>
              </div>

              <div>
                <span>Expertise Needed</span>
                <strong>{selectedRequest.expertise}</strong>
              </div>

              <div>
                <span>Project Stage</span>
                <strong>{selectedRequest.stage}</strong>
              </div>

              <div>
                <span>Expected Commitment</span>
                <strong>{selectedRequest.commitment}</strong>
              </div>

            </div>

            <div className="modal-note">
              <Handshake size={19} />

              <p>
                This request represents an opportunity for your
                organization to contribute expertise, resources,
                funding or implementation support.
              </p>
            </div>

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>

              <button
                className="submit-btn"
                onClick={() => {
                  handleAccept(selectedRequest.id);
                  setSelectedRequest(null);
                }}
              >
                Accept Partnership
                <ArrowUpRight size={17} />
              </button>

            </div>

          </div>
        </div>
      )}

      {/* INITIATE MODAL */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            {!isSubmitted ? (
              <>
                <div className="modal-top">
                  <div>
                    <span>NEW COLLABORATION</span>
                    <h2>Initiate a Partnership</h2>
                  </div>

                  <button
                    className="modal-close"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="modal-description">
                  Create a new collaboration proposal for a university
                  or research institution.
                </p>

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
                      <option value="">
                        Select type...
                      </option>

                      <option value="Research">
                        Research Partnership
                      </option>

                      <option value="Technology">
                        Technology Partnership
                      </option>

                      <option value="Funding">
                        Funding Partnership
                      </option>

                      <option value="Implementation">
                        Implementation Partnership
                      </option>

                      <option value="Manufacturing">
                        Manufacturing Partnership
                      </option>

                      <option value="Innovation">
                        Innovation Partnership
                      </option>
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
                      rows="4"
                      required
                      placeholder="Describe how your organization plans to contribute..."
                    />
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

                    <button
                      type="submit"
                      className="submit-btn"
                    >
                      Send Request
                      <Send size={16} />
                    </button>

                  </div>

                </form>
              </>
            ) : (
              <div className="success-state">

                <div className="success-icon">
                  <CheckCircle size={34} />
                </div>

                <h2>Partnership Request Sent!</h2>

                <p>
                  Your proposal has been recorded. The university
                  team will receive your request and respond shortly.
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