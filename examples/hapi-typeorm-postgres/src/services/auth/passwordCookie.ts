import { In } from 'typeorm';
import { ServerRouteConfig } from '../../types';
import User from '../../db/entity/User';
import getRepository, { RepositoryTypes } from '../../db/repository/index';
import { logger } from '../../shared/logger';

const ServerErrorKeys = {
  INVALID_CREDENTIALS: 'IncorrectCredentials'
};

const loginUser: ServerRouteConfig = {
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
        `/login.html?error=${ServerErrorKeys.INVALID_CREDENTIALS}`
      );
    }

    let passwordMatch = false;
    const repo = await getRepository(RepositoryTypes.USER);
    const account = <User>await repo.findOne({
      userName: userName
    });

    logger.info('Basic Auth; Loging in', userName);

    if (!account) {
      logger.warn(`Login Failed: Username "${userName}" not found`);
      return h.redirect(
        `/login.html?error=${ServerErrorKeys.INVALID_CREDENTIALS}`
      );
    }

    passwordMatch = await request.server.methods.comparePassword(
      password,
      account.password
    );

    if (passwordMatch) {
      request.cookieAuth.set({
        id: account.id,
        loggedIn: true,
        userName: account.userName
      });
      return h.redirect('/');
    }
    logger.warn(`Login Failed: Wrong password for username "${userName}"`);
    return h.redirect(
      `/login.html?error=${ServerErrorKeys.INVALID_CREDENTIALS}`
    );
  }
};

const registerUser: ServerRouteConfig = {
  method: 'POST',
  path: '/auth/register',
  options: {
    auth: false
  },
  async handler(request, h) {
    logger.debug('Registering user...', request.cookieAuth.id, request.payload);
    const { userName, password } = request.payload;

    if (!userName || !password) {
      return h.redirect(`/register.html?error=MissingInfo`);
    }
    const repo = await getRepository(RepositoryTypes.USER);

    const account = await repo.findOne({
      userName
    });

    if (account) {
      return h.redirect(`/register.html?error=AccountExists`);
    }

    const hashedPassword = await request.server.methods.hashPassword(password);
    const record = repo.create({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@email.com',
      userName: userName,
      password: hashedPassword
    });
    repo.save(record);

    return h.redirect(`/login.html`);
  }
};

const register = async server => {
  const userRepo = await getRepository(RepositoryTypes.USER);

  server.auth.strategy('password-cookie', 'cookie', {
    cookie: {
      name: 'sid-example',
      password: process.env.SESSION_SECRET,
      domain: 'example.com',
      isSameSite: 'Lax',
      isSecure: false
    },
    redirectTo: '/login.html',
    validateFunc: async (request, sessions) => {
      const sessionIds = sessions.id
        ? [sessions.id]
        : (sessions || []).map(x => x.id);
      const account = await userRepo.findOne({
        id: In(sessionIds)
      });

      if (!account) {
        return { valid: false };
      }

      return {
        valid: true,
        credentials: { id: account.id, userName: account.userName }
      };
    }
  });

  server.route([loginUser, registerUser]);
};

export default {
  name: 'password-cookie',
  register,
  dependencies: ['@hapi/cookie']
};
