import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./ReportIssue.css";
import {
  ArrowLeft,
  Camera,
  MapPin,
  AlertCircle,
  ChevronDown,
  Send,
  Upload,
} from "lucide-react";

function ReportIssue() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    category: "",
    location: {
      address: "",
      district: "",
      lat: null,
      lng: null,
    },
    severity: "Medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.location.address) {
      setError("Please provide a description and a location.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      // Ensure location format matches backend expectation
      const payload = {
        description: formData.description,
        location: formData.location,
      };
      
      const response = await api.post("/problems", payload);
      setSuccess(true);
      setFormData({
        description: "",
        category: "",
        location: { address: "", district: "", lat: null, lng: null },
        severity: "Medium",
      });
      setTimeout(() => {
        navigate("/citizen/reports");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-issue-page">
      <div className="report-header">
        <button className="back-button" onClick={() => navigate("/citizen")}>
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className="report-heading">
          <span>REPORT AN ISSUE</span>
          <h1>What's happening?</h1>
          <p>Tell us about the problem and we'll help connect it to the right authorities.</p>
        </div>
      </div>

      <div className="report-form-container">
        {error && (
          <div style={{ padding: "1rem", backgroundColor: "#fee2e2", color: "#b91c1c", borderRadius: "8px", marginBottom: "1rem" }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ padding: "1rem", backgroundColor: "#d1fae5", color: "#047857", borderRadius: "8px", marginBottom: "1rem" }}>
            Report submitted successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label className="section-label">Where is the issue?</label>
            <div className="location-input">
              <MapPin size={20} />
              <input
                type="text"
                placeholder="Enter location or area"
                value={formData.location.address}
                onChange={handleLocationChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <label className="section-label">Describe the problem</label>
            <textarea
              name="description"
              placeholder="Tell us what happened and how it is affecting your community..."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
            <p className="helper-text">Include as much detail as possible.</p>
          </div>

          <div className="submit-section">
            <div className="privacy-note">
              <AlertCircle size={17} />
              Your report will be reviewed before being shared publicly.
            </div>
            <button type="submit" className="submit-report-button" disabled={loading}>
              {loading ? "Submitting..." : "Submit Report"}
              {!loading && <Send size={18} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;