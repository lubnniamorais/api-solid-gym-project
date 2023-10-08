import { CheckIn, Prisma } from '@prisma/client';

import { CheckInsRepository } from '../check-ins-repository';

import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';

class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = [];

  async create({
    user_id,
    gym_id,
    validated_at,
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

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }
}

export { InMemoryCheckInsRepository };
