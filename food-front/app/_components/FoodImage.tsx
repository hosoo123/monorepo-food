"use client";

import { useEffect, useState } from "react";

export const FOOD_IMAGE_PLACEHOLDER = "/image/Product%20Image.svg";

export function getFoodImageSrc(image?: string | null) {
  if (!image) return FOOD_IMAGE_PLACEHOLDER;
  const trimmed = image.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return FOOD_IMAGE_PLACEHOLDER;
}

type FoodImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

export function FoodImage({ src, alt, className }: FoodImageProps) {
  const [currentSrc, setCurrentSrc] = useState(() => getFoodImageSrc(src));

  useEffect(() => {
    setCurrentSrc(getFoodImageSrc(src));
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (currentSrc !== FOOD_IMAGE_PLACEHOLDER) {
          setCurrentSrc(FOOD_IMAGE_PLACEHOLDER);
        }
      }}
    />
  );
}
