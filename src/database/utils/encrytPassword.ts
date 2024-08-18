import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
export const $encrytToHash = async (password: string) => {
  return await bcrypt.hash(password, saltOrRounds);
};
export const $encrytToPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
