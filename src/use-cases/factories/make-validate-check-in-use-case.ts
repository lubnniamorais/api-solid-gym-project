import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

import { ValidateCheckInUseCase } from '../validate-check-in';

function makeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const validateCheckInUseCase = new ValidateCheckInUseCase(
    prismaCheckInsRepository,
  );

  return validateCheckInUseCase;
}

export { makeValidateCheckInUseCase };
