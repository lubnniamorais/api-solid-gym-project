import { describe, it, expect, beforeEach } from 'vitest';

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

import { GetUserMetricsUseCase } from './get-user-metrics';

let checkInsRepository: InMemoryCheckInsRepository;
let getUserMetricsUseCase: GetUserMetricsUseCase;

describe('Get user metrics use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository);
  });

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    });

    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });
});
