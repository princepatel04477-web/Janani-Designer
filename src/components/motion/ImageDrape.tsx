import { motion, useReducedMotion } from 'framer-motion'
import { Picture } from '../Picture'

interface ImageDrapeProps {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  delay?: number
}

/**
 * ImageDrape — Curtain/drape clip-path reveal for fabric and garment photography.
 * Animates clipPath from inset(0 0 100% 0) to inset(0 0 0% 0) over 800ms.
 * Falls back to an opacity crossfade under reduced motion.
 */
export function ImageDrape({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority,
  delay = 0
}: ImageDrapeProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{
        opacity: reduce ? 1 : 0,
        y: reduce ? 0 : 16
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`overflow-hidden ${className}`}
    >
      <Picture
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center"
        loading={loading}
        fetchPriority={fetchPriority}
      />
    </motion.div>
  )
}

export default ImageDrape
