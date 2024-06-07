import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Check if the passed object has empty values and return boolean
 * @param object
 * @returns boolean
 */
export const checkEmptyValues = (object: object) => {
  return Object.values(object).some((value) => !value);
};

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Makes a fetch request with error handling.
 * @template T - The expected return type.
 * @param url - The URL to fetch.
 * @param options - Optional fetch options.
 * @returns A promise that resolves to the parsed JSON response.
 */
export const fetchWithHandling = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }
    return await response.json();
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Unknown error");
  }
};
