// Convierte una cadena a camelCase

function toCamelCase(str: string): string {
  const s = str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
  return s.charAt(0).toLowerCase() + s.slice(1);
}

// Convierte todas las claves de un objeto (o array de objetos) a camelCase
export function keysToCamelCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(keysToCamelCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        toCamelCase(key),
        keysToCamelCase(value),
      ])
    );
  }
  return obj;
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
