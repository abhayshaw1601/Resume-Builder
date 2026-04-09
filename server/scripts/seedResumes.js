/**
 * Seed Script — Inserts 3 test resumes + 1 test user into MongoDB.
 * 
 * Usage: node scripts/seedResumes.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load env from server root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const User = require('../models/User');
const Resume = require('../models/Resume');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected for seeding');

        // ─── Create or reuse test user ───────────────────────
        let testUser = await User.findOne({ email: 'testuser@resumebuilder.com' });

        if (!testUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('Test@123', salt);

            testUser = await User.create({
                name: 'Test User',
                email: 'testuser@resumebuilder.com',
                password: hashedPassword,
            });
            console.log('👤 Created test user:', testUser.email);
        } else {
            console.log('👤 Reusing existing test user:', testUser.email);
        }

        // ─── Delete existing seeded resumes for this user ────
        await Resume.deleteMany({ userId: testUser._id });
        console.log('🗑️  Cleared old resumes for test user');

        // ─── Resume 1: Full Stack Developer ──────────────────
        const resume1 = await Resume.create({
            userId: testUser._id,
            title: "Abhay Shaw – Full Stack Developer",
            public: true,
            template: 'classic',
            accent_color: '#14B8A6',
            personal_info: {
                full_name: 'Abhay Shaw',
                email: 'abhay@gmail.com',
                phone: '+91 98765 43210',
                location: 'Kolkata, India',
                linkedin: 'https://linkedin.com/in/abhayshaw',
                website: 'https://abhayshaw.dev',
                profession: 'Full Stack Developer',
                image: '',
            },
            professional_summary: 'Motivated Full Stack Developer with 3+ years of experience building scalable web applications using React, Node.js, and MongoDB. Passionate about clean architecture, performance optimization, and delivering exceptional user experiences. Proven track record of shipping production-ready products from concept to deployment.',
            skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'Tailwind CSS'],
            experience: [
                {
                    company: 'TechNova Solutions',
                    position: 'Senior Full Stack Developer',
                    start_date: '2024-01',
                    end_date: '',
                    description: 'Leading development of a SaaS analytics platform serving 10K+ users.\nArchitected microservices backend with Node.js and Docker.\nImplemented real-time data pipelines reducing latency by 40%.\nMentored a team of 3 junior developers.',
                    is_current: true,
                },
                {
                    company: 'PixelCraft Studios',
                    position: 'Full Stack Developer',
                    start_date: '2022-06',
                    end_date: '2023-12',
                    description: 'Built and maintained 5+ client-facing web applications using React and Express.\nDesigned REST APIs handling 100K+ daily requests.\nIntegrated Stripe payment processing and OAuth authentication.\nReduced page load times by 60% through code splitting and lazy loading.',
                    is_current: false,
                },
            ],
            education: [
                {
                    institution: 'Indian Institute of Engineering',
                    degree: 'B.Tech',
                    field: 'Computer Science & Engineering',
                    graduation_date: '2022-05',
                    gpa: '8.9',
                },
                {
                    institution: 'Delhi Public School',
                    degree: 'Higher Secondary',
                    field: 'PCM',
                    graduation_date: '2018-03',
                    gpa: '',
                },
            ],
            project: [
                {
                    name: 'Sentinel ICU Dashboard',
                    type: 'Healthcare Web Application',
                    description: 'Real-time ICU patient monitoring dashboard with AI-powered insights using Gemini API. Features blood report extraction, patient chatbot, and alert management system.',
                },
                {
                    name: 'ResumeBuilder Pro',
                    type: 'SaaS Web Application',
                    description: 'A premium resume builder with 5+ templates, real-time preview, ATS score analysis, gradient theming, and PDF export. Built with React, Node.js, and MongoDB.',
                },
            ],
        });

        // ─── Resume 2: UI/UX Designer ────────────────────────
        const resume2 = await Resume.create({
            userId: testUser._id,
            title: "Priya Kapoor – UI/UX Designer",
            public: true,
            template: 'modern',
            accent_color: '#8B5CF6',
            personal_info: {
                full_name: 'Priya Kapoor',
                email: 'priya.kapoor@design.io',
                phone: '+91 87654 32109',
                location: 'Mumbai, India',
                linkedin: 'https://linkedin.com/in/priyakapoor',
                website: 'https://priyakapoor.design',
                profession: 'UI/UX Designer',
                image: '',
            },
            professional_summary: 'Creative UI/UX Designer with 5+ years of experience crafting intuitive digital experiences for web and mobile platforms. Expert in design thinking, user research, and translating complex requirements into beautiful, accessible interfaces. Proficient in Figma, Adobe XD, and modern frontend technologies.',
            skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Design Systems', 'HTML/CSS', 'Tailwind CSS', 'Framer Motion', 'Accessibility (WCAG)'],
            experience: [
                {
                    company: 'DesignHub Agency',
                    position: 'Lead UI/UX Designer',
                    start_date: '2023-04',
                    end_date: '',
                    description: 'Leading the design team of 6 for enterprise SaaS products.\nEstablished a company-wide design system used across 12 products.\nConducted 50+ user interviews to drive data-informed design decisions.\nAchieved a 35% increase in user engagement through redesigned onboarding flows.',
                    is_current: true,
                },
                {
                    company: 'Sparkle Digital',
                    position: 'UI/UX Designer',
                    start_date: '2020-01',
                    end_date: '2023-03',
                    description: 'Designed responsive interfaces for e-commerce and fintech clients.\nCreated interactive prototypes reducing development time by 25%.\nCollaborated with cross-functional teams to ship 15+ product features.',
                    is_current: false,
                },
            ],
            education: [
                {
                    institution: 'National Institute of Design',
                    degree: 'M.Des',
                    field: 'Interaction Design',
                    graduation_date: '2020-05',
                    gpa: '9.2',
                },
            ],
            project: [
                {
                    name: 'FinFlow – Banking Dashboard',
                    type: 'FinTech Design',
                    description: 'Designed a comprehensive banking dashboard with transaction analytics, bill payments, and budget tracking. Achieved 98% satisfaction score in usability testing.',
                },
                {
                    name: 'MediCare App Redesign',
                    type: 'Healthcare Mobile App',
                    description: 'Complete redesign of a healthcare appointment booking app, reducing booking time from 5 minutes to under 45 seconds. Featured dark mode and accessibility compliance.',
                },
            ],
        });

        // ─── Resume 3: Data Engineer ─────────────────────────
        const resume3 = await Resume.create({
            userId: testUser._id,
            title: "Rohan Mehta – Data Engineer",
            public: true,
            template: 'minimal-text',
            accent_color: '#F59E0B',
            personal_info: {
                full_name: 'Rohan Mehta',
                email: 'rohan.mehta@dataworks.io',
                phone: '+91 76543 21098',
                location: 'Bangalore, India',
                linkedin: 'https://linkedin.com/in/rohanmehta',
                website: 'https://rohanmehta.tech',
                profession: 'Data Engineer',
                image: '',
            },
            professional_summary: 'Results-driven Data Engineer with 6+ years of experience building and optimizing large-scale data pipelines and warehousing solutions. Expert in Apache Spark, Airflow, and cloud-native data architectures on AWS and GCP. Passionate about turning raw data into scalable, reliable systems.',
            skills: ['Python', 'Apache Spark', 'Apache Airflow', 'SQL', 'AWS (S3, Redshift, Glue)', 'GCP (BigQuery, Dataflow)', 'Kafka', 'dbt', 'Docker', 'Terraform'],
            experience: [
                {
                    company: 'DataStream Analytics',
                    position: 'Senior Data Engineer',
                    start_date: '2022-08',
                    end_date: '',
                    description: 'Architected real-time data pipelines processing 500M+ events daily using Kafka and Spark.\nDesigned and maintained a cloud data warehouse on AWS Redshift serving 200+ analysts.\nReduced data pipeline failures by 80% through automated monitoring and alerting.\nLed migration from on-prem Hadoop to cloud-native architecture, cutting costs by 45%.',
                    is_current: true,
                },
                {
                    company: 'InfoBridge Systems',
                    position: 'Data Engineer',
                    start_date: '2019-03',
                    end_date: '2022-07',
                    description: 'Built ETL pipelines for financial data using Python and Airflow.\nOptimized SQL queries resulting in 3x improvement in dashboard load times.\nImplemented data quality checks catching 99.5% of anomalies before downstream consumption.',
                    is_current: false,
                },
            ],
            education: [
                {
                    institution: 'Indian Institute of Science',
                    degree: 'M.Tech',
                    field: 'Data Science',
                    graduation_date: '2019-06',
                    gpa: '9.4',
                },
                {
                    institution: 'BITS Pilani',
                    degree: 'B.E.',
                    field: 'Computer Science',
                    graduation_date: '2017-05',
                    gpa: '8.6',
                },
            ],
            project: [
                {
                    name: 'DataLake Platform',
                    type: 'Cloud Infrastructure',
                    description: 'Designed a multi-tenant data lake platform on AWS using S3, Glue, and Athena. Supports petabyte-scale querying with sub-second response times for 50+ internal teams.',
                },
                {
                    name: 'Real-Time Fraud Detection Pipeline',
                    type: 'FinTech Data Pipeline',
                    description: 'Built a real-time fraud detection system using Kafka Streams and ML models. Processes card transactions in under 100ms with 99.7% accuracy, preventing $2M+ in annual losses.',
                },
            ],
        });

        console.log('\n🎉 Seeded 3 resumes successfully!\n');
        console.log('📝 Resume IDs (use these in /view/:id):');
        console.log(`   1. ${resume1._id} — ${resume1.title} (template: ${resume1.template})`);
        console.log(`   2. ${resume2._id} — ${resume2.title} (template: ${resume2.template})`);
        console.log(`   3. ${resume3._id} — ${resume3.title} (template: ${resume3.template})`);
        console.log(`\n👤 Test User: testuser@resumebuilder.com / Test@123\n`);

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error.message);
        await mongoose.disconnect();
        process.exit(1);
    }
};

seedData();
