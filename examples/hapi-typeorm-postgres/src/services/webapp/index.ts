import { ServerRouteConfig } from '../../types';

const getWebApp: ServerRouteConfig = {
  method: 'GET',
  path: '/',
  options: {
    auth: 'session'
  },
  async handler(request, h) {
    return h.response(```<html><script src="<cdn-path>"></html>```);
  }
};

export default getWebApp;
