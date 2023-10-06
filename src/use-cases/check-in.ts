import { CheckIn } from '@prisma/client';

import { UsersRepository } from '@/repositories/users-repository';

import { InvalidCredentialsError } from './errors/invalid-credentials-error';

import { compare } from 'bcryptjs';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { prisma } from '@/lib/prisma';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }
}

export { CheckInUseCase };
