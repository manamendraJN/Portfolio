import { motion, useReducedMotion } from 'framer-motion';

interface ParticleProps {
  size: number;
  top: string;
  left: string;
  delay: number;
}

export function Particle({ size, top, left, delay }: ParticleProps) {
  const shouldReduceMotion = useReducedMotion();

  const particleVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 45, 0],
      opacity: [0.3, 0.7, 0.3],
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "loop" as "loop",
        delay,
        ease: "easeInOut",
      },
    },
    reduced: {
      opacity: 0.3,
    },
  };

  return (
    <motion.div
      className="absolute border border-[hsl(172,85%,32%)] rounded-full"
      style={{ width: size, height: size, top, left }}
      variants={particleVariants}
      initial={{ opacity: 0 }}
      animate={shouldReduceMotion ? 'reduced' : 'animate'}
      aria-hidden="true"
    />
  );
}