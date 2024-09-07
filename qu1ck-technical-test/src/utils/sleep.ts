/**
 * sleep is used to lock the code for `x` seconds
 * @param ms seconds for lock in ms
 * @returns promise
 */
export const sleep = (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
