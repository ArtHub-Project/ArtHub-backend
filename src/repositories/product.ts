import {PrismaClient, Product} from "@prisma/client"
import {IProduct, IProductRepository, IcreateProduct, IupdateProduct} from "."
import {DATA_PRODUCT_SELECT} from "../const"

export default class ProductRepository implements IProductRepository {
  constructor(private prisma: PrismaClient) {}

  public getAllProducts(): Promise<IProduct[]> {
    return this.prisma.product.findMany({
      select: DATA_PRODUCT_SELECT,
    })
  }

  public getProductById(id: number): Promise<IProduct> {
    return this.prisma.product.findUniqueOrThrow({
      where: {id},
      select: DATA_PRODUCT_SELECT,
    })
  }

  public createProduct(userId: string, createProduct: IcreateProduct): Promise<IProduct> {
    return this.prisma.product.create({
      data: {
        ...createProduct,
        User: {
          connect: {id: userId},
        },
      },
      select: DATA_PRODUCT_SELECT,
    })
  }

  public updateProduct(id: number, updateProduct: IupdateProduct): Promise<IProduct> {
    return this.prisma.product.update({
      where: {id},
      data: {...updateProduct},
      select: DATA_PRODUCT_SELECT,
    })
  }

  public deleteProduct(id: number): Promise<IProduct> {
    return this.prisma.product.delete({
      where: {id},
      select: DATA_PRODUCT_SELECT,
    })
  }

}
