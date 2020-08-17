import { ServerRouteConfig } from '../types';
import getRepository, { RepositoryTypes } from '../../../db/repository/index';
import { logger } from '../../../shared/logger';

const ServerErrorKeys = {
  INVALID_CREDENTIAL: 'IncorrectCredentials'
};

const login: ServerRouteConfig = {
  method: 'POST',
  path: '/auth',
  options: {
    auth: false
  },
  async handler(request, h) {
    logger.debug('Login request...', request.cookieAuth.id, request.payload);

    const { userName, password } = request.payload;

    if (!userName || !password) {
      logger.warn(`Login Failed: Missing username and/or password`);
      return h.redirect(
        `/login.html?error=${ServerErrorKeys.INVALID_CREDENTIAL}`
      );
    }

    let passwordMatch = false;
    const repo = await getRepository(RepositoryTypes.USER);
    const account = await repo.findOne({
      userName: userName
    });

    logger.info('Simple Auth; Loging in', userName);

    if (!account) {
      logger.warn(`Login Failed: Username "${userName}" not found`);
      return h.redirect(
        `/login.html?error=${ServerErrorKeys.INVALID_CREDENTIAL}`
      );
    }

    passwordMatch = await request.server.methods.comparePassword(
      password,
      account.password
    );

    if (passwordMatch) {
      request.cookieAuth.set({ id: account.id, loggedIn:true, userName: account.userName });
      return h.redirect('/');
    }
    logger.warn(`Login Failed: Wrong password for username "${userName}"`);
    return h.redirect(
      `/login.html?error=${ServerErrorKeys.INVALID_CREDENTIAL}`
    );
  }
};

export default login;
