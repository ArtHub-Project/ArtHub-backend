import {IOrderItem, IUser} from "../repositories"

export interface IOrderDto {
  id: string
  total: number
  createdAt: Date
  User: IUser
  OrderItem: IOrderItem[]
}

