import Bcrypt from 'bcrypt';

const PASSWORD_SALT_ROUNDS = 10;

export async function hashPassword(password) {
  const salt = await Bcrypt.genSalt(PASSWORD_SALT_ROUNDS);
  const hashedPassword = await Bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(password, hashedPassword) {
  return await Bcrypt.compare(password, hashedPassword);
}

// TODO: move to simple strat

async function setupServerMethods(server) {
  server.method('hashPassword', hashPassword);
  server.method('comparePassword', comparePassword);
}

export default setupServerMethods;
