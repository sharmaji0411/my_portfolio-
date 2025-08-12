import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeInUp } from "@/lib/animations";
import { useState, useEffect } from "react";
import { BarChart3, Brain, Database, TrendingUp, Zap, Globe } from "lucide-react";

// Interactive data visualization component
const DataVisualization = () => {
  const [activeDataPoint, setActiveDataPoint] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);

  const dataPoints = [
    { value: 85, label: "Data Collection", color: "bg-blue-500", icon: Database },
    { value: 92, label: "Analysis", color: "bg-green-500", icon: BarChart3 },
    { value: 88, label: "ML Modeling", color: "bg-purple-500", icon: Brain },
    { value: 90, label: "Insights", color: "bg-orange-500", icon: TrendingUp },
    { value: 95, label: "Implementation", color: "bg-red-500", icon: Zap },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDataPoint((prev) => (prev + 1) % dataPoints.length);
      setAnimationStep((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-80 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated data bars */}
      <div className="relative z-10 h-full flex items-end justify-around">
        {dataPoints.map((point, index) => {
          const IconComponent = point.icon;
          const isActive = index === activeDataPoint;
          
          return (
            <motion.div
              key={point.label}
              className="flex flex-col items-center"
              onMouseEnter={() => setActiveDataPoint(index)}
            >
              {/* Data bar */}
              <motion.div
                className={`w-12 ${point.color} rounded-t-lg relative overflow-hidden cursor-pointer`}
                initial={{ height: 0 }}
                animate={{ 
                  height: `${point.value * 2}px`,
                  scale: isActive ? 1.1 : 1,
                  boxShadow: isActive ? "0 10px 25px rgba(0,0,0,0.2)" : "0 5px 15px rgba(0,0,0,0.1)"
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
              >
                {/* Animated shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent"
                  animate={{
                    y: isActive ? ["-100%", "100%"] : "100%",
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isActive ? Infinity : 0,
                    ease: "linear",
                  }}
                />
                
                {/* Icon in bar */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  <motion.div
                    animate={{ 
                      rotate: isActive ? 360 : 0,
                      scale: isActive ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Value label */}
              <motion.div
                className="mt-2 text-center"
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  color: isActive ? "#3B82F6" : "#6B7280"
                }}
              >
                <div className="text-lg font-bold">{point.value}%</div>
                <div className="text-xs">{point.label}</div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating data particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
            initial={{
              x: Math.random() * 100 + "%",
              y: "100%",
            }}
            animate={{
              y: "-10%",
              x: Math.random() * 100 + "%",
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ML Process flow visualization
const MLProcessFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { name: "Data Ingestion", icon: Database, color: "from-blue-400 to-blue-600" },
    { name: "Data Preprocessing", icon: Zap, color: "from-green-400 to-green-600" },
    { name: "Feature Engineering", icon: Brain, color: "from-purple-400 to-purple-600" },
    { name: "Model Training", icon: TrendingUp, color: "from-orange-400 to-orange-600" },
    { name: "Deployment", icon: Globe, color: "from-red-400 to-red-600" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-32 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-4 overflow-hidden">
      {/* Process flow */}
      <div className="flex items-center justify-between h-full">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = index === currentStep;
          const isPassed = index < currentStep;
          
          return (
            <div key={step.name} className="flex items-center">
              {/* Step circle */}
              <motion.div
                className={`relative w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center`}
                animate={{
                  scale: isActive ? [1, 1.2, 1] : isPassed ? 1.1 : 0.9,
                  opacity: isActive ? 1 : isPassed ? 0.8 : 0.4,
                }}
                transition={{ duration: 0.5 }}
              >
                <IconComponent className="w-5 h-5 text-white" />
                
                {/* Pulse effect for active step */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.7, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </motion.div>
              
              {/* Connection line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="flex-1 h-1 mx-2 bg-gray-300 dark:bg-gray-600 rounded"
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: isPassed ? 1 : isActive ? 0.5 : 0,
                    backgroundColor: isPassed ? "#10B981" : "#6B7280"
                  }}
                  style={{ transformOrigin: "left" }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Step name */}
      <motion.div
        className="absolute bottom-1 left-1/2 transform -translate-x-1/2"
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
          {steps[currentStep].name}
        </span>
      </motion.div>
    </div>
  );
};

export function DataScienceVisualization() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section 
      ref={ref}
      className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Data Science Workflow
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Interactive visualization of my data science expertise and machine learning pipeline
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Proficiency Metrics
            </h4>
            <DataVisualization />
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              ML Development Pipeline
            </h4>
            <MLProcessFlow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}