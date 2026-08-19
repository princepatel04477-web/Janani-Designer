/**
 * Picture — sources the supplied `jpg` path as AVIF and WebP siblings when
 * present in /public, with the JPEG as the fallback. Falls back to a plain
 * <img> if the variant files don't exist (e.g. for very old assets).
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
  const base = src.replace(/\.(jpe?g|png)$/i, '')
  const avif = `${base}.avif`
  const webp = `${base}.webp`
  const fallback = src
  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img
        src={fallback}
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
