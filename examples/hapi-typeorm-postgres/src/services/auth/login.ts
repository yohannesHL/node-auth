'use strict';
import { ServerRouteConfig } from '../types';
import getRepository, { RepositoryTypes } from '../../repository';
import Bcrypt from 'bcrypt';

const login: ServerRouteConfig = {
  method: 'POST',
  path: '/auth',
  options: {
    auth: false
  },
  async handler(request, h) {
    console.debug('Logining in user', request.cookieAuth.id, request.payload);
    const { username, password } = request.payload;
    const account = await getRepository(RepositoryTypes.USER).find({
      username: username
    });

    console.info(password, account.password, password === account.password);
    if (!account || !(await Bcrypt.compare(password, account.password))) {
      console.debug('Incorrect login', account);

      return h.redirect('/login.html');
    }
    console.debug('Login success', account);

    request.cookieAuth.set({ id: account.id });

    return h.redirect('/');
  }
};

export default login;
