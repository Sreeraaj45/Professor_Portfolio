"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Lightbulb } from "lucide-react"; // Importing Lucide Icons

export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { duration: 1, delay: 0.2 },
  },
};

export const slideUp = {
  initial: {
    top: 0,
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

// Words with corresponding icons (all using dark blue color #2563eb)
const words = [
  { text: "Researching", icon: (size: number) => <BookOpen size={size} color="#2563eb" /> },
  { text: "Teaching", icon: (size: number) => <GraduationCap size={size} color="#2563eb" /> },
  { text: "Innovating", icon: (size: number) => <Lightbulb size={size} color="#2563eb" /> },
];

export default function Index() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;
    setTimeout(() => setIndex(index + 1), index === 0 ? 1000 : 150);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.5 },
    },
  };

  // Dynamically adjust icon and font sizes based on screen width
  const isSmallScreen = dimension.width < 640;
  const iconSize = isSmallScreen ? 40 : 50;
  const textSize = isSmallScreen ? "text-4xl" : "text-6xl";

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="h-screen w-screen flex items-center justify-center fixed z-[99] bg-[#93c5fd] px-4"
    >
      {dimension.width > 0 && (
        <>
          <motion.div
            variants={opacity}
            initial="initial"
            animate="enter"
            className={`flex items-center gap-3 text-white ${textSize} font-semibold tracking-wide relative z-[1] text-center`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {words[index].icon(iconSize)}
            <span>{words[index].text}</span>
          </motion.div>

          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
            </defs>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill="url(#gradient)"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
