import simpleLogin from './simple/login';
import simpleRegister from './simple/register';
import getRepo, { RepositoryTypes } from '../../db/repository';

const register = async server => {
  const userRepo = await getRepo(RepositoryTypes.USER);

  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'sid-example',
      password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
      domain: 'example.com',
      isSameSite: 'Lax',
      isSecure: true
    },
    redirectTo: '/login.html',
    validateFunc: async (request, sessions) => {
      const account = await userRepo.findOne(user =>
        sessions.map(x => x.id).includes(user.id)
      );

      if (!account) {
        return { valid: false };
      }

      return {
        valid: true,
        credentials: { id: account.id, userName: account.userName }
      };
    }
  });

  server.auth.default('session');

  server.route([simpleLogin, simpleRegister]);
};

export default {
  name: 'auth',
  register,
  dependencies: ['@hapi/cookie']
};
