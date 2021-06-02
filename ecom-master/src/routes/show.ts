import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@lordjs/tickethub-common';
import { postgresWrapper } from '../postgres-wrapper';
import { PrismaClient } from '@prisma/client';
const { user, post } = new PrismaClient();
const router = express.Router();

router.post('/api/ecom/create/user', async (req: Request, res: Response) => {
  console.log('creating new user');
  const { username } = req.body;
  const userExists = await user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
    },
  });
  if (userExists) {
    return res.status(400).json({
      msg: 'User already exists',
    });
  }

  const newUser = await user.create({
    data: {
      username,
    },
  });
  res.send(newUser);
});

router.post('/api/ecom/create/post', async (req: Request, res: Response) => {
  console.log('create post');
  const { title, post: content, userId } = req.body;

  const userExists = await user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    return res.status(400).json({
      msg: 'User not found',
    });
  }
  const newPost = await post.create({
    data: {
      title,
      post: content,
      userId,
    },
  });
  res.json(newPost);
});

router.get('/api/ecom/get', async (req: Request, res: Response) => {
  const allUsers = await user.findMany({
    select: {
      username: true,
      posts: true,
    },
  });
  res.send({ success: allUsers });
});

export { router as showOrderRouter };
