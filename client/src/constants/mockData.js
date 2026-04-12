export const mockResumeData = {
    personal_info: {
        full_name: "Alex Thompson",
        email: "alex.thompson@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        linkedin: "https://www.linkedin.com/in/alexthompson",
        website: "https://alexthompson.dev"
    },
    professional_summary: "Innovative Full Stack Developer with over 5 years of experience in building scalable web applications. Passionate about creating elegant solutions to complex problems and improving user experience through modern technologies. Expert in React, Node.js, and cloud architecture.",
    experience: [
        {
            position: "Senior Software Engineer",
            company: "TechFlow Solutions",
            link: "https://techflow.example.com",
            start_date: "2021-03-01",
            end_date: null,
            is_current: true,
            description: "• Led development of a high-traffic e-commerce platform using React and Next.js, resulting in a 40% increase in conversion rates.\n• Optimized database queries and backend services, reducing API response times by 30%.\n• Mentored junior developers and implemented code review processes to ensure high code quality."
        },
        {
            position: "Software Developer",
            company: "InnoSoft Systems",
            link: "https://innosoft.example.com",
            start_date: "2018-06-01",
            end_date: "2021-02-28",
            is_current: false,
            description: "• Developed and maintained multiple client-facing web applications using JavaScript and PHP.\n• Collaborated with UX designers to implement responsive and intuitive user interfaces.\n• Successfully migrated legacy systems to modern cloud infrastructure, improving system reliability."
        }
    ],
    project: [
        {
            name: "TaskMaster Pro",
            link: "https://github.com/alex/taskmaster",
            type: "Open Source Productivity Tool",
            description: "A collaborative task management application built with React, Redux, and Firebase. Features real-time updates and offline support."
        },
        {
            name: "EcoTrack",
            link: "https://ecotrack.app",
            type: "Environmental Monitoring App",
            description: "A mobile-responsive web app that helps users track their carbon footprint. Utilizes D3.js for data visualization and Node.js for the backend."
        }
    ],
    education: [
        {
            degree: "Bachelor of Science",
            field: "Computer Science",
            institution: "University of California, Berkeley",
            graduation_date: "2018-05-15",
            gpa: "3.9"
        }
    ],
    skills: [
        "React", "JavaScript (ES6+)", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "AWS", "Docker", "Full Stack Development", "System Architecture"
    ]
};
