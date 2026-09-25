import { useState } from "react";
import { Link } from "react-router-dom";
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
  TrendingUp
} from "lucide-react";

import "./ProjectCollaboration.css";

function ProjectCollaboration() {
  const [chatInput, setChatInput] = useState("");

  const [tasks, setTasks] = useState([
    { id: 1, name: "Procure IoT sensor boards", completed: true },
    { id: 2, name: "Set up local dev environment", completed: true },
    { id: 3, name: "Develop sensor data ingestion API", completed: false },
    { id: 4, name: "Design dashboard layout in React", completed: false },
    { id: 5, name: "Connect test sensors", completed: false },
  ]);

  const [messages, setMessages] = useState([
    {
      initials: "RP",
      author: "Ravi Patel",
      text: "The initial API endpoints are ready for testing. I have pushed the code to the repository.",
      time: "2 hours ago",
    },
    {
      initials: "SM",
      author: "Sanya Mishra",
      text: "Great, I'll connect the test sensors tomorrow morning.",
      time: "1 hour ago",
    },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
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

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = Math.round(
    (completedTasks / tasks.length) * 100
  );

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
            <span className="project-code">PRJ-2048</span>
            <span className="status-badge development">
              DEVELOPMENT
            </span>
          </div>

          <h1>Smart Water Grid IoT Prototype</h1>

          <p className="project-description">
            Building an intelligent water monitoring system using IoT
            sensors to improve reliability and identify infrastructure
            issues in rural communities.
          </p>

          <div className="collab-meta">
            <span>
              <Users size={16} />
              Dr. A. Sharma (Lead)
            </span>

            <span>
              <CalendarDays size={16} />
              Due December 2026
            </span>

            <span>
              <Target size={16} />
              High Impact
            </span>
          </div>
        </div>

        <button
          className="repository-button"
          onClick={() =>
            alert("Repository access would open here.")
          }
        >
          <FolderKanban size={17} />
Repository
        </button>
      </div>

      {/* PROJECT OVERVIEW */}
      <div className="collab-overview">

        <div className="overview-card">
          <div className="overview-icon blue">
            <TrendingUp size={20} />
          </div>

          <div>
            <span>Overall Progress</span>
            <strong>68%</strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon green">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Tasks Completed</span>
            <strong>
              {completedTasks}/{tasks.length}
            </strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon purple">
            <Users size={20} />
          </div>

          <div>
            <span>Team Members</span>
            <strong>3</strong>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon orange">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Next Milestone</span>
            <strong>14 Days</strong>
          </div>
        </div>

      </div>

      {/* MAIN */}
      <div className="collab-grid">

        {/* LEFT */}
        <div className="main-collab">

          {/* TIMELINE */}
          <div className="collab-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-eyebrow">PROJECT ROADMAP</p>
                <h3 className="panel-title">
                  Project Timeline
                </h3>
              </div>

              <span className="timeline-progress">
                3 of 5 phases
              </span>
            </div>

            <div className="timeline">

              <div className="timeline-line">
                <div className="timeline-line-progress"></div>
              </div>

              <div className="timeline-step completed">
                <div className="step-marker">
                  <Check size={13} />
                </div>
                <span className="step-label">Research</span>
              </div>

              <div className="timeline-step completed">
                <div className="step-marker">
                  <Check size={13} />
                </div>
                <span className="step-label">Planning</span>
              </div>

              <div className="timeline-step current">
                <div className="step-marker">
                  <Circle size={9} />
                </div>
                <span className="step-label">Development</span>
              </div>

              <div className="timeline-step">
                <div className="step-marker"></div>
                <span className="step-label">Testing</span>
              </div>

              <div className="timeline-step">
                <div className="step-marker"></div>
                <span className="step-label">Implementation</span>
              </div>

            </div>
          </div>

          {/* TASKS */}
          <div className="collab-panel">

            <div className="panel-heading">
              <div>
                <p className="panel-eyebrow">TEAM WORK</p>

                <h3 className="panel-title">
                  <ListTodo size={20} />
                  Current Tasks
                </h3>
              </div>

              <span className="task-count">
                {completedTasks}/{tasks.length} complete
              </span>
            </div>

            <div className="task-progress">
              <div>
                <span>Task completion</span>
                <strong>{progress}%</strong>
              </div>

              <div className="task-progress-bar">
                <div
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="task-list">

              {tasks.map((task) => (
                <div
                  className={`task-item ${
                    task.completed ? "completed" : ""
                  }`}
                  key={task.id}
                >
                  <button
                    className="task-checkbox"
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed && (
                      <Check size={14} />
                    )}
                  </button>

                  <span className="task-name">
                    {task.name}
                  </span>

                  {task.completed && (
                    <span className="task-done">
                      Completed
                    </span>
                  )}
                </div>
              ))}

            </div>

            <button
              className="add-task-button"
              onClick={() =>
                setTasks((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    name: "New project task",
                    completed: false,
                  },
                ])
              }
            >
              <Plus size={15} />
              Add Task
            </button>

          </div>

        </div>

        {/* RIGHT */}
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
                  AS
                </div>

                <div className="member-info">
                  <h4>Dr. A. Sharma</h4>
                  <p>Project Lead / Faculty</p>
                </div>

                <span className="online-dot"></span>
              </div>

              <div className="team-member">
                <div className="member-avatar blue-avatar">
                  RP
                </div>

                <div className="member-info">
                  <h4>Ravi Patel</h4>
                  <p>Lead Developer</p>
                </div>

                <span className="online-dot"></span>
              </div>

              <div className="team-member">
                <div className="member-avatar green-avatar">
                  SM
                </div>

                <div className="member-info">
                  <h4>Sanya Mishra</h4>
                  <p>Hardware Engineer</p>
                </div>

                <span className="online-dot"></span>
              </div>

            </div>

          </div>

          {/* CHAT */}
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
                <div
                  className="chat-message"
                  key={index}
                >
                  <div className="chat-avatar">
                    {message.initials}
                  </div>

                  <div className="chat-content">
                    <div className="chat-top">
                      <span className="chat-author">
                        {message.author}
                      </span>

                      <span className="chat-time">
                        {message.time}
                      </span>
                    </div>

                    <div className="chat-text">
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}

            </div>

            <form
              className="chat-input-area"
              onSubmit={handleSend}
            >
              <input
                type="text"
                placeholder="Share an update with your team..."
                value={chatInput}
                onChange={(e) =>
                  setChatInput(e.target.value)
                }
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