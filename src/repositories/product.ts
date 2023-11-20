import { PrismaClient } from "@prisma/client";
import { IProduct, IProductRepository } from ".";
import {  DATA_USER_SELECT } from "../const";


export default class ProductRepository implements IProductRepository {
  constructor(private prisma: PrismaClient) {}

  getAllProducts(): Promise<IProduct[]> {
    return this.prisma.product.findMany({
      include: {
        User: {
          select: DATA_USER_SELECT,
        },
      },
    });
  }
  public getProductById(id: number): Promise<IProduct> {
    return this.prisma.product.findUniqueOrThrow({
      where: {id},
      include: {
        User: {
          select: DATA_USER_SELECT,
        },
      },
    })
  }
}
