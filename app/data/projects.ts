import { Project } from "../components/ProjectCard";

export const projects: Project[] = [
  {
    id: "portfolio-v3",
    title: "Portfolio Website v3",
    description: "A modern, responsive portfolio website built with Next.js 15, featuring beautiful animations and a winter theme.",
    longDescription: "This is my latest portfolio website showcasing my skills and projects. Built with cutting-edge technologies and featuring a beautiful winter theme with smooth animations, interactive components, and responsive design. The site includes sections for projects, skills, about me, and social links.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    demoUrl: "https://your-portfolio-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/portfolio-v3",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web App",
    status: "Completed",
    featured: true,
    stats: {
      stars: 24,
      views: 1200,
      commits: 156
    },
    timeline: {
      started: "Dec 2024",
      completed: "Jan 2025",
      duration: "1 month"
    },
    features: [
      "Responsive design with mobile-first approach",
      "Beautiful winter theme with snow particles",
      "Smooth animations using Framer Motion",
      "Interactive project showcase",
      "WakaTime integration for coding stats",
      "SEO optimized with Next.js 15",
      "TypeScript for type safety",
      "Modern UI components"
    ],
    challenges: [
      "Implementing complex animations while maintaining performance",
      "Creating a cohesive winter theme across all components",
      "Optimizing images and assets for fast loading",
      "Ensuring accessibility across all interactive elements"
    ],
    learnings: [
      "Advanced Framer Motion animation techniques",
      "Next.js 15 new features and optimizations",
      "Better understanding of TypeScript patterns",
      "Improved skills in responsive design"
    ],
    teamSize: 1,
    role: "Full Stack Developer & Designer"
  },
  {
    id: "task-manager-app",
    title: "TaskFlow - Project Management",
    description: "A comprehensive task management application with real-time collaboration, built with React and Node.js.",
    longDescription: "TaskFlow is a modern project management application designed for teams to collaborate effectively. It features real-time updates, drag-and-drop task management, team collaboration tools, and comprehensive project tracking capabilities.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    demoUrl: "https://taskflow-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/taskflow",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
    category: "Web App",
    status: "In Progress",
    featured: true,
    stats: {
      stars: 18,
      views: 850,
      commits: 89
    },
    timeline: {
      started: "Nov 2024",
      duration: "2 months"
    },
    features: [
      "Real-time collaboration with Socket.io",
      "Drag-and-drop task management",
      "Team member management and permissions",
      "Project timeline and milestone tracking",
      "File attachments and comments",
      "Email notifications and reminders",
      "Dark/light theme support",
      "Mobile responsive design"
    ],
    challenges: [
      "Implementing real-time synchronization across multiple users",
      "Designing an intuitive drag-and-drop interface",
      "Managing complex state with multiple data relationships",
      "Optimizing performance with large datasets"
    ],
    learnings: [
      "Real-time application architecture with Socket.io",
      "Advanced React patterns for complex state management",
      "Database optimization techniques",
      "User experience design for productivity tools"
    ],
    teamSize: 2,
    role: "Lead Developer"
  },
  {
    id: "weather-api",
    title: "WeatherAPI Pro",
    description: "A robust weather API service providing accurate forecasts and historical data with global coverage.",
    longDescription: "WeatherAPI Pro is a comprehensive weather service that aggregates data from multiple sources to provide accurate weather information. It features global coverage, historical data access, and various subscription tiers for different use cases.",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
    githubUrl: "https://github.com/yourusername/weather-api",
    technologies: ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
    category: "API",
    status: "Completed",
    featured: false,
    stats: {
      stars: 42,
      views: 2100,
      commits: 234
    },
    timeline: {
      started: "Sep 2024",
      completed: "Nov 2024",
      duration: "2 months"
    },
    features: [
      "Global weather data coverage",
      "Historical weather data access",
      "Real-time weather updates",
      "Multiple data formats (JSON, XML)",
      "Rate limiting and authentication",
      "Comprehensive API documentation",
      "Caching for improved performance",
      "Multiple subscription tiers"
    ],
    challenges: [
      "Aggregating data from multiple weather services",
      "Implementing efficient caching strategies",
      "Handling high API request volumes",
      "Ensuring data accuracy and reliability"
    ],
    learnings: [
      "API design best practices",
      "Data aggregation and processing techniques",
      "Caching strategies with Redis",
      "Scalable architecture patterns"
    ],
    teamSize: 1,
    role: "Backend Developer"
  },
  {
    id: "code-snippet-manager",
    title: "SnippetVault",
    description: "A developer tool for organizing, searching, and sharing code snippets with syntax highlighting and tagging.",
    longDescription: "SnippetVault is a powerful tool designed for developers to organize their code snippets efficiently. It features advanced search capabilities, syntax highlighting for multiple languages, and team sharing functionality.",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    demoUrl: "https://snippetvault-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/snippet-vault",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    category: "Tool",
    status: "Completed",
    featured: false,
    stats: {
      stars: 31,
      views: 1500,
      commits: 167
    },
    timeline: {
      started: "Aug 2024",
      completed: "Oct 2024",
      duration: "2 months"
    },
    features: [
      "Syntax highlighting for 50+ languages",
      "Advanced search and filtering",
      "Tag-based organization system",
      "Team collaboration and sharing",
      "Export snippets in various formats",
      "Browser extension for quick saving",
      "Keyboard shortcuts for power users",
      "Dark/light theme support"
    ],
    challenges: [
      "Implementing efficient search across large snippet collections",
      "Creating a flexible tagging system",
      "Optimizing syntax highlighting performance",
      "Designing an intuitive user interface"
    ],
    learnings: [
      "Full-text search implementation",
      "Browser extension development",
      "Advanced TypeScript patterns",
      "Database optimization with Prisma"
    ],
    teamSize: 1,
    role: "Full Stack Developer"
  },
  {
    id: "mobile-fitness-app",
    title: "FitTracker Mobile",
    description: "A React Native fitness tracking app with workout plans, progress tracking, and social features.",
    longDescription: "FitTracker is a comprehensive mobile fitness application that helps users track their workouts, follow personalized fitness plans, and connect with a community of fitness enthusiasts. The app includes features for tracking various types of exercises, monitoring progress, and sharing achievements.",
    image: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React Native", "TypeScript", "Node.js", "MongoDB", "Firebase"],
    category: "Mobile App",
    status: "Planning",
    featured: false,
    timeline: {
      started: "Jan 2025",
      duration: "3 months"
    },
    features: [
      "Workout tracking and logging",
      "Personalized fitness plans",
      "Progress photos and measurements",
      "Social features and challenges",
      "Nutrition tracking integration",
      "Wearable device synchronization",
      "Offline workout capability",
      "Achievement system and badges"
    ],
    challenges: [
      "Designing intuitive mobile user interfaces",
      "Implementing offline data synchronization",
      "Integrating with various fitness APIs",
      "Optimizing battery usage for background tracking"
    ],
    learnings: [
      "React Native development best practices",
      "Mobile app performance optimization",
      "Health data integration patterns",
      "Cross-platform mobile development"
    ],
    teamSize: 3,
    role: "Mobile Developer"
  },
  {
    id: "retro-space-game",
    title: "Cosmic Defender",
    description: "A retro-style space shooter game built with JavaScript and HTML5 Canvas, featuring pixel art graphics.",
    longDescription: "Cosmic Defender is a nostalgic space shooter game inspired by classic arcade games. Built with vanilla JavaScript and HTML5 Canvas, it features pixel art graphics, progressive difficulty, and local high score tracking.",
    image: "https://images.pexels.com/photos/2159434/pexels-photo-2159434.jpeg?auto=compress&cs=tinysrgb&w=800",
    demoUrl: "https://cosmic-defender-game.vercel.app",
    githubUrl: "https://github.com/yourusername/cosmic-defender",
    technologies: ["JavaScript", "HTML5 Canvas", "CSS3"],
    category: "Game",
    status: "Completed",
    featured: false,
    stats: {
      stars: 15,
      views: 800,
      commits: 78
    },
    timeline: {
      started: "Jul 2024",
      completed: "Aug 2024",
      duration: "1 month"
    },
    features: [
      "Retro pixel art graphics",
      "Progressive difficulty system",
      "Multiple enemy types and patterns",
      "Power-ups and special weapons",
      "Local high score tracking",
      "Responsive controls",
      "Sound effects and background music",
      "Particle effects and explosions"
    ],
    challenges: [
      "Implementing smooth game physics",
      "Creating engaging enemy AI patterns",
      "Optimizing canvas rendering performance",
      "Designing balanced gameplay mechanics"
    ],
    learnings: [
      "Game development fundamentals",
      "HTML5 Canvas optimization techniques",
      "Game physics and collision detection",
      "Audio programming for games"
    ],
    teamSize: 1,
    role: "Game Developer"
  }
];

// Helper function to get project counts by category
export const getProjectCounts = () => {
  const counts: Record<string, number> = {
    "All": projects.length,
    "Web App": 0,
    "Mobile App": 0,
    "API": 0,
    "Tool": 0,
    "Game": 0
  };

  projects.forEach(project => {
    counts[project.category]++;
  });

  return counts;
};

// Helper function to filter projects
export const filterProjects = (category: string, status: string) => {
  return projects.filter(project => {
    const categoryMatch = category === "All" || project.category === category;
    const statusMatch = status === "All" || project.status === status;
    return categoryMatch && statusMatch;
  });
};