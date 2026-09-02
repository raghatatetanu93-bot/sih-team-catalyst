import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  MapPin,
  Users,
  BriefcaseBusiness,
  FlaskConical,
  CheckCircle,
  Mail,
  Phone,
  ExternalLink,
  Star,
} from "lucide-react";

import "./UniversityProfile.css";

function UniversityProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const universities = {
    1: {
      name: "Birla Institute of Technology, Mesra",
      location: "Ranchi, Jharkhand",
      match: 96,
      expertise: "Water & Environmental Engineering",
      faculty: 12,
      projects: 28,
      capacity: "Available",
      description:
        "A leading technical institution with strong expertise in environmental engineering, water resource management and sustainable infrastructure.",
      email: "research@bitmesra.ac.in",
      phone: "+91 651 227 5444",
      strengths: [
        "Water Resource Management",
        "Environmental Engineering",
        "Sustainable Infrastructure",
        "Rural Development",
      ],
    },

    2: {
      name: "IIT (ISM) Dhanbad",
      location: "Dhanbad, Jharkhand",
      match: 91,
      expertise: "Infrastructure & Civil Engineering",
      faculty: 9,
      projects: 21,
      capacity: "Available",
      description:
        "Strong research capabilities in infrastructure development, civil engineering and large-scale public systems.",
      email: "research@iitism.ac.in",
      phone: "+91 326 223 5001",
      strengths: [
        "Civil Infrastructure",
        "Smart Cities",
        "Water Systems",
        "Public Infrastructure",
      ],
    },

    3: {
      name: "Central University of Jharkhand",
      location: "Ranchi, Jharkhand",
      match: 87,
      expertise: "Environmental Science & Sustainability",
      faculty: 8,
      projects: 17,
      capacity: "Limited",
      description:
        "Research-focused institution with expertise in environmental sustainability and societal development.",
      email: "research@cuj.ac.in",
      phone: "+91 651 277 2200",
      strengths: [
        "Environmental Science",
        "Sustainability",
        "Climate Research",
        "Social Development",
      ],
    },

    4: {
      name: "National Institute of Technology, Jamshedpur",
      location: "Jamshedpur, Jharkhand",
      match: 84,
      expertise: "Technology & Smart Infrastructure",
      faculty: 11,
      projects: 24,
      capacity: "Limited",
      description:
        "Technical institution with strong capabilities in smart infrastructure, engineering innovation and technology-driven solutions.",
      email: "research@nitjsr.ac.in",
      phone: "+91 657 237 4108",
      strengths: [
        "Smart Infrastructure",
        "Technology Innovation",
        "Civil Engineering",
        "IoT Systems",
      ],
    },
  };

  const university = universities[id];

  if (!university) {
    return <div>University not found</div>;
  }

  return (
    <div className="university-profile-page">

      <button
        className="back-button"
        onClick={() => navigate("/university-matching")}
      >
        <ArrowLeft size={18} />
        Back to Matching
      </button>

      <section className="profile-hero">

        <div className="profile-main-info">

          <div className="profile-university-icon">
            <GraduationCap size={32} />
          </div>

          <div>
            <span className="profile-label">
              RECOMMENDED INSTITUTION
            </span>

            <h1>{university.name}</h1>

            <p className="profile-location">
              <MapPin size={17} />
              {university.location}
            </p>
          </div>

        </div>

        <div className="profile-match-score">
          <span>AI Match Score</span>
          <strong>{university.match}%</strong>
          <p>Strong Recommendation</p>
        </div>

      </section>


      <section className="profile-grid">

        <div className="profile-about-card">

          <h2>Institution Overview</h2>

          <p>{university.description}</p>

          <div className="profile-expertise">

            <span className="section-small-title">
              PRIMARY EXPERTISE
            </span>

            <h3>{university.expertise}</h3>

          </div>

        </div>


        <div className="profile-capacity-card">

          <h2>Research Capacity</h2>

          <div className="capacity-stat">
            <Users size={20} />
            <div>
              <span>Relevant Faculty</span>
              <strong>{university.faculty}</strong>
            </div>
          </div>

          <div className="capacity-stat">
            <BriefcaseBusiness size={20} />
            <div>
              <span>Related Projects</span>
              <strong>{university.projects}</strong>
            </div>
          </div>

          <div className="capacity-stat">
            <CheckCircle size={20} />
            <div>
              <span>Current Capacity</span>
              <strong>{university.capacity}</strong>
            </div>
          </div>

        </div>

      </section>


      <section className="strengths-card">

        <div className="section-heading">
          <div>
            <span className="profile-label">
              AI IDENTIFIED STRENGTHS
            </span>

            <h2>Relevant Capabilities</h2>
          </div>

          <FlaskConical size={25} />
        </div>

        <div className="strength-tags">

          {university.strengths.map((strength) => (
            <span key={strength}>
              <CheckCircle size={15} />
              {strength}
            </span>
          ))}

        </div>

      </section>


      <section className="match-reason-card">

        <div className="match-reason-icon">
          <Star size={22} />
        </div>

        <div>
          <span className="profile-label">
            WHY THIS MATCH
          </span>

          <h2>Strong alignment with Rural Water Reliability</h2>

          <p>
            AI analysis identified a strong connection between the
            institution's expertise, faculty capability, previous
            projects and available research capacity with the
            requirements of the selected societal problem.
          </p>
        </div>

      </section>


      <section className="contact-card">

        <div>
          <span className="profile-label">
            COLLABORATION
          </span>

          <h2>Initiate Institutional Collaboration</h2>

          <p>
            Connect the government problem owner with the university
            research and innovation team.
          </p>
        </div>

        <div className="contact-actions">

          <button>
            <Mail size={17} />
            Contact Institution
          </button>

          <button className="secondary-action">
            <ExternalLink size={17} />
            View Research Portfolio
          </button>

        </div>

      </section>

    </div>
  );
}

export default UniversityProfile;