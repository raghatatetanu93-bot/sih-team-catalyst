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
  return (
    <div className="report-issue-page">

      {/* HEADER */}

      <div className="report-header">
        <button className="back-button">
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <div className="report-heading">
          <span>REPORT AN ISSUE</span>
          <h1>What's happening?</h1>
          <p>
            Tell us about the problem and we'll help connect it
            to the right authorities.
          </p>
        </div>
      </div>


      {/* FORM CONTAINER */}

      <div className="report-form-container">

        {/* PHOTO UPLOAD */}

        <div className="form-section">

          <label className="section-label">
            Add a photo
            <span>Optional</span>
          </label>

          <div className="photo-upload">

            <div className="upload-icon">
              <Camera size={28} />
            </div>

            <div>
              <strong>Upload a photo</strong>
              <p>
                A photo can help authorities understand the issue better.
              </p>
            </div>

            <button className="upload-button">
              <Upload size={17} />
              Choose Photo
            </button>

          </div>

        </div>


        {/* ISSUE CATEGORY */}

        <div className="form-section">

          <label className="section-label">
            What type of issue is this?
          </label>

          <div className="select-field">
            <span>Select a category</span>
            <ChevronDown size={19} />
          </div>

        </div>


        {/* LOCATION */}

        <div className="form-section">

          <label className="section-label">
            Where is the issue?
          </label>

          <div className="location-input">

            <MapPin size={20} />

            <input
              type="text"
              placeholder="Enter location or area"
            />

          </div>

          <button className="location-button">
            <MapPin size={16} />
            Use my current location
          </button>

        </div>


        {/* DESCRIPTION */}

        <div className="form-section">

          <label className="section-label">
            Describe the problem
          </label>

          <textarea
            placeholder="Tell us what happened and how it is affecting your community..."
          ></textarea>

          <p className="helper-text">
            Include as much detail as possible.
          </p>

        </div>


        {/* SEVERITY */}

        <div className="form-section">

          <label className="section-label">
            How urgent is this?
          </label>

          <div className="severity-options">

            <button className="severity low">
              <span></span>
              Low
            </button>

            <button className="severity medium">
              <span></span>
              Medium
            </button>

            <button className="severity high">
              <span></span>
              High
            </button>

          </div>

        </div>


        {/* SUBMIT */}

        <div className="submit-section">

          <div className="privacy-note">
            <AlertCircle size={17} />
            Your report will be reviewed before being shared publicly.
          </div>

          <button className="submit-report-button">
            Submit Report
            <Send size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default ReportIssue;