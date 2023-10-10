import { CheckIn, Prisma } from '@prisma/client';

interface CheckInsRepository {
  create({
    user_id,
    gym_id,
    validated_at,
    created_at,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  findById(id: string): Promise<CheckIn | null>;
  countByUserId(userId: string): Promise<number>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}

export { CheckInsRepository };
