import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Github, Trophy } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

const projects = [
  {
    id: "zomato",
    title: "Zomato Data Analysis",
    description: "Conducted exploratory data analysis on Zomato customer behaviour and restaurant trends using Python (Pandas, NumPy). Identified key patterns with insights for targeted marketing strategies.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    tags: ["Python", "Pandas", "NumPy"],
    category: "data-science",
    award: false,
  },
  {
    id: "fintrack",
    title: "FinTRACK & Finsight",
    description: "Developed web tools for real-time investment tracking and business financial management. Integrated APIs (Yahoo Finance, Kite Connect) with modern tech stack.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    tags: ["React.js", "Node.js", "MongoDB"],
    category: "web-dev",
    award: false,
  },
  {
    id: "voteshield",
    title: "VoteShield",
    description: "Engineered secure online voting system using Ethereum blockchain and biometric authentication. Won the Reckon 6.0 Hackathon with real-time, immutable vote tracking.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    tags: ["Ethereum", "Solidity", "Web3.py"],
    category: "blockchain",
    award: true,
  },
];

const filters = [
  { id: "all", label: "All Projects" },
  { id: "data-science", label: "Data Science" },
  { id: "web-dev", label: "Web Development" },
  { id: "blockchain", label: "Blockchain" },
];

const tagColors = {
  Python: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Pandas: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  NumPy: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "React.js": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Node.js": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  MongoDB: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Ethereum: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Solidity: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  "Web3.py": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { ref, isIntersecting } = useIntersectionObserver();

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

  const openProject = (projectId: string) => {
    alert(`Project ${projectId} details will be available soon!`);
  };

  return (
    <section 
      ref={ref}
      id="projects" 
      className="py-20 bg-white dark:bg-slate-800"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="section-title">Key Projects</h2>
          <p className="section-subtitle">Some of my notable work</p>
        </motion.div>
        
        {/* Project Filter */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`filter-btn ${activeFilter === filter.id ? "active" : ""}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.1 }}
                className="project-card"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="project-overlay">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => openProject(project.id)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-500 hover:text-white transition-all duration-300"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-500 hover:text-white transition-all duration-300">
                        <Github className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    {project.title}
                    {project.award && (
                      <span className="ml-2 text-sm">
                        <Trophy className="w-4 h-4 text-yellow-500 inline" />
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className={`tech-tag ${tagColors[tag as keyof typeof tagColors] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
