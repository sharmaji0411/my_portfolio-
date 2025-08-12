import { motion } from "framer-motion";
import { Trophy, Award, Star, Target, PartyPopper } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

const achievements = [
  {
    title: "Hackathon Winner",
    organization: "Reckon 6.0 Hackathon, JIET Jodhpur",
    description: "🥇 1st Place in Web3 & Blockchain Domain",
    icon: Trophy,
    color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400",
    celebrationType: "gold",
  },
  {
    title: "Academic Excellence",
    organization: "ICFAI University, Dehradun",
    description: "🎯 Consistent CGPA of 7.96/10",
    icon: Star,
    color: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400",
    celebrationType: "blue",
  },
  {
    title: "Project Leadership",
    organization: "Multiple Technical Projects",
    description: "🚀 Led 15+ successful data science projects",
    icon: Target,
    color: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400",
    celebrationType: "green",
  },
  {
    title: "Community Recognition",
    organization: "Open Source Contributions",
    description: "⭐ Active contributor in data science community",
    icon: Award,
    color: "text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400",
    celebrationType: "purple",
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebratingAchievement, setCelebratingAchievement] = useState<string | null>(null);

  return (
    <section 
      ref={ref}
      id="education" 
      className="relative py-20 bg-gray-50 dark:bg-slate-900"
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
          gravity={0.3}
          colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']}
        />
      )}
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="section-title">Education & Achievements</h2>
          <p className="section-subtitle">My academic journey and major accomplishments</p>
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

          {/* Achievements with Celebration */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-semibold mb-8 text-emerald-600 dark:text-emerald-400 flex items-center">
              <PartyPopper className="w-6 h-6 mr-2" />
              Major Achievements
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isIntersecting ? "visible" : "hidden"}
              className="space-y-6"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  variants={fadeInUp}
                  className="group relative bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => {
                    setCelebratingAchievement(achievement.title);
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 3000);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Celebration overlay */}
                  {celebratingAchievement === achievement.title && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 rounded-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  
                  <div className="flex items-center mb-3 relative z-10">
                    <motion.div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${achievement.color} group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 10 }}
                    >
                      <achievement.icon className="w-6 h-6" />
                    </motion.div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {achievement.organization}
                      </p>
                    </div>
                    <motion.div
                      className="text-gray-400 group-hover:text-yellow-500 transition-colors"
                      animate={{ 
                        rotate: celebratingAchievement === achievement.title ? 360 : 0,
                        scale: celebratingAchievement === achievement.title ? [1, 1.3, 1] : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <PartyPopper className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 relative z-10">
                    {achievement.description}
                  </p>
                  
                  {/* Hover effect glow */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/50 rounded-xl transition-all duration-300"
                    animate={{
                      boxShadow: celebratingAchievement === achievement.title
                        ? "0 0 30px rgba(251, 191, 36, 0.5)"
                        : "0 0 0px rgba(251, 191, 36, 0)",
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
            
            {/* Click hint */}
            <motion.p
              className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center italic"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click on achievements to celebrate! 🎉
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
