import React from "react";
import { motion } from "framer-motion";

export const Timeline = ({
  data,
}: {
  data: {
    title: string;
    content: React.ReactNode;
  }[];
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom ease curve
      },
    },
  };

  return (
    <motion.div 
      className="relative space-y-12 pl-8 mt-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {data.map((entry, idx) => (
        <motion.div 
          key={idx} 
          className="timeline-item"
          variants={item}
        >
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
              {entry.title}
            </h3>
            <div className="text-neutral-700 dark:text-neutral-300">
              {entry.content}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
