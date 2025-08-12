import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { CertificationsSection } from "@/components/certifications-section";
import { EnhancedSkillsSection } from "@/components/enhanced-skills-section";
import { DataScienceVisualization } from "@/components/data-science-visualization";
import { ProjectsSection } from "@/components/projects-section";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";
import { FloatingSocial } from "@/components/floating-social";

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-slate-900"
    >
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
          Loading Portfolio...
        </p>
      </div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">Vansh Sharma</h3>
            <p className="text-gray-400">Data Science Enthusiast</p>
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://www.linkedin.com/in/vansh-sharma-778308357/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
            <a 
              href="https://github.com/sharmaji0411" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
            <a 
              href="mailto:vanshsharma.official0411@gmail.com" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Vansh Sharma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navigation />
          <FloatingSocial />
          <HeroSection />
          <AboutSection />
          <CertificationsSection />
          <EnhancedSkillsSection />
          <DataScienceVisualization />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
          <Footer />
        </motion.div>
      )}
    </>
  );
}
