import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { useState, useEffect } from "react";

export function AboutSection() {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [projectCount, setProjectCount] = useState(0);
  const [certCount, setCertCount] = useState(0);

  useEffect(() => {
    if (isIntersecting) {
      // Animate counters
      const projectTarget = 15;
      const certTarget = 5;
      const duration = 2000;
      const steps = 60;
      const projectIncrement = projectTarget / steps;
      const certIncrement = certTarget / steps;

      let currentProject = 0;
      let currentCert = 0;

      const interval = setInterval(() => {
        currentProject = Math.min(currentProject + projectIncrement, projectTarget);
        currentCert = Math.min(currentCert + certIncrement, certTarget);
        
        setProjectCount(Math.floor(currentProject));
        setCertCount(Math.floor(currentCert));

        if (currentProject >= projectTarget && currentCert >= certTarget) {
          clearInterval(interval);
          setProjectCount(projectTarget);
          setCertCount(certTarget);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [isIntersecting]);

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
          >
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Data science workspace with multiple monitors" 
              className="rounded-2xl shadow-xl w-full h-auto"
            />
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
            
            {/* Achievement Counters */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {projectCount}+
                </div>
                <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {certCount}+
                </div>
                <p className="text-gray-600 dark:text-gray-400">Certifications</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
