import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Company Icons - using SVG for better control
const CompanyIcons = {
  IBM: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M0 7.334h4.762v1.333H0V7.334zm5.762 0H7.43v1.333H5.762V7.334zm2.668 0h4.762v1.333H8.43V7.334zm5.762 0h4.762v1.333h-4.762V7.334zm5.762 0H24v1.333h-4.046V7.334zM0 9.334h1.905v1.333H0V9.334zm2.857 0h1.905v1.333H2.857V9.334zm2.905 0H7.43v1.333H5.762V9.334zm2.668 0h1.905v1.333H8.43V9.334zm2.857 0h1.905v1.333h-1.905V9.334zm2.905 0h1.905v1.333h-1.905V9.334zm2.857 0h1.905v1.333h-1.905V9.334zm2.905 0H24v1.333h-1.905V9.334zM0 11.334h4.762v1.333H0v-1.333zm5.762 0H7.43v1.333H5.762v-1.333zm2.668 0h4.762v1.333H8.43v-1.333zm5.762 0h4.762v1.333h-4.762v-1.333zm5.762 0H24v1.333h-4.046v-1.333zM0 13.334h1.905v1.333H0v-1.333zm2.857 0h1.905v1.333H2.857v-1.333zm2.905 0H7.43v1.333H5.762v-1.333zm2.668 0h1.905v1.333H8.43v-1.333zm2.857 0h1.905v1.333h-1.905v-1.333zm2.905 0h1.905v1.333h-1.905v-1.333zm2.857 0h1.905v1.333h-1.905v-1.333zm2.905 0H24v1.333h-1.905v-1.333zM0 15.334h4.762v1.333H0v-1.333zm5.762 0H7.43v1.333H5.762v-1.333zm2.668 0h4.762v1.333H8.43v-1.333zm5.762 0h4.762v1.333h-4.762v-1.333zm5.762 0H24v1.333h-4.046v-1.333z"/>
    </svg>
  ),
  ISRO: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  Udemy: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M23.003 8.932c-.504-1.698-1.596-3.206-3.087-4.297C18.426 3.544 16.835 3 15.075 3s-3.35.544-4.84 1.635c-.735.538-1.336 1.181-1.847 1.912-.276-.302-.594-.572-.943-.803C6.036 4.847 4.445 4.303 2.685 4.303S-1.665 4.847-3.154 5.938c-1.491 1.091-2.583 2.6-3.087 4.297L-6.5 11.5c-.36 1.216-.36 2.484 0 3.7l.259.771c.504 1.698 1.596 3.206 3.087 4.297C-1.665 21.359-.074 21.903 1.686 21.903s3.35-.544 4.84-1.635c1.491-1.091 2.583-2.6 3.087-4.297L12 8.932z"/>
    </svg>
  ),
  DeepLearning: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184C10.616 2.17 7.666 4.003 6.402 9.583c-.525 2.314-.404 4.64.34 6.896.744 2.256 2.066 4.34 3.83 5.865.352.305.744.608 1.16.888.416-.28.808-.583 1.16-.888 1.764-1.525 3.086-3.609 3.83-5.865.744-2.256.865-4.582.34-6.896z"/>
    </svg>
  ),
  GreatLearning: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  YHills: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M6 2l3 6 5-4-1 7 4-2-2 4h3l-3 3 5 1-5 3 3 2-6-1-2 5-2-5-6 1 3-2-5-3 5-1-3-3h3l-2-4 4 2-1-7 5 4 3-6z"/>
    </svg>
  ),
  Simplilearn: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  )
};

const mainCertifications = [
  {
    title: "Design Thinking",
    organization: "IBM",
    description: "Enterprise Design Thinking Practitioner certification focusing on human-centered design methodologies and innovation frameworks.",
    icon: "IBM",
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-700",
  },
  {
    title: "Overview of Geographic Information System (GIS)",
    organization: "ISRO",
    description: "Comprehensive understanding of spatial data analysis, remote sensing, and geographic information systems from Indian Space Research Organisation.",
    icon: "ISRO",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "border-orange-200 dark:border-orange-700",
  },
  {
    title: "Complete Data Science NLP ML DL",
    organization: "Udemy",
    description: "Comprehensive course covering data science, natural language processing, machine learning, and deep learning with hands-on projects.",
    icon: "Udemy",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "border-purple-200 dark:border-purple-700",
  },
  {
    title: "Vibe Coding with Replit",
    organization: "Deeplearning.AI",
    description: "Advanced coding practices and collaborative development using modern cloud-based development environments.",
    icon: "DeepLearning",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-700",
  },
];

const additionalCertifications = [
  {
    title: "MongoDB Developer Path",
    organization: "MongoDB University",
    description: "Database design, aggregation pipelines, and performance optimization.",
    icon: "MongoDB",
    color: "from-green-600 to-green-800",
  },
  {
    title: "Data Science Foundations",
    organization: "Great Learning",
    description: "Statistical analysis, data visualization, and predictive modeling.",
    icon: "GreatLearning",
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "Cloud Computing Essentials",
    organization: "YHills Academy",
    description: "AWS fundamentals, cloud architecture, and deployment strategies.",
    icon: "YHills",
    color: "from-yellow-500 to-orange-600",
  },
  {
    title: "SQL for Data Science",
    organization: "Simplilearn",
    description: "Advanced SQL queries, database optimization, and data manipulation.",
    icon: "Simplilearn",
    color: "from-teal-500 to-cyan-600",
  },
];

export function CertificationsSection() {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [showAll, setShowAll] = useState(false);

  return (
    <section 
      ref={ref}
      id="certifications" 
      className="py-20 bg-white dark:bg-slate-800"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Professional certifications and learning achievements</p>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {mainCertifications.map((cert, index) => {
            const IconComponent = CompanyIcons[cert.icon as keyof typeof CompanyIcons];
            return (
              <motion.div
                key={cert.title}
                variants={fadeInUp}
                className={`group p-6 rounded-2xl border-2 ${cert.borderColor} ${cert.bgColor} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${cert.color} text-white flex-shrink-0`}>
                    <IconComponent />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      {cert.organization}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Show More/Less Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            {showAll ? 'Show Less' : 'Show More Certifications'}
            <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Additional Certifications */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: showAll ? 'auto' : 0,
            opacity: showAll ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalCertifications.map((cert, index) => {
              const IconComponent = CompanyIcons[cert.icon as keyof typeof CompanyIcons];
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showAll ? 1 : 0, y: showAll ? 0 : 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-4 rounded-xl bg-gray-50 dark:bg-slate-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${cert.color} text-white w-fit mb-3`}>
                    <IconComponent />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {cert.organization}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {cert.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}