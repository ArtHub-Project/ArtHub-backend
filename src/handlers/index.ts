import { RequestHandler } from "express";
import { ICredentialDto, ILoginDto } from "../dto/auth";
import { IErrorDto } from "../dto/error";
import { ICreateUserDto, IUserDto } from "../dto/user";
import { AuthStatus } from "../middlewares/jwt";
import {
  IProductDto,
  IcreateProductDto,
  IupdateProductDto,
} from "../dto/product";
import { IOrders, IProduct } from "../repositories";
import {
  ICartDto,
  ICartItemDto,
  IAddCartItemDto,
  IGetCartsDto,
} from "../dto/cart";
import { IOrderDto } from "../dto/order";
import { Product } from "@prisma/client";

export interface ID {
  id: number;
}

export interface Total {
  total: number;
}
export interface IUserHandler {
  login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto>;
  registration: RequestHandler<{}, IUserDto | IErrorDto, ICreateUserDto>;
  getPersonalInfo: RequestHandler<
    {},
    IUserDto | IErrorDto,
    unknown,
    undefined,
    AuthStatus
  >;
}

export interface IProductHandler {
  getAllProducts: RequestHandler<{}, IProductDto[] | IErrorDto>;
  getProductById: RequestHandler<{ id: string }, IProduct | IErrorDto>;
  createProduct: RequestHandler<
    {},
    IProductDto | IErrorDto,
    IcreateProductDto,
    undefined,
    AuthStatus
  >;
  updateProduct: RequestHandler<
    ID,
    IProductDto | IErrorDto,
    IupdateProductDto,
    undefined,
    AuthStatus
  >;
  deleteProduct: RequestHandler<
    ID,
    IProductDto | IErrorDto,
    undefined,
    AuthStatus
  >;
}

export interface ICartHandler {
  getAllItemInCart: RequestHandler<
    {},
    IGetCartsDto | IErrorDto,
    undefined,
    AuthStatus
  >;
  createCart: RequestHandler<
    {},
    ICartDto | IErrorDto,
    Total,
    undefined,
    AuthStatus
  >;
  addCartItem: RequestHandler<
    {},
    ICartItemDto | IErrorDto,
    IAddCartItemDto,
    undefined,
    AuthStatus
  >;
  deleteCartItemById: RequestHandler<
    ID,
    ICartItemDto | IErrorDto,
    undefined,
    AuthStatus
  >;
  deleteCartItem: RequestHandler<
    {},
    IErrorDto,
    undefined,
    undefined,
    AuthStatus
  >;
}
export interface IOrderHandler {
  getAllOrder: RequestHandler<{}, IOrders[]>;
  createOrder: RequestHandler<
    {},
    IOrderDto | IErrorDto,
    ID,
    undefined,
    AuthStatus
  >;
}
