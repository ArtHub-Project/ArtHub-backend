const { JWT_SECRET: ENV_JWT_SECRET } = process.env;
import { Prisma } from "@prisma/client";

if (!ENV_JWT_SECRET)
  throw new Error("JWT_SECRET environment variable is not configured");

export const JWT_SECRET = ENV_JWT_SECRET;

export const DATA_USER_SELECT: Prisma.UserSelect = {
  id: true,
  name: true,
  username: true,
  registeredAt: true,
};

export const DATA_PRODUCT_SELECT: Prisma.ProductSelect = {
  id: true,
  name: true,
  imageUrl: true,
  description: true,
  price: true,
  type: true,
  collection: true,
  createdAt: true,
  updatedAt: true,
  User: { select: DATA_USER_SELECT },
};
