import { User } from "@prisma/client";

export interface IUserRepository {
  findByUsername(username: string): Promise<User>;
}
