export const localeDate = (string) => {
  const date = new Date(string);
  return date.toLocaleDateString('id-ID');
};

export const localeDateTime = (string) => {
  const date = new Date(string);
  return date.toLocaleString('id-ID');
};
