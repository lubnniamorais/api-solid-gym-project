import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

import { RegisterUseCase } from '../register';

function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaUserRepository);

  return registerUseCase;
}

export { makeRegisterUseCase };
