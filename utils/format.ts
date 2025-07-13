/**
 * Formats a number as a price string with 2 decimal places
 * @param price - The price to format
 * @returns Formatted price string with currency symbol
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Formats clothing sizes for display
 * @param size - The size to format
 * @returns Formatted size string
 */
export const formatSize = (size: string): string => {
  return size.toUpperCase();
};

/**
 * Formats color names for display
 * @param color - The color to format
 * @returns Formatted color string
 */
export const formatColor = (color: string): string => {
  return color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
};

/**
 * Formats a number to show in a shortened format (e.g., 1.2k, 3.4m)
 * @param num - The number to format
 * @returns Formatted string
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};
