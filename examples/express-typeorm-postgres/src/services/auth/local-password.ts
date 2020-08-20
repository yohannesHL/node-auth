import { Router, Request, Response } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Bcrypt from 'bcrypt';
import { User, Session } from '../../db/entity';

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

const LocalAuthRouter = Router();

LocalAuthRouter.post('/', async function listAllUsers(
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

LocalAuthRouter.post('/register', async function getUser(
  request: Request,
  response: Response
) {
  const { userName, password } = request.body;

  if (!userName || !password) {
    return response.redirect(`/register.html?error=MissingInfo`);
  }

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
  User.save(record);

  return response.redirect(`/login.html`);
});

LocalAuthRouter.post('/logout', async function create(
  request: Request,
  response: Response
) {
  // TODO:
});

export default LocalAuthRouter;
