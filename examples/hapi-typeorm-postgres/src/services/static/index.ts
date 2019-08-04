import Path from 'path';

const register = server => {
  const staticPath = Path.join(__dirname, '../../public');

  console.info('Setting up static routes...', __dirname, staticPath);
  server.path(staticPath);
  server.route({
    method: 'GET',
    path: '/{static*}',
    options: {
      tags: ['static', 'user'],
      auth: false
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
