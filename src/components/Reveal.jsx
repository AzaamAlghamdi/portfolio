import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, className = "", delay = 0, as = "div", ...props }) {
  const reduceMotion = useReducedMotion();
  const MotionElement = as === "li" ? motion.li : motion.div;

  return (
    <MotionElement
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionElement>
  );
}
