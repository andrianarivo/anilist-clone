import clsx, { type ClassValue } from "clsx";

/**
 * CN (classNames) utility function for merging Tailwind CSS classes
 * Combines clsx for conditional class merging
 */
export function cn(...inputs: ClassValue[]) {
	return clsx(inputs);
}
