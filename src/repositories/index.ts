import { User } from "@prisma/client";
import {ICreateUserDto} from "../dto/user"

export interface IUserRepository {
  findByUsername(username: string): Promise<User>;
  create(user: ICreateUserDto): Promise<IUser>
}

export interface IUser {
  id: string
  name: string
  username: string
  registeredAt: Date
}

