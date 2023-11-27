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
      if (isNaN(id)) throw new Error("Id isNaN");
      const result = await this.repo.getProductById(id);
      return res.status(200).json(result).end();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message }).end();
      }
      return res.status(500).json({ message: "internal server error" }).end();
    }
  };
  
  public createProduct: IProductHandler["createProduct"]
= async (req, res) => {
  try {
    const {name, imageUrl,description,type,collection,price} = req.body 
    if (typeof price !== "number")
      return res.status(400).send({message: "price is not a number"})
    const createProduct= await this.repo.createProduct(res.locals.user.id, { name, imageUrl, description, type, collection, price, })
    const productResponse = productMapper(createProduct);
    return res.status(201).json(productResponse).end()
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return res.status(400).json({message: error.message}).end()
    }
    return res.status(500).json({message: "internal server error"}).end()
  }
}

public updateProduct: IProductHandler["updateProduct"] = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const product = await this.repo.getProductById(id)
    const {name, imageUrl,description,type,collection,price} = req.body 
    if (isNaN(id)) return res.status(400).send({message: "id invalid"})
    if (typeof price !== "number")
      return res.status(400).send({message: "price is not a number"})
    if (product.User.id !== res.locals.user.id)
      throw new Error("You're not the owner of this Product")
    const updeteData = await this.repo.updateProduct(id, {
      name,
      imageUrl,
      description,
      type,
      collection,
      price,
      updatedAt:new Date()
    })

    const productResponse = productMapper(updeteData);
    return res.status(200).json(productResponse).end()
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return res.status(400).json({message: error.message}).end()
    }
    return res.status(500).json({message: "internal server error"}).end()
  }
}
public deleteProduct: IProductHandler["deleteProduct"] = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const productId = Number(req.params.id);
    const check = await this.repo.getProductById(productId);
    if (userId !== check.User.id) throw new Error("OwnerId is invalid");
    const result = await this.repo.deleteProduct(productId)
    const contentResponse = productMapper(result);
  return res.status(200).json(contentResponse).end()
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return res.status(400).json({message: "Not found"}).end()
    }
    return res.status(500).json({message: "internal server error"}).end()
  }
}
}
