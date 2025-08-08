import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeInUp, staggerContainer, progressBarVariants } from "@/lib/animations";

const skillCategories = [
  {
    title: "Languages",
    color: "blue",
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 85 },
      { name: "C/C++", level: 75 },
    ],
  },
  {
    title: "Libraries/Framework",
    color: "emerald",
    skills: [
      { name: "Pandas, NumPy", level: 90 },
      { name: "Scikit-learn", level: 80 },
      { name: "Matplotlib", level: 85 },
    ],
  },
  {
    title: "Tools & Platforms",
    color: "amber",
    skills: [
      { name: "Jupyter Notebook", level: 95 },
      { name: "Tableau, Power BI", level: 80 },
      { name: "Git, MongoDB", level: 75 },
    ],
  },
  {
    title: "Other Skills",
    color: "purple",
    skills: [
      { name: "APIs Integration", level: 85 },
      { name: "Blockchain Development", level: 70 },
      { name: "GIS & Spatial Analytics", level: 80 },
    ],
  },
];

const colorClasses = {
  blue: {
    title: "text-blue-600 dark:text-blue-400",
    progress: "bg-blue-500",
  },
  emerald: {
    title: "text-emerald-600 dark:text-emerald-400",
    progress: "bg-emerald-500",
  },
  amber: {
    title: "text-amber-600 dark:text-amber-400",
    progress: "bg-amber-500",
  },
  purple: {
    title: "text-purple-600 dark:text-purple-400",
    progress: "bg-purple-500",
  },
};

export function SkillsSection() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section 
      ref={ref}
      id="skills" 
      className="py-20 bg-gray-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle">Technologies and tools I work with</p>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <h3 className={`text-xl font-semibold mb-6 ${colorClasses[category.color as keyof typeof colorClasses].title}`}>
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className={`skill-progress ${colorClasses[category.color as keyof typeof colorClasses].progress}`}
                        variants={progressBarVariants}
                        initial="hidden"
                        animate={isIntersecting ? "visible" : "hidden"}
                        custom={`${skill.level}%`}
                        transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
