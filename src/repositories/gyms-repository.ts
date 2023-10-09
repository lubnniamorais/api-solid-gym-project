import { Gym, Prisma } from '@prisma/client';

export interface FindManyNearbyParams {
  latitude: number;
  longitude: number;
}

interface GymsRepository {
  create({
    id,
    title,
    description,
    phone,
    latitude,
    longitude,
  }: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  searchManyByQuery(query: string, page: number): Promise<Gym[]>;
  findManyNearby({ latitude, longitude }: FindManyNearbyParams): Promise<Gym[]>;
}

export { GymsRepository };
