import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ListTodo, MessageSquare, Send, Users } from "lucide-react";

import "./ProjectCollaboration.css";

function ProjectCollaboration() {
  const { id } = useParams();
  const [chatInput, setChatInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      // Logic to send message would go here.
      setChatInput("");
    }
  };

  return (
    <div className="collab-container">
      <Link to="/university/projects" className="back-link">
        <ArrowLeft size={18} />
        Back to Projects
      </Link>

      <div className="collab-header">
        <div className="collab-title-area">
          <h1>Smart Water Grid IoT Prototype</h1>
          <div className="collab-meta">
            <span><Users size={16} /> Dr. A. Sharma (Lead)</span>
            <span className="status-badge development">DEVELOPMENT</span>
          </div>
        </div>
      </div>

      <div className="collab-grid">
        <div className="main-collab">
          
          <div className="collab-panel">
            <h3 className="panel-title">Project Timeline</h3>
            <div className="timeline">
              <div className="timeline-step completed">
                <div className="step-marker"></div>
                <span className="step-label">Research</span>
              </div>
              <div className="timeline-step completed">
                <div className="step-marker"></div>
                <span className="step-label">Planning</span>
              </div>
              <div className="timeline-step current">
                <div className="step-marker"></div>
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

          <div className="collab-panel">
            <h3 className="panel-title"><ListTodo size={20} /> Current Tasks</h3>
            <div className="task-list">
              <div className="task-item completed">
                <div className="task-checkbox">
                  <Check size={14} />
                </div>
                <span className="task-name">Procure IoT sensor boards</span>
              </div>
              <div className="task-item completed">
                <div className="task-checkbox">
                  <Check size={14} />
                </div>
                <span className="task-name">Set up local dev environment</span>
              </div>
              <div className="task-item">
                <div className="task-checkbox"></div>
                <span className="task-name">Develop sensor data ingestion API</span>
              </div>
              <div className="task-item">
                <div className="task-checkbox"></div>
                <span className="task-name">Design dashboard layout in React</span>
              </div>
            </div>
          </div>

        </div>

        <div className="side-collab">
          
          <div className="collab-panel">
            <h3 className="panel-title"><Users size={20} /> Team Members</h3>
            <div className="team-list">
              <div className="team-member">
                <div className="member-avatar">AS</div>
                <div className="member-info">
                  <h4>Dr. A. Sharma</h4>
                  <p>Project Lead / Faculty</p>
                </div>
              </div>
              <div className="team-member">
                <div className="member-avatar">RP</div>
                <div className="member-info">
                  <h4>Ravi Patel</h4>
                  <p>Lead Developer (Student)</p>
                </div>
              </div>
              <div className="team-member">
                <div className="member-avatar">SM</div>
                <div className="member-info">
                  <h4>Sanya Mishra</h4>
                  <p>Hardware Engineer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="collab-panel">
            <h3 className="panel-title"><MessageSquare size={20} /> Recent Updates</h3>
            <div className="chat-box">
              <div className="chat-message">
                <div className="member-avatar" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>RP</div>
                <div className="chat-content">
                  <div className="chat-author">Ravi Patel</div>
                  <div className="chat-text">The initial API endpoints are ready for testing. I have pushed the code to the repository.</div>
                  <span className="chat-time">2 hours ago</span>
                </div>
              </div>
              <div className="chat-message">
                <div className="member-avatar" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>SM</div>
                <div className="chat-content">
                  <div className="chat-author">Sanya Mishra</div>
                  <div className="chat-text">Great, I'll connect the test sensors tomorrow morning.</div>
                  <span className="chat-time">1 hour ago</span>
                </div>
              </div>
            </div>
            
            <form className="chat-input-area" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Type an update..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit"><Send size={16} /></button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProjectCollaboration;
