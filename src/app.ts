import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const app = fastify();

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: 'Lubnnia Morais',
    email: 'lubnnia@gmail.com',
  },
});

export { app };
