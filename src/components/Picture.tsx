/**
 * Picture — sources the supplied path as AVIF and WebP siblings when
 * present in /public, with WebP / supplied source as fallback.
 */
interface PictureProps {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  decoding?: 'async' | 'sync' | 'auto'
  width?: number
  height?: number
}

export function Picture({
  src,
  alt,
  className,
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  width,
  height
}: PictureProps) {
  // Strip any existing extension (.webp, .avif, .jpg, .jpeg, .png)
  const base = src.replace(/\.(jpe?g|png|webp|avif)$/i, '')
  const avif = `${base}.avif`
  const webp = `${base}.webp`
  
  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img
        src={webp}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        width={width}
        height={height}
        {...(fetchPriority ? { fetchPriority } : {})}
      />
    </picture>
  )
}
