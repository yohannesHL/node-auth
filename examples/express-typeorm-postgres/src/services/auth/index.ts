import { Router, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { User } from '../../db/entity';
import localPassword from './local-password';

const AuthRouter = Router();

// AuthRouter.use(function () {

// })

AuthRouter.get('/default', async function listAllUsers(
  request: Request,
  response: Response
) {
  // const postRepository = Post

  const users = await User.find();

  response.send(users);
});

AuthRouter.get('/register', async function getUser(
  request: Request,
  response: Response
) {
  // const postRepository = getManager().getRepository(Post);

  const user = await User.findOne(request.params.id);

  if (!user) {
    response.status(404);
    response.end();
    return;
  }

  response.send(user);
});

AuthRouter.post('/users', async function create(
  request: Request,
  response: Response
) {
  const newPost = User.create(request.body);

  await User.save(newPost);

  response.send(newPost);
});

export default AuthRouter;
