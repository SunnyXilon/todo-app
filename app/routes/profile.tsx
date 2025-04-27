import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// Sample data for the portfolio
const portfolioData = {
  personalInfo: {
    name: "Alex Chen",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    email: "alex.chen@example.com",
    github: "github.com/alexchen",
    linkedin: "linkedin.com/in/alexchen",
    summary: "Full-stack developer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture."
  },
  skills: [
    "JavaScript/TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "GraphQL",
    "PostgreSQL"
  ],
  experience: [
    {
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      period: "2020 - Present",
      description: "Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%."
    },
    {
      company: "StartupX",
      position: "Full Stack Developer",
      period: "2018 - 2020",
      description: "Developed and maintained multiple React applications. Improved application performance by 40% through code optimization."
    }
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description: "Built a scalable e-commerce platform using React, Node.js, and MongoDB. Implemented real-time inventory management and payment processing.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      link: "https://github.com/alexchen/ecommerce"
    },
    {
      title: "Task Management App",
      description: "Developed a collaborative task management application with real-time updates and team collaboration features.",
      technologies: ["React", "Firebase", "Material-UI"],
      link: "https://github.com/alexchen/taskmanager"
    },
    {
      title: "AI Image Recognition",
      description: "Created an AI-powered image recognition system using Python and TensorFlow for automated content moderation.",
      technologies: ["Python", "TensorFlow", "AWS Lambda"],
      link: "https://github.com/alexchen/ai-vision"
    }
  ]
};

export const loader = async () => {
  return json({ portfolioData });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Alex Chen - Software Engineer Portfolio" },
    { name: "description", content: "Portfolio and resume of Alex Chen, Senior Software Engineer" },
  ];
};

export default function Profile() {
  const { portfolioData } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{portfolioData.personalInfo.name}</h1>
        <h2 className="text-xl text-indigo-600 mb-4">{portfolioData.personalInfo.title}</h2>
        <p className="text-gray-600 mb-4">{portfolioData.personalInfo.summary}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>{portfolioData.personalInfo.location}</span>
          <span>•</span>
          <a href={`mailto:${portfolioData.personalInfo.email}`} className="text-indigo-600 hover:text-indigo-800">
            {portfolioData.personalInfo.email}
          </a>
          <span>•</span>
          <a href={`https://${portfolioData.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
            GitHub
          </a>
          <span>•</span>
          <a href={`https://${portfolioData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
            LinkedIn
          </a>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white shadow-md rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {portfolioData.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-white shadow-md rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
        <div className="space-y-6">
          {portfolioData.experience.map((job, index) => (
            <div key={index} className="border-l-2 border-indigo-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900">{job.position}</h3>
              <p className="text-indigo-600">{job.company}</p>
              <p className="text-sm text-gray-500 mb-2">{job.period}</p>
              <p className="text-gray-600">{job.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project, index) => (
            <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 