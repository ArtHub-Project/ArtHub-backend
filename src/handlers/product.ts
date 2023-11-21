import { IProductHandler } from ".";
import { IProductRepository } from "../repositories";
import productMapper from "../utils/product.mapper";

export default class ProductHandler implements IProductHandler {
  constructor(private repo: IProductRepository) {}

  public getAllProducts: IProductHandler["getAllProducts"] = async (
    req,
    res
  ) => {
    const result = await this.repo.getAllProducts();
    const productResponse = result.map((product) => {
      return productMapper(product);
    });

    return res.status(200).json(productResponse).end();
  };

  public getProductById: IProductHandler["getProductById"] = async (
    req,
    res
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.repo.getProductById(id);
      return res.status(200).json(result).end();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message }).end();
      }
      return res.status(500).json({ message: "internal server error" }).end();
    }
  };
}
