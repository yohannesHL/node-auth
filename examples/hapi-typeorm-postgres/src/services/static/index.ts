import Path from 'path';
import { logger } from '../../shared/logger';

const register = server => {
  const staticPath = Path.join(__dirname, '../../public');

  logger.info('Setting up static routes...', staticPath);

  server.path(staticPath);

  server.route({
    method: 'GET',
    path: '/login.html',
    options: {
      auth: false
    },
    handler: {
      file: 'login.html'
    }
  });
  server.route({
    method: 'GET',
    path: '/register.html',
    options: {
      auth: false
    },
    handler: {
      file:'register.html'
    }
  });

  server.route({
    method: 'GET',
    path: '/{static*}',
    options: {
      tags: ['static'],
      auth: 'session'
    },
    handler: {
      directory: {
        path: staticPath,
        redirectToSlash: true,
        listing: true,
        index: true
      }
    }
  });
};

export default {
  name: 'web',
  register
};
