'use strict';
import defaultLogin from './login';
import Boom from '@hapi/boom';

const register = server => {
  // server.auth.default()
  // server.register
  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'sid-example',
      password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
      isSecure: false
    },
    redirectTo: '/login.html',
    validateFunc: async (request, session) => {
      //decode JWT to get user data
      const account = true; //await users.find(user => user.id === session.id);
      console.debug('validating Login success', account, request.path, session);

      if (!account) {
        return { valid: false };
      }

      return { valid: true, credentials: account };
    }
  });

  // .verify(auth)
  const scheme = function(server, options) {
    console.info('registered custom scheme', server, options);
    return {
      authenticate: function(request, h) {
        const req = request.raw.req;
        const authorization = req.headers.authorization;
        if (!authorization) {
          throw Boom.unauthorized(null, 'Custom');
        }

        return h.authenticated({ credentials: { user: 'john' } });
      }
    };
  };

  server.auth.scheme('custom', scheme); //
  // server.auth.strategy('api-restrict', 'ip-whitelist', [
  //   '209.225.49.0/24',
  //   '216.33.197.0/24',
  //   '216.33.196.0/24',
  //   '63.128.82.0/24',
  //   '63.128.83.0/24',
  //   '63.128.94.0/24'
  // ]); // route.  options: { auth: 'localhost' }

  // server.auth.strategy('github', 'bell', {
  //   provider: 'github',
  //   password: 'cookie_encryption_password_secure',
  //   clientId: 'my_github_client_id',
  //   clientSecret: 'my_github_client_secret',
  //   isSecure: false // not using HTTPS
  // });

  server.auth.default('session');

  // server.ext('onRequest', (request, h) => {
  //   console.info('onRequest', request);
  //   return h.continue;
  // });

  // server.ext('Authorization', (...request) => {
  //   console.info('Authorization', request);
  // });

  // server.ext('Authentication', (...request) => {
  //   console.info('Authentication', request);
  // });

  // server.ext('onPreAuth', (request, h) => {
  //   console.info('onPreAuth', request);
  //   return h.continue;
  // });

  // server.ext('onPostAuth', (request, h) => {
  //   console.info('onPostAuth', request);
  //   return h.continue;
  // });

  // onPreAuth, Authorization, Authentication, onRequest

  server.route([defaultLogin]);
};

export default {
  name: 'auth',
  register
  // dependencies: '@hapi/cookie @hapi/bell'
};
