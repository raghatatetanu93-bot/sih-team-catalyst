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
} from "lucide-react";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: "Rural Water Reliability System",
      problem: "Unreliable water supply across rural villages",
      description:
        "Developing a sustainable monitoring and intervention system to improve water reliability across affected rural villages in Jharkhand.",
      university: "Birla Institute of Technology, Mesra",
      location: "Ranchi, Jharkhand",
      status: "In Progress",
      progress: 68,
      deadline: "December 2026",
      priority: "High",
      team: 12,
      category: "Water & Environment",
    },
    {
      id: 2,
      title: "Smart Flood Monitoring Network",
      problem: "Recurring urban flooding in Ranchi",
      description:
        "Building an intelligent flood monitoring network using sensors and predictive analytics to provide early warnings.",
      university: "IIT (ISM) Dhanbad",
      location: "Dhanbad, Jharkhand",
      status: "In Progress",
      progress: 42,
      deadline: "January 2027",
      priority: "High",
      team: 10,
      category: "Infrastructure",
    },
    {
      id: 3,
      title: "Waste Collection Optimization",
      problem: "Irregular garbage collection in urban areas",
      description:
        "Creating a data-driven waste collection optimization system to improve efficiency and service coverage.",
      university: "NIT Jamshedpur",
      location: "Jamshedpur, Jharkhand",
      status: "Planning",
      progress: 18,
      deadline: "March 2027",
      priority: "Medium",
      team: 8,
      category: "Waste Management",
    },
    {
      id: 4,
      title: "Primary Healthcare Access Study",
      problem: "Shortage of healthcare staff in rural PHCs",
      description:
        "Research project focused on understanding healthcare staffing gaps and improving access in rural primary health centres.",
      university: "Central University of Jharkhand",
      location: "Ranchi, Jharkhand",
      status: "Completed",
      progress: 100,
      deadline: "Completed",
      priority: "Medium",
      team: 9,
      category: "Healthcare",
    },
  ];

  const project = projects.find(
    (item) => item.id === Number(id)
  );

  if (!project) {
    return (
      <div className="project-details-page">
        <h2>Project not found</h2>

        <button
          className="back-button"
          onClick={() => navigate("/government/projects")}
        >
          <ArrowLeft size={17} />
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="project-details-page">

      {/* BACK BUTTON */}

      <button
        className="back-button"
        onClick={() => navigate("/government/projects")}
      >
        <ArrowLeft size={17} />
        Back to Projects
      </button>


      {/* HEADER */}

      <div className="project-details-header">

        <div>

          <p className="eyebrow">PROJECT OVERVIEW</p>

          <div className="project-details-title">

            <div className="details-project-icon">
              <FolderKanban size={25} />
            </div>

            <div>

              <h1>{project.title}</h1>

              <p>{project.problem}</p>

            </div>

          </div>

        </div>


        <span
          className={`details-status ${project.status
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          {project.status}
        </span>

      </div>


      {/* PROGRESS CARD */}

      <div className="details-progress-card">

        <div className="progress-card-header">

          <div>

            <span>Overall Project Progress</span>

            <h2>{project.progress}%</h2>

          </div>

          <TrendingUp size={28} />

        </div>


        <div className="details-progress-bar">

          <div
            className="details-progress-fill"
            style={{ width: `${project.progress}%` }}
          />

        </div>

      </div>


      {/* INFO GRID */}

      <div className="project-info-grid">


        {/* MAIN DETAILS */}

        <div className="project-description-card">

          <h2>Project Description</h2>

          <p>{project.description}</p>


          <div className="project-objective">

            <Target size={20} />

            <div>

              <strong>Primary Objective</strong>

              <p>
                Develop an effective and scalable solution for the
                identified societal challenge.
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

              <strong>{project.university}</strong>

            </div>

          </div>


          <div className="info-row">

            <MapPin size={18} />

            <div>

              <span>Location</span>

              <strong>{project.location}</strong>

            </div>

          </div>


          <div className="info-row">

            <Calendar size={18} />

            <div>

              <span>Target Completion</span>

              <strong>{project.deadline}</strong>

            </div>

          </div>


          <div className="info-row">

            <Users size={18} />

            <div>

              <span>Team Size</span>

              <strong>{project.team} Members</strong>

            </div>

          </div>

        </div>

      </div>


      {/* PROJECT STATUS */}

      <div className="project-timeline-card">

        <h2>Project Milestones</h2>

        <p>Current implementation and development progress.</p>


        <div className="timeline">

          <div className="timeline-item completed">

            <div className="timeline-icon">
              <CheckCircle size={17} />
            </div>

            <div>

              <strong>Problem Validation</strong>

              <span>Completed</span>

            </div>

          </div>


          <div className="timeline-item completed">

            <div className="timeline-icon">
              <CheckCircle size={17} />
            </div>

            <div>

              <strong>University Matching</strong>

              <span>Completed</span>

            </div>

          </div>


          <div className="timeline-item active">

            <div className="timeline-icon">
              <Clock size={17} />
            </div>

            <div>

              <strong>Solution Development</strong>

              <span>Currently in progress</span>

            </div>

          </div>


          <div className="timeline-item">

            <div className="timeline-icon">
              <AlertTriangle size={17} />
            </div>

            <div>

              <strong>Pilot Deployment</strong>

              <span>Upcoming</span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProjectDetails;