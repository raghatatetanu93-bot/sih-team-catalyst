import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import GovernmentDashboard from "./pages/government/GovernmentDashboard";
import Problems from "./pages/government/Problems";
import ProblemDetails from "./pages/government/ProblemDetails";
import EmergencyAlerts from "./pages/government/EmergencyAlerts";
import Heatmap from "./pages/government/Heatmap";
import Validation from "./pages/government/Validation";
import UniversityMatching from "./pages/government/UniversityMatching";
import "./pages/government/GovernmentDashboard.css";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar role="government" />

        <main style={{ flex: 1 }}>
          <Routes>
  <Route path="/" element={<GovernmentDashboard />} />
  <Route path="/problems" element={<Problems />} />
  <Route path="/problems/:id" element={<ProblemDetails />} />
  <Route path="/emergency-alerts" element={<EmergencyAlerts />} />
  <Route path="/heatmap" element={<Heatmap />} />
  <Route path="/validation" element={<Validation />} />
  <Route
  path="/university-matching"
  element={<UniversityMatching />}
/>
</Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;