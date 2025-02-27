import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberWithSuffix(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  const suffixes = ["", "k", "m", "b", "t"];
  const suffixIndex = Math.floor(Math.log10(num) / 3);
  const scaledNum = num / Math.pow(1000, suffixIndex);

  const formattedNum = scaledNum.toFixed(1).replace(/\.?0+$/, "");

  return `${formattedNum}${suffixes[suffixIndex]}`;
}
