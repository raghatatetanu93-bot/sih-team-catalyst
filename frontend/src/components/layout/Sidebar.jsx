import { useNavigate, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  AlertTriangle,
  Map,
  CheckCircle,
  GraduationCap,
  FolderKanban,
  Building2,
  BarChart3,
  Brain,
  Plus,
  FileText,
  Users,
  Bell,
  Heart,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({ role = "government" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const governmentItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      label: "Problems",
      icon: AlertTriangle,
      path: "/problems",
    },
    {
      label: "Emergency Alerts",
      icon: AlertTriangle,
      path: "/emergency-alerts",
    },
    {
      label: "Heatmap",
      icon: Map,
      path: "/heatmap",
    },
    {
      label: "Validation",
      icon: CheckCircle,
      path: "/validation",
    },
    {
      label: "University Matching",
      icon: GraduationCap,
      path: "/university-matching",
    },
    {
      label: "Projects",
      icon: FolderKanban,
      path: "/projects",
    },
    {
      label: "Impact",
      icon: BarChart3,
      path: "/impact",
    },
    {
      label: "Decision Engine",
      icon: Brain,
      path: "/decision-engine",
    },
  ];

  const citizenItems = [
    {
      label: "Home",
      icon: LayoutDashboard,
      path: "/citizen",
    },
    {
      label: "Report Issue",
      icon: Plus,
      path: "/citizen/report-issue",
    },
    {
      label: "My Reports",
      icon: FileText,
      path: "/my-reports",
    },
    {
      label: "Community",
      icon: Users,
      path: "/community",
    },
    {
      label: "Emergency",
      icon: AlertTriangle,
      path: "/citizen-emergency",
    },
    {
      label: "Notifications",
      icon: Bell,
      path: "/notifications",
    },
  ];

  const universityItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      label: "Challenges",
      icon: AlertTriangle,
    },
    {
      label: "My Projects",
      icon: FolderKanban,
    },
    {
      label: "Impact",
      icon: BarChart3,
    },
  ];

  const industryItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      label: "Projects",
      icon: FolderKanban,
    },
    {
      label: "Support",
      icon: Building2,
    },
    {
      label: "Impact",
      icon: BarChart3,
    },
  ];

  const items =
    role === "government"
      ? governmentItems
      : role === "citizen"
      ? citizenItems
      : role === "university"
      ? universityItems
      : industryItems;

  const isCitizen = role === "citizen";

  return (
    <aside className={`sidebar ${isCitizen ? "citizen-sidebar" : ""}`}>
      
      {/* LOGO */}

      <div className="sidebar-logo">
        <div className="logo-mark">
          {isCitizen ? <Users size={22} /> : "SI"}
        </div>

        <div className="logo-text">
          <h2>Societal Engine</h2>
          <span>
            {isCitizen
              ? "Citizen Portal"
              : role === "government"
              ? "Government"
              : role}
          </span>
        </div>
      </div>


      {/* NAVIGATION */}

      <nav className="sidebar-nav">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              className={`sidebar-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              key={item.label}
              onClick={() => {
                if (item.path) {
                  navigate(item.path);
                }
              }}
            >
              <Icon size={20} />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>


      {/* CITIZEN BOTTOM CARD */}

      {isCitizen && (
        <div className="citizen-sidebar-bottom">
          <Heart size={25} fill="currentColor" />

          <div>
            <strong>Your voice</strong>
            <p>Builds a better Jharkhand</p>
          </div>
        </div>
      )}

    </aside>
  );
}

export default Sidebar;