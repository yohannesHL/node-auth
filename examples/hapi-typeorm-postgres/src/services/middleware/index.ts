import setupApiResponseMiddleware from './apiResponse';
import setupErrorResponseMiddleware from './errorResponse';
import { Server } from 'hapi';

export default function setupMiddleware(server: Server) {
  setupErrorResponseMiddleware(server);
  setupApiResponseMiddleware(server);
}
