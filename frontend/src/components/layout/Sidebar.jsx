import React, { useState, useEffect } from "react";
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
  FilePlus,
  Users,
  Siren,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({ role = "government" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") {
        return saved;
      }
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    } catch {
      // fallback
    }
    return "light";
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        if (!localStorage.getItem("theme")) {
          setTheme(e.matches ? "dark" : "light");
        }
      };
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

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

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navContent = (
    <>
      <div
        className="sidebar-logo"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setIsOpen(false);
          navigate("/");
        }}
      >
        <div className="logo-mark">SI</div>
        <div>
          <h2>Societal Engine</h2>
          <span style={{ textTransform: "capitalize" }}>{role}</span>
        </div>
      </div>

      <nav>
        {items.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <button
              className={`sidebar-item ${active ? "active" : ""}`}
              key={item.label}
              onClick={() => {
                setIsOpen(false);
                navigate(item.path);
              }}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={toggleTheme}
          className="theme-toggle-button"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>

        <button onClick={handleLogout} className="logout-button">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <header className="mobile-header">
        <div
          className="mobile-header-brand"
          onClick={() => {
            setIsOpen(false);
            navigate("/");
          }}
        >
          <div className="logo-mark small">SI</div>
          <span className="mobile-brand-title">Societal Engine</span>
          <span className="mobile-role-tag">{role}</span>
        </div>
        <div className="mobile-header-actions">
          <button
            className="mobile-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setIsOpen(false)}
        >
          <aside
            className="mobile-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="sidebar desktop-sidebar">
        {navContent}
      </aside>
    </>
  );
}

export default Sidebar;