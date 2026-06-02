import Image from "next/image";

type ImageRevealProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  parallax?: boolean;
};

export function ImageReveal({
  src,
  alt,
  priority = false,
  className = "",
  imageClassName = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  parallax = false,
}: ImageRevealProps) {
  return (
    <div
      data-image-reveal
      className={`relative overflow-hidden rounded-[8px] border border-gold/25 bg-oliveCard shadow-premium ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        data-parallax-image={parallax ? true : undefined}
        className={`object-cover ${imageClassName}`}
      />
    </div>
  );
}
