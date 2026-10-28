import Image from 'next/image';
import type { CSSProperties } from 'react';

type Props = {
  shot: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function PhoneShot({ shot, alt, sizes, priority, className, style }: Props) {
  return (
    <Image
      src={`/screens/${shot}.png`}
      alt={alt}
      width={780}
      height={1688}
      sizes={sizes}
      priority={priority}
      className={className}
      style={style}
    />
  );
}
