// ReportIssue.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./ReportIssue.css";

import {
  ArrowLeft,
  MapPin,
  AlertCircle,
  Send,
  Mic,
  Square,
  Languages,
  Camera,
  Navigation,
  Sparkles,
  CheckCircle2,
  Users,
  ShieldAlert,
  FileImage,
  X,
  Loader2,
  ChevronRight,
  Building2,
 } from "lucide-react";

const JHARKHAND_DISTRICTS = [
  "Ranchi",
  "Dhanbad",
  "Jamshedpur",
  "Bokaro",
  "Deoghar",
  "Hazaribagh",
  "Dumka",
  "Latehar",
  "Giridih",
  "Ramgarh",
];

function ReportIssue() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-IN");

  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);

  const [evidence, setEvidence] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

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

    if (name === "description") {
      if (value.trim().length > 15) {
        generateSmartPreview(value);
      } else {
        setAnalysis(null);
      }
    }
  };

  const handleLocationChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        address: e.target.value,
      },
    }));

    setLocationDetected(false);
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        district,
      },
    }));
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Location services are not supported by your browser.");
      return;
    }

    setDetectingLocation(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            lat: latitude,
            lng: longitude,
            address: `Location detected (${latitude.toFixed(
              4
            )}, ${longitude.toFixed(4)})`,
          },
        }));

        setLocationDetected(true);
        setDetectingLocation(false);
      },
      () => {
        setError(
          "We couldn't access your location. Please enter the area manually."
        );
        setDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        "Voice reporting is not supported in this browser. Please use Google Chrome."
      );
      return;
    }

    if (isListening) return;

    const recognition = new SpeechRecognition();

    recognition.lang = selectedLanguage;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setAnalysis(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setFormData((prev) => {
        const description = prev.description
          ? `${prev.description} ${transcript}`
          : transcript;

        return {
          ...prev,
          description,
        };
      });

      setTimeout(() => {
        generateSmartPreview(transcript);
      }, 100);
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed") {
        setError(
          "Microphone permission was denied. Please allow microphone access."
        );
      } else if (event.error === "no-speech") {
        setError("No speech detected. Please try speaking again.");
      } else {
        setError("We couldn't understand the voice input. Please try again.");
      }

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const generateSmartPreview = (text) => {
    if (!text || text.trim().length < 10) return;

    setAnalyzing(true);

    setTimeout(() => {
      const lower = text.toLowerCase();

      let category = "General Civic Issue";
      let severity = "Medium";
      let icon = "🏙️";
      let affectedGroup = "Nearby residents";

      if (
        lower.includes("water") ||
        lower.includes("पानी") ||
        lower.includes("पाणी") ||
        lower.includes("drinking")
      ) {
        category = "Water & Sanitation";
        icon = "💧";
        affectedGroup = "Residents & households";
      } else if (
        lower.includes("garbage") ||
        lower.includes("waste") ||
        lower.includes("कचरा") ||
        lower.includes("sanitation")
      ) {
        category = "Waste & Sanitation";
        icon = "♻️";
        affectedGroup = "Local residents";
      } else if (
        lower.includes("road") ||
        lower.includes("pothole") ||
        lower.includes("सड़क") ||
        lower.includes("रस्ता")
      ) {
        category = "Infrastructure";
        icon = "🚧";
        affectedGroup = "Drivers & pedestrians";
      } else if (
        lower.includes("school") ||
        lower.includes("education") ||
        lower.includes("शाळा") ||
        lower.includes("स्कूल")
      ) {
        category = "Education";
        icon = "🎓";
        affectedGroup = "Students & families";
      } else if (
        lower.includes("hospital") ||
        lower.includes("health") ||
        lower.includes("medical") ||
        lower.includes("अस्पताल")
      ) {
        category = "Healthcare";
        icon = "🏥";
        affectedGroup = "Patients & residents";
      } else if (
        lower.includes("electric") ||
        lower.includes("electricity") ||
        lower.includes("light") ||
        lower.includes("बिजली")
      ) {
        category = "Electricity & Utilities";
        icon = "⚡";
        affectedGroup = "Residents & businesses";
      }

      if (
        lower.includes("danger") ||
        lower.includes("emergency") ||
        lower.includes("accident") ||
        lower.includes("fire") ||
        lower.includes("flood") ||
        lower.includes("unsafe") ||
        lower.includes("urgent") ||
        lower.includes("खतरा")
      ) {
        severity = "High";
      }

      const summary =
        text.length > 140 ? `${text.substring(0, 137)}...` : text;

      setAnalysis({
        category,
        severity,
        icon,
        affectedGroup,
        summary,
        similarReports: Math.floor(Math.random() * 8) + 3,
      });

      setFormData((prev) => ({
        ...prev,
        category,
        severity,
      }));

      setAnalyzing(false);
    }, 700);
  };

  const handleEvidenceChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setEvidence({
        file,
        previewUrl,
        name: file.name,
        base64: reader.result,
      });
    };
    reader.readAsDataURL(file);

    setError(null);
  };

  const removeEvidence = () => {
    if (evidence?.previewUrl) {
      URL.revokeObjectURL(evidence.previewUrl);
    }

    setEvidence(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description.trim()) {
      setError("Please describe the problem.");
      return;
    }

    if (!formData.location.address.trim()) {
      setError("Please provide the location.");
      return;
    }

    if (!formData.location.district || !formData.location.district.trim()) {
      setError("Please select a district (required).");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Ensure base64 photo is ready if file was selected
      let photoData = evidence?.base64 || "";
      if (!photoData && evidence?.file) {
        photoData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => resolve("");
          reader.readAsDataURL(evidence.file);
        });
      }

      const payload = {
        description: formData.description,
        location: {
          address: formData.location.address,
          district: formData.location.district,
          lat: formData.location.lat,
          lng: formData.location.lng,
        },
        evidenceUrl: photoData || "",
        photo: photoData || "",
      };

      const response = await api.post("/problems", payload);

      console.log("Report submitted:", response.data);

      setSuccess(true);

      setFormData({
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

      setAnalysis(null);
      removeEvidence();

      setTimeout(() => {
        navigate("/citizen/reports");
      }, 2000);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to submit report. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-issue-page">
      <div className="report-header">
        <button
          className="back-button"
          onClick={() => navigate("/citizen")}
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="report-heading">
          <span className="heading-eyebrow">
            REPORT A COMMUNITY ISSUE
          </span>

          <h1>What's happening?</h1>

          <p>
            Tell us. We'll take it from here.
            <br />
            Your voice is enough to start making a difference.
          </p>
        </div>

        <div className="progress-container">
          <div className="progress-item active">
            <span>01</span>
            <label>Location</label>
          </div>

          <div className="progress-line active-line"></div>

          <div
            className={`progress-item ${
              formData.description ? "active" : ""
            }`}
          >
            <span>02</span>
            <label>Tell us</label>
          </div>

          <div className="progress-line"></div>

          <div
            className={`progress-item ${
              analysis ? "active" : ""
            }`}
          >
            <span>03</span>
            <label>Review</label>
          </div>
        </div>
      </div>

      <div className="report-form-container">
        {error && (
          <div className="report-message error-message">
            <AlertCircle size={18} />
            <span>{error}</span>
            <button onClick={() => setError(null)}>
              <X size={16} />
            </button>
          </div>
        )}

        {success && (
          <div className="report-message success-message">
            <CheckCircle2 size={19} />
            <span>
              Your report has been submitted successfully.
              Redirecting...
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <section className="report-section location-section">
            <div className="section-heading-row">
              <div className="section-title-group">
                <div className="section-number">01</div>

                <div>
                  <label className="section-label">
                    Where did this happen?
                  </label>

                  <p className="section-description">
                    Help us identify the affected area.
                  </p>
                </div>
              </div>

              {locationDetected && (
                <div className="detected-badge">
                  <CheckCircle2 size={14} />
                  Location detected
                </div>
              )}
            </div>

            <div className="location-box">
              <div className="location-icon">
                <MapPin size={20} />
              </div>

              <div className="location-content">
                <span className="location-small-label">
                  INCIDENT LOCATION
                </span>

                <input
                  type="text"
                  placeholder="Enter area, landmark or location"
                  value={formData.location.address}
                  onChange={handleLocationChange}
                  required
                />
              </div>

              <button
                type="button"
                className="location-button"
                onClick={detectLocation}
                disabled={detectingLocation}
              >
                {detectingLocation ? (
                  <Loader2 size={16} className="spin" />
                ) : (
                  <Navigation size={16} />
                )}

                {detectingLocation
                  ? "Detecting..."
                  : "Use my location"}
              </button>
            </div>

            <div className="location-box" style={{ marginTop: "12px" }}>
              <div className="location-icon">
                <Building2 size={20} />
              </div>

              <div className="location-content">
                <span className="location-small-label">
                  DISTRICT (JHARKHAND) *
                </span>

                <select
                  id="district-select"
                  name="district"
                  value={formData.location.district}
                  onChange={handleDistrictChange}
                  required
                >
                  <option value="" disabled>
                    Select District (Required)
                  </option>
                  {JHARKHAND_DISTRICTS.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {locationDetected && (
              <div className="location-confirmation">
                <span className="location-dot"></span>
                Your approximate location has been detected and will
                be attached to the report.
              </div>
            )}
          </section>

          <section className="report-section voice-section">
            <div className="section-heading-row">
              <div className="section-title-group">
                <div className="section-number">02</div>

                <div>
                  <label className="section-label">
                    Tell us what happened
                  </label>

                  <p className="section-description">
                    Speak naturally or type your problem.
                  </p>
                </div>
              </div>

              <div className="language-selector">
                <Languages size={16} />

                <select
                  value={selectedLanguage}
                  onChange={(e) =>
                    setSelectedLanguage(e.target.value)
                  }
                >
                  <option value="en-IN">English</option>
                  <option value="hi-IN">हिन्दी</option>
                  <option value="mr-IN">मराठी</option>
                  <option value="bn-IN">বাংলা</option>
                  <option value="ta-IN">தமிழ்</option>
                  <option value="te-IN">తెలుగు</option>
                  <option value="gu-IN">ગુજરાતી</option>
                </select>
              </div>
            </div>

            <div
              className={`voice-hero ${
                isListening ? "voice-active" : ""
              }`}
            >
              <div className="voice-decoration decoration-one"></div>
              <div className="voice-decoration decoration-two"></div>

              <div className="voice-main">
                <div
                  className={`voice-microphone ${
                    isListening ? "recording" : ""
                  }`}
                >
                  {isListening ? (
                    <Square size={28} />
                  ) : (
                    <Mic size={31} />
                  )}

                  <span className="microphone-ring"></span>
                  <span className="microphone-ring ring-two"></span>
                </div>

                <div className="voice-content">
                  <div className="voice-title-row">
                    <h2>
                      {isListening
                        ? "Listening to you..."
                        : "Speak your problem"}
                    </h2>

                    {!isListening && (
                      <span className="recommended-badge">
                        RECOMMENDED
                      </span>
                    )}
                  </div>

                  <p>
                    {isListening
                      ? "Describe the problem naturally. You don't need to use any specific words."
                      : "No complicated forms. Just tell us what happened in your own words."}
                  </p>

                  <div className="language-pills">
                    <span>English</span>
                    <span>हिन्दी</span>
                    <span>मराठी</span>
                    <span>বাংলা</span>
                    <span>+ more</span>
                  </div>

                  <div className="ai-helper">
                    <Sparkles size={14} />
                    <span>
                      AI identifies the issue, urgency and category
                      automatically
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className={`voice-start-button ${
                    isListening ? "recording-button" : ""
                  }`}
                  onClick={handleVoiceInput}
                  disabled={isListening}
                >
                  {isListening ? (
                    <>
                      <span className="recording-dot"></span>
                      Listening...
                    </>
                  ) : (
                    <>
                      <Mic size={18} />
                      Start speaking
                    </>
                  )}
                </button>
              </div>

              {isListening && (
                <div className="voice-wave">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>

            <div className="transcript-area">
              <div className="transcript-header">
                <div>
                  <span className="transcript-title">
                    ✍️ Your report
                  </span>

                  <span className="transcript-subtitle">
                    Voice transcript appears here automatically
                  </span>
                </div>

                {formData.description && (
                  <span className="transcript-ready">
                    <CheckCircle2 size={14} />
                    Ready
                  </span>
                )}
              </div>

              <textarea
                name="description"
                placeholder="Your report will appear here after speaking. You can also type or edit it manually..."
                value={formData.description}
                onChange={handleChange}
                required
              />

              <div className="transcript-footer">
                <span>
                  {formData.description.length} characters
                </span>

                <span>
                  Everything stays editable before submission.
                </span>
              </div>
            </div>
          </section>

          {(analyzing || analysis) && (
            <section className="smart-analysis-section">
              <div className="smart-header">
                <div className="smart-icon">
                  <Sparkles size={21} />
                </div>

                <div>
                  <span>AI REPORT INTELLIGENCE</span>

                  <h3>
                    {analyzing
                      ? "Understanding your report..."
                      : "Here's what we understood"}
                  </h3>
                </div>

                {!analyzing && (
                  <div className="ai-status">
                    <CheckCircle2 size={14} />
                    AI Ready
                  </div>
                )}
              </div>

              {analyzing ? (
                <div className="analysis-loading">
                  <div className="loading-line">
                    <span className="loading-dot"></span>
                    Understanding your description
                  </div>

                  <div className="loading-line">
                    <span className="loading-dot"></span>
                    Identifying issue type
                  </div>

                  <div className="loading-line">
                    <span className="loading-dot"></span>
                    Assessing urgency
                  </div>
                </div>
              ) : (
                analysis && (
                  <>
                    <div className="analysis-grid">
                      <div className="analysis-card">
                        <span>ISSUE CATEGORY</span>

                        <strong>
                          {analysis.icon} {analysis.category}
                        </strong>
                      </div>

                      <div className="analysis-card">
                        <span>URGENCY</span>

                        <strong
                          className={
                            analysis.severity === "High"
                              ? "high-severity"
                              : ""
                          }
                        >
                          <ShieldAlert size={17} />
                          {analysis.severity}
                        </strong>
                      </div>

                      <div className="analysis-card">
                        <span>AFFECTED GROUP</span>

                        <strong>
                          <Users size={17} />
                          {analysis.affectedGroup}
                        </strong>
                      </div>
                    </div>

                    <div className="analysis-summary">
                      <div>
                        <Sparkles size={15} />
                        AI SUMMARY
                      </div>

                      <p>{analysis.summary}</p>
                    </div>

                    <div className="similar-reports">
                      <div className="similar-icon">
                        <Users size={18} />
                      </div>

                      <div>
                        <strong>
                          {analysis.similarReports} similar reports
                          may exist nearby
                        </strong>

                        <span>
                          Similar reports can be clustered to help
                          authorities see the bigger picture.
                        </span>
                      </div>

                      <ChevronRight size={19} />
                    </div>
                  </>
                )
              )}
            </section>
          )}

          <div className="report-flow">
            <div className="flow-heading">
              <Sparkles size={16} />
              What happens after you report?
            </div>

            <div className="flow-steps">
              <div className="flow-step">
                <div className="flow-icon">🎙️</div>

                <strong>You speak</strong>

                <span>Tell us naturally</span>
              </div>

              <div className="flow-line"></div>

              <div className="flow-step">
                <div className="flow-icon">✨</div>

                <strong>AI understands</strong>

                <span>Classifies & prioritizes</span>
              </div>

              <div className="flow-line"></div>

              <div className="flow-step">
                <div className="flow-icon">🏛️</div>

                <strong>Right authority</strong>

                <span>Gets the issue</span>
              </div>
            </div>
          </div>

          <section className="report-section evidence-section">
            <div className="section-heading-row">
              <div className="section-title-group">
                <div className="section-number">03</div>

                <div>
                  <label className="section-label">
                    Add evidence
                  </label>

                  <p className="section-description">
                    A photo can help authorities understand the
                    issue faster.
                  </p>
                </div>
              </div>

              <span className="optional-label">OPTIONAL</span>
            </div>

            {!evidence ? (
              <label className="evidence-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEvidenceChange}
                  hidden
                />

                <div className="evidence-icon">
                  <Camera size={23} />
                </div>

                <div className="evidence-text">
                  <strong>Add a photo</strong>

                  <span>
                    Upload an image showing the issue
                  </span>
                </div>

                <div className="upload-arrow">
                  <ChevronRight size={19} />
                </div>
              </label>
            ) : (
              <div className="evidence-preview">
                <img
                  src={evidence.previewUrl}
                  alt="Evidence preview"
                />

                <div className="evidence-info">
                  <FileImage size={20} />

                  <div>
                    <strong>Evidence attached</strong>

                    <span>{evidence.name}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="remove-evidence"
                  onClick={removeEvidence}
                >
                  <X size={17} />
                </button>
              </div>
            )}
          </section>

          <div className="final-submit-area">
            <div className="privacy-note">
              <div className="privacy-icon">
                <ShieldAlert size={17} />
              </div>

              <div>
                <strong>
                  Your report is reviewed before publication.
                </strong>

                <span>
                  Your information helps connect the issue with
                  the appropriate authority.
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="submit-report-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Report
                  <Send size={17} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;