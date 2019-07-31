import { Request, ResponseToolkit, Server } from 'hapi';

// // server.decorate('toolkit', 'success', success);
// //console.log(server.decorations.toolkit);            // ['success']
// const success = function () {

//   return this.response({ status: 'ok' });
// };

// server.decorate('toolkit', 'success', success);
// console.log(server.decorations.toolkit);
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
