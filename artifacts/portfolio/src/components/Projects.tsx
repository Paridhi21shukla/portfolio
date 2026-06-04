import { motion } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "netra-ai",
    title: "Netra AI",
    description: "Affordable, offline-first assistive tech — a 'Third Eye' for visually impaired individuals in India. Captures live video to detect obstacles, reads signboards in English & Hindi, and identifies worn Indian Rupee notes entirely offline on low-power devices.",
    features: [
      "Real-time obstacle detection & categorization",
      "Offline bilingual signboard OCR (English & Hindi)",
      "Offline Indian Rupee banknote identification"
    ],
    tags: ["Python", "Computer Vision", "AI/ML", "Accessibility"],
    category: "AI/ML",
    image: "/images/netra-ai.png",
    link: "https://github.com/Paridhi21shukla/Netra-AI-MVP",
    github: "https://github.com/Paridhi21shukla/Netra-AI-MVP",
    demo: "",
    featured: true
  },
  {
    id: "cogniguard",
    title: "CogniGuard-Lite",
    description: "Modular full-stack web application with separated client, server, and shared logic for code reusability. Features strong typing across frontend and backend to minimize runtime errors.",
    features: [
      "Strict end-to-end type safety between API and client",
      "Shared validation schemas via Zod packages",
      "Modular monorepo structure for code reusability"
    ],
    tags: ["Full Stack", "TypeScript", "Web Dev"],
    category: "Web Dev",
    image: "/images/cogniguard.png",
    link: "https://github.com/Paridhi21shukla/CogniGuard-Lite",
    github: "https://github.com/Paridhi21shukla/CogniGuard-Lite",
    demo: "",
    featured: false
  },
  {
    id: "enrolment",
    title: "Enrolment Trend Forecaster",
    description: "Automated pipeline to process raw Aadhaar enrolment records. Uses an anomaly detection engine with statistical thresholds to flag irregular biometric update requests and predicts future traffic.",
    features: [
      "Automated pipeline processing raw Aadhaar records",
      "Anomaly detection engine with statistical thresholds",
      "Time-series biometric traffic predictive analysis"
    ],
    tags: ["Python", "Data Engineering", "ML"],
    category: "AI/ML",
    image: "/images/enrolment.png",
    link: "https://github.com/Paridhi21shukla/enrolment-analysis",
    github: "https://github.com/Paridhi21shukla/enrolment-analysis",
    demo: "",
    featured: false
  },
  {
    id: "cloud-explorer",
    title: "Cloud-Based File Explorer",
    description: "Designed a complete system architecture utilizing Amazon S3 for object storage, IAM for access management, and EC2 for deployment, with comprehensive CloudWatch monitoring.",
    features: [
      "Object storage organization using Amazon S3",
      "Role-based secure IAM access configurations",
      "Centralized logging metrics with AWS CloudWatch"
    ],
    tags: ["AWS", "S3", "EC2", "Cloud"],
    category: "Cloud",
    image: "/images/cloud-explorer.png",
    link: "#",
    github: "",
    demo: "",
    featured: false
  },
  {
    id: "biokit",
    title: "Biodegradable Pregnancy Kit",
    description: "Eco-friendly pregnancy test kit using biodegradable materials to reduce plastic waste. Currently in the material research and prototype development phase as a funded innovation project.",
    features: [
      "Eliminates single-use plastic waste via paper pulp",
      "Cellulose-based bio-degradable active substrate",
      "Safe organic chemical diagnostic indicators"
    ],
    tags: ["Innovation", "Hardware", "Research"],
    category: "Innovation",
    image: "/images/biokit.png",
    link: "#",
    github: "",
    demo: "",
    featured: false
  }
];

const categories = ["All", "AI/ML", "Web Dev", "Cloud", "Innovation"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filteredProjects = projects.filter(p => activeFilter === "All" || p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans text-white">
              <span className="text-primary">02.</span> Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all duration-300 ${
                  activeFilter === cat 
                    ? "bg-primary/20 text-primary border border-primary/50" 
                    : "bg-transparent text-slate-400 border border-white/10 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative rounded-2xl overflow-hidden bg-[#0B1026]/80 border border-white/5 backdrop-blur-md flex flex-col ${
                project.featured ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-2"
              }`}
            >
              <div className="h-48 md:h-64 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1026]/90 to-transparent z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-primary hover:bg-white/10 transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col z-20 -mt-12">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {project.description}
                </p>
                
                {project.features && project.features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">Key Features:</h4>
                    <ul className="text-xs text-slate-400 space-y-1.5 list-none pl-0">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-secondary border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-white/5">
                  {project.github ? (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs font-medium font-mono text-white hover:bg-white/10 hover:border-white/30 flex items-center justify-center gap-1.5 transition-all cursor-none"
                    >
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                  ) : (
                    <span className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-white/5 text-xs font-medium font-mono text-slate-500 flex items-center justify-center gap-1.5 opacity-40 select-none">
                      <Github className="w-3.5 h-3.5" /> Code Private
                    </span>
                  )}
                  {project.demo ? (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 py-2 px-3 rounded-lg bg-primary/20 border border-primary/30 text-xs font-medium font-mono text-white hover:bg-primary/30 hover:border-primary/50 flex items-center justify-center gap-1.5 transition-all cursor-none"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  ) : (
                    <span className="flex-1 py-2 px-3 rounded-lg bg-white/5 border border-white/5 text-xs font-medium font-mono text-slate-500 flex items-center justify-center gap-1.5 opacity-40 select-none">
                      <ExternalLink className="w-3.5 h-3.5" /> Demo N/A
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
