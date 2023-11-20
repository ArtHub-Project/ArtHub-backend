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
}