import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";

// =========================
// GOVERNMENT PAGES
// =========================

import GovernmentDashboard from "./pages/government/GovernmentDashboard";
import Problems from "./pages/government/Problems";
import ProblemDetails from "./pages/government/ProblemDetails";
import EmergencyAlerts from "./pages/government/EmergencyAlerts";
import Heatmap from "./pages/government/Heatmap";
import Validation from "./pages/government/Validation";
import UniversityMatching from "./pages/government/UniversityMatching";
import UniversityProfile from "./pages/government/UniversityProfile";
import Projects from "./pages/government/Projects";
import ProjectDetails from "./pages/government/ProjectDetails";
import Impact from "./pages/government/Impact";
import DecisionEngine from "./pages/government/DecisionEngine";

// =========================
// CITIZEN PAGES
// =========================

import CitizenDashboard from "./pages/citizens/CitizenDashboard";
import ReportIssue from "./pages/citizens/ReportIssue";
import MyReports from "./pages/citizens/MyReports";
import ReportDetails from "./pages/citizens/ReportDetails";
import Community from "./pages/citizens/Community";
import IssueDetails from "./pages/citizens/IssueDetails";
import Emergency from "./pages/citizens/Emergency";
import Notifications from "./pages/citizens/Notifications";

// =========================
// UNIVERSITY PAGES
// =========================

import UniversityDashboard from "./pages/university/UniversityDashboard";
import AvailableChallenges from "./pages/university/AvailableChallenges";
import ChallengeDetails from "./pages/university/ChallengeDetails";
import UniversityProjects from "./pages/university/UniversityProjects";
import ProjectCollaboration from "./pages/university/ProjectCollaboration";
import UniversityImpact from "./pages/university/UniversityImpact";

// =========================
// INDUSTRY PAGES
// =========================

import IndustryDashboard from "./pages/industry/IndustryDashboard";
import AvailableProjects from "./pages/industry/AvailableProjects";
import IndustryProjectDetails from "./pages/industry/IndustryProjectDetails";
import FundingOpportunities from "./pages/industry/FundingOpportunities";
import Partnerships from "./pages/industry/Partnerships";
import IndustryImpact from "./pages/industry/IndustryImpact";

// =========================
// CSS
// =========================

import "./pages/government/GovernmentDashboard.css";


function AppContent() {
  const location = useLocation();

  // Check whether current page belongs to Citizen Portal
  const isCitizenPage =
    location.pathname === "/citizen" ||
    location.pathname === "/citizen/report-issue" ||
    location.pathname === "/my-reports" ||
    location.pathname.startsWith("/my-reports/") ||
    location.pathname === "/community" ||
    location.pathname.startsWith("/community/") ||
    location.pathname === "/citizen-emergency" ||
    location.pathname === "/notifications";

  const isUniversityPage = location.pathname.startsWith("/university");
  const isIndustryPage = location.pathname.startsWith("/industry");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* SIDEBAR */}
      <Sidebar role={isCitizenPage ? "citizen" : isUniversityPage ? "university" : isIndustryPage ? "industry" : "government"} />

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          overflowX: "hidden",
        }}
      >
        <Routes>

          {/* ========================= */}
          {/* GOVERNMENT ROUTES */}
          {/* ========================= */}

          <Route
            path="/"
            element={<GovernmentDashboard />}
          />

          <Route
            path="/problems"
            element={<Problems />}
          />

          <Route
            path="/problems/:id"
            element={<ProblemDetails />}
          />

          <Route
            path="/emergency-alerts"
            element={<EmergencyAlerts />}
          />

          <Route
            path="/heatmap"
            element={<Heatmap />}
          />

          <Route
            path="/validation"
            element={<Validation />}
          />

          <Route
            path="/university-matching"
            element={<UniversityMatching />}
          />

          <Route
            path="/university-profile/:id"
            element={<UniversityProfile />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />

          <Route
            path="/impact"
            element={<Impact />}
          />

          <Route
            path="/decision-engine"
            element={<DecisionEngine />}
          />


          {/* ========================= */}
          {/* CITIZEN ROUTES */}
          {/* ========================= */}

          <Route
            path="/citizen"
            element={<CitizenDashboard />}
          />

          <Route
            path="/citizen/report-issue"
            element={<ReportIssue />}
          />

          <Route
            path="/my-reports"
            element={<MyReports />}
          />

          <Route
            path="/my-reports/:id"
            element={<ReportDetails />}
          />

          <Route
            path="/community"
            element={<Community />}
          />

          <Route
            path="/community/:id"
            element={<IssueDetails />}
          />

          <Route
            path="/citizen-emergency"
            element={<Emergency />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          {/* ========================= */}
          {/* UNIVERSITY ROUTES */}
          {/* ========================= */}

          <Route
            path="/university"
            element={<UniversityDashboard />}
          />
          <Route
            path="/university/challenges"
            element={<AvailableChallenges />}
          />
          <Route
            path="/university/challenges/:id"
            element={<ChallengeDetails />}
          />
          <Route
            path="/university/projects"
            element={<UniversityProjects />}
          />
          <Route
            path="/university/projects/:id"
            element={<ProjectCollaboration />}
          />
          <Route
            path="/university/impact"
            element={<UniversityImpact />}
          />

          {/* ========================= */}
          {/* INDUSTRY ROUTES */}
          {/* ========================= */}

          <Route
            path="/industry"
            element={<IndustryDashboard />}
          />
          <Route
            path="/industry/projects"
            element={<AvailableProjects />}
          />
          <Route
            path="/industry/projects/:id"
            element={<IndustryProjectDetails />}
          />
          <Route
            path="/industry/funding"
            element={<FundingOpportunities />}
          />
          <Route
            path="/industry/partnerships"
            element={<Partnerships />}
          />
          <Route
            path="/industry/impact"
            element={<IndustryImpact />}
          />

        </Routes>
      </main>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


export default App;