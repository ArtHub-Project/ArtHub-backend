import { IUserDto } from "./user";

export interface IProductDto {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  postedBy: IUserDto;
}
