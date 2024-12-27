import React, { useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, animate } from "framer-motion";

export const Timeline = ({
  data,
}: {
  data: {
    title: string;
    content: React.ReactNode;
  }[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });


  return (
    <div ref={containerRef} className="relative min-h-screen py-20">
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-800 origin-left z-50"
      />
      {data.map((item, idx) => {
        const targetScale = useTransform(
          scrollYProgress,
          [0, 1],
          [idx === 0 ? 1 : 0.8, 1]
        );

        const targetY = useTransform(
          scrollYProgress,
          [0, 1],
          [idx === 0 ? 0 : 50, 0]
        );

        const targetOpacity = useTransform(
          scrollYProgress,
          [0, 1],
          [idx === 0 ? 1 : 0.3, 1]
        );

        return (
          <motion.div
            key={idx}
            style={{
              scale: targetScale,
              y: targetY,
              opacity: targetOpacity
            }}
            className="relative pb-24 last:pb-0 px-4"
          >
            <div className="grid grid-cols-[200px_60px_1fr] gap-6 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50% 0px -50% 0px" }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="text-right pt-2 relative"
              >
                <div className="text-5xl font-bold text-neutral-900 dark:text-neutral-100 sticky top-0 flex items-center justify-end gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="h-3 w-3 rounded-full bg-blue-500 flex-none"
                  />
                  <span>{item.title}</span>
                </div>
              </motion.div>

              <div className="relative">
                <div className="absolute left-1/2 top-[1.4rem] bottom-0 w-[2px] -ml-px">
                  <div className="h-full bg-neutral-200 dark:bg-neutral-800" />
                  <motion.div
                    className="absolute top-0 left-0 w-full"
                    style={{
                      background: "linear-gradient(to bottom, #3B82F6 0%, rgba(59, 130, 246, 0) 100%)",
                      height: useTransform(
                        scrollYProgress,
                        [
                          Math.max(0, idx / data.length - 0.1),
                          idx / data.length,
                          (idx + 1) / data.length
                        ],
                        ["0%", "0%", "100%"]
                      ),
                    }}
                  />
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-blue-500"
                    style={{
                      height: useTransform(
                        scrollYProgress,
                        [0, idx / data.length],
                        ["0%", "100%"]
                      ),
                    }}
                  />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-50% 0px -50% 0px" }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2,
                  }}
                  className="relative flex h-4 w-4 items-center justify-center mt-4 z-10"
                >
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50% 0px -50% 0px" }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3,
                }}
              >
                <div>{item.content}</div>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
