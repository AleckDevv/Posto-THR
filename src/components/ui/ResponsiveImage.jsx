import { cn } from '../../utils/cn.js';

/**
 * Imagem responsiva AVIF → WebP com dimensões declaradas (evita CLS),
 * cor de fundo dominante como placeholder e lazy loading por padrão.
 *
 * `fill`: a imagem preenche o contêiner pai (object-cover); o pai define a proporção.
 */
export default function ResponsiveImage({
  image,
  sizes = '100vw',
  priority = false,
  fill = false,
  alt,
  position,
  className,
  imgClassName,
}) {
  return (
    <picture className={cn(fill ? 'absolute inset-0 block' : 'block', className)}>
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        src={image.src}
        alt={alt ?? image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        style={{ backgroundColor: image.color, objectPosition: position }}
        className={cn(fill ? 'size-full object-cover' : 'h-auto w-full', imgClassName)}
      />
    </picture>
  );
}
