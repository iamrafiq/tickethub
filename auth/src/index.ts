import express from 'express';
import 'express-async-errors';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-errors';
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
app.listen(3000, () => {
  console.log('auth port 3000');
});
