import { Gym, Prisma } from '@prisma/client';

import { FindManyNearbyParams, GymsRepository } from '../gyms-repository';
import { randomUUID } from 'crypto';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async create({
    id,
    title,
    description,
    phone,
    latitude,
    longitude,
  }: Prisma.GymCreateInput) {
    const gym = {
      id: id ?? randomUUID(),
      title,
      description: description ?? null,
      phone: phone ?? null,
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
      created_at: new Date(),
    };

    this.gyms.push(gym);

    return gym;
  }

  async findById(id: string) {
    const findGym = this.gyms.find((gym) => gym.id === id);

    if (!findGym) {
      return null;
    }

    return findGym;
  }

  async searchManyByQuery(query: string, page: number) {
    return this.gyms
      .filter((gym) => gym.title.includes(query))
      .splice((page - 1) * 20, page * 20);
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      );

      // console.log(distance);

      return distance < 10;
    });
  }
}

export { InMemoryGymsRepository };
