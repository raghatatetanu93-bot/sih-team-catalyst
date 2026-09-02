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
} from "lucide-react";

function Emergency() {
  const emergencyTypes = [
    {
      title: "Fire Emergency",
      description: "Fire, smoke or explosion",
      icon: Flame,
      type: "fire",
    },
    {
      title: "Medical Emergency",
      description: "Urgent medical assistance",
      icon: Ambulance,
      type: "medical",
    },
    {
      title: "Road Accident",
      description: "Accident requiring help",
      icon: Car,
      type: "accident",
    },
    {
      title: "Flood / Disaster",
      description: "Natural disaster emergency",
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

  const alerts = [
    {
      title: "Heavy rainfall warning",
      location: "Ranchi District",
      severity: "High",
    },
    {
      title: "Waterlogging reported",
      location: "Kanke Area",
      severity: "Moderate",
    },
  ];

  return (
    <div className="emergency-page">

      {/* HEADER */}

      <section className="emergency-header">

        <div>

          <span className="emergency-label">
            EMERGENCY ASSISTANCE
          </span>

          <h1>Need help right now?</h1>

          <p>
            Quickly report an emergency and help us connect
            the situation to the right authorities.
          </p>

        </div>

        <div className="emergency-header-icon">
          <Siren size={30} />
        </div>

      </section>


      {/* URGENT HERO */}

      <section className="emergency-hero">

        <div className="emergency-hero-content">

          <div className="urgent-badge">
            <AlertTriangle size={16} />
            Emergency situations require immediate attention
          </div>

          <h2>
            Report an emergency.
            <br />
            Get help faster.
          </h2>

          <p>
            Select the type of emergency below and provide
            the necessary details so the right authorities
            can respond quickly.
          </p>

        </div>

        <button className="emergency-main-button">

          <AlertTriangle size={20} />

          Report Emergency

          <ArrowRight size={18} />

        </button>

      </section>


      {/* EMERGENCY TYPES */}

      <section className="emergency-types-section">

        <div className="emergency-section-header">

          <div>

            <span>SELECT EMERGENCY TYPE</span>

            <h2>What is happening?</h2>

            <p>
              Choose the option that best describes your situation.
            </p>

          </div>

        </div>


        <div className="emergency-types-grid">

          {emergencyTypes.map((item) => {

            const Icon = item.icon;

            return (

              <button
                className={`emergency-type-card ${item.type}`}
                key={item.title}
              >

                <div className="emergency-type-icon">

                  <Icon size={25} />

                </div>

                <div>

                  <strong>{item.title}</strong>

                  <span>{item.description}</span>

                </div>

                <ArrowRight size={17} />

              </button>

            );

          })}

        </div>

      </section>


      {/* BOTTOM GRID */}

      <section className="emergency-bottom-grid">


        {/* CONTACTS */}

        <div className="emergency-contacts">

          <span className="section-small-label">
            QUICK CONTACTS
          </span>

          <h2>Emergency Numbers</h2>


          <div className="contact-row">

            <div className="contact-icon">
              <ShieldAlert size={19} />
            </div>

            <div>
              <strong>Police</strong>
              <span>100</span>
            </div>

            <Phone size={18} />

          </div>


          <div className="contact-row">

            <div className="contact-icon">
              <Ambulance size={19} />
            </div>

            <div>
              <strong>Ambulance</strong>
              <span>108</span>
            </div>

            <Phone size={18} />

          </div>


          <div className="contact-row">

            <div className="contact-icon">
              <Flame size={19} />
            </div>

            <div>
              <strong>Fire Service</strong>
              <span>101</span>
            </div>

            <Phone size={18} />

          </div>

        </div>


        {/* ACTIVE ALERTS */}

        <div className="nearby-alerts">

          <div className="alerts-heading">

            <div>

              <span className="section-small-label">
                NEARBY ALERTS
              </span>

              <h2>Active in your area</h2>

            </div>

            <AlertTriangle size={20} />

          </div>


          {alerts.map((alert, index) => (

            <div className="nearby-alert-card" key={index}>

              <div>

                <strong>{alert.title}</strong>

                <span>
                  <MapPin size={14} />
                  {alert.location}
                </span>

              </div>

              <span
                className={`severity ${alert.severity.toLowerCase()}`}
              >
                {alert.severity}
              </span>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Emergency;