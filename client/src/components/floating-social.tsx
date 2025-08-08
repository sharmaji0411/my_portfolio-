import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Phone } from "lucide-react";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/vansh-sharma-778308357/",
    icon: Linkedin,
    label: "LinkedIn",
    className: "bg-blue-600 text-white hover:bg-blue-700",
  },
  {
    href: "https://github.com/sharmaji0411",
    icon: Github,
    label: "GitHub",
    className: "bg-gray-800 text-white hover:bg-gray-900",
  },
  {
    href: "mailto:vanshsharma.official0411@gmail.com",
    icon: Mail,
    label: "Email",
    className: "bg-red-500 text-white hover:bg-red-600",
  },
  {
    href: "tel:+918006792006",
    icon: Phone,
    label: "Phone",
    className: "bg-green-500 text-white hover:bg-green-600",
  },
];

export function FloatingSocial() {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-4"
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.href}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2 + index * 0.1 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className={`social-float ${link.className}`}
          aria-label={link.label}
        >
          <link.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </motion.div>
  );
}
