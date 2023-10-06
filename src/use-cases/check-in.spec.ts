import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { CheckInUseCase } from './check-in';

let checkInsRepositoryInMemory: InMemoryCheckInsRepository;
let checkInUseCase: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepositoryInMemory = new InMemoryCheckInsRepository();
    checkInUseCase = new CheckInUseCase(checkInsRepositoryInMemory);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check-in', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));
    // Garantindo que estamos criando dois check-ins na mesma data

    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-01',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
