import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";
import { Code, Database, Brain, Globe, Zap, Cpu } from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    color: "blue",
    icon: Code,
    skills: [
      { name: "Python", level: 90, description: "Data Science, ML, Web Development" },
      { name: "SQL", level: 85, description: "Database Management & Analytics" },
      { name: "C/C++", level: 75, description: "System Programming & DSA" },
      { name: "JavaScript", level: 80, description: "Web Development & Automation" },
    ],
    gradient: "from-blue-400 via-blue-500 to-blue-600",
  },
  {
    title: "Data Science & ML",
    color: "emerald",
    icon: Brain,
    skills: [
      { name: "Pandas & NumPy", level: 90, description: "Data Manipulation & Analysis" },
      { name: "Scikit-learn", level: 80, description: "Machine Learning Models" },
      { name: "TensorFlow/Keras", level: 75, description: "Deep Learning & Neural Networks" },
      { name: "Matplotlib/Seaborn", level: 85, description: "Data Visualization" },
    ],
    gradient: "from-emerald-400 via-emerald-500 to-emerald-600",
  },
  {
    title: "Tools & Platforms",
    color: "amber",
    icon: Zap,
    skills: [
      { name: "Jupyter Notebook", level: 95, description: "Interactive Development" },
      { name: "Tableau & Power BI", level: 80, description: "Business Intelligence" },
      { name: "Git & GitHub", level: 85, description: "Version Control & Collaboration" },
      { name: "Docker", level: 70, description: "Containerization & Deployment" },
    ],
    gradient: "from-amber-400 via-amber-500 to-amber-600",
  },
  {
    title: "Specialized Skills",
    color: "purple",
    icon: Globe,
    skills: [
      { name: "GIS & Spatial Analytics", level: 80, description: "Geographic Information Systems" },
      { name: "Blockchain Development", level: 70, description: "Web3 & Smart Contracts" },
      { name: "APIs Integration", level: 85, description: "RESTful Services & Microservices" },
      { name: "Cloud Computing", level: 75, description: "AWS, Azure, Google Cloud" },
    ],
    gradient: "from-purple-400 via-purple-500 to-purple-600",
  },
];

// Interactive floating particles animation
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
          initial={{
            x: Math.random() * 100 + "%",
            y: "100%",
          }}
          animate={{
            y: "-10%",
            x: Math.random() * 100 + "%",
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// Interactive skill card with hover effects
const SkillCard = ({ category, index }: { category: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = category.icon;

  return (
    <motion.div
      variants={fadeInUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-slate-700 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105`}
    >
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Floating tech symbols */}
      <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Cpu className="w-6 h-6 text-gray-400" />
        </motion.div>
      </div>

      {/* Header with icon and title */}
      <div className="flex items-center mb-6">
        <motion.div
          className={`p-3 rounded-2xl bg-gradient-to-r ${category.gradient} text-white mr-4`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <IconComponent className="w-6 h-6" />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {category.title}
          </h3>
        </div>
      </div>

      {/* Skills list with interactive progress bars */}
      <div className="space-y-4">
        {category.skills.map((skill: any, skillIndex: number) => (
          <motion.div
            key={skill.name}
            className="skill-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: skillIndex * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {skill.name}
              </span>
              <motion.span
                className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700"
                whileHover={{ scale: 1.1 }}
              >
                {skill.level}%
              </motion.span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              {skill.description}
            </p>
            
            {/* Interactive progress bar */}
            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: isHovered ? `${skill.level}%` : `${skill.level - 10}%` }}
                transition={{
                  duration: 0.8,
                  delay: skillIndex * 0.1,
                  ease: "easeOut",
                }}
              />
              <motion.div
                className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                animate={{ 
                  x: isHovered ? ["0%", "100%"] : "0%",
                  opacity: isHovered ? [0, 0.6, 0] : 0
                }}
                transition={{
                  duration: 1.5,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 dark:group-hover:border-blue-500 rounded-3xl transition-all duration-500"
        animate={{
          boxShadow: isHovered
            ? "0 0 30px rgba(59, 130, 246, 0.3)"
            : "0 0 0px rgba(59, 130, 246, 0)",
        }}
      />
    </motion.div>
  );
};

export function EnhancedSkillsSection() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section 
      ref={ref}
      id="skills" 
      className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 overflow-hidden"
    >
      {/* Floating particles background */}
      <FloatingParticles />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            className="section-title bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Technical Expertise
          </motion.h2>
          <p className="section-subtitle">Cutting-edge technologies and advanced skill mastery</p>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </motion.div>

        {/* Interactive tech stack visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-4 bg-white dark:bg-slate-800 rounded-full px-8 py-4 shadow-lg border border-gray-200 dark:border-slate-700">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.title}
                  className={`p-2 rounded-full bg-gradient-to-r ${category.gradient} text-white`}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.3 }}
                >
                  <IconComponent className="w-5 h-5" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}