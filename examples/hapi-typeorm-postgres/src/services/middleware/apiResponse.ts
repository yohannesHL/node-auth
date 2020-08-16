import { Request, ResponseToolkit, Server } from 'hapi';

export default function setupApiResponseMiddleware(server: Server) {
  server.ext('onPreResponse', (request: Request, h: ResponseToolkit) => {
    const response = request.response;

    if (
      !response.isBoom &&
      typeof response.source === 'object' &&
      /^\/api\/.*$/.test(request.path)
    ) {
      response.source.status = response.statusCode;
    }
    return h.continue;
  });
}
