import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@lordjs/tickethub-common';
import { postgresWrapper } from '../postgres-wrapper';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

router.get('/api/ecom', async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany();
  res.send({ success: allUsers.length });
});

export { router as showOrderRouter };
