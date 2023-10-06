import { CheckIn, Prisma } from '@prisma/client';

import { CheckInsRepository } from '../check-ins-repository';

import { randomUUID } from 'node:crypto';

class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = [];

  async create({
    user_id,
    gym_id,
    validated_at,
    created_at,
  }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id,
      gym_id,
      validated_at: validated_at ? new Date(validated_at) : null,
      created_at: new Date(),
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }
}

export { InMemoryCheckInsRepository };
