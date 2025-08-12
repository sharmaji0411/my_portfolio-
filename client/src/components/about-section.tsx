import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";

export function AboutSection() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section 
      ref={ref}
      id="about" 
      className="py-20 bg-white dark:bg-slate-800"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Passionate about turning data into insights</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            className="relative"
          >
            {/* Interactive Data Science Visualization */}
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-700 dark:to-slate-800 rounded-2xl shadow-xl p-8 overflow-hidden">
              {/* Background animated elements */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              {/* Main visual content */}
              <div className="relative z-10">
                {/* Title */}
                <motion.h3
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Data Science Ecosystem
                </motion.h3>

                {/* Interactive elements grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { name: "Python", color: "bg-yellow-500", delay: 0 },
                    { name: "ML", color: "bg-green-500", delay: 0.2 },
                    { name: "SQL", color: "bg-blue-500", delay: 0.4 },
                    { name: "Pandas", color: "bg-purple-500", delay: 0.6 },
                    { name: "Viz", color: "bg-red-500", delay: 0.8 },
                    { name: "GIS", color: "bg-indigo-500", delay: 1.0 },
                  ].map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      className={`${tech.color} rounded-lg p-3 text-white text-center font-semibold text-sm`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        opacity: { delay: tech.delay, duration: 0.5 },
                        scale: { 
                          delay: tech.delay + 1, 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }
                      }}
                      whileHover={{ scale: 1.15 }}
                    >
                      {tech.name}
                    </motion.div>
                  ))}
                </div>

                {/* Data flow visualization */}
                <div className="relative h-20 bg-white dark:bg-slate-600 rounded-lg p-4 overflow-hidden">
                  <div className="flex items-center justify-between h-full">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-300">Raw Data</div>
                    <motion.div
                      className="flex-1 mx-4 h-1 bg-gray-300 dark:bg-gray-500 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                        animate={{
                          x: ["-100%", "0%", "100%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-300">Insights</div>
                  </div>
                  
                  {/* Floating data points */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full"
                      style={{
                        left: `${10 + (i * 10)}%`,
                        top: "50%",
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* Interactive stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <motion.div
                    className="bg-white dark:bg-slate-600 rounded-lg p-3 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="text-xl font-bold text-blue-600 dark:text-blue-400"
                      animate={{ 
                        textShadow: ["0 0 0px #3B82F6", "0 0 10px #3B82F6", "0 0 0px #3B82F6"],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      95%
                    </motion.div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Accuracy</div>
                  </motion.div>
                  <motion.div
                    className="bg-white dark:bg-slate-600 rounded-lg p-3 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="text-xl font-bold text-green-600 dark:text-green-400"
                      animate={{ 
                        textShadow: ["0 0 0px #10B981", "0 0 10px #10B981", "0 0 0px #10B981"],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      15+
                    </motion.div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Projects</div>
                  </motion.div>
                </div>
              </div>

              {/* Hover interaction overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 rounded-2xl"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
          
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Results-driven and detail-oriented Data Science undergraduate with solid experience in data analysis, machine learning, and GIS & Spatial Data Analysis. Proven ability to design and deliver scalable solutions, leveraging technologies like Python, SQL, and Blockchain.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Demonstrated success in hackathons, academic projects, and tool development. Adept in translating business needs into technical solutions. Seeking to contribute to data-driven or tech-oriented roles in a dynamic organization.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
