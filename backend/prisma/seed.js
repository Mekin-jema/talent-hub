const { PrismaClient, Role, ApplicationStatus } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");
 // Delete in proper order to avoid foreign key errors
await prisma.application.deleteMany({});
await prisma.skill.deleteMany({});
await prisma.job.deleteMany({});
await prisma.user.deleteMany({});


  // Hash passwords
  const passwordEmployer = await bcrypt.hash("employer123", 10);
  const passwordDev1 = await bcrypt.hash("dev123", 10);
  const passwordDev2 = await bcrypt.hash("dev456", 10);
  const passwordDev3 = await bcrypt.hash("dev789", 10);

  // Create Users
  const employer = await prisma.user.create({
    data: {
      email: "employer@company.com",
      password: passwordEmployer,
      fullName: "Alice Employer",
      role: Role.EMPLOYER,
    },
  });

  const dev1 = await prisma.user.create({
    data: {
      email: "dev1@example.com",
      password: passwordDev1,
      fullName: "Bob Developer",
      role: Role.DEVELOPER,
    },
  });

  const dev2 = await prisma.user.create({
    data: {
      email: "dev2@example.com",
      password: passwordDev2,
      fullName: "Charlie Developer",
      role: Role.DEVELOPER,
    },
  });

  const dev3 = await prisma.user.create({
    data: {
      email: "dev3@example.com",
      password: passwordDev3,
      fullName: "Diana Developer",
      role: Role.DEVELOPER,
    },
  });

  // Job Data (20+ jobs with details)
  const jobsData = [
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-uxui-000001",
    "title": "UX/UI Designer",
    "type": "Full-time",
    "description": "We are looking for a talented UX/UI designer to create beautiful and intuitive user experiences for our digital products.",
    "requirements": [
      "3+ years of experience in UX/UI design",
      "Proficiency in Figma, Adobe XD, or Sketch",
      "Strong portfolio showcasing design process"
    ],
    "responsibilities": [
      "Design wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with product managers and developers"
    ],
    "location": "Remote",
    "aboutCompany": "PixelPerfect is a product design studio that partners with startups and enterprises to build user-centric applications.",
    "logo": "https://picsum.photos/seed/uxui/100",
    "salary": "3200-4800 USD",
    "category": "Design",
    "featured": true,
    "skills": ["Figma", "User Research", "Wireframing", "Prototyping"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-devops-000002",
    "title": "DevOps Engineer",
    "type": "Full-time",
    "description": "Seeking a DevOps engineer to automate and streamline our operations and processes, building and maintaining our CI/CD pipelines.",
    "requirements": [
      "Experience with AWS, Azure, or GCP",
      "Proficiency in Docker, Kubernetes, and Terraform",
      "Strong background in Linux/Unix administration"
    ],
    "responsibilities": [
      "Build, maintain, and scale our infrastructure",
      "Manage CI/CD deployment pipelines",
      "Ensure system security and reliability"
    ],
    "location": "Lagos, Nigeria",
    "aboutCompany": "CloudForge provides robust and scalable cloud infrastructure solutions for African tech companies.",
    "logo": "https://picsum.photos/seed/devops/100",
    "salary": "4000-6000 USD",
    "category": "IT & Operations",
    "featured": true,
    "skills": ["AWS", "Kubernetes", "Docker", "CI/CD"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-mkt-000003",
    "title": "Marketing Manager",
    "type": "Full-time",
    "description": "We need a strategic Marketing Manager to develop and execute marketing campaigns that drive growth and brand awareness.",
    "requirements": [
      "5+ years of experience in marketing",
      "Proven track record in developing successful marketing strategies",
      "Experience with digital marketing channels"
    ],
    "responsibilities": [
      "Develop and implement the marketing strategy",
      "Manage marketing budget and ROI analysis",
      "Lead a team of marketing specialists"
    ],
    "location": "Nairobi, Kenya",
    "aboutCompany": "GrowthLabs is a dynamic marketing consultancy helping businesses scale across East Africa.",
    "logo": "https://picsum.photos/seed/marketing/100",
    "salary": "2500-4000 USD",
    "category": "Marketing",
    "featured": false,
    "skills": ["Digital Strategy", "Brand Management", "SEO", "Analytics"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-flutter-000004",
    "title": "Mobile App Developer (Flutter)",
    "type": "Full-time",
    "description": "Join our team to build cross-platform mobile applications using Flutter for a global user base.",
    "requirements": [
      "2+ years of experience with Flutter/Dart",
      "Experience with native iOS/Android is a plus",
      "Understanding of RESTful APIs and state management"
    ],
    "responsibilities": [
      "Develop, test, and maintain mobile applications",
      "Collaborate with backend teams on API design",
      "Publish applications to Apple App Store and Google Play"
    ],
    "location": "Cairo, Egypt",
    "aboutCompany": "AppVenture creates innovative mobile apps that solve everyday problems for millions of users.",
    "logo": "https://picsum.photos/seed/flutter/100",
    "salary": "2200-3500 USD",
    "category": "Software Development",
    "featured": true,
    "skills": ["Flutter", "Dart", "Firebase", "REST APIs"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-hr-000005",
    "title": "Human Resources Specialist",
    "type": "Full-time",
    "description": "Looking for an HR Specialist to manage our recruitment, employee relations, and performance management processes.",
    "requirements": [
      "Bachelor's degree in Human Resources or related field",
      "3+ years of experience in HR",
      "Knowledge of labor laws and HR best practices"
    ],
    "responsibilities": [
      "Manage full-cycle recruitment process",
      "Onboard new employees and organize training",
      "Address employee queries and issues"
    ],
    "location": "Johannesburg, South Africa",
    "aboutCompany": "PeopleFirst is a tech company focused on building HR software, and we practice what we preach with a great internal culture.",
    "logo": "https://picsum.photos/seed/hr/100",
    "salary": "1800-2800 USD",
    "category": "Human Resources",
    "featured": false,
    "skills": ["Recruitment", "Employee Relations", "Onboarding", "HR Policies"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-cyber-000006",
    "title": "Cybersecurity Analyst",
    "type": "Full-time",
    "description": "Help protect our company and client data from cyber threats by monitoring, detecting, and investigating security incidents.",
    "requirements": [
      "Experience with SIEM tools (e.g., Splunk, QRadar)",
      "Knowledge of network protocols and security architecture",
      "Relevant certifications (e.g., Security+, CISSP) a plus"
    ],
    "responsibilities": [
      "Monitor security access and perform security assessments",
      "Investigate security breaches and other cybersecurity incidents",
      "Implement and maintain security controls"
    ],
    "location": "Remote",
    "aboutCompany": "SecuriCore provides cutting-edge cybersecurity solutions for financial institutions.",
    "logo": "https://picsum.photos/seed/cyber/100",
    "salary": "4500-6500 USD",
    "category": "IT & Security",
    "featured": true,
    "skills": ["SIEM", "Network Security", "Incident Response", "Threat Analysis"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-content-000007",
    "title": "Content Writer",
    "type": "Part-time",
    "description": "We are seeking a creative Content Writer to produce engaging blog posts, articles, and social media content.",
    "requirements": [
      "2+ years of experience in content writing",
      "Excellent writing and editing skills in English",
      "Ability to research and understand complex topics"
    ],
    "responsibilities": [
      "Write clear and compelling marketing copy",
      "Research industry-related topics",
      "Proofread and edit content before publication"
    ],
    "location": "Remote",
    "aboutCompany": "ContentKing is a boutique content agency focused on SEO-driven content for B2B tech clients.",
    "logo": "https://picsum.photos/seed/content/100",
    "salary": "15-25 USD per hour",
    "category": "Marketing",
    "featured": false,
    "skills": ["Content Writing", "SEO", "Copywriting", "Blogging"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-pm-000008",
    "title": "Project Manager",
    "type": "Full-time",
    "description": "Experienced Project Manager needed to lead cross-functional teams and ensure projects are delivered on time and within budget.",
    "requirements": [
      "PMP or similar certification preferred",
      "5+ years of project management experience",
      "Strong familiarity with project management software (Jira, Asana)"
    ],
    "responsibilities": [
      "Define project scope, goals, and deliverables",
      "Develop project plans and track performance",
      "Manage project budget and resource allocation"
    ],
    "location": "Kigali, Rwanda",
    "aboutCompany": "BuildRight Consulting manages large-scale infrastructure and technology projects across Africa.",
    "logo": "https://picsum.photos/seed/pm/100",
    "salary": "3000-4500 USD",
    "category": "Management",
    "featured": true,
    "skills": ["Agile", "Scrum", "Jira", "Budget Management"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-sales-000009",
    "title": "Sales Representative",
    "type": "Full-time",
    "description": "Dynamic Sales Representative wanted to generate leads, close deals, and build long-term client relationships.",
    "requirements": [
      "Proven experience in sales",
      "Excellent communication and negotiation skills",
      "Self-motivated and results-driven"
    ],
    "responsibilities": [
      "Contact potential clients and present our products",
      "Achieve monthly sales targets",
      "Maintain customer records in CRM software"
    ],
    "location": "Dar es Salaam, Tanzania",
    "aboutCompany": "SalesForce Africa is a leader in providing CRM solutions to businesses across the continent.",
    "logo": "https://picsum.photos/seed/sales/100",
    "salary": "Base + Commission (OTE 2000-4000 USD)",
    "category": "Sales",
    "featured": false,
    "skills": ["Negotiation", "CRM", "Lead Generation", "Customer Relations"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-prod-000010",
    "title": "Product Manager",
    "type": "Full-time",
    "description": "Lead the strategy, roadmap, and execution for a key product line, working with engineering, design, and marketing.",
    "requirements": [
      "3+ years of experience in product management",
      "Strong analytical and problem-solving skills",
      "Technical background is a plus"
    ],
    "responsibilities": [
      "Define product vision and create roadmaps",
      "Gather and prioritize product requirements",
      "Work with engineering to deliver products to market"
    ],
    "location": "San Francisco, USA (Remote Possible)",
    "aboutCompany": "NextGen Products is a startup incubator building the next wave of SaaS products.",
    "logo": "https://picsum.photos/seed/product/100",
    "salary": "6000-8500 USD",
    "category": "Product",
    "featured": true,
    "skills": ["Product Strategy", "Roadmapping", "User Stories", "Agile"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-fin-000011",
    "title": "Financial Analyst",
    "type": "Full-time",
    "description": "Analyze financial data and create models to support business decisions, budgeting, and forecasting.",
    "requirements": [
      "Bachelor's degree in Finance, Economics, or related field",
      "2+ years of experience in financial analysis",
      "Advanced Excel and financial modeling skills"
    ],
    "responsibilities": [
      "Prepare financial reports and forecasts",
      "Analyze industry trends and performance metrics",
      "Support the budgeting process"
    ],
    "location": "London, UK",
    "aboutCompany": "Capital Insight is a financial consulting firm serving international clients.",
    "logo": "https://picsum.photos/seed/finance/100",
    "salary": "4000-5500 GBP",
    "category": "Finance",
    "featured": false,
    "skills": ["Financial Modeling", "Excel", "Data Analysis", "Forecasting"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-support-000012",
    "title": "Customer Support Specialist",
    "type": "Full-time",
    "description": "Provide exceptional support to our customers via email, chat, and phone, helping them resolve issues and questions.",
    "requirements": [
      "Excellent communication and problem-solving skills",
      "Patience and empathy when dealing with customers",
      "Experience with CRM software (e.g., Zendesk)"
    ],
    "responsibilities": [
      "Respond to customer inquiries in a timely manner",
      "Document customer interactions and feedback",
      "Escalate complex issues to technical teams"
    ],
    "location": "Remote",
    "aboutCompany": "SupportHero offers outsourced customer support for fast-growing tech companies.",
    "logo": "https://picsum.photos/seed/support/100",
    "salary": "1200-1800 USD",
    "category": "Customer Service",
    "featured": false,
    "skills": ["Customer Service", "Zendesk", "Communication", "Problem Solving"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-qa-000013",
    "title": "QA Engineer",
    "type": "Full-time",
    "description": "Ensure the quality of our software products by designing and executing test plans and identifying bugs.",
    "requirements": [
      "2+ years of experience in software QA",
      "Experience with manual and automated testing",
      "Knowledge of Selenium or Cypress is a plus"
    ],
    "responsibilities": [
      "Develop test plans and test cases",
      "Perform manual and automated testing",
      "Report bugs and work with developers to resolve them"
    ],
    "location": "Warsaw, Poland",
    "aboutCompany": "QualityQuest is a software testing lab that ensures applications are bug-free before launch.",
    "logo": "https://picsum.photos/seed/qa/100",
    "salary": "2500-3800 USD",
    "category": "Software Development",
    "featured": false,
    "skills": ["Manual Testing", "Automated Testing", "Selenium", "Test Cases"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-graphic-000014",
    "title": "Graphic Designer",
    "type": "Contract",
    "description": "Create visual concepts to communicate ideas that inspire, inform, and captivate consumers for various marketing materials.",
    "requirements": [
      "Proficiency in Adobe Creative Suite (Illustrator, Photoshop, InDesign)",
      "Strong portfolio demonstrating design skills",
      "Ability to work on multiple projects"
    ],
    "responsibilities": [
      "Design logos, brochures, ads, and social media graphics",
      "Collaborate with the marketing team on design concepts",
      "Prepare rough drafts and present ideas"
    ],
    "location": "Accra, Ghana",
    "aboutCompany": "CreativeMinds is a branding agency helping African businesses tell their stories through design.",
    "logo": "https://picsum.photos/seed/graphic/100",
    "salary": "Project-based (e.g., $1000-$3000 per month)",
    "category": "Design",
    "featured": false,
    "skills": ["Adobe Illustrator", "Photoshop", "Branding", "Visual Design"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-network-000015",
    "title": "Network Administrator",
    "type": "Full-time",
    "description": "Maintain and manage our company's computer networks, ensuring smooth and secure operation.",
    "requirements": [
      "3+ years of network administration experience",
      "Knowledge of LAN/WAN, VPN, and network security",
      "Relevant certifications (CCNA, CompTIA Network+) a plus"
    ],
    "responsibilities": [
      "Install and configure network equipment",
      "Monitor network performance and troubleshoot issues",
      "Implement network security measures"
    ],
    "location": "Abuja, Nigeria",
    "aboutCompany": "NetLink Solutions provides IT infrastructure and support for corporate clients.",
    "logo": "https://picsum.photos/seed/network/100",
    "salary": "2000-3200 USD",
    "category": "IT & Operations",
    "featured": false,
    "skills": ["Cisco", "LAN/WAN", "Network Security", "Troubleshooting"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-bizdev-000016",
    "title": "Business Development Manager",
    "type": "Full-time",
    "description": "Identify new business opportunities, build partnerships, and drive growth strategies for the company.",
    "requirements": [
      "Proven track record in business development or sales",
      "Strong negotiation and relationship-building skills",
      "Strategic thinker with analytical skills"
    ],
    "responsibilities": [
      "Research and identify new market opportunities",
      "Develop and negotiate partnership agreements",
      "Build and maintain relationships with key stakeholders"
    ],
    "location": "Dubai, UAE",
    "aboutCompany": "ExpandGlobal helps companies enter and grow in new markets across the Middle East and Africa.",
    "logo": "https://picsum.photos/seed/businessdev/100",
    "salary": "3500-5000 USD + Commission",
    "category": "Business Development",
    "featured": true,
    "skills": ["Partnerships", "Negotiation", "Market Research", "Strategy"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-legal-000017",
    "title": "Legal Counsel",
    "type": "Full-time",
    "description": "Provide legal advice and support on a wide range of issues including contracts, compliance, and corporate law.",
    "requirements": [
      "Law degree and license to practice",
      "3+ years of experience in corporate law",
      "Strong analytical and communication skills"
    ],
    "responsibilities": [
      "Draft and review legal documents and contracts",
      "Advise management on legal rights and obligations",
      "Ensure compliance with laws and regulations"
    ],
    "location": "Nairobi, Kenya",
    "aboutCompany": "LawTrust Advocates is a full-service corporate law firm.",
    "logo": "https://picsum.photos/seed/legal/100",
    "salary": "4000-6000 USD",
    "category": "Legal",
    "featured": false,
    "skills": ["Corporate Law", "Contract Negotiation", "Compliance", "Legal Research"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-devops-000018",
    "title": "DevOps Engineer",
    "type": "Full-time",
    "description": "Seeking a DevOps engineer to automate and streamline our operations and processes, building and maintaining our CI/CD pipelines.",
    "requirements": [
      "Experience with AWS, Azure, or GCP",
      "Proficiency in Docker, Kubernetes, and Terraform",
      "Strong background in Linux/Unix administration"
    ],
    "responsibilities": [
      "Build, maintain, and scale our infrastructure",
      "Manage CI/CD deployment pipelines",
      "Ensure system security and reliability"
    ],
    "location": "Lagos, Nigeria",
    "aboutCompany": "CloudForge provides robust and scalable cloud infrastructure solutions for African tech companies.",
    "logo": "https://picsum.photos/seed/devops2/100",
    "salary": "4000-6000 USD",
    "category": "IT & Operations",
    "featured": true,
    "skills": ["AWS", "Kubernetes", "Docker", "CI/CD"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-digmkt-000019",
    "title": "Digital Marketing Specialist",
    "type": "Full-time",
    "description": "Manage and execute digital marketing campaigns across PPC, SEO, and social media to drive traffic and conversions.",
    "requirements": [
      "2+ years of experience in digital marketing",
      "Hands-on experience with Google Ads and Facebook Ads Manager",
      "Analytical mindset with experience in Google Analytics"
    ],
    "responsibilities": [
      "Plan and execute digital marketing campaigns",
      "Analyze campaign performance and optimize for ROI",
      "Manage marketing budget allocation"
    ],
    "location": "Remote",
    "aboutCompany": "ClickGuru is a performance marketing agency focused on data-driven results.",
    "logo": "https://picsum.photos/seed/digitalm/100",
    "salary": "1800-2800 USD",
    "category": "Marketing",
    "featured": false,
    "skills": ["Google Ads", "SEO", "Facebook Ads", "Google Analytics"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-ai-000020",
    "title": "Research Scientist (AI)",
    "type": "Full-time",
    "description": "Conduct cutting-edge research in machine learning and artificial intelligence to solve complex problems.",
    "requirements": [
      "PhD or Master's in Computer Science, AI, or related field",
      "Strong publication record in top AI conferences",
      "Experience with PyTorch/TensorFlow and deep learning"
    ],
    "responsibilities": [
      "Research and develop novel AI algorithms",
      "Publish findings in top-tier conferences and journals",
      "Collaborate with engineering teams to implement research"
    ],
    "location": "Toronto, Canada",
    "aboutCompany": "AI Frontiers Lab is a research institution dedicated to advancing the field of artificial intelligence.",
    "logo": "https://picsum.photos/seed/ai/100",
    "salary": "7000-9500 USD",
    "category": "Research",
    "featured": true,
    "skills": ["Machine Learning", "Python", "PyTorch", "Research"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-log-000021",
    "title": "Logistics Coordinator",
    "type": "Full-time",
    "description": "Coordinate and oversee the supply chain operations, including transportation, warehousing, and inventory management.",
    "requirements": [
      "Experience in logistics or supply chain management",
      "Strong organizational and planning skills",
      "Knowledge of logistics software"
    ],
    "responsibilities": [
      "Plan and track the shipment of goods",
      "Coordinate with warehouses and transportation companies",
      "Manage inventory levels and orders"
    ],
    "location": "Mombasa, Kenya",
    "aboutCompany": "CargoLink is a logistics and freight forwarding company serving East Africa.",
    "logo": "https://picsum.photos/seed/logistics/100",
    "salary": "1500-2300 USD",
    "category": "Logistics",
    "featured": false,
    "skills": ["Supply Chain", "Inventory Management", "Planning", "Coordination"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-fullstack-000022",
    "title": "Full Stack Developer",
    "type": "Full-time",
    "description": "Develop end-to-end web applications, working on both the frontend and backend to deliver seamless user experiences.",
    "requirements": [
      "3+ years of experience with JavaScript (React/Node.js)",
      "Experience with databases (SQL or NoSQL)",
      "Familiarity with cloud services and DevOps practices"
    ],
    "responsibilities": [
      "Design and implement features on the frontend and backend",
      "Write reusable and testable code",
      "Participate in code reviews and architecture decisions"
    ],
    "location": "Remote",
    "aboutCompany": "StackBuilders is a software consultancy that builds custom web applications for clients worldwide.",
    "logo": "https://picsum.photos/seed/fullstack/100",
    "salary": "4500-6500 USD",
    "category": "Software Development",
    "featured": true,
    "skills": ["React", "Node.js", "PostgreSQL", "AWS"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-nurse-000023",
    "title": "Nurse",
    "type": "Full-time",
    "description": "Provide direct patient care, administer medications, and collaborate with doctors to ensure the best patient outcomes.",
    "requirements": [
      "Bachelor's degree in Nursing",
      "Valid nursing license",
      "Compassionate and patient-focused"
    ],
    "responsibilities": [
      "Assess patient health problems and needs",
      "Administer medications and treatments",
      "Educate patients and families about health conditions"
    ],
    "location": "Cape Town, South Africa",
    "aboutCompany": "CityMed Hospital is a leading private healthcare provider offering comprehensive medical services.",
    "logo": "https://picsum.photos/seed/nurse/100",
    "salary": "1800-2600 USD",
    "category": "Healthcare",
    "featured": false,
    "skills": ["Patient Care", "Medication Administration", "Emergency Care", "Empathy"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-agro-000024",
    "title": "Agronomist",
    "type": "Full-time",
    "description": "We are seeking an Agronomist to provide expertise in crop production and sustainable farming practices.",
    "requirements": [
      "Bachelor’s degree in Agronomy or related field",
      "Experience in soil and crop management",
      "Knowledge of modern agricultural technologies"
    ],
    "responsibilities": [
      "Advise farmers on crop management",
      "Conduct field trials and experiments",
      "Analyze soil and crop samples"
    ],
    "location": "Bahir Dar, Ethiopia",
    "aboutCompany": "AgriTech Solutions supports farmers with modern tools and practices.",
    "logo": "https://example.com/logo-agri.png",
    "salary": "1200-2000 USD",
    "category": "Agriculture",
    "featured": false,
    "skills": ["Crop Science", "Soil Analysis", "Irrigation Management"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-mech-000025",
    "title": "Mechanical Engineer",
    "type": "Full-time",
    "description": "Looking for a Mechanical Engineer to design and develop mechanical systems and oversee manufacturing processes.",
    "requirements": [
      "Bachelor’s degree in Mechanical Engineering",
      "3+ years experience in design and manufacturing",
      "Proficiency with CAD software"
    ],
    "responsibilities": [
      "Design and test mechanical components",
      "Oversee production processes",
      "Collaborate with cross-functional teams"
    ],
    "location": "Addis Ababa, Ethiopia",
    "aboutCompany": "MekinaTech specializes in automotive and industrial machinery.",
    "logo": "https://example.com/logo-mech.png",
    "salary": "2500-4000 USD",
    "category": "Engineering",
    "featured": true,
    "skills": ["CAD", "Thermodynamics", "SolidWorks"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-video-000026",
    "title": "Video Editor",
    "type": "Contract",
    "description": "Creative Video Editor needed to produce engaging content for marketing and social platforms.",
    "requirements": [
      "Proficiency in Adobe Premiere Pro & After Effects",
      "Strong storytelling skills",
      "Attention to detail"
    ],
    "responsibilities": [
      "Edit raw footage into final deliverables",
      "Add visual effects and transitions",
      "Collaborate with creative team"
    ],
    "location": "Remote",
    "aboutCompany": "VisionMedia creates digital content for global audiences.",
    "logo": "https://example.com/logo-video.png",
    "salary": "1000-2000 USD",
    "category": "Media & Entertainment",
    "featured": false,
    "skills": ["Video Editing", "Motion Graphics", "Storytelling"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-arch-000027",
    "title": "Architect",
    "type": "Full-time",
    "description": "We are hiring an Architect to design innovative residential and commercial spaces.",
    "requirements": [
      "Bachelor’s degree in Architecture",
      "Proficiency with AutoCAD and Revit",
      "Creative design portfolio"
    ],
    "responsibilities": [
      "Design building layouts and blueprints",
      "Collaborate with engineers and clients",
      "Ensure compliance with safety codes"
    ],
    "location": "Addis Ababa, Ethiopia",
    "aboutCompany": "UrbanBuild is a modern architecture and construction firm.",
    "logo": "https://example.com/logo-arch.png",
    "salary": "2000-3500 USD",
    "category": "Architecture",
    "featured": true,
    "skills": ["AutoCAD", "Revit", "3D Modeling"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-event-000028",
    "title": "Event Planner",
    "type": "Part-time",
    "description": "Organized Event Planner to coordinate weddings, conferences, and corporate events.",
    "requirements": [
      "Strong organizational skills",
      "Experience in event management",
      "Excellent communication skills"
    ],
    "responsibilities": [
      "Plan and execute events",
      "Manage vendor relationships",
      "Handle logistics and budgeting"
    ],
    "location": "Addis Ababa, Ethiopia",
    "aboutCompany": "Eventify is a leading event management agency.",
    "logo": "https://example.com/logo-event.png",
    "salary": "1000-2500 USD",
    "category": "Event Management",
    "featured": false,
    "skills": ["Event Planning", "Budgeting", "Vendor Management"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-techwrite-000029",
    "title": "Technical Writer",
    "type": "Full-time",
    "description": "We are hiring a Technical Writer to create documentation for software and hardware products.",
    "requirements": [
      "Excellent writing and communication skills",
      "Familiarity with software documentation",
      "Attention to detail"
    ],
    "responsibilities": [
      "Write technical manuals and guides",
      "Collaborate with engineers",
      "Maintain product documentation"
    ],
    "location": "Remote",
    "aboutCompany": "DocuTech provides technical documentation for global tech firms.",
    "logo": "https://example.com/logo-doc.png",
    "salary": "2000-3000 USD",
    "category": "Writing & Editing",
    "featured": false,
    "skills": ["Documentation", "Research", "Communication"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-recruit-000030",
    "title": "Recruiter",
    "type": "Full-time",
    "description": "Recruiter needed to identify, attract, and hire top talent.",
    "requirements": [
      "Bachelor’s degree in HR or related field",
      "Experience with recruitment tools",
      "Strong interpersonal skills"
    ],
    "responsibilities": [
      "Source and screen candidates",
      "Coordinate interviews",
      "Onboard new hires"
    ],
    "location": "Addis Ababa, Ethiopia",
    "aboutCompany": "TalentConnect helps companies find the best employees.",
    "logo": "https://example.com/logo-recruit.png",
    "salary": "1500-2500 USD",
    "category": "Human Resources",
    "featured": true,
    "skills": ["Recruitment", "Interviewing", "Onboarding"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-pharma-000031",
    "title": "Pharmaceutical Sales Rep",
    "type": "Full-time",
    "description": "Sales representative to promote pharmaceutical products to healthcare professionals.",
    "requirements": [
      "Degree in Pharmacy or related field",
      "Strong sales and communication skills",
      "Knowledge of medical terminology"
    ],
    "responsibilities": [
      "Promote and sell products",
      "Build relationships with healthcare providers",
      "Meet sales targets"
    ],
    "location": "Addis Ababa, Ethiopia",
    "aboutCompany": "PharmaLife distributes high-quality medical products.",
    "logo": "https://example.com/logo-pharma.png",
    "salary": "2000-3500 USD",
    "category": "Pharmaceuticals",
    "featured": false,
    "skills": ["Sales", "Pharmacy Knowledge", "Negotiation"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-elec-000032",
    "title": "Electrician",
    "type": "Full-time",
    "description": "Skilled Electrician needed for installation and repair of electrical systems.",
    "requirements": [
      "Technical certification in Electrical Engineering",
      "Experience in wiring and repair",
      "Knowledge of safety standards"
    ],
    "responsibilities": [
      "Install and maintain electrical systems",
      "Troubleshoot faults",
      "Ensure compliance with safety codes"
    ],
    "location": "Addis Ababa, Ethiopia",
    "aboutCompany": "ElectroFix specializes in residential and industrial electrical services.",
    "logo": "https://example.com/logo-elec.png",
    "salary": "1200-2000 USD",
    "category": "Skilled Trades",
    "featured": false,
    "skills": ["Wiring", "Troubleshooting", "Safety Standards"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-hotel-000033",
    "title": "Hotel Manager",
    "type": "Full-time",
    "description": "We are looking for a Hotel Manager to oversee daily operations and ensure customer satisfaction.",
    "requirements": [
      "Bachelor’s degree in Hospitality Management",
      "5+ years hotel management experience",
      "Strong leadership and communication skills"
    ],
    "responsibilities": [
      "Oversee staff and operations",
      "Maintain guest satisfaction",
      "Manage budgets and resources"
    ],
    "location": "Addis Ababa, Ethiopia",
    "aboutCompany": "BlueSky Hotels is a luxury hotel chain in East Africa.",
    "logo": "https://example.com/logo-hotel.png",
    "salary": "2500-5000 USD",
    "category": "Hospitality",
    "featured": true,
    "skills": ["Hospitality", "Leadership", "Budget Management"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-journalist-000034",
    "title": "Journalist",
    "type": "Contract",
    "description": "Passionate Journalist needed to cover local and international news stories.",
    "requirements": [
      "Degree in Journalism or related field",
      "Excellent writing and reporting skills",
      "Ability to work under deadlines"
    ],
    "responsibilities": [
      "Research and write news articles",
      "Conduct interviews",
      "Report on live events"
    ],
    "location": "Addis Ababa, Ethiopia",
    "aboutCompany": "GlobalNews provides trusted news coverage worldwide.",
    "logo": "https://example.com/logo-news.png",
    "salary": "1000-2000 USD",
    "category": "Media",
    "featured": false,
    "skills": ["Research", "Interviewing", "Reporting"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-data-000035",
    "title": "Data Analyst",
    "type": "Full-time",
    "description": "Data Analyst to analyze large datasets and provide insights for business decisions.",
    "requirements": [
      "Proficiency in SQL and Excel",
      "Experience with BI tools (Power BI, Tableau)",
      "Strong analytical skills"
    ],
    "responsibilities": [
      "Analyze datasets",
      "Prepare reports and dashboards",
      "Support decision-making"
    ],
    "location": "Remote",
    "aboutCompany": "DataDriven helps companies leverage data for growth.",
    "logo": "https://example.com/logo-data.png",
    "salary": "2500-4000 USD",
    "category": "Data & Analytics",
    "featured": true,
    "skills": ["SQL", "Excel", "Data Visualization"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-seo-000036",
    "title": "SEO Specialist",
    "type": "Full-time",
    "description": "SEO Specialist needed to optimize websites and improve search engine rankings.",
    "requirements": [
      "Experience in SEO strategies",
      "Knowledge of Google Analytics",
      "Content optimization skills"
    ],
    "responsibilities": [
      "Conduct keyword research",
      "Improve on-page and off-page SEO",
      "Track and report performance"
    ],
    "location": "Remote",
    "aboutCompany": "RankUp is a digital marketing agency specializing in SEO.",
    "logo": "https://example.com/logo-seo.png",
    "salary": "2000-3000 USD",
    "category": "Digital Marketing",
    "featured": false,
    "skills": ["SEO", "Google Analytics", "Content Strategy"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-3d-000037",
    "title": "3D Artist",
    "type": "Contract",
    "description": "We are hiring a 3D Artist to create models and animations for games and visualizations.",
    "requirements": [
      "Proficiency with Blender or Maya",
      "Strong portfolio of 3D work",
      "Attention to detail"
    ],
    "responsibilities": [
      "Create 3D models and textures",
      "Develop animations",
      "Collaborate with game developers"
    ],
    "location": "Remote",
    "aboutCompany": "Artify Studios is a creative design studio.",
    "logo": "https://example.com/logo-3d.png",
    "salary": "1500-2500 USD",
    "category": "Design & Animation",
    "featured": true,
    "skills": ["3D Modeling", "Animation", "Blender"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-acc-000038",
    "title": "Accountant",
    "type": "Full-time",
    "description": "Experienced Accountant needed to manage company finances and prepare reports.",
    "requirements": [
      "Bachelor’s in Accounting or Finance",
      "Knowledge of accounting software",
      "Strong attention to detail"
    ],
    "responsibilities": [
      "Prepare financial statements",
      "Manage budgets and expenses",
      "Ensure compliance with tax laws"
    ],
    "location": "Addis Ababa, Ethiopia",
    "aboutCompany": "FinServe provides accounting services for SMEs.",
    "logo": "https://example.com/logo-acc.png",
    "salary": "1800-3000 USD",
    "category": "Finance",
    "featured": false,
    "skills": ["Accounting", "Tax Compliance", "Budgeting"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-teacher-000039",
    "title": "Teacher (Mathematics)",
    "type": "Full-time",
    "description": "Passionate Mathematics Teacher needed for high school level students.",
    "requirements": [
      "Degree in Mathematics or Education",
      "Strong communication skills",
      "Prior teaching experience"
    ],
    "responsibilities": [
      "Prepare lesson plans",
      "Teach mathematics classes",
      "Assess student progress"
    ],
    "location": "Addis Ababa, Ethiopia",
    "aboutCompany": "EduNation is a private school offering quality education.",
    "logo": "https://example.com/logo-school.png",
    "salary": "1000-2000 USD",
    "category": "Education",
    "featured": false,
    "skills": ["Teaching", "Mathematics", "Student Assessment"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-ops-000040",
    "title": "Operations Manager",
    "type": "Full-time",
    "description": "We are seeking an Operations Manager to oversee daily business activities and ensure efficiency.",
    "requirements": [
      "Bachelor’s degree in Business Administration",
      "Leadership and management experience",
      "Strong problem-solving skills"
    ],
    "responsibilities": [
      "Manage operations and staff",
      "Monitor KPIs",
      "Optimize workflows"
    ],
    "location": "Addis Ababa, Ethiopia",
    "aboutCompany": "BizOps is a consultancy helping organizations streamline operations.",
    "logo": "https://example.com/logo-ops.png",
    "salary": "3000-5000 USD",
    "category": "Management",
    "featured": true,
    "skills": ["Operations", "Leadership", "Strategy"]
  },
  {
    id: "b1a7a9e4-1f01-4b5e-9f01-brand-000041",
    "title": "Brand Manager",
    "type": "Full-time",
    "description": "Brand Manager needed to build and maintain company image across all platforms.",
    "requirements": [
      "Degree in Marketing or Business",
      "Strong creative and strategic thinking",
      "Experience with brand campaigns"
    ],
    "responsibilities": [
      "Develop branding strategies",
      "Manage marketing campaigns",
      "Maintain consistent brand identity"
    ],
    "location": "Remote",
    "aboutCompany": "Brandify is a global marketing agency.",
    "logo": "https://example.com/logo-brand.png",
    "salary": "2500-4000 USD",
    "category": "Marketing",
    "featured": true,
    "skills": ["Branding", "Campaign Management", "Marketing Strategy"]
  }
]


  // Create Jobs & Skills
  for (const jobData of jobsData) {
    const { skills,  ...jobFields } = jobData;
    const job = await prisma.job.create({
      data: {
        ...jobFields,
        createdBy: { connect: { id: employer.id } },
      },
    });

    // Insert skills
    for (const skill of skills) {
      await prisma.skill.create({
        data: {
          name: skill,
          jobId: job.id,
        },
      });
    }
  }

  // Create Applications

// Job IDs from your data
const uxuiJobId = "b1a7a9e4-1f01-4b5e-9f01-uxui-000001";
const devopsJobId = "b1a7a9e4-1f01-4b5e-9f01-devops-000002";
const marketingJobId = "b1a7a9e4-1f01-4b5e-9f01-mkt-000003";
const flutterJobId = "b1a7a9e4-1f01-4b5e-9f01-flutter-000004";
const hrJobId = "b1a7a9e4-1f01-4b5e-9f01-hr-000005";
const cyberJobId = "b1a7a9e4-1f01-4b5e-9f01-cyber-000006";
const contentJobId = "b1a7a9e4-1f01-4b5e-9f01-content-000007";

// Assuming dev1, dev2, dev3, dev4 are your users
await prisma.application.create({
  data: {
    status: ApplicationStatus.APPLIED,
    resumeUrl: "https://example.com/resume-bob.pdf",
    job: { connect: { id: uxuiJobId } },
    applicant: { connect: { id: dev1.id } },
  },
});

await prisma.application.create({
  data: {
    status: ApplicationStatus.SHORTLISTED,
    resumeUrl: "https://example.com/resume-charlie.pdf",
    job: { connect: { id: devopsJobId } },
    applicant: { connect: { id: dev2.id } },
  },
});

await prisma.application.create({
  data: {
    status: ApplicationStatus.APPLIED,
    resumeUrl: "https://example.com/resume-alice.pdf",
    job: { connect: { id: marketingJobId } },
    applicant: { connect: { id: dev3.id } },
  },
});

await prisma.application.create({
  data: {
    status: ApplicationStatus.APPLIED,
    resumeUrl: "https://example.com/resume-dave.pdf",
    job: { connect: { id: flutterJobId } },
    applicant: { connect: { id: dev3.id } },
  },
});

await prisma.application.create({
  data: {
    status: ApplicationStatus.SHORTLISTED,
    resumeUrl: "https://example.com/resume-eve.pdf",
    job: { connect: { id: hrJobId } },
    applicant: { connect: { id: dev1.id } },
  },
});

await prisma.application.create({
  data: {
    status: ApplicationStatus.REJECTED,
    resumeUrl: "https://example.com/resume-frank.pdf",
    job: { connect: { id: cyberJobId } },
    applicant: { connect: { id: dev2.id } },
  },
});

await prisma.application.create({
  data: {
    status: ApplicationStatus.APPLIED,
    resumeUrl: "https://example.com/resume-grace.pdf",
    job: { connect: { id: contentJobId } },
    applicant: { connect: { id: dev3.id } },
  },
});

await prisma.application.create({
  data: {
    status: ApplicationStatus.SHORTLISTED,
    resumeUrl: "https://example.com/resume-henry.pdf",
    job: { connect: { id: uxuiJobId } },
    applicant: { connect: { id: dev2.id } },
  },
});

await prisma.application.create({
  data: {
    status: ApplicationStatus.REJECTED,
    resumeUrl: "https://example.com/resume-iris.pdf",
    job: { connect: { id: devopsJobId } },
    applicant: { connect: { id: dev1.id } },
  },
});

console.log("✅ Applications seeded successfully!");


  console.log("✅ Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
