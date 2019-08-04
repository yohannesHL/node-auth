import Path from 'path';

const register = server => {
  console.info(__dirname);
  server.path(Path.join(__dirname, '../../public'));
  server.route({
    method: 'GET',
    path: '/{static*}',
    handler: {
      directory: {
        path: Path.join(__dirname, '../../public'),
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
