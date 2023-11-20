import {PrismaClient, User} from "@prisma/client"
import {IUser, IUserRepository} from "."
import {ICreateUserDto} from "../dto/user"
import {DATA_USER_SELECT} from "../const"

export default class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  public async findByUsername(username: string): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({
      where: {username},
    })
  }
  public async create(user: ICreateUserDto): Promise<IUser> {
    return await this.prisma.user.create({
      data: user,
      select: DATA_USER_SELECT,
    })
  }
  public async findById(id: string): Promise<IUser> {
    return await this.prisma.user.findUniqueOrThrow({
      where: {id},
      select: DATA_USER_SELECT,
    })
  }
}
