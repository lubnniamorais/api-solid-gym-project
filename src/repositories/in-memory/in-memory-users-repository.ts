import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';

class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create({ name, email, password_hash }: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name,
      email,
      password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const findUser = this.users.find((user) => user.email === email);

    if (!findUser) {
      return null;
    }

    return findUser;
  }

  async findById(id: string) {
    const findUser = this.users.find((user) => user.id === id);

    if (!findUser) {
      return null;
    }

    return findUser;
  }
}

export { InMemoryUsersRepository };
