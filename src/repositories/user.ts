import { PrismaClient, User } from "@prisma/client";
import { IUserRepository } from ".";

export default class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  public async findByUsername(username: string): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { username },
    });
  }
}
