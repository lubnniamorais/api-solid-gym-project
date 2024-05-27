import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { env } from './env';
import { ZodError } from 'zod';

import fastifyJwt from '@fastify/jwt';

import { usersRoutes } from './http/controllers/users/routes';
import { gymsRoutes } from './http/controllers/gyms/routes';
import { checkInsRoutes } from './http/controllers/check-ins/routes';

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    // a cada intervalo de 10 minutos, eu vou checar novamente se esse usuário tem ali
    // o refresh token para criar um novo JWT para ele.
    expiresIn: '10m',
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: Here we should log to on external tool like DataDog/NewRelic/Sentry
  }

  reply.status(500).send({ message: 'Internal server error' });
});

export { app };
