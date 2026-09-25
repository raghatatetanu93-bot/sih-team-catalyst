import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ListTodo,
  MessageSquare,
  Send,
  Users,
  FolderKanban,
  CalendarDays,
  Target,
  TrendingUp,
  CheckCircle2,
  Clock3,
  Circle,
  Plus,
  Trash2,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import api from "../../api";
import "./ProjectCollaboration.css";

function ProjectCollaboration() {
  const { id: projectId } = useParams();

  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New milestone inputs
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Team chat
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      initials: "RP",
      author: "Ravi Patel",
      text: "The initial API endpoints and sensor schemas are ready for testing. Milestone progress synchronized.",
      time: "2 hours ago",
    },
    {
      initials: "SM",
      author: "Sanya Mishra",
      text: "Great, I will connect the pilot test sensors tomorrow morning and update milestone progress.",
      time: "1 hour ago",
    },
  ]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (projectId) {
        // 1. Fetch project details
        try {
          const projRes = await api.get(`/projects/${projectId}`);
          setProject(projRes.data);
        } catch (pErr) {
          console.warn("Could not fetch project details by id:", pErr);
        }

        // 2. Fetch real milestones
        const msRes = await api.get(`/milestones/project/${projectId}`);
        setMilestones(Array.isArray(msRes.data) ? msRes.data : []);
      }
    } catch (err) {
      console.error("Error loading collaboration data:", err);
      setError("Failed to load project milestones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  // Toggle milestone completion
  const toggleMilestone = async (milestone) => {
    const isCurrentlyCompleted = milestone.status === "Completed";
    const nextStatus = isCurrentlyCompleted ? "Pending" : "Completed";

    // Optimistic UI update
    setMilestones((prev) =>
      prev.map((m) =>
        m._id === milestone._id ? { ...m, status: nextStatus } : m
      )
    );

    try {
      const res = await api.patch(`/milestones/${milestone._id}`, {
        status: nextStatus,
      });
      if (res.data) {
        setMilestones((prev) =>
          prev.map((m) => (m._id === milestone._id ? res.data : m))
        );
      }
    } catch (err) {
      console.error("Failed to update milestone:", err);
      // Revert on failure
      setMilestones((prev) =>
        prev.map((m) =>
          m._id === milestone._id ? { ...m, status: milestone.status } : m
        )
      );
    }
  };

  // Add new milestone
  const handleAddMilestone = async (e) => {
    if (e) e.preventDefault();
    if (!newTitle.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await api.post("/milestones", {
        projectId,
        title: newTitle.trim(),
        status: "Pending",
        targetDate: newDate ? new Date(newDate).toISOString() : undefined,
      });

      if (res.data) {
        setMilestones((prev) => [...prev, res.data]);
        setNewTitle("");
        setNewDate("");
      }
    } catch (err) {
      console.error("Failed to create milestone:", err);
      alert(err.response?.data?.error || "Failed to add milestone");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete milestone
  const handleDeleteMilestone = async (milestoneId) => {
    try {
      await api.delete(`/milestones/${milestoneId}`);
      setMilestones((prev) => prev.filter((m) => m._id !== milestoneId));
    } catch (err) {
      console.error("Failed to delete milestone:", err);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        initials: "ME",
        author: "You",
        text: chatInput.trim(),
        time: "Just now",
      },
    ]);
    setChatInput("");
  };

  // Real progress computation
  const completedMilestones = milestones.filter(
    (m) => m.status === "Completed"
  ).length;
  const totalMilestones = milestones.length;
  const progress =
    totalMilestones > 0
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : 0;

  const nextMilestone = milestones.find((m) => m.status !== "Completed");

  const projectCode = project?._id
    ? `PRJ-${project._id.slice(-6).toUpperCase()}`
    : `PRJ-${String(projectId).slice(-6).toUpperCase()}`;

  const projectTitle =
    project?.title || "Societal Innovation Project Tracking";
  const projectDesc =
    project?.proposalDescription ||
    project?.problemId?.description ||
    "Collaborative development and milestone execution workspace for validated societal challenges.";

  const facultyLead =
    project?.facultyMentor || "Assigned Faculty Lead";
  const universityName =
    project?.universityId?.name || "Partner University";

  return (
    <div className="collab-container">
      {/* BACK */}
      <Link to="/university/projects" className="back-link">
        <ArrowLeft size={18} />
        Back to Projects
      </Link>

      {/* HEADER */}
      <div className="collab-header">
        <div className="collab-title-area">
          <div className="project-status-row">
            <span className="project-code">{projectCode}</span>
            <span className={`status-badge ${(project?.status || "development").toLowerCase()}`}>
              {(project?.status || "IN PROGRESS").toUpperCase()}
            </span>
          </div>

          <h1>{projectTitle}</h1>

          <p className="project-description">{projectDesc}</p>

          <div className="collab-meta">
            <span>
              <Users size={16} />
              {facultyLead}
            </span>

            <span>
              <FolderKanban size={16} />
              {universityName}
            </span>

            {project?.problemId?.category && (
              <span>
                <Target size={16} />
                {project.problemId.category}
              </span>
            )}

            <span>
              <CalendarDays size={16} />
              {totalMilestones} Defined Milestones
            </span>
          </div>
        </div>

        <button
          className="repository-button"
          onClick={loadData}
          title="Refresh project and milestones from server"
        >
          <RefreshCw size={17} />
          Sync Milestones
        </button>
      </div>

      {/* OVERVIEW METRICS */}
      <div className="collab-overview">
        <div className="overview-card">
          <div className="overview-icon blue">
            <TrendingUp size={20} />
          </div>
          <div>
            <span>Overall Progress</span>
            <strong>{progress}%</strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon green">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span>Milestones Completed</span>
            <strong>
              {completedMilestones}/{totalMilestones}
            </strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon purple">
            <Users size={20} />
          </div>
          <div>
            <span>Team Members</span>
            <strong>{project?.studentTeam?.length || 3}</strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon orange">
            <Clock3 size={20} />
          </div>
          <div>
            <span>Next Milestone</span>
            <strong style={{ fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block", maxWidth: "160px" }}>
              {nextMilestone ? nextMilestone.title : (totalMilestones > 0 ? "All Done! 🎉" : "None Defined")}
            </strong>
          </div>
        </div>
      </div>

      {/* MAIN COLLABORATION GRID */}
      <div className="collab-grid">
        {/* LEFT COLUMN: ROADMAP & REAL MILESTONES */}
        <div className="main-collab">
          {/* TIMELINE / ROADMAP */}
          <div className="collab-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-eyebrow">PROJECT ROADMAP</p>
                <h3 className="panel-title">Project Timeline</h3>
              </div>

              <span className="timeline-progress">
                {completedMilestones} of {totalMilestones} milestones
              </span>
            </div>

            <div className="timeline">
              <div className="timeline-line">
                <div
                  className="timeline-line-progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {milestones.length > 0 ? (
                milestones.map((m, idx) => {
                  const isCompleted = m.status === "Completed";
                  const isInProgress = m.status === "In Progress";
                  const statusClass = isCompleted
                    ? "completed"
                    : isInProgress
                    ? "current"
                    : "";

                  return (
                    <div
                      className={`timeline-step ${statusClass}`}
                      key={m._id || idx}
                      style={{ flex: 1 }}
                    >
                      <div
                        className="step-marker"
                        style={{ cursor: "pointer" }}
                        title={`Click to toggle: ${m.title} (${m.status})`}
                        onClick={() => toggleMilestone(m)}
                      >
                        {isCompleted ? (
                          <Check size={13} />
                        ) : isInProgress ? (
                          <Circle size={9} />
                        ) : (
                          <span style={{ fontSize: "10px", fontWeight: "700", color: "#64748b" }}>
                            {idx + 1}
                          </span>
                        )}
                      </div>
                      <span className="step-label" title={m.title}>
                        {m.title.length > 18
                          ? `${m.title.slice(0, 16)}...`
                          : m.title}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: "700",
                          color: isCompleted
                            ? "#059669"
                            : isInProgress
                            ? "#2563eb"
                            : "#94a3b8",
                        }}
                      >
                        {m.status}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "16px",
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  {loading
                    ? "Loading project milestones from database..."
                    : "No milestones yet. Create your first milestone below to initialize the roadmap!"}
                </div>
              )}
            </div>
          </div>

          {/* REAL MILESTONES MANAGEMENT LIST */}
          <div className="collab-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-eyebrow">MILESTONE TRACKING</p>
                <h3 className="panel-title">
                  <ListTodo size={20} />
                  Project Milestones
                </h3>
              </div>

              <span className="task-count">
                {completedMilestones}/{totalMilestones} complete
              </span>
            </div>

            <div className="task-progress">
              <div>
                <span>Milestone completion rate</span>
                <strong>{progress}%</strong>
              </div>

              <div className="task-progress-bar">
                <div style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            {/* MILESTONE ITEMS */}
            <div className="task-list">
              {milestones.length > 0 ? (
                milestones.map((m) => {
                  const isCompleted = m.status === "Completed";
                  return (
                    <div
                      className={`task-item ${isCompleted ? "completed" : ""}`}
                      key={m._id}
                    >
                      <button
                        className="task-checkbox"
                        onClick={() => toggleMilestone(m)}
                        title={isCompleted ? "Mark pending" : "Mark milestone complete"}
                      >
                        {isCompleted && <Check size={14} />}
                      </button>

                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span className="task-name">{m.title}</span>
                        {m.targetDate && (
                          <small style={{ color: "#94a3b8", fontSize: "11px" }}>
                            Target: {new Date(m.targetDate).toLocaleDateString()}
                          </small>
                        )}
                      </div>

                      <span
                        className={`status-pill ${m.status.toLowerCase().replace(" ", "-")}`}
                        style={{
                          padding: "4px 9px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "700",
                          backgroundColor: isCompleted
                            ? "#ecfdf5"
                            : m.status === "In Progress"
                            ? "#eef4ff"
                            : "#f1f5f9",
                          color: isCompleted
                            ? "#059669"
                            : m.status === "In Progress"
                            ? "#2563eb"
                            : "#64748b",
                        }}
                      >
                        {m.status}
                      </span>

                      <button
                        onClick={() => handleDeleteMilestone(m._id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#94a3b8",
                          cursor: "pointer",
                          padding: "4px 6px",
                          borderRadius: "6px",
                        }}
                        title="Delete milestone"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#94a3b8",
                    fontSize: "14px",
                    border: "1px dashed #e2e8f0",
                    borderRadius: "10px",
                  }}
                >
                  No active milestones. Add a milestone below to begin tracking progress.
                </div>
              )}
            </div>

            {/* ADD MILESTONE FORM */}
            <form
              onSubmit={handleAddMilestone}
              style={{
                marginTop: "18px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                background: "#f8fafc",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <input
                type="text"
                placeholder="New milestone title (e.g. Field Sensor Deployment)..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: "220px",
                  padding: "10px 14px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "13px",
                  outline: "none",
                  background: "white",
                }}
                required
              />

              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                style={{
                  padding: "10px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "#475569",
                  background: "white",
                  outline: "none",
                }}
              />

              <button
                type="submit"
                disabled={isSubmitting || !newTitle.trim()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "10px 18px",
                  backgroundColor: "#4056a8",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                <Plus size={16} />
                {isSubmitting ? "Adding..." : "Add Milestone"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: TEAM & UPDATES */}
        <div className="side-collab">
          {/* TEAM */}
          <div className="collab-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-eyebrow">COLLABORATION</p>
                <h3 className="panel-title">
                  <Users size={20} />
                  Team Members
                </h3>
              </div>
            </div>

            <div className="team-list">
              <div className="team-member">
                <div className="member-avatar purple-avatar">
                  {facultyLead.slice(0, 2).toUpperCase()}
                </div>
                <div className="member-info">
                  <h4>{facultyLead}</h4>
                  <p>Faculty Lead / Mentor</p>
                </div>
                <span className="online-dot"></span>
              </div>

              {project?.studentTeam && project.studentTeam.length > 0 ? (
                project.studentTeam.map((student, idx) => (
                  <div className="team-member" key={idx}>
                    <div className="member-avatar blue-avatar">
                      {student.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="member-info">
                      <h4>{student}</h4>
                      <p>Research Team</p>
                    </div>
                    <span className="online-dot"></span>
                  </div>
                ))
              ) : (
                <>
                  <div className="team-member">
                    <div className="member-avatar blue-avatar">RP</div>
                    <div className="member-info">
                      <h4>Ravi Patel</h4>
                      <p>Lead Developer</p>
                    </div>
                    <span className="online-dot"></span>
                  </div>
                  <div className="team-member">
                    <div className="member-avatar green-avatar">SM</div>
                    <div className="member-info">
                      <h4>Sanya Mishra</h4>
                      <p>Hardware Engineer</p>
                    </div>
                    <span className="online-dot"></span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CHAT / ACTIVITY UPDATES */}
          <div className="collab-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-eyebrow">TEAM COMMUNICATION</p>
                <h3 className="panel-title">
                  <MessageSquare size={20} />
                  Recent Updates
                </h3>
              </div>
              <span className="live-label">
                <span></span>
                LIVE
              </span>
            </div>

            <div className="chat-box">
              {messages.map((message, index) => (
                <div className="chat-message" key={index}>
                  <div className="chat-avatar">{message.initials}</div>
                  <div className="chat-content">
                    <div className="chat-top">
                      <span className="chat-author">{message.author}</span>
                      <span className="chat-time">{message.time}</span>
                    </div>
                    <div className="chat-text">{message.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
              <input
                type="text"
                placeholder="Share a milestone update with team..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCollaboration;