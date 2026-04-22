import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 3,
        zIndex: 9002,
        originX: 0,
        background: 'linear-gradient(90deg, var(--orange), var(--blue), var(--cyan))',
        scaleX,
      }}
    />
  )
}
