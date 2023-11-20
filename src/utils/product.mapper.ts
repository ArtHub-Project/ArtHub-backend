import { IProductDto } from "../dto/product";
import { IProduct } from "../repositories";

export default (product: IProduct): IProductDto => {
  const {
    User: { registeredAt, ...userInfo },
    createdAt,
    updatedAt,
    ...productInfo
  } = product;

  return {
    ...productInfo,
    postedBy: {
      ...userInfo,
      registeredAt: registeredAt.toISOString(),
    },
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
};
