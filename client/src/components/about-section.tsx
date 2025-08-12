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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
