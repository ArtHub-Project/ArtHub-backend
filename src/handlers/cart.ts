import {ICartHandler} from ".";
import {ICartRepository, IProductRepository} from "../repositories";

export default class CartHandler implements ICartHandler {
  constructor(
    private repoCart: ICartRepository,
    private repoProduct: IProductRepository
  ) {}
  public getAllItemInCart: ICartHandler["getAllItemInCart"] = async (
    req,
    res
  ) => {
    try {
      const [{id, total, createdAt, ...resultCart}] =
        await this.repoCart.getCarts(res.locals.user.id);
      let sum = 0;
      for (let i = 0; i < resultCart.CartItem.length; i++) {
        const {price} = await this.repoProduct.getProductById(
          resultCart.CartItem[i].productId
        );
        sum += price;
      }
      return res
        .status(200)
        .json({id, total: sum, createdAt: createdAt.toString(), ...resultCart})
        .end();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return res.status(400).json({message: error.message}).end();
      }
      return res.status(500).json({message: "internal server error"}).end();
    }
  };

  public createCart: ICartHandler["createCart"] = async (req, res) => {
    try {
      const {total} = req.body;
      const {createdAt, ...dataCart} = await this.repoCart.createCart(
        res.locals.user.id,
        total
      );

      return res
        .status(200)
        .json({createdAt: createdAt.toString(), ...dataCart})
        .end();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return res.status(400).json({message: error.message}).end();
      }
      return res.status(500).json({message: "internal server error"}).end();
    }
  };

  public addCartItem: ICartHandler["addCartItem"] = async (req, res) => {
    try {
      const {productId} = req.body;
      if (isNaN(productId))
        return res.status(404).json({message: "Not a Number"});
      const checkCart = await this.repoCart.getCarts(res.locals.user.id);
      if (checkCart[0].User.id !== res.locals.user.id)
        return res.status(403).json({message: "You're not the owner"});
      const cart = await this.repoCart.addCartItem(productId, checkCart[0].id);
      return res.status(201).json(cart).end();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return res.status(400).json({message: error.message}).end();
      }
      return res.status(500).json({message: "internal server error"}).end();
    }
  };

  public deleteCartItemById: ICartHandler["deleteCartItemById"] = async (
    req,
    res
  ) => {
    try {
      const {id} = req.body;
      if (isNaN(id)) return res.status(404).json({message: "Not a Number"});
      const cart = await this.repoCart.getCarts(res.locals.user.id);
      if (cart[0].User.id !== res.locals.user.id)
        return res.status(403).json({message: "You're not the owner"});
      const result = await this.repoCart.deleteCartItemById(id);
      return res.status(200).json(result).end();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return res.status(400).json({message: "Not found"}).end();
      }
      return res.status(500).json({message: "internal server error"}).end();
    }
  };
}
