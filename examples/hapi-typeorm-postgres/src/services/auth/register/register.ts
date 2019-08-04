'use strict';
import { ServerRouteConfig } from '../types';
import getRepository, { RepositoryTypes } from '../../../db/repository/index';

const register: ServerRouteConfig = {
  method: 'POST',
  path: '/auth/register',
  options: {
    auth: false
  },
  async handler(request, h) {
    console.debug(
      'Registering user...',
      request.cookieAuth.id,
      request.payload
    );
    const { username, password } = request.payload;

    if (username && password) {
      const repo = await getRepository(RepositoryTypes.USER);

      // console.info('Auth; Got repo', repo);
      const account = await repo.findOne({
        username: username,
        password
      });

      const hashedPassword = await request.server.methods.hashPassword(
        password
      );
      const er = repo.create({
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@email.com',
        userName: username,
        password: hashedPassword
      });
      repo.save(er);
    }
    return h.redirect(`/login.html`);
  }
};

export default register;
