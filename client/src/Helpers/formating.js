export const toDateTimeString = (string) => {
  const dateObj = new Date(string);
  return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
};
