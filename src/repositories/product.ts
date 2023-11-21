import { PrismaClient } from "@prisma/client";
import { IProduct, IProductRepository } from ".";

import { DATA_PRODUCT_SELECT, DATA_USER_SELECT } from "../const";

export default class ProductRepository implements IProductRepository {
  constructor(private prisma: PrismaClient) {}

  public getAllProducts(): Promise<IProduct[]> {
    return this.prisma.product.findMany({
      select: DATA_PRODUCT_SELECT,
    });
  }
  public getProductById(id: number): Promise<IProduct> {
    return this.prisma.product.findUniqueOrThrow({
      where: { id },
      select: DATA_PRODUCT_SELECT,
    });
  }
}
