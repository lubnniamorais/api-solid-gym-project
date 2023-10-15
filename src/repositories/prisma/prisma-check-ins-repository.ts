import { CheckIn, Prisma } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

class PrismaCheckInsRepository implements CheckInsRepository {
  async create({
    user_id,
    gym_id,
    validated_at,
    created_at,
  }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data: {
        user_id,
        gym_id,
        validated_at,
        created_at,
      },
    });

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }

  async countByUserId(userId: string): Promise<number> {
    const checkIn = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return checkIn;
  }

  async save(checkIn: CheckIn) {
    const check_in = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: {
        user_id: checkIn.user_id,
        gym_id: checkIn.gym_id,
        validated_at: checkIn.validated_at,
        created_at: checkIn.created_at,
      },
    });

    return check_in;
  }
}

export { PrismaCheckInsRepository };
