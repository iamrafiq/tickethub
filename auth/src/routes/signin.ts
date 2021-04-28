import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { validateRequest } from '@lordjs/tickethub-common';
import { BadRequestError } from '@lordjs/tickethub-common';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password must be between 4 and 20'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const exisitingUser = await User.findOne({ email });
    if (!exisitingUser) {
      throw new BadRequestError('Invalid credential');
    }
    const passwordMatch = await Password.compare(
      exisitingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError('Invalid credential');
    }

    // Generate JWT

    const userJwt = jwt.sign(
      {
        id: exisitingUser.id,
        email: exisitingUser.email,
      },
      process.env.JWT_KEY!
    );

    //Store JWT on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(exisitingUser);
  }
);

export { router as signinRouter };
