import {PrismaClient} from "@prisma/client"
import {IOrder, IOrderItem, IOrderRepository, IOrders} from "."
import {DATA_ORDER_ITEM_SELECT, DATA_ORDER_SELECT} from "../const"

export default class OrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaClient) {}

  public getAllOrder(userId: string): Promise<IOrders[]> {
    return this.prisma.order.findMany({
      where: {
        User: {
          id: userId,
        },
      },
      select: DATA_ORDER_SELECT,
    })
  }

  public createOder(userId: string, total: number): Promise<IOrder> {
    return this.prisma.order.create({
      data: {
        total,
        User: {
          connect: {id: userId},
        },
      },
      select: DATA_ORDER_SELECT,
    })
  }

  public createOderItem(
    productId: number,
    orderId: string
  ): Promise<IOrderItem> {
    return this.prisma.orderItem.create({
      data: {
        orderId,
        productId,
      },
      select: DATA_ORDER_ITEM_SELECT,
    })
  }
}
