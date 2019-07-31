import setupApiResponseMiddleware from './apiResponse';
import setupNotFoundMiddleware from './notFound';
import {Server} from 'hapi';

export default function setupMiddleware(server: Server) {
    setupNotFoundMiddleware(server);
    setupApiResponseMiddleware(server);
}