"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

export function BlurImage({
  src: initialSrc,
  alt,
  className,
  ...props
}: ImageProps) {
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState(initialSrc);

  useEffect(() => setSrc(initialSrc), [initialSrc]);

  const getFallbackAvatar = () =>
    `https://avatar.vercel.sh/${encodeURIComponent(alt)}`;

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoading(false);
    const target = e.target as HTMLImageElement;
    if (target.naturalWidth <= 16 && target.naturalHeight <= 16) {
      setSrc(getFallbackAvatar());
    }
  };

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      className={cn(loading ? "blur-[2px]" : "blur-0", className)}
      onLoad={handleLoad}
      onError={() => setSrc(getFallbackAvatar())}
      unoptimized
    />
  );
}
