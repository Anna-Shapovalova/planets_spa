export const transformString = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`;

export const transformNumber = (str: string) => (
  str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
);
