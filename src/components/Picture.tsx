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
  const isRelative = typeof src === 'string' && !src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')
  const base = isRelative ? src.replace(/\.(jpe?g|png|webp|avif)$/i, '') : src
  const avif = isRelative ? `${base}.avif` : null
  const webp = isRelative ? `${base}.webp` : src

  return (
    <picture className="contents">
      {avif && <source srcSet={avif} type="image/avif" />}
      {webp && <source srcSet={webp} type="image/webp" />}
      <img
        src={webp || src}
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
