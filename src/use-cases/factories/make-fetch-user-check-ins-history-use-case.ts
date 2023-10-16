import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history';

function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
    prismaCheckInsRepository,
  );

  return fetchUserCheckInsHistoryUseCase;
}

export { makeFetchUserCheckInsHistoryUseCase };
