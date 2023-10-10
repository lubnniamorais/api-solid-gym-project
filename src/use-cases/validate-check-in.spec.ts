import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { ValidateCheckInUseCase } from './validate-check-in';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { LateCheckInValidateError } from './errors/late-check-in-validate-error';

let checkInsRepositoryInMemory: InMemoryCheckInsRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe('Validate check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepositoryInMemory = new InMemoryCheckInsRepository();
    validateCheckInUseCase = new ValidateCheckInUseCase(
      checkInsRepositoryInMemory,
    );

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepositoryInMemory.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepositoryInMemory.checkIns[0].validated_at).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to validate an inexistent check-in', async () => {
    expect(() =>
      validateCheckInUseCase.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepositoryInMemory.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    // 1000 milissegundos = 1s
    // 1 segundo * 60 = 1min
    // 1 min * 21 = 21min
    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);
    // Esse método representa quantos minutos representados em
    // milissegundos queremos avançar no tempo

    await expect(() =>
      validateCheckInUseCase.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidateError);
  });
});
