import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// Core Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

// Citizen Pages
import CitizenDashboard from "./pages/citizens/CitizenDashboard";
import ReportIssue from "./pages/citizens/ReportIssue";
import MyReports from "./pages/citizens/MyReports";
import Community from "./pages/citizens/Community";
import ReportDetails from "./pages/citizens/ReportDetails";
import IssueDetails from "./pages/citizens/IssueDetails";
import Emergency from "./pages/citizens/Emergency";
import CitizenNotifications from "./pages/citizens/Notifications";

// Government Pages
import GovernmentDashboard from "./pages/government/GovernmentDashboard";
import Problems from "./pages/government/Problems";
import ProblemDetails from "./pages/government/ProblemDetails";
import EmergencyAlerts from "./pages/government/EmergencyAlerts";
import Heatmap from "./pages/government/Heatmap";
import Validation from "./pages/government/Validation";
import UniversityMatching from "./pages/government/UniversityMatching";
import Projects from "./pages/government/Projects";
import Impact from "./pages/government/Impact";
import DecisionEngine from "./pages/government/DecisionEngine";
import ProjectDetails from "./pages/government/ProjectDetails";
import UniversityProfile from "./pages/government/UniversityProfile";
import GovernmentNotifications from "./pages/government/Notifications";
import "./pages/government/GovernmentDashboard.css";

// University Pages
import UniversityDashboard from "./pages/university/UniversityDashboard";
import AvailableChallenges from "./pages/university/AvailableChallenges";
import UniversityProjects from "./pages/university/UniversityProjects";
import UniversityImpact from "./pages/university/UniversityImpact";
import ChallengeDetails from "./pages/university/ChallengeDetails";
import ProjectCollaboration from "./pages/university/ProjectCollaboration";

// Industry Pages
import IndustryDashboard from "./pages/industry/IndustryDashboard";
import AvailableProjects from "./pages/industry/AvailableProjects";
import Partnerships from "./pages/industry/Partnerships";
import IndustryImpact from "./pages/industry/IndustryImpact";
import IndustryProjectDetails from "./pages/industry/IndustryProjectDetails";
import FundingOpportunities from "./pages/industry/FundingOpportunities";

const Layout = ({ role }) => (
  <div className="app-layout">
    <Sidebar role={role} />
    <main className="app-main">
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Citizen Portal Routes */}
        <Route path="/citizen" element={<ProtectedRoute allowedRole="citizen"><Layout role="citizen" /></ProtectedRoute>}>
          <Route index element={<CitizenDashboard />} />
          <Route path="report" element={<ReportIssue />} />
          <Route path="reports" element={<MyReports />} />
          <Route path="reports/:id" element={<ReportDetails />} />
          <Route path="community" element={<Community />} />
          <Route path="community/:id" element={<IssueDetails />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="notifications" element={<CitizenNotifications />} />
        </Route>

        {/* Government Portal Routes */}
        <Route path="/government" element={<ProtectedRoute allowedRole="government"><Layout role="government" /></ProtectedRoute>}>
          <Route index element={<GovernmentDashboard />} />
          <Route path="problems" element={<Problems />} />
          <Route path="problems/:id" element={<ProblemDetails />} />
          <Route path="emergency-alerts" element={<EmergencyAlerts />} />
          <Route path="heatmap" element={<Heatmap />} />
          <Route path="validation" element={<Validation />} />
          <Route path="university-matching" element={<UniversityMatching />} />
          <Route path="university/:id" element={<UniversityProfile />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="impact" element={<Impact />} />
          <Route path="decision-engine" element={<DecisionEngine />} />
          <Route path="notifications" element={<GovernmentNotifications />} />
        </Route>

        {/* University Portal Routes */}
        <Route path="/university" element={<ProtectedRoute allowedRole="university"><Layout role="university" /></ProtectedRoute>}>
          <Route index element={<UniversityDashboard />} />
          <Route path="challenges" element={<AvailableChallenges />} />
          <Route path="challenges/:id" element={<ChallengeDetails />} />
          <Route path="projects" element={<UniversityProjects />} />
          <Route path="projects/:id" element={<ProjectCollaboration />} />
          <Route path="impact" element={<UniversityImpact />} />
        </Route>

        {/* Industry Portal Routes */}
        <Route path="/industry" element={<ProtectedRoute allowedRole="industry"><Layout role="industry" /></ProtectedRoute>}>
          <Route index element={<IndustryDashboard />} />
          <Route path="projects" element={<AvailableProjects />} />
          <Route path="projects/:id" element={<IndustryProjectDetails />} />
          <Route path="funding" element={<FundingOpportunities />} />
          <Route path="support" element={<Partnerships />} />
          <Route path="impact" element={<IndustryImpact />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;