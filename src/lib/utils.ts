import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateColors(
  baseColor: string,
  darkMode: boolean = false
): Record<string, string> {
  // This is a simplified version - in reality, you'd use color manipulation
  // libraries to generate proper color ramps based on the base color
  return {
    primary: baseColor,
    primaryLight: darkMode ? lightenColor(baseColor, 20) : lightenColor(baseColor, 40),
    primaryDark: darkMode ? darkenColor(baseColor, 40) : darkenColor(baseColor, 20),
    background: darkMode ? "#121212" : "#ffffff",
    surface: darkMode ? "#1e1e1e" : "#f9fafb",
    text: darkMode ? "#ffffff" : "#111827",
    textSecondary: darkMode ? "#a0aec0" : "#4b5563",
  };
}

// Simplified color manipulation functions
function lightenColor(color: string, percent: number): string {
  // Basic implementation - in production, use a proper color library
  const hex = color.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.min(255, Math.round(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.round(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.round(b + (255 - b) * (percent / 100)));

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function darkenColor(color: string, percent: number): string {
  // Basic implementation - in production, use a proper color library
  const hex = color.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.max(0, Math.round(r * (1 - percent / 100)));
  g = Math.max(0, Math.round(g * (1 - percent / 100)));
  b = Math.max(0, Math.round(b * (1 - percent / 100)));

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}