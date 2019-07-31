import {
  // ServerRoute,
  ResponseObject,
  Request,
  ResponseToolkit
} from '@hapi/core';

export type HResponseObject = ResponseObject;

export interface RequestHandler {
  (request: Request, h: ResponseToolkit): ResponseObject;
}

export interface ServerRouteConfig {
  method: string;
  path: string;
  options?: {};
  handler: RequestHandler;
}

export declare namespace Api {
  export interface RequestHandler {
    (request: Request, h: ResponseToolkit): ResponseObject;
  }

  export type HResponseObject = ResponseObject;

  export interface ServerRouteConfig {
    method: number;
    path: string;
    handler: RequestHandler;
  }
}
