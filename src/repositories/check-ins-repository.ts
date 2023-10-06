import { CheckIn, Prisma } from '@prisma/client';

interface CheckInsRepository {
  create({
    user_id,
    gym_id,
    validated_at,
    created_at,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
}

export { CheckInsRepository };