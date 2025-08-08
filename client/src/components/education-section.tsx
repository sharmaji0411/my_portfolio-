import { motion } from "framer-motion";
import { Trophy, Award, BarChart, Database } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";

const certifications = [
  {
    title: "Hackathon Winner",
    organization: "Reckon 6.0 Hackathon, JIET Jodhpur",
    description: "Web3 & Blockchain Domain",
    icon: Trophy,
    color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400",
  },
  {
    title: "IBM Certified",
    organization: "Enterprise Design Thinking Practitioner",
    description: "",
    icon: Award,
    color: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400",
  },
  {
    title: "Data Science Foundations",
    organization: "Great Learning",
    description: "",
    icon: BarChart,
    color: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400",
  },
  {
    title: "SQL Fundamentals",
    organization: "Data Flair and Simplilearn",
    description: "",
    icon: Database,
    color: "text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400",
  },
];

const courses = [
  "Data Structures & Algorithms",
  "Machine Learning",
  "DBMS",
  "Statistics",
];

export function EducationSection() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section 
      ref={ref}
      id="education" 
      className="py-20 bg-gray-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="section-title">Education & Achievements</h2>
          <p className="section-subtitle">My academic journey and certifications</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-semibold mb-8 text-blue-600 dark:text-blue-400">Education</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                    2023 - 2026
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    B.Sc. in Data Science
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 mb-2">
                    ICFAI University, Dehradun
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    CGPA: 7.96/10
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {courses.map((course) => (
                      <span 
                        key={course}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-lg text-gray-600 dark:text-gray-400"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-semibold mb-8 text-emerald-600 dark:text-emerald-400">
              Certifications & Achievements
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isIntersecting ? "visible" : "hidden"}
              className="space-y-6"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  variants={fadeInUp}
                  className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cert.color}`}>
                      <cert.icon className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {cert.organization}
                      </p>
                    </div>
                  </div>
                  {cert.description && (
                    <p className="text-gray-600 dark:text-gray-400">
                      {cert.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
