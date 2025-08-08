import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressPercentage = (scrolled / maxHeight) * 100;
      setProgress(Math.min(progressPercentage, 100));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress(); // Set initial value

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
}
