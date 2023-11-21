import { Product, User } from "@prisma/client";
import { ICreateUserDto, IUserDto } from "../dto/user";
import { IProductDto } from "../dto/product";


export interface IUser {
  id: string;
  name: string;
  username: string;
  registeredAt: Date;
}

export interface IProduct extends Omit<Product, "userId"> {
  User: IUser;
}

export interface IUserRepository {
  findByUsername(username: string): Promise<User>;
  create(user: ICreateUserDto): Promise<IUser>;
  findById(id: string): Promise<IUser>;
}

export interface IProductRepository {
  getAllProducts(): Promise<IProduct[]>;
  getProductById(id: number): Promise<IProduct>
}
