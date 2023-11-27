import { IUserDto } from "./user";

export interface IProductDto {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  type: string;
  collection: string;
  createdAt: string;
  updatedAt: string;
  User : IUserDto;
}

export interface IcreateProductDto {
  name: string;
  imageUrl: string;
  description: string;
  type: string;
  collection: string;
  price: number;
}

export interface IupdateProductDto {
  name: string;
  imageUrl: string;
  description: string;
  type: string;
  collection: string;
  price: number;
}