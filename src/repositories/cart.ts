import {PrismaClient} from "@prisma/client"
import {IAddCart, ICartItem, ICartRepository, IGetCarts} from "."
import {
  DATA_CART_ITEM_SELECT,
  DATA_CART_SELECT,
  DATA_PRODUCT_SELECT,
} from "../const"

export default class CartRepository implements ICartRepository {
  constructor(private prisma: PrismaClient) {}

  public getCarts(id: number): Promise<IGetCarts> {
    return this.prisma.cart.findUniqueOrThrow({
      where: {id: id},
      select: DATA_CART_SELECT,
    })
  }
  public createCart(userId: string, total: number): Promise<IAddCart> {
    console.log(userId, total)
    return this.prisma.cart.create({
      data: {
        total,
        User: {
          connect: {id: userId},
        },
      },
      select: DATA_CART_SELECT,
    })
  }
  public addCartItem(productId: number, cartId: number): Promise<ICartItem> {
    return this.prisma.cartItem.create({
      data: {
        cartId,
        productId,
      },
      select: DATA_CART_ITEM_SELECT,
    })
  }
  public deleteCartItemById(id: number): Promise<ICartItem> {
    return this.prisma.cartItem.delete({
      where: {id: Number(id)},
    })
  }
}
