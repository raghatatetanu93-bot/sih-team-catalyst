import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectDetails.css";

import {
  ArrowLeft,
  FolderKanban,
  GraduationCap,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  MapPin,
  Target,
  TrendingUp,
  Plus,
  Trash2,
  RefreshCw,
  Check
} from "lucide-react";
import api from "../../api";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New milestone state
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch project details
      if (id) {
        try {
          const projRes = await api.get(`/projects/${id}`);
          if (projRes.data) {
            setProject(projRes.data);
          }
        } catch (pErr) {
          console.warn("Could not fetch project by id from /projects/:id:", pErr);
        }

        // 2. Fetch real milestones
        const msRes = await api.get(`/milestones/project/${id}`);
        setMilestones(Array.isArray(msRes.data) ? msRes.data : []);
      }
    } catch (err) {
      console.error("Error loading project details and milestones:", err);
      setError("Failed to load project details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Toggle milestone completion
  const toggleMilestone = async (milestone) => {
    const isCompleted = milestone.status === "Completed";
    const nextStatus = isCompleted ? "Pending" : "Completed";

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
      console.error("Failed to toggle milestone:", err);
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
        projectId: id,
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
      console.error("Failed to add milestone:", err);
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

  // Progress computation
  const completedMilestones = milestones.filter(
    (m) => m.status === "Completed"
  ).length;
  const totalMilestones = milestones.length;
  const progress =
    totalMilestones > 0
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : (project?.progress || 0);

  // Fallback defaults for display
  const title =
    project?.title || "Societal Innovation Project";
  const problemDesc =
    project?.problemId?.description ||
    project?.proposalDescription ||
    "Addressing prioritized societal challenges through verified university implementation.";
  const university =
    project?.universityId?.name || "Birla Institute of Technology, Mesra";
  const location =
    [project?.problemId?.location?.address, project?.problemId?.location?.district].filter(Boolean).join(", ") ||
    (typeof project?.problemId?.location === "string" ? project.problemId.location : "Jharkhand, India");
  const status = project?.status || "In Progress";
  const deadline = project?.createdAt
    ? `Created ${new Date(project.createdAt).toLocaleDateString()}`
    : "Active";
  const teamSize = project?.studentTeam?.length || 8;

  return (
    <div className="project-details-page">
      {/* BACK BUTTON */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          className="back-button"
          onClick={() => navigate("/government/projects")}
        >
          <ArrowLeft size={17} />
          Back to Projects
        </button>

        <button
          onClick={loadData}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "white",
            border: "1px solid #dce2ed",
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "700",
            color: "#4056a8",
            cursor: "pointer",
            marginBottom: "28px"
          }}
        >
          <RefreshCw size={15} />
          Sync Milestones
        </button>
      </div>

      {/* HEADER */}
      <div className="project-details-header">
        <div>
          <p className="eyebrow">PROJECT OVERVIEW</p>
          <div className="project-details-title">
            <div className="details-project-icon">
              <FolderKanban size={25} />
            </div>
            <div>
              <h1>{title}</h1>
              <p>{problemDesc}</p>
            </div>
          </div>
        </div>

        <span
          className={`details-status ${status
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          {status}
        </span>
      </div>

      {/* PROGRESS CARD */}
      <div className="details-progress-card">
        <div className="progress-card-header">
          <div>
            <span>Overall Project Progress</span>
            <h2>{progress}%</h2>
            <small style={{ color: "#64748b", fontSize: "12px" }}>
              {completedMilestones} of {totalMilestones} milestones completed
            </small>
          </div>
          <TrendingUp size={28} />
        </div>

        <div className="details-progress-bar">
          <div
            className="details-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* INFO GRID */}
      <div className="project-info-grid">
        {/* MAIN DETAILS */}
        <div className="project-description-card">
          <h2>Project Description</h2>
          <p>{project?.proposalDescription || problemDesc}</p>

          <div className="project-objective">
            <Target size={20} />
            <div>
              <strong>Primary Objective</strong>
              <p>
                Develop an effective and scalable solution for the
                identified societal challenge in Jharkhand.
              </p>
            </div>
          </div>
        </div>

        {/* PROJECT INFORMATION */}
        <div className="project-information-card">
          <h2>Project Information</h2>

          <div className="info-row">
            <GraduationCap size={18} />
            <div>
              <span>Lead Institution</span>
              <strong>{university}</strong>
            </div>
          </div>

          <div className="info-row">
            <MapPin size={18} />
            <div>
              <span>Location</span>
              <strong>{location}</strong>
            </div>
          </div>

          <div className="info-row">
            <Calendar size={18} />
            <div>
              <span>Timeline / Status</span>
              <strong>{deadline}</strong>
            </div>
          </div>

          <div className="info-row">
            <Users size={18} />
            <div>
              <span>Team Size</span>
              <strong>{teamSize} Members</strong>
            </div>
          </div>
        </div>
      </div>

      {/* PROJECT MILESTONES (REAL DATA & CRUD) */}
      <div className="project-timeline-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
          <div>
            <h2>Project Milestones</h2>
            <p>Current implementation and milestone execution progress.</p>
          </div>
          <span
            style={{
              padding: "5px 10px",
              background: "#eef2ff",
              color: "#4056a8",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: "700"
            }}
          >
            {completedMilestones}/{totalMilestones} Completed ({progress}%)
          </span>
        </div>

        {/* MILESTONE LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          {milestones.length > 0 ? (
            milestones.map((m, idx) => {
              const isCompleted = m.status === "Completed";
              const isInProgress = m.status === "In Progress";

              return (
                <div
                  key={m._id || idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    background: isCompleted ? "#f8fafc" : "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    gap: "12px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                    <button
                      onClick={() => toggleMilestone(m)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        border: isCompleted ? "none" : "2px solid #cbd5e1",
                        background: isCompleted ? "#059669" : "transparent",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0
                      }}
                      title={isCompleted ? "Mark incomplete" : "Mark complete"}
                    >
                      {isCompleted && <Check size={16} />}
                    </button>

                    <div>
                      <strong
                        style={{
                          fontSize: "14px",
                          color: isCompleted ? "#94a3b8" : "#1e293b",
                          textDecoration: isCompleted ? "line-through" : "none"
                        }}
                      >
                        {m.title}
                      </strong>
                      {m.targetDate && (
                        <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                          Target: {new Date(m.targetDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: "700",
                        background: isCompleted
                          ? "#ecfdf5"
                          : isInProgress
                          ? "#eef2ff"
                          : "#f1f5f9",
                        color: isCompleted
                          ? "#059669"
                          : isInProgress
                          ? "#2563eb"
                          : "#64748b"
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
                        padding: "4px"
                      }}
                      title="Delete milestone"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                color: "#94a3b8",
                border: "1px dashed #e2e8f0",
                borderRadius: "10px",
                fontSize: "13px"
              }}
            >
              {loading
                ? "Loading milestones..."
                : "No milestones defined for this project yet. Add one below to track progress."}
            </div>
          )}
        </div>

        {/* GOVERNMENT ADD MILESTONE FORM */}
        <form
          onSubmit={handleAddMilestone}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            padding: "14px",
            background: "#f8fafc",
            borderRadius: "12px",
            border: "1px solid #e2e8f0"
          }}
        >
          <input
            type="text"
            placeholder="Add a new project milestone (e.g. Field Validation & Quality Audit)..."
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
              background: "white"
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
              outline: "none"
            }}
          />

          <button
            type="submit"
            disabled={isSubmitting || !newTitle.trim()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 18px",
              backgroundColor: "#5267a8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            <Plus size={16} />
            {isSubmitting ? "Adding..." : "Add Milestone"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProjectDetails;