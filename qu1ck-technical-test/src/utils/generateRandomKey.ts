export const randomKey = () => {
  return `${Math.random()}${new Date().toDateString()}${Math.random()}`;
};
