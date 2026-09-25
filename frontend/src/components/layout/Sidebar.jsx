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
  FilePlus,
  Users,
  Siren
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({ role = "government" }) {
  const navigate = useNavigate();

const citizenItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/citizen" },
  { label: "Report Issue", icon: FilePlus, path: "/citizen/report" },
  { label: "My Reports", icon: AlertTriangle, path: "/citizen/reports" },
  { label: "Emergency", icon: Siren, path: "/citizen/emergency" },
  { label: "Community", icon: Users, path: "/citizen/community" },
];

  const governmentItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/government" },
    { label: "Problems", icon: AlertTriangle, path: "/government/problems" },
    { label: "Emergency Alerts", icon: AlertTriangle, path: "/government/emergency-alerts" },
    { label: "Heatmap", icon: Map, path: "/government/heatmap" },
    { label: "Validation", icon: CheckCircle, path: "/government/validation" },
    { label: "University Matching", icon: GraduationCap, path: "/government/university-matching" },
    { label: "Projects", icon: FolderKanban, path: "/government/projects" },
    { label: "Impact", icon: BarChart3, path: "/government/impact" },
    { label: "Decision Engine", icon: Brain, path: "/government/decision-engine" },
  ];

  const universityItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/university" },
    { label: "Challenges", icon: AlertTriangle, path: "/university/challenges" },
    { label: "My Projects", icon: FolderKanban, path: "/university/projects" },
    { label: "Impact", icon: BarChart3, path: "/university/impact" },
  ];

  const industryItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/industry" },
    { label: "Projects", icon: FolderKanban, path: "/industry/projects" },
    { label: "Support", icon: Building2, path: "/industry/support" },
    { label: "Impact", icon: BarChart3, path: "/industry/impact" },
  ];

  const items =
    role === "government"
      ? governmentItems
      : role === "university"
      ? universityItems
      : role === "industry"
      ? industryItems
      : citizenItems;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{cursor: "pointer"}} onClick={() => navigate("/")}>
        <div className="logo-mark">SI</div>
        <div>
          <h2>Societal Engine</h2>
          <span style={{textTransform: 'capitalize'}}>{role}</span>
        </div>
      </div>

      <nav>
        {items.map((item) => {
          const Icon = item.icon;
          return (
           <button
  className={`sidebar-item ${
    window.location.pathname === item.path ? "active" : ""
  }`}
  key={item.label}
  onClick={() => navigate(item.path)}
>
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div style={{marginTop: "auto", padding: "1rem"}}>
        <button onClick={() => {
          localStorage.removeItem('userRole');
          navigate('/');
        }} style={{background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;