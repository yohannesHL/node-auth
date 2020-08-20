import { Application,IRoute, Request, Response } from 'express';
import APIRouter from './api/index';
import AuthRouter from './auth/index';



export default async function registerRoutes(app: Application) {

  app.use('/api', APIRouter)
  app.use('/auth', AuthRouter)

}
