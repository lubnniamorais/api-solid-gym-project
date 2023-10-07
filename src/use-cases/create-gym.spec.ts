import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { describe, it, expect, beforeEach } from 'vitest';

import { CreateGymUseCase } from './create-gym';

let gymsRepositoryInMemory: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepositoryInMemory = new InMemoryGymsRepository();
    createGymUseCase = new CreateGymUseCase(gymsRepositoryInMemory);
  });

  it('should be able to create gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -8.2723789,
      longitude: -35.9478861,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
