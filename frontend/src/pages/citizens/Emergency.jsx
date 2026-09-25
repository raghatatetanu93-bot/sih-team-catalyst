import { useState } from "react";
import "./Emergency.css";

import {
  AlertTriangle,
  Flame,
  Ambulance,
  Car,
  Droplets,
  ShieldAlert,
  Phone,
  MapPin,
  ArrowRight,
  Siren,
  Navigation,
  CheckCircle2,
  Clock3,
  Users,
  Radio,
  Info,
  X,
} from "lucide-react";

function Emergency() {
  const emergencyTypes = [
    {
      title: "Fire",
      description: "Fire, smoke or explosion",
      icon: Flame,
      type: "fire",
    },
    {
      title: "Medical",
      description: "Medical help required",
      icon: Ambulance,
      type: "medical",
    },
    {
      title: "Road Accident",
      description: "Crash or road emergency",
      icon: Car,
      type: "accident",
    },
    {
      title: "Flood / Disaster",
      description: "Flood, storm or disaster",
      icon: Droplets,
      type: "disaster",
    },
    {
      title: "Safety Threat",
      description: "Immediate danger or threat",
      icon: ShieldAlert,
      type: "safety",
    },
  ];

  const contacts = [
    {
      name: "Emergency",
      number: "112",
      description: "Police • Fire • Medical",
      icon: Siren,
    },
    {
      name: "Ambulance",
      number: "108",
      description: "Medical emergency",
      icon: Ambulance,
    },
    {
      name: "Fire Service",
      number: "101",
      description: "Fire & rescue",
      icon: Flame,
    },
    {
      name: "Police",
      number: "100",
      description: "Police assistance",
      icon: ShieldAlert,
    },
  ];

  const alerts = [
    {
      title: "Heavy rainfall warning",
      location: "Ranchi District",
      time: "12 min ago",
      severity: "High",
    },
    {
      title: "Waterlogging reported",
      location: "Kanke Area",
      time: "28 min ago",
      severity: "Moderate",
    },
    {
      title: "Traffic disruption",
      location: "Main Road",
      time: "41 min ago",
      severity: "Low",
    },
  ];

  const [selectedType, setSelectedType] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [locating, setLocating] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const chooseEmergency = (item) => {
    setSelectedType(item);

    setTimeout(() => {
      document
        .getElementById("emergency-report")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const detectLocation = () => {
    setLocating(true);

    if (!navigator.geolocation) {
      setLocation("Location detection is not supported on this device");
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `Current location detected (${position.coords.latitude.toFixed(
            4
          )}, ${position.coords.longitude.toFixed(4)})`
        );
        setLocating(false);
      },
      () => {
        setLocation("Unable to detect location. Please enter it manually.");
        setLocating(false);
      }
    );
  };

  const submitEmergency = (e) => {
    e.preventDefault();

    if (!selectedType || !location || !description) return;

    setSubmitted(true);
  };

  const resetReport = () => {
    setSubmitted(false);
    setSelectedType(null);
    setLocation("");
    setDescription("");
  };

  return (
    <div className="emergency-page">

      {/* HERO */}
      <section className="emergency-hero-new">
        <div className="hero-left">
          <div className="live-pill">
            <span className="live-dot"></span>
            EMERGENCY RESPONSE CENTER
          </div>

          <h1>
            Need help?
            <br />
            <span>Report it instantly.</span>
          </h1>

          <p>
            Report emergencies in your area and provide responders with
            the information they need to act quickly.
          </p>

          <div className="hero-actions">
            <button
              className="hero-primary-btn"
              onClick={() => {
                document
                  .getElementById("emergency-types")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Siren size={21} />
              Report an Emergency
              <ArrowRight size={19} />
            </button>

            <a href="tel:112" className="hero-call-btn">
              <Phone size={20} />
              Call 112
            </a>
          </div>

          <div className="hero-trust">
            <div>
              <CheckCircle2 size={18} />
              <span>Fast reporting</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Location enabled</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Authority routing</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="emergency-orb">
            <div className="orb-ring ring-one"></div>
            <div className="orb-ring ring-two"></div>

            <div className="orb-center">
              <Siren size={48} />
            </div>
          </div>

          <div className="response-card">
            <div className="response-icon">
              <Radio size={21} />
            </div>

            <div>
              <strong>Emergency network active</strong>
              <span>Reports are being monitored</span>
            </div>

            <span className="active-dot"></span>
          </div>
        </div>
      </section>

      {/* EMERGENCY TYPES */}
      <section className="emergency-section" id="emergency-types">
        <div className="section-heading">
          <div>
            <span className="section-kicker">STEP 01</span>
            <h2>What happened?</h2>
            <p>
              Select the emergency that best describes the situation.
            </p>
          </div>

          <div className="section-count">
            <strong>5</strong>
            <span>Emergency types</span>
          </div>
        </div>

        <div className="emergency-types-grid">
          {emergencyTypes.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedType?.type === item.type;

            return (
              <button
                key={item.type}
                onClick={() => chooseEmergency(item)}
                className={`emergency-type-card ${item.type} ${
                  isSelected ? "selected" : ""
                }`}
              >
                <div className="type-icon">
                  <Icon size={27} strokeWidth={2} />
                </div>

                <div className="type-content">
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>

                <div className="type-arrow">
                  <ArrowRight size={18} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* REPORT FORM */}
      <section className="report-section" id="emergency-report">
        <div className="report-header">
          <div>
            <span className="section-kicker">STEP 02</span>
            <h2>Tell us where and what happened</h2>
            <p>
              Give responders enough information to understand the situation.
            </p>
          </div>

          <div className="step-badge">2 / 3</div>
        </div>

        {!selectedType ? (
          <div className="select-first-box">
            <div className="select-first-icon">
              <AlertTriangle size={30} />
            </div>

            <h3>Select an emergency type first</h3>

            <p>
              Choose Fire, Medical, Accident, Disaster or Safety Threat
              above to continue.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("emergency-types")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Choose emergency type
              <ArrowRight size={18} />
            </button>
          </div>
        ) : submitted ? (
          <div className="success-box">
            <div className="success-icon">
              <CheckCircle2 size={44} />
            </div>

            <span className="success-label">REPORT RECEIVED</span>

            <h3>Your emergency report has been submitted.</h3>

            <p>
              Your report has been recorded with the emergency type,
              location and details you provided.
            </p>

            <div className="success-details">
              <div>
                <span>Emergency</span>
                <strong>{selectedType.title}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{location}</strong>
              </div>
            </div>

            <button className="new-report-btn" onClick={resetReport}>
              Report another emergency
            </button>
          </div>
        ) : (
          <form className="emergency-form" onSubmit={submitEmergency}>
            <div className="selected-emergency">
              <div className={`selected-icon ${selectedType.type}`}>
  {(() => {
    const Icon = selectedType.icon;
    return <Icon size={25} />;
  })()}
</div>

              <div>
                <span>SELECTED EMERGENCY</span>
                <strong>{selectedType.title}</strong>
              </div>

              <button
                type="button"
                onClick={() => setSelectedType(null)}
              >
                <X size={17} />
                Change
              </button>
            </div>

            <div className="form-group">
              <label>
                <MapPin size={18} />
                Emergency location
              </label>

              <div className="location-input">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter the location where help is needed"
                />

                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={locating}
                >
                  <Navigation size={17} />
                  {locating ? "Detecting..." : "Use my location"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>
                <Info size={18} />
                What is happening?
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what is happening, how many people are affected, and any important details..."
                rows="6"
              />

              <span className="character-hint">
                Provide clear and useful information for responders.
              </span>
            </div>

            <div className="important-note">
              <AlertTriangle size={20} />

              <div>
                <strong>Important</strong>
                <span>
                  If there is immediate danger to life, call emergency
                  services directly instead of waiting for a report response.
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="submit-emergency-btn"
              disabled={!location || !description}
            >
              <Siren size={21} />
              Submit Emergency Report
              <ArrowRight size={20} />
            </button>
          </form>
        )}
      </section>

      {/* QUICK CONTACTS + ALERTS */}
      <section className="bottom-section">

        <div className="contacts-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">NEED HELP NOW?</span>
              <h2>Emergency numbers</h2>
              <p>Tap a number to call emergency services directly.</p>
            </div>

            <div className="panel-icon">
              <Phone size={22} />
            </div>
          </div>

          <div className="contacts-grid">
            {contacts.map((contact) => {
              const Icon = contact.icon;

              return (
                <a
                  href={`tel:${contact.number}`}
                  className="contact-card"
                  key={contact.number}
                >
                  <div className="contact-card-icon">
                    <Icon size={22} />
                  </div>

                  <div className="contact-info">
                    <span>{contact.name}</span>
                    <strong>{contact.number}</strong>
                    <small>{contact.description}</small>
                  </div>

                  <Phone size={19} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="alerts-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">LIVE UPDATES</span>
              <h2>Nearby alerts</h2>
              <p>Recent emergency-related reports.</p>
            </div>

            <div className="live-status">
              <span></span>
              LIVE
            </div>
          </div>

          <div className="alerts-list">
            {alerts.map((alert) => (
              <div className="alert-item" key={alert.title}>
                <div className="alert-status"></div>

                <div className="alert-content">
                  <strong>{alert.title}</strong>

                  <span>
                    <MapPin size={14} />
                    {alert.location}
                  </span>

                  <small>
                    <Clock3 size={13} />
                    {alert.time}
                  </small>
                </div>

                <span
                  className={`alert-severity ${alert.severity.toLowerCase()}`}
                >
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY INFO */}
      <section className="safety-section">
        <div className="safety-icon">
          <ShieldAlert size={27} />
        </div>

        <div className="safety-content">
          <span className="section-kicker">STAY SAFE</span>
          <h2>In a life-threatening situation, call first.</h2>
          <p>
            The emergency reporting system helps authorities understand
            incidents, but it should not replace a direct emergency call
            when someone is in immediate danger.
          </p>
        </div>

        <a href="tel:112" className="safety-call">
          <Phone size={19} />
          Call 112
        </a>
      </section>

      {/* FOOTER STATS */}
      <section className="emergency-stats">
        <div className="stat-item">
          <div className="stat-icon">
            <Clock3 size={22} />
          </div>
          <div>
            <strong>Fast reporting</strong>
            <span>Submit incidents in seconds</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">
            <MapPin size={22} />
          </div>
          <div>
            <strong>Location aware</strong>
            <span>Help responders find the incident</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">
            <Users size={22} />
          </div>
          <div>
            <strong>Community focused</strong>
            <span>Keep your area informed</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Emergency;