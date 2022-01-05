export const toDateTimeString = (string) => {
  const dateObj = new Date(string);
  return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
};

export const shorten = (str, maxLength) => {
  return str.length > maxLength ? `${str.substring(0, maxLength)} ...` : str;
};
