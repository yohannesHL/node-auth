import { Router, Request, Response } from 'express';
import { In } from 'typeorm';
import { User, Session } from '../../db/entity';
import getRepository, { RepositoryTypes } from '../../db/repository/index';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Bcrypt from 'bcrypt';

const PASSWORD_SALT_ROUNDS = 10;

async function hashPassword(password: string) {
  const salt = await Bcrypt.genSalt(PASSWORD_SALT_ROUNDS);
  const hashedPassword = await Bcrypt.hash(password, salt);
  return hashedPassword;
}

async function comparePassword(password: string, hashedPassword: string) {
  return await Bcrypt.compare(password, hashedPassword);
}

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ userName: username });

      if (!user) return done(null, false);
      if (!comparePassword(password, user.password)) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

const PasswordAuthRouter = Router();

PasswordAuthRouter.get('/login', async function listAllUsers(
  request: Request,
  response: Response
) {
  passport.authenticate(
    'local',
    { failureRedirect: '/login.html' },
    (req, res) => {
      res.redirect('/');
    }
  );
});

PasswordAuthRouter.get('/register', async function getUser(
  request: Request,
  response: Response
) {
  const { userName, password } = request.body;

  if (!userName || !password) {
    return response.redirect(`/register.html?error=MissingInfo`);
  }
  const repo = await getRepository(RepositoryTypes.USER);

  const account = await User.findOne({
    userName,
  });

  if (account) {
    return response.redirect(`/register.html?error=AccountExists`);
  }

  const hashedPassword = await hashPassword(password);
  const record = User.create({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@email.com',
    userName: userName,
    password: hashedPassword,
  });
  repo.save(record);

  return response.redirect(`/login.html`);
});

PasswordAuthRouter.post('/logout', async function create(
  request: Request,
  response: Response
) {
  // TODO:
});

export default PasswordAuthRouter;
