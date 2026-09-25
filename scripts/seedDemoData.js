const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const User = require('../src/models/User');
const University = require('../src/models/University');
const Problem = require('../src/models/Problem');
const Project = require('../src/models/Project');
const Milestone = require('../src/models/Milestone');
const IndustryPartner = require('../src/models/IndustryPartner');
const Cluster = require('../src/models/Cluster');

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI is missing from environment.');
  process.exit(1);
}

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for Demo Seeding.');

    // 1. Ensure Universities exist
    const universitiesData = [
      {
        name: 'Birla Institute of Technology, Mesra',
        district: 'Ranchi',
        expertise: ['Water & Sanitation', 'Infrastructure', 'Environment'],
        contactEmail: 'rnd@bitmesra.ac.in',
        activeProjectsCount: 1,
      },
      {
        name: 'IIT (ISM) Dhanbad',
        district: 'Dhanbad',
        expertise: ['Environment', 'Infrastructure', 'Healthcare'],
        contactEmail: 'research@iitism.ac.in',
        activeProjectsCount: 1,
      },
      {
        name: 'NIT Jamshedpur',
        district: 'East Singhbhum',
        expertise: ['Education', 'Infrastructure'],
        contactEmail: 'projects@nitjsr.ac.in',
        activeProjectsCount: 0,
      },
      {
        name: 'Vinoba Bhave University',
        district: 'Hazaribagh',
        expertise: ['Healthcare', 'Education', 'Environment'],
        contactEmail: 'innovation@vbu.ac.in',
        activeProjectsCount: 1,
      },
      {
        name: 'Bokaro Steel City Technology Institute',
        district: 'Bokaro',
        expertise: ['Water & Sanitation', 'Environment'],
        contactEmail: 'solutions@bsti.edu.in',
        activeProjectsCount: 0,
      },
    ];

    const universities = [];
    for (const u of universitiesData) {
      let uni = await University.findOne({ name: u.name });
      if (!uni) {
        uni = await University.create(u);
      }
      universities.push(uni);
    }
    console.log(`Universities verified: ${universities.length}`);

    // 2. Ensure Demo Users exist
    const defaultPasswordHash = await bcrypt.hash('Password123!', 10);
    const usersData = [
      { name: 'Aarav Sharma', email: 'citizen@solvesphere.gov', password: defaultPasswordHash, role: 'Citizen' },
      { name: 'Dr. Rameshwar Oraon', email: 'officer@jharkhand.gov.in', password: defaultPasswordHash, role: 'Government' },
      { name: 'Prof. Alok Verma', email: 'dean@bitmesra.ac.in', password: defaultPasswordHash, role: 'University' },
      { name: 'Vikram Mehta', email: 'csr@tatasteel.com', password: defaultPasswordHash, role: 'Industry' },
    ];

    for (const u of usersData) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
      }
    }
    console.log('Demo Users verified.');

    // 3. Clear previously seeded demo problems and related projects idempotently
    const demoProblemIds = await Problem.find({ problemId: { $regex: '^DEMO-PRB-' } }).select('_id');
    const demoMongoIds = demoProblemIds.map((p) => p._id);

    if (demoMongoIds.length > 0) {
      const demoProjects = await Project.find({ problemId: { $in: demoMongoIds } }).select('_id');
      const demoProjIds = demoProjects.map((p) => p._id);

      await Milestone.deleteMany({ projectId: { $in: demoProjIds } });
      await Project.deleteMany({ _id: { $in: demoProjIds } });
      await Problem.deleteMany({ _id: { $in: demoMongoIds } });
      console.log(`Cleaned up ${demoMongoIds.length} previous demo problems and associated projects.`);
    }

    // 4. Seed 10 realistic problems across 5 districts (leaving Deoghar, Dumka, Giridih open for live submissions)
    const uniMap = {
      Ranchi: universities.find((u) => u.district === 'Ranchi'),
      Dhanbad: universities.find((u) => u.district === 'Dhanbad'),
      'East Singhbhum': universities.find((u) => u.district === 'East Singhbhum'),
      Hazaribagh: universities.find((u) => u.district === 'Hazaribagh'),
      Bokaro: universities.find((u) => u.district === 'Bokaro'),
    };

    const problemsData = [
      {
        problemId: 'DEMO-PRB-101',
        title: 'Severe Pipeline Leakage & Contamination in Doranda Ward 14',
        description: 'Potable water pipeline rupture has caused sewage seepage into the main drinking distribution grid, affecting residential blocks across Doranda.',
        category: 'Water & Sanitation',
        location: {
          address: 'Main Road, Doranda, Ranchi, Jharkhand',
          district: 'Ranchi',
          lat: 23.3441,
          lng: 85.3096,
        },
        evidenceUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        severity: 'Critical',
        urgency: 'High',
        affectedPopulation: 18500,
        priorityScore: 92,
        emergencyStatus: true,
        governmentStatus: 'Validated',
        assignedUniversity: uniMap['Ranchi']?._id,
      },
      {
        problemId: 'DEMO-PRB-102',
        title: 'Structural Cracking on Culvert Bridge Near Namkum Junction',
        description: 'Heavy monsoonal runoff has washed away foundation soil under the culvert bridge on Ring Road, leading to severe load hazard for freight transit.',
        category: 'Infrastructure',
        location: {
          address: 'Namkum Bypass, Ranchi, Jharkhand',
          district: 'Ranchi',
          lat: 23.3315,
          lng: 85.3621,
        },
        evidenceUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
        severity: 'High',
        urgency: 'High',
        affectedPopulation: 12000,
        priorityScore: 78,
        emergencyStatus: false,
        governmentStatus: 'Reported',
      },
      {
        problemId: 'DEMO-PRB-103',
        title: 'Toxic Coal Dust & Particulate Spikes in Jharia Colliery Zone',
        description: 'Open-cast mine overburden dust clouds routinely elevate PM2.5 levels beyond safe limits, aggravating respiratory distress in surrounding settlements.',
        category: 'Environment',
        location: {
          address: 'Jharia Coalfield Sector 4, Dhanbad, Jharkhand',
          district: 'Dhanbad',
          lat: 23.742,
          lng: 86.4162,
        },
        evidenceUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
        severity: 'Critical',
        urgency: 'Critical',
        affectedPopulation: 42000,
        priorityScore: 96,
        emergencyStatus: true,
        governmentStatus: 'Validated',
        assignedUniversity: uniMap['Dhanbad']?._id,
      },
      {
        problemId: 'DEMO-PRB-104',
        title: 'Unsegregated Medical Waste Storage Near Katras Sub-Hospital',
        description: 'Biomedical sharps and discarded hazardous material accumulate on perimeter soil adjacent to public access pathways without incineration facilities.',
        category: 'Healthcare',
        location: {
          address: 'Katras Hospital Link Road, Dhanbad, Jharkhand',
          district: 'Dhanbad',
          lat: 23.8055,
          lng: 86.2954,
        },
        evidenceUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        severity: 'High',
        urgency: 'Medium',
        affectedPopulation: 8500,
        priorityScore: 74,
        emergencyStatus: false,
        governmentStatus: 'Reported',
      },
      {
        problemId: 'DEMO-PRB-105',
        title: 'Digital Connectivity Blackout Across Tribal Secondary Schools',
        description: 'Lack of local server caching and intermittent cellular backhaul leaves 14 government schools without access to digital curricula and STEM portals.',
        category: 'Education',
        location: {
          address: 'Potka Block Rural Campus, East Singhbhum, Jharkhand',
          district: 'East Singhbhum',
          lat: 22.6146,
          lng: 86.2229,
        },
        evidenceUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
        severity: 'Medium',
        urgency: 'Medium',
        affectedPopulation: 6400,
        priorityScore: 65,
        emergencyStatus: false,
        governmentStatus: 'Validated',
        assignedUniversity: uniMap['East Singhbhum']?._id,
      },
      {
        problemId: 'DEMO-PRB-106',
        title: 'Subernarekha River Embankment Erosion at Mango Bridge Ramp',
        description: 'Erosion of stone pitching along the bridge approach threatened flood embankment integrity. Reconstructed with geotextile lining and gabion walls.',
        category: 'Infrastructure',
        location: {
          address: 'Old Purulia Road, Mango, Jamshedpur, East Singhbhum, Jharkhand',
          district: 'East Singhbhum',
          lat: 22.8183,
          lng: 86.2088,
        },
        evidenceUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80',
        severity: 'High',
        urgency: 'High',
        affectedPopulation: 15000,
        priorityScore: 82,
        emergencyStatus: false,
        governmentStatus: 'Resolved',
      },
      {
        problemId: 'DEMO-PRB-107',
        title: 'Fly Ash Silo Dust Overspill Infiltrating Sector 9 Borewells',
        description: 'Uncovered fly ash disposal conveyor near industrial boundaries resulted in heavy mineral sedimentation in municipal aquifer supply wells.',
        category: 'Water & Sanitation',
        location: {
          address: 'Sector 9 Industrial Fringe, Bokaro Steel City, Bokaro, Jharkhand',
          district: 'Bokaro',
          lat: 23.6693,
          lng: 86.1511,
        },
        evidenceUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        severity: 'Critical',
        urgency: 'High',
        affectedPopulation: 21000,
        priorityScore: 89,
        emergencyStatus: true,
        governmentStatus: 'Validated',
        assignedUniversity: uniMap['Bokaro']?._id,
      },
      {
        problemId: 'DEMO-PRB-108',
        title: 'Unauthorized Chemical Effluent Discharge into Garga River Canal',
        description: 'Treated effluent overflow from small-scale dyeing units has altered stream pH, killing riparian fauna and disrupting downstream domestic usage.',
        category: 'Environment',
        location: {
          address: 'Chas Municipal Basin, Bokaro, Jharkhand',
          district: 'Bokaro',
          lat: 23.6421,
          lng: 86.134,
        },
        evidenceUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
        severity: 'Medium',
        urgency: 'Medium',
        affectedPopulation: 9200,
        priorityScore: 68,
        emergencyStatus: false,
        governmentStatus: 'Reported',
      },
      {
        problemId: 'DEMO-PRB-109',
        title: 'Rural Primary Health Clinic Grid Failures Endangering Vaccine Storage',
        description: 'Repeated 12-hour feeder outages at Ichak sub-center compromise thermal limits of solar refrigerators storing polio and infant immunization batches.',
        category: 'Healthcare',
        location: {
          address: 'Ichak Community Health Center, Hazaribagh, Jharkhand',
          district: 'Hazaribagh',
          lat: 23.9937,
          lng: 85.3647,
        },
        evidenceUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
        severity: 'High',
        urgency: 'High',
        affectedPopulation: 14000,
        priorityScore: 85,
        emergencyStatus: false,
        governmentStatus: 'Validated',
        assignedUniversity: uniMap['Hazaribagh']?._id,
      },
      {
        problemId: 'DEMO-PRB-110',
        title: 'Collapsed Compound Perimeter & Roof Leaks at Katkamsandi Girls High School',
        description: 'Storm damage caused collapse of school perimeter wall and classroom ceiling dampness. Fully refurbished with state development grants.',
        category: 'Education',
        location: {
          address: 'Katkamsandi Rural Block, Hazaribagh, Jharkhand',
          district: 'Hazaribagh',
          lat: 24.0682,
          lng: 85.2341,
        },
        evidenceUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
        severity: 'Medium',
        urgency: 'Low',
        affectedPopulation: 1200,
        priorityScore: 55,
        emergencyStatus: false,
        governmentStatus: 'Resolved',
      },
    ];

    const insertedProblems = await Problem.insertMany(problemsData);
    console.log(`Inserted ${insertedProblems.length} realistic problems across 5 districts.`);

    // 5. Seed 3 Matching University Projects with Milestones
    const prbRanchiWater = insertedProblems.find((p) => p.problemId === 'DEMO-PRB-101');
    const prbDhanbadEnv = insertedProblems.find((p) => p.problemId === 'DEMO-PRB-103');
    const prbHazaribaghHealth = insertedProblems.find((p) => p.problemId === 'DEMO-PRB-109');

    // Project 1: Smart Water Grid
    const proj1 = await Project.create({
      problemId: prbRanchiWater._id,
      universityId: uniMap['Ranchi']._id,
      title: 'IoT-Enabled Smart Water Pipeline Leakage Detector',
      proposalDescription: 'Deployment of acoustic ultrasonic sensor nodes integrated with LoRaWAN wireless backhaul for real-time localization of municipal pipe leakages.',
      facultyMentor: 'Dr. Anand Kumar (Dept of Electronics, BIT Mesra)',
      studentTeam: ['Rohan Roy', 'Priya Murmu', 'Aniket Das', 'Shreya Sengupta'],
      status: 'Approved',
    });

    await Milestone.insertMany([
      {
        projectId: proj1._id,
        title: 'Sensor Hardware Prototyping & Flow Calibration',
        status: 'Completed',
        targetDate: new Date('2026-08-15'),
        completionNotes: 'Lab testing confirmed 98.4% detection accuracy for pressure drops under simulated municipal pressure.',
      },
      {
        projectId: proj1._id,
        title: 'Doranda Municipal Ward Pilot Installation',
        status: 'In Progress',
        targetDate: new Date('2026-10-30'),
        completionNotes: 'First 25 IoT nodes installed along Main Road junction.',
      },
      {
        projectId: proj1._id,
        title: 'SCADA Telemetry & Municipal Dashboard Integration',
        status: 'Pending',
        targetDate: new Date('2026-12-15'),
      },
    ]);

    // Project 2: Air Quality Dust Mesh
    const proj2 = await Project.create({
      problemId: prbDhanbadEnv._id,
      universityId: uniMap['Dhanbad']._id,
      title: 'Continuous Coal Dust Particulate Monitoring & Electrostatic Mesh',
      proposalDescription: 'Solar-powered ambient dust particulate telemetry grid with active electrostatic precipitator screens positioned around vulnerable perimeter schools.',
      facultyMentor: 'Prof. Subhashish Bhattacharya (IIT ISM Dhanbad)',
      studentTeam: ['Kunal Singh', 'Neha Agarwal', 'Arjun Soren'],
      status: 'Funded',
    });

    await Milestone.insertMany([
      {
        projectId: proj2._id,
        title: 'Optical Particulate Sensor Array Calibration',
        status: 'Completed',
        targetDate: new Date('2026-07-20'),
        completionNotes: 'Field calibrated against central pollution control board standards.',
      },
      {
        projectId: proj2._id,
        title: 'Micro-Grid Solar Backup Deployment at Colliery School 4',
        status: 'Completed',
        targetDate: new Date('2026-09-01'),
        completionNotes: 'Autonomous power station commissioned.',
      },
      {
        projectId: proj2._id,
        title: 'Pilot Electrostatic Dust Barrier Field Trial',
        status: 'In Progress',
        targetDate: new Date('2026-11-20'),
      },
    ]);

    // Project 3: Solar Vaccine Cooler
    const proj3 = await Project.create({
      problemId: prbHazaribaghHealth._id,
      universityId: uniMap['Hazaribagh']._id,
      title: 'Hybrid Solar Cold-Chain Vaccine & Medication Storage Unit',
      proposalDescription: 'Phase-change material thermal cooling unit powered by dual solar PV panels with 72-hour thermal holdover for rural primary health dispensaries.',
      facultyMentor: 'Dr. Meenakshi Kumari (Vinoba Bhave University)',
      studentTeam: ['Divya Tiwari', 'Md. Zeeshan', 'Rahul Mahato'],
      status: 'Submitted',
    });

    await Milestone.insertMany([
      {
        projectId: proj3._id,
        title: 'PCM Thermal Storage Laboratory Validation',
        status: 'Completed',
        targetDate: new Date('2026-08-10'),
        completionNotes: 'Maintained 2°C to 8°C cold chain without electricity for 74 consecutive hours.',
      },
      {
        projectId: proj3._id,
        title: 'Primary Health Clinic Field Pilot in Ichak Block',
        status: 'Pending',
        targetDate: new Date('2026-11-15'),
      },
    ]);

    console.log('Seeded 3 Projects with multi-stage Milestones.');

    // 6. Ensure Industry Partners exist
    const partnersData = [
      {
        companyName: 'Tata Steel CSR Foundation',
        sector: 'Civic Infrastructure & Healthcare',
        csrFocusAreas: ['Clean Water', 'Rural Education', 'Public Health'],
        contactEmail: 'csr@tatasteel.com',
        committedFunding: 2500000,
      },
      {
        companyName: 'Coal India Environmental Trust',
        sector: 'Environment & Renewable Energy',
        csrFocusAreas: ['Air Quality', 'Afforestation', 'Mine Safety'],
        contactEmail: 'csr@coalindia.in',
        committedFunding: 1800000,
      },
      {
        companyName: 'Adani Renewables Social Impact',
        sector: 'Renewable Power & Tech',
        csrFocusAreas: ['Solar Health Facilities', 'Digital Literacy'],
        contactEmail: 'impact@adani.com',
        committedFunding: 1200000,
      },
    ];

    for (const p of partnersData) {
      const exists = await IndustryPartner.findOne({ companyName: p.companyName });
      if (!exists) {
        await IndustryPartner.create(p);
      }
    }
    console.log('Verified Industry Partners.');

    console.log('\n======================================================');
    console.log('DEMO DATA SEEDING COMPLETE!');
    console.log('Districts seeded: Ranchi, Dhanbad, East Singhbhum, Bokaro, Hazaribagh');
    console.log('Districts left OPEN for live demo submission: Deoghar, Dumka, Giridih');
    console.log('Problems created: 10 (4 Reported, 4 Validated, 2 Resolved; 3 Emergency alerts)');
    console.log('Projects created: 3 (with Completed, In Progress, and Pending milestones)');
    console.log('======================================================\n');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
