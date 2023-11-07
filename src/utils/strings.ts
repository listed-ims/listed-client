export const toTitleCase = (string: string): string => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const truncate = (string: string, maxLength: number): string => {
  return string.length <= maxLength
    ? string
    : string.slice(0, maxLength) + "...";
};
