import { Request, ResponseToolkit, Server } from 'hapi';

export default function setupNotFoundMiddleware(server: Server) {
  server.ext('onPreResponse', (request: Request, h: ResponseToolkit) => {
    const response = request.response;
    if (response.isBoom && response.output.statusCode === 404) {
      return h.file('./404.html').code(404);
    }
    return h.continue;
  });
}
