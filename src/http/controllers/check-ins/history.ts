import { FastifyRequest, FastifyReply } from 'fastify';

import { z } from 'zod';

import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case';

async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryGymsQueryParams = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryGymsQueryParams.parse(request.query);

  const fetchUsersCheckInsHistoryUseCase =
    makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fetchUsersCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}

export { history };
