'use strict';
import { ServerRouteConfig } from '../types';
import getRepository, { RepositoryTypes } from '../../../db/repository/index';

const login: ServerRouteConfig = {
  method: 'POST',
  path: '/auth',
  options: {
    auth: false
  },
  async handler(request, h) {
    console.debug('Login request...', request.cookieAuth.id, request.payload);
    const { username, password } = request.payload;
    let errorType = 'NotAuthenticated';

    if (username && password) {
      let passwordMatch = false;
      const repo = await getRepository(RepositoryTypes.USER);
      const account = await repo.findOne({
        userName: username,
        id: 2
      });

      console.info('Simple Auth; Loging in...', account);

      if (account) {
        passwordMatch = await request.server.methods.comparePassword(
          password,
          account.password
        );
        console.info(
          'Matches:',
          password,
          account.password,
          password === account.password,
          passwordMatch
        );
      }

      if (passwordMatch) {
        console.debug('Login success!!!', account);
        request.cookieAuth.set({ id: account.id });
        return h.redirect('/');
      }
      errorType = 'IncorrectCredentials';
      console.debug('Incorrect login!!!', passwordMatch, account);
    }
    return h.redirect(`/login.html?error=${errorType}`);
  }
};

export default login;
