import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

import { CreateGymUseCase } from '../create-gym';

function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository();
  const registerUseCase = new CreateGymUseCase(prismaGymsRepository);

  return registerUseCase;
}

export { makeCreateGymUseCase };
