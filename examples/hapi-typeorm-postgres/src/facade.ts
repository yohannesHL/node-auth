import { Server, } from '@hapi/hapi';

interface CustomeRoute {

}

class Facade {

    static hapiRoute(routes: CustomeRoute[])  {
        
    }
  // registerPlugin
}
  // API
  // Facade.hapiRoute([]) => hapi.js conforming routes
  // Facade.nestRoute([]) => nest.js conforming routes
  // Facade.expressRoute([]) => nest.js conforming routes
  //


  // TODO: create a common interface that will enable reuse of lis strategy with any framework.

  /**create a common request handler
   * 
   * @param request 
   * 
   * @param h 
   * 
   * @return response object that can be switched based on the framwowrk
   * 
   
    needs: 
    get params: request.cookies, request.payload, request.server.methods or similar
The strategies will have contracts with the faccade API.

  Usage :
  requestHandler = createHandler('Hapi')
  requestHandler.handle

   */