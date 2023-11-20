import {ICreateUserDto} from "../dto/user"

export interface IUser {
  id: string
  name: string
  username: string
  registeredAt: Date
}

export interface IUserRepository {
  create(user: ICreateUserDto): Promise<IUser>
}
