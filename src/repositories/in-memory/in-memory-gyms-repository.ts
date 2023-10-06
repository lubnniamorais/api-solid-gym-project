import { Gym } from '@prisma/client';

import { GymsRepository } from '../prisma/gyms-repository';

class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async findById(id: string) {
    const findGym = this.gyms.find((gym) => gym.id === id);

    if (!findGym) {
      return null;
    }

    return findGym;
  }
}

export { InMemoryGymsRepository };
