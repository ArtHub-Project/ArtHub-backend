import {PrismaClient} from "@prisma/client"
import {IUser, IUserRepository} from "."
import {ICreateUserDto} from "../dto/user"
import {DATA_USER_SELECT} from "../const"

export default class UserRepository implements IUserRepository {
  private prisma: PrismaClient
  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  public async create(user: ICreateUserDto): Promise<IUser> {
    return await this.prisma.user.create({
      data: user,
      select: DATA_USER_SELECT,
    })
  }
}
