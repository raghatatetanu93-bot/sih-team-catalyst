import { useNavigate } from "react-router-dom";
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
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({ role = "government" }) {
    const navigate = useNavigate();
  const governmentItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Problems", icon: AlertTriangle },
    { label: "Emergency Alerts", icon: AlertTriangle, path: "/emergency-alerts" },
    { label: "Heatmap", icon: Map, path: "/heatmap" },
    { label: "Validation", icon: CheckCircle, path: "/validation" },
    { label: "University Matching", icon: GraduationCap, path: "/university-matching" },
    { label: "Projects", icon: FolderKanban },
    { label: "Impact", icon: BarChart3 },
    { label: "Decision Engine", icon: Brain },
  ];

  const universityItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Challenges", icon: AlertTriangle },
    { label: "My Projects", icon: FolderKanban },
    { label: "Impact", icon: BarChart3 },
  ];

  const industryItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Projects", icon: FolderKanban },
    { label: "Support", icon: Building2 },
    { label: "Impact", icon: BarChart3 },
  ];

  const items =
    role === "government"
      ? governmentItems
      : role === "university"
      ? universityItems
      : industryItems;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">SI</div>

        <div>
          <h2>Societal Engine</h2>
          <span>{role}</span>
        </div>
      </div>

      <nav>
        {items.map((item) => {
          const Icon = item.icon;

          return (
    <button
  className="sidebar-item"
  key={item.label}
  onClick={() => {
  if (item.label === "Dashboard") navigate("/");
  if (item.label === "Problems") navigate("/problems");
  if (item.label === "Emergency Alerts") navigate("/emergency-alerts");
  if (item.label === "Heatmap") navigate("/heatmap");
  if (item.label === "Validation") navigate("/validation");
  if (item.label === "University Matching")
  navigate("/university-matching");
}}
>
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;