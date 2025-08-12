import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Rocket, Mail, Download, ChevronDown } from "lucide-react";
import { fadeInUp, float } from "@/lib/animations";

const typingTexts = [
  "Data Science Enthusiast",
  "Machine Learning Engineer",
  "Blockchain Developer",
  "GIS Analyst",
  "Problem Solver"
];

export function HeroSection() {
  const [typingText, setTypingText] = useState("");
  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeleteingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const animate = () => {
      const currentText = typingTexts[textIndexRef.current];
      
      if (!isDeleteingRef.current) {
        // Typing phase
        if (charIndexRef.current < currentText.length) {
          charIndexRef.current += 1;
          setTypingText(currentText.substring(0, charIndexRef.current));
          timeoutRef.current = setTimeout(animate, 100); // Faster typing
        } else {
          // Pause before deleting
          timeoutRef.current = setTimeout(() => {
            isDeleteingRef.current = true;
            animate();
          }, 1500);
        }
      } else {
        // Deleting phase
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1;
          setTypingText(currentText.substring(0, charIndexRef.current));
          timeoutRef.current = setTimeout(animate, 50); // Faster deleting
        } else {
          // Move to next text
          isDeleteingRef.current = false;
          textIndexRef.current = (textIndexRef.current + 1) % typingTexts.length;
          timeoutRef.current = setTimeout(animate, 500);
        }
      }
    };

    // Start animation after a short delay
    timeoutRef.current = setTimeout(animate, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []); // Empty dependency array - runs only once

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const downloadResume = () => {
    // Create a dummy resume download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Vansh_Sharma_Resume.pdf';
    link.click();
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-bg dark:bg-hero-bg">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <motion.div
          variants={float}
          animate="animate"
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"
        />
        <motion.div
          variants={float}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute top-40 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl"
        />
        <motion.div
          variants={float}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl"
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-blue-600 dark:text-blue-400 mb-4 font-medium"
          >
            Hello, I'm
          </motion.h2>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Vansh Sharma
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-8 h-16 flex items-center justify-center"
          >
            <span className="border-r-2 border-blue-500 pr-1 min-h-[1em] inline-block">
              {typingText || " "}
            </span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Transforming complex datasets into actionable insights through advanced analytics and spatial intelligence.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button onClick={scrollToProjects} className="btn-primary">
              <Rocket className="w-5 h-5 mr-2" />
              View My Work
            </button>
            <button onClick={scrollToContact} className="btn-secondary">
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </button>
            <button onClick={downloadResume} className="btn-outline">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </motion.div>
    </section>
  );
}
