'use strict';
import { ServerRouteConfig } from '../types/index';
// import Bcrypt from 'bcrypt';
// import Path from 'path';

const githubLogin: ServerRouteConfig = {
  method: 'POST',
  path: '/auth/github',
  options: {
    auth: false
  },
  async handler(request, h) {
    console.debug('Logining in user via github', request.auth, request.payload);
    // const { username, password } = request.payload;

    // console.info(password, account.password, password === account.password);
    // if (!account || !(await Bcrypt.compare(password, account.password))) {
    //   console.debug('Incorrect login', account);

    //   return h.redirect('/login.html');
    // }
    // console.debug('Login success', account);

    // request.cookieAuth.set({ id: account.id });

    return h.redirect('/');
  }
};

export default githubLogin;
