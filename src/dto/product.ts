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
  postedBy: IUserDto;
}
