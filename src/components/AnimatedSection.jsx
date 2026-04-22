import React, { useEffect, useRef } from 'react'

export default function AnimatedSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  once = true,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const dirClass = direction === 'left' ? 'reveal-left'
      : direction === 'right' ? 'reveal-right'
      : direction === 'scale' ? 'reveal-scale'
      : 'reveal'

    el.classList.add(dirClass)
    if (delay) el.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove('visible')
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [direction, delay, threshold, once])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
