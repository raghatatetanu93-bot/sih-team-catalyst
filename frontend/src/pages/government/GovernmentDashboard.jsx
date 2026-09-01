import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  ArrowUpRight,
} from "lucide-react";

function GovernmentDashboard() {
  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">JHARKHAND GOVERNMENT</p>
          <h1>Command Dashboard</h1>
          <p className="subtitle">
            Understand problems, identify urgent cases, and track solutions.
          </p>
        </div>

        <div className="header-date">
          September 2026
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">
            <FileText size={20} />
          </div>
          <p>Total Reported</p>
          <h2>1,284</h2>
          <span>All citizen reports</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle size={20} />
          </div>
          <p>Validated</p>
          <h2>842</h2>
          <span>Government verified</span>
        </div>

        <div className="stat-card danger-card">
          <div className="stat-icon">
            <AlertTriangle size={20} />
          </div>
          <p>High Risk</p>
          <h2>37</h2>
          <span>Require urgent review</span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={20} />
          </div>
          <p>Unresolved</p>
          <h2>126</h2>
          <span>Currently active</span>
        </div>

      </div>

      {/* Main content */}
      <div className="dashboard-grid">

        {/* High Risk */}
        <section className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>High-Risk Alerts</h3>
              <p>Cases requiring immediate government review</p>
            </div>

            <button className="text-button">
              View all <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="alert-item">
            <div className="alert-icon">
              <AlertTriangle size={18} />
            </div>

            <div className="alert-content">
              <h4>Urban Flooding</h4>
              <p>Ranchi • 1,200 people potentially affected</p>
            </div>

            <span className="status high">HIGH RISK</span>
          </div>

          <div className="alert-item">
            <div className="alert-icon">
              <AlertTriangle size={18} />
            </div>

            <div className="alert-content">
              <h4>Water Supply Failure</h4>
              <p>Latehar • 840 people potentially affected</p>
            </div>

            <span className="status high">HIGH RISK</span>
          </div>

          <div className="alert-item">
            <div className="alert-icon">
              <AlertTriangle size={18} />
            </div>

            <div className="alert-content">
              <h4>Damaged Bridge</h4>
              <p>West Singhbhum • 560 people potentially affected</p>
            </div>

            <span className="status medium">REVIEW</span>
          </div>
        </section>

        {/* Categories */}
        <section className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Problem Categories</h3>
              <p>Reported problems by domain</p>
            </div>
          </div>

          <div className="category-list">

            <div className="category">
              <div>
                <span>Water</span>
                <strong>342</strong>
              </div>
              <div className="progress">
                <div style={{ width: "82%" }}></div>
              </div>
            </div>

            <div className="category">
              <div>
                <span>Infrastructure</span>
                <strong>286</strong>
              </div>
              <div className="progress">
                <div style={{ width: "68%" }}></div>
              </div>
            </div>

            <div className="category">
              <div>
                <span>Healthcare</span>
                <strong>214</strong>
              </div>
              <div className="progress">
                <div style={{ width: "52%" }}></div>
              </div>
            </div>

            <div className="category">
              <div>
                <span>Waste Management</span>
                <strong>176</strong>
              </div>
              <div className="progress">
                <div style={{ width: "42%" }}></div>
              </div>
            </div>

            <div className="category">
              <div>
                <span>Education</span>
                <strong>148</strong>
              </div>
              <div className="progress">
                <div style={{ width: "35%" }}></div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Systemic problems */}
      <section className="dashboard-card systemic-section">

        <div className="card-header">
          <div>
            <h3>Top Systemic Problems</h3>
            <p>
              Larger problems identified from multiple related citizen reports
            </p>
          </div>

          <button className="text-button">
            Explore clusters <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="systemic-grid">

          <div className="systemic-card">
            <span className="cluster-number">01</span>
            <h4>Rural Water Reliability</h4>
            <p>47 related reports • 12 locations</p>
            <strong>8,420 affected</strong>
          </div>

          <div className="systemic-card">
            <span className="cluster-number">02</span>
            <h4>Urban Flooding</h4>
            <p>31 related reports • 8 locations</p>
            <strong>5,240 affected</strong>
          </div>

          <div className="systemic-card">
            <span className="cluster-number">03</span>
            <h4>Rural Healthcare Access</h4>
            <p>24 related reports • 6 locations</p>
            <strong>3,180 affected</strong>
          </div>

        </div>

      </section>

    </div>
  );
}

export default GovernmentDashboard;