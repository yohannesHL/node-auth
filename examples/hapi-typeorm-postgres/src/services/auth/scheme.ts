'use strict';
import defaultLogin from './login';

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

  server.auth.strategy('github', 'bell', {
    provider: 'github',
    password: 'cookie_encryption_password_secure',
    clientId: 'my_github_client_id',
    clientSecret: 'my_github_client_secret',
    isSecure: false // not using HTTPS
  });

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
  register,
  dependencies: '@hapi/cookie @hapi/bell'
};
