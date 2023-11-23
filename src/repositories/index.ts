import {Product, User} from "@prisma/client"
import {ICreateUserDto, IUserDto} from "../dto/user"

export interface IUserRepository {
  findByUsername(username: string): Promise<User>
  create(user: ICreateUserDto): Promise<IUser>
  findById(id: string): Promise<IUser>
}

export interface IUser {
  id: string
  name: string
  username: string
  registeredAt: Date
}

export interface ICartItem {
  id: number
  cartId: number
  productId: number
}

export interface IAddCart {
  id: number
  total: number
  createdAt: Date
  User: IUser
}

export interface IGetCarts {
  id: number
  total: number
  createdAt: Date
  User: IUser
  CartItem: ICartItem[]
}

export interface IProduct extends Omit<Product, "userId"> {
  User: IUser
}

export interface IProductRepository {
  getAllProducts(): Promise<IProduct[]>
  getProductById(id: number): Promise<IProduct>
}

export interface ICartRepository {
  getCarts(id: number): Promise<IGetCarts>
  createCart(userId: string, total: number): Promise<IAddCart>
  addCartItem(productId: number, cartId: number): Promise<ICartItem>
  deleteCartItemById(id: number): Promise<ICartItem>
}
