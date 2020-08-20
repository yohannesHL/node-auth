import { Router, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { User } from '../../db/entity';
import LocalPassword from './local-password';

const AuthRouter = Router();

AuthRouter.use(LocalPassword)



export default AuthRouter;
