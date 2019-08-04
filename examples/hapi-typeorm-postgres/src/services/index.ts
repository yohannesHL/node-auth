import { Server } from '@hapi/hapi';
import Cookie from '@hapi/cookie';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import Bell from '@hapi/bell';
import Auth from './auth';
import Api from './api';
import Static from './static';
import Docs from './docs';
import setupMiddleware from './middleware';
import setupServerMethods from '../methods';

export default async function registerServices(server: Server) {
  try {
    await server.register([Cookie, Inert, Vision, Bell, Auth]);

    await server.register([Api, Docs], {
      routes: { prefix: '/api' }
      // auth: { mode: 'required' }
    });

    await server.register([Static]);

    setupMiddleware(server);
    setupServerMethods(server);
  } catch (err) {
    console.error('Error creating services', err);
  }
}
