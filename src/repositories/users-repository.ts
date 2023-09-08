import { Prisma, User } from '@prisma/client';

interface UsersRepository {
  create({ name, email, password_hash }: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export { UsersRepository };
