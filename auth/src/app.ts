import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from '@lordjs/tickethub-common';
import { NotFoundError } from '@lordjs/tickethub-common';

const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // false allow access to store cookie over http:// connection
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// all means, any type of request get/post/put... if the url not found
//then bellow code will throw a error
app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
