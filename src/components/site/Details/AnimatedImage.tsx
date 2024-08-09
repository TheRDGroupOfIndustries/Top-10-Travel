"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface AnimatedImageProps {
  src: string | StaticImageData;
  alt: string;
  fill: boolean;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  className?: string;
}

const AnimatedImage: FC<AnimatedImageProps> = ({
  src,
  alt,
  fill,
  layout,
  objectFit,
  className,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.01 }}
      whileInView={{ scale: 1 }}
      transition={{
        type: "spring",
        duration: 4,
        stiffness: 180, // Lower stiffness for a slower animation
        damping: 30, // Higher damping for more control over the oscillation
      }}
      viewport={{ once: true }}
      className="relative w-full h-full overflow-hidden"
    >
      <img
        // @ts-expect-error
        src={src}
        alt={alt}
        fill
        className={cn("w-full h-full object-cover", className)}
      />
    </motion.div>
  );
};

export default AnimatedImage;
