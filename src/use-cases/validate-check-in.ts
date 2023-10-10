import { CheckIn } from '@prisma/client';

import { CheckInsRepository } from '@/repositories/check-ins-repository';

import { ResourceNotFoundError } from './errors/resource-not-found-error';
import dayjs from 'dayjs';
import { LateCheckInValidateError } from './errors/late-check-in-validate-error';

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}

export { ValidateCheckInUseCase };
