'use strict';
import { ServerRouteConfig } from '../types/index';
import Bcrypt from 'bcrypt';
import Path from 'path';

export const verifyToken: ServerRouteConfig = {
  method: 'POST',
  path: '/auth/verify',
  options: {
    auth: false
  },
  async handler(request, h) {
    //check JWT token {isvlid}
  }
};
