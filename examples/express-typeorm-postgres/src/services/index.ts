import { Application,IRoute, Request, Response } from 'express';
import APIRouter from './api/index';



export default async function registerRoutes(app: Application) {

  app.use('/api', APIRouter)

}
