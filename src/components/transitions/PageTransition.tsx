import { AnimatePresence, motion } from 'motion/react'
import { useLocation } from 'react-router'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Wraps route children in an AnimatePresence keyed by the current pathname so
 * navigations get a subtle, consistent fade + slide. Must be rendered inside a
 * <BrowserRouter /> (which the scaffold sets up in main.tsx).
 *
 * Respects prefers-reduced-motion automatically via Motion's reduced-motion handling.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
