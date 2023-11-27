import {Product, User} from "@prisma/client"
import {ICreateUserDto} from "../dto/user"

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

export interface ICart {
  id: number
  total: number
  createdAt: Date
  User: IUser
}

export interface ICartItem {
  id: number
  cartId: number
  productId: number
}

export interface ICarts {
  id: number
  total: number
  createdAt: Date
  User: IUser
  CartItem: ICartItem[]
}

export interface IOrder {
  id: string
  total: number
  createdAt: Date
  User: IUser
}
export interface IOrderItem {
  id: number
  orderId: string
  productId: number
}

export interface IOrders {
  id: string
  total: number
  createdAt: Date
  User: IUser
  OrderItem: IOrderItem[]
}

export interface IProduct extends Omit<Product, "userId"> {
  User: IUser
}

export interface IProductRepository {
  getAllProducts(): Promise<IProduct[]>
  getProductById(id: number): Promise<IProduct>
}

export interface ICartRepository {
  getCarts(userId: string): Promise<ICarts[]>
  createCart(userId: string, total: number): Promise<ICart>
  addCartItem(productId: number, cartId: number): Promise<ICartItem>
  deleteCartItemById(id: number): Promise<ICartItem>
}

export interface IOrderRepository {
  getAllOrder(userId: string): Promise<IOrders[]>
  createOder(userId: string, total: number): Promise<IOrder>
  createOderItem(productId: number, orderId: string): Promise<IOrderItem>
}
