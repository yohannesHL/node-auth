'use strict';
import simpleLogin from './login/simple';
import simpleRegister from './register/register';

// import Boom from '@hapi/boom';
import getRepo, { RepositoryTypes } from '../../db/repository';

const register = server => {
  const userRepo = getRepo(RepositoryTypes.USER);
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
      const account = true; //
      const data = await userRepo.find(user => user.id === session.id);
      console.info('#Got data', data, RepositoryTypes);
      console.debug(
        'validating Login... success!',
        account,
        request.path,
        session
      );

      if (!account) {
        console.debug('validating Login... failed!');
        return { valid: false };
      }

      return { valid: true, credentials: account && { userName: 'john' } };
    }
  });

  // .verify(auth)

  // server.auth.scheme('custom', function customScheme(server, options) {
  //   console.info('registered custom scheme', server, options);
  //   return {
  //     authenticate: function(request, h) {
  //       const req = request.raw.req;
  //       const authorization = req.headers.authorization;
  //       if (!authorization) {
  //         throw Boom.unauthorized(null, 'Custom');
  //       }

  //       return h.authenticated({ credentials: { user: 'john' } });
  //     }
  //   };
  // });
  //
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

  server.route([simpleLogin, simpleRegister]);
};

export default {
  name: 'auth',
  register,
  dependencies: ['@hapi/cookie']
};
// let server = new Hapi.server({
//   routes: {
//     plugins: {
//       hapiAuthorization: { roles: ['ADMIN'] }
//     }
//   }
// });
