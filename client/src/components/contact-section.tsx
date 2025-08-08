import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "vanshsharma.official0411@gmail.com",
    href: "mailto:vanshsharma.official0411@gmail.com",
    color: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 8006792006",
    href: "tel:+918006792006",
    color: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dehradun, Uttarakhand, India",
    href: null,
    color: "text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "linkedin.com/in/vansh-sharma",
    href: "https://www.linkedin.com/in/vansh-sharma-778308357/",
    color: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400",
  },
];

export function ContactSection() {
  const { ref, isIntersecting } = useIntersectionObserver();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      reset();
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section 
      ref={ref}
      id="contact" 
      className="py-20 bg-gray-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-subtitle">Ready to discuss opportunities or collaborations</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Get In Touch
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Always eager to connect with professionals and collaborators interested in data science, geospatial intelligence, or innovative analytical projects.
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isIntersecting ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h4>
                    {item.href ? (
                      <a 
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
          >
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Send Message
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                    Subject
                  </label>
                  <input
                    {...register("subject")}
                    type="text"
                    className="form-input"
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || contactMutation.isPending}
                  className={`w-full transition-all duration-300 ${
                    isSubmitted
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white font-medium py-3 px-6 rounded-lg inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {isSubmitting || contactMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
