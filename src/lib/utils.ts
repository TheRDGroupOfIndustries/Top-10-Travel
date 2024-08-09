import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getValidUrl = (url: string) => {
  if (url.startsWith("/")) return url;
  try {
    const u = new URL(url);
    return u.href;
  } catch (error) {
    return "/stock.jpg";
  }
};
