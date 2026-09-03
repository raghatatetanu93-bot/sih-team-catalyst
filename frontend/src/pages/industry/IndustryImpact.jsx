import {
  Users,
  CheckCircle,
  DollarSign,
  Building2,
  Briefcase,
  Leaf,
  Heart,
  Cpu,
} from "lucide-react";

import "./IndustryImpact.css";

function IndustryImpact() {
  return (
    <div className="industry-impact-container">
      <div className="impact-header">
        <h1>Impact Dashboard</h1>
        <p>
          Measuring the social and economic impact of your industry participation
          in societal innovation.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="impact-stats-grid">
        <div className="impact-stat-card">
          <div className="impact-stat-icon blue">
            <Briefcase size={24} />
          </div>
          <h2>14</h2>
          <p>Projects Supported</p>
        </div>

        <div className="impact-stat-card">
          <div className="impact-stat-icon green">
            <DollarSign size={24} />
          </div>
          <h2>₹4.5 Cr</h2>
          <p>Funding Invested</p>
        </div>

        <div className="impact-stat-card">
          <div className="impact-stat-icon purple">
            <Users size={24} />
          </div>
          <h2>1.2L+</h2>
          <p>Citizens Impacted</p>
        </div>

        <div className="impact-stat-card">
          <div className="impact-stat-icon amber">
            <CheckCircle size={24} />
          </div>
          <h2>6</h2>
          <p>Solutions Deployed</p>
        </div>

        <div className="impact-stat-card">
          <div className="impact-stat-icon teal">
            <Building2 size={24} />
          </div>
          <h2>5</h2>
          <p>Universities Partnered</p>
        </div>

        <div className="impact-stat-card">
          <div className="impact-stat-icon rose">
            <Leaf size={24} />
          </div>
          <h2>3</h2>
          <p>Environment Projects</p>
        </div>
      </div>

      {/* Impact Areas */}
      <div className="impact-areas-grid">
        <div className="impact-area-card">
          <h3>
            <Heart size={20} color="#e11d48" /> Social Impact
          </h3>
          <div className="impact-area-list">
            <div className="impact-area-item">
              <span>Citizens Benefited</span>
              <span>1,20,000+</span>
            </div>
            <div className="impact-area-item">
              <span>Villages Reached</span>
              <span>42</span>
            </div>
            <div className="impact-area-item">
              <span>Schools Equipped</span>
              <span>18</span>
            </div>
          </div>
        </div>

        <div className="impact-area-card">
          <h3>
            <DollarSign size={20} color="#16a34a" /> Economic Impact
          </h3>
          <div className="impact-area-list">
            <div className="impact-area-item">
              <span>Cost Savings Generated</span>
              <span>₹2.1 Cr</span>
            </div>
            <div className="impact-area-item">
              <span>Jobs Created</span>
              <span>85</span>
            </div>
            <div className="impact-area-item">
              <span>Revenue for Local SMEs</span>
              <span>₹45L</span>
            </div>
          </div>
        </div>

        <div className="impact-area-card">
          <h3>
            <Leaf size={20} color="#0d9488" /> Environmental Impact
          </h3>
          <div className="impact-area-list">
            <div className="impact-area-item">
              <span>Water Saved</span>
              <span>25% reduction</span>
            </div>
            <div className="impact-area-item">
              <span>Carbon Offset</span>
              <span>12 tonnes/yr</span>
            </div>
            <div className="impact-area-item">
              <span>Solar Units Deployed</span>
              <span>50</span>
            </div>
          </div>
        </div>

        <div className="impact-area-card">
          <h3>
            <Cpu size={20} color="#7c3aed" /> Technology Innovation
          </h3>
          <div className="impact-area-list">
            <div className="impact-area-item">
              <span>Prototypes Funded</span>
              <span>9</span>
            </div>
            <div className="impact-area-item">
              <span>Patents Supported</span>
              <span>3</span>
            </div>
            <div className="impact-area-item">
              <span>Tech Transfers</span>
              <span>4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Outcomes & Before/After */}
      <div className="impact-panels">
        <div className="impact-panel">
          <h3>Project Outcomes</h3>

          <div className="outcome-card">
            <h4>Smart Water Monitoring System</h4>
            <p className="outcome-contribution">
              Contribution: IoT sensors & technical infrastructure
            </p>
            <div className="outcome-metrics">
              <span className="outcome-metric">25% less wastage</span>
              <span className="outcome-metric">15 villages</span>
              <span className="outcome-metric">18,000 citizens</span>
            </div>
          </div>

          <div className="outcome-card">
            <h4>Rural Education Tablet Program</h4>
            <p className="outcome-contribution">
              Contribution: ₹25L manufacturing funding
            </p>
            <div className="outcome-metrics">
              <span className="outcome-metric">500 tablets deployed</span>
              <span className="outcome-metric">18 schools</span>
              <span className="outcome-metric">8,000 students</span>
            </div>
          </div>

          <div className="outcome-card">
            <h4>Solar Water Purification</h4>
            <p className="outcome-contribution">
              Contribution: Infrastructure & deployment support
            </p>
            <div className="outcome-metrics">
              <span className="outcome-metric">50 units installed</span>
              <span className="outcome-metric">10,000 benefited</span>
              <span className="outcome-metric">30% cost reduction</span>
            </div>
          </div>
        </div>

        <div className="impact-panel">
          <h3>Before vs After</h3>

          <div className="comparison-card">
            <h4>Water Distribution — Ranchi</h4>
            <div className="comparison-row">
              <div className="comparison-before">
                <span className="comparison-label">Before</span>
                Manual monitoring, 40% distribution loss
              </div>
              <div className="comparison-after">
                <span className="comparison-label">After</span>
                Real-time IoT monitoring, 15% loss reduced
              </div>
            </div>
          </div>

          <div className="comparison-card">
            <h4>Rural Education — Gumla</h4>
            <div className="comparison-row">
              <div className="comparison-before">
                <span className="comparison-label">Before</span>
                No digital access, textbook-only learning
              </div>
              <div className="comparison-after">
                <span className="comparison-label">After</span>
                Offline tablets with interactive content
              </div>
            </div>
          </div>

          <div className="comparison-card">
            <h4>Traffic Management — Dhanbad</h4>
            <div className="comparison-row">
              <div className="comparison-before">
                <span className="comparison-label">Before</span>
                Fixed signal timings, 35 min avg. delay
              </div>
              <div className="comparison-after">
                <span className="comparison-label">After</span>
                AI-optimized timing, 12 min avg. delay
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndustryImpact;
