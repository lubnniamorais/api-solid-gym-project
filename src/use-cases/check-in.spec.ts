import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { CheckInUseCase } from './check-in';
import { Decimal } from '@prisma/client/runtime/library';

let checkInsRepositoryInMemory: InMemoryCheckInsRepository;
let gymsRepositoryInMemory: InMemoryGymsRepository;
let checkInUseCase: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepositoryInMemory = new InMemoryCheckInsRepository();
    gymsRepositoryInMemory = new InMemoryGymsRepository();
    checkInUseCase = new CheckInUseCase(
      checkInsRepositoryInMemory,
      gymsRepositoryInMemory,
    );

    gymsRepositoryInMemory.gyms.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-8.2723789),
      longitude: new Decimal(-35.9478861),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check-in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -8.2723789,
      userLongitude: -35.9478861,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));
    // Garantindo que estamos criando dois check-ins na mesma data

    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -8.2723789,
      userLongitude: -35.9478861,
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -8.2723789,
        userLongitude: -35.9478861,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0));
    // Garantindo que estamos criando dois check-ins, porém em dias diferentes

    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -8.2723789,
      userLongitude: -35.9478861,
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -8.2723789,
      userLongitude: -35.9478861,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check-in on distant gym', async () => {
    gymsRepositoryInMemory.gyms.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-8.2905281),
      longitude: new Decimal(-35.9850549),
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -8.2723789,
        userLongitude: -35.9478861,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
