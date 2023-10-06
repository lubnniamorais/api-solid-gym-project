import { CheckIn, Prisma } from '@prisma/client';

interface CheckInsRepository {
  create({
    user_id,
    gym_id,
    validated_at,
    created_at,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}

export { CheckInsRepository };
