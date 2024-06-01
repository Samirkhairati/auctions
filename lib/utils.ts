import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const path = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.NEXT_PUBLIC_VERCEL_URL
export const path = "https://auctions2-p1w1td9gf-samirkhairatis-projects.vercel.app/"