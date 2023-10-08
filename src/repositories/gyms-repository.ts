import { Gym, Prisma } from '@prisma/client';

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
}

export { GymsRepository };
