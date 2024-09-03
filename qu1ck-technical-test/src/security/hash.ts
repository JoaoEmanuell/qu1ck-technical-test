import { hashSync, compareSync } from "bcrypt";

const saltOfRounds = 10;

export const generateHash = (value: string) => {
  return hashSync(value, saltOfRounds);
};

export const compareHash = (hash: string, value: string) => {
  return compareSync(value, hash);
};
