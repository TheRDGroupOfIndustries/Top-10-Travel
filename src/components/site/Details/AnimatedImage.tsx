"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";

interface AnimatedImageProps {
  src: string;
  alt: string;
  layout: "fill" | "fixed" | "intrinsic" | "responsive";
  objectFit: "contain" | "cover" | "fill" | "none" | "scale-down";
  className?: string;
}

const AnimatedImage: FC<AnimatedImageProps> = ({
  src,
  alt,
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
      className="relative w-full h-full"
    >
      <Image
        src={src}
        alt={alt}
        layout={layout}
        objectFit={objectFit}
        className={className}
      />
    </motion.div>
  );
};

export default AnimatedImage;
