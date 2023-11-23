import {ICartItem, IUser} from "../repositories"

export interface IAddCartItemDto {
  productId: number
  cartId: number
}

export interface ICartItemDto {
  id: number
  productId: number
}

export interface ICartDto {
  id: number
  total: number
  createdAt: Date
  User: IUser
}

export interface ICreateCartDto {
  total: number
}

export interface IGetCartsDto {
  id: number
  total: number
  createdAt: Date
  User: IUser
  CartItem: ICartItem[]
}
