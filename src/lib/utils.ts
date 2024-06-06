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
