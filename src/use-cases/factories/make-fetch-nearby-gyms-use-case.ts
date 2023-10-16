import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms';

function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(
    prismaGymsRepository,
  );

  return fetchNearbyGymsUseCase;
}

export { makeFetchNearbyGymsUseCase };
