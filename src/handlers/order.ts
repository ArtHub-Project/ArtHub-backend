import { IOrderHandler } from ".";
import {
  ICartRepository,
  IOrderItem,
  IOrderRepository,
  IProductRepository,
} from "../repositories";

export default class OrderHandler implements IOrderHandler {
  constructor(
    private repoCart: ICartRepository,
    private repoProduct: IProductRepository,
    private repoOrder: IOrderRepository
  ) {}

  public getAllOrder: IOrderHandler["getAllOrder"] = async (req, res) => {
    const dataOrder = await this.repoOrder.getAllOrder(res.locals.user.id);
    return res.status(200).json(dataOrder).end();
  };

  public createOrder: IOrderHandler["createOrder"] = async (req, res) => {
    try {
      const [{ CartItem }] = await this.repoCart.getCarts(res.locals.user.id);
      let total = 0;
      for (let i = 0; i < CartItem.length; i++) {
        const { price } = await this.repoProduct.getProductById(
          CartItem[i].productId
        );
        total += price;
      }
      const { id: orderId, ...result } = await this.repoOrder.createOder(
        res.locals.user.id,
        total
      );
      const OrderItems: IOrderItem[] = [];
      for (let i = 0; i < CartItem.length; i++) {
        const { id, productId } = CartItem[i];
        const dataItem = { orderId, id, productId };
        OrderItems.push(dataItem);
        await this.repoOrder.createOderItem(CartItem[i].productId, orderId);
        await this.repoCart.deleteCartItemById(CartItem[i].id);
      }
      const dataOrder = {
        id: orderId,
        ...result,
        OrderItem: OrderItems,
      };
      return res.status(200).json(dataOrder).end();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message }).end();
      }
      return res.status(500).json({ message: "internal server error" }).end();
    }
  };
}
