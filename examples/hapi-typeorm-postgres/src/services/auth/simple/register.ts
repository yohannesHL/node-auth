import { ServerRouteConfig } from '../types';
import getRepository, { RepositoryTypes } from '../../../db/repository/index';
import { logger } from '../../../shared/logger';

const register: ServerRouteConfig = {
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

export default register;
