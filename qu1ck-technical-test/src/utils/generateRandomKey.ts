/**
 * generate a random key for components
 * @returns string with random key
 */
export const randomKey = () => {
  return `${Math.random()}${new Date().toDateString()}${Math.random()}`;
};
