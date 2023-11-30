import { PrismaClient } from "@prisma/client";
import { ICart, ICartItem, ICartRepository, ICarts } from ".";
import { DATA_CART_ITEM_SELECT, DATA_CART_SELECT } from "../const";
import { IErrorDto } from "../dto/error";

export default class CartRepository implements ICartRepository {
  constructor(private prisma: PrismaClient) {}

  public getCarts(userId: string): Promise<ICarts[]> {
    return this.prisma.cart.findMany({
      where: {
        User: {
          id: userId,
        },
      },
      select: DATA_CART_SELECT,
    });
  }
  public createCart(userId: string, total: number): Promise<ICart> {
    return this.prisma.cart.create({
      data: {
        total,
        User: {
          connect: { id: userId },
        },
      },
      select: DATA_CART_SELECT,
    });
  }
  public addCartItem(productId: number, cartId: number): Promise<ICartItem> {
    return this.prisma.cartItem.create({
      data: {
        cartId,
        productId,
      },
      select: DATA_CART_ITEM_SELECT,
    });
  }
  public deleteCartItemById(id: number): Promise<ICartItem> {
    return this.prisma.cartItem.delete({
      where: { id: Number(id) },
    });
  }
  public async deleteCartItem(): Promise<void> {
    await this.prisma.cartItem.deleteMany({});
  }
}
