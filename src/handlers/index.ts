import {RequestHandler} from "express"
import {ICredentialDto, ILoginDto} from "../dto/auth"
import {IErrorDto} from "../dto/error"
import {ICreateUserDto, IUserDto} from "../dto/user"
import {AuthStatus} from "../middlewares/jwt"
import {IProductDto} from "../dto/product"
import {IProduct} from "../repositories"
import {
  ICreateCartDto,
  ICartDto,
  ICartItemDto,
  IAddCartItemDto,
  IGetCartsDto,
} from "../dto/cart"

export interface ID {
  id: number
}

export interface IUserHandler {
  login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto>
  registration: RequestHandler<{}, IUserDto | IErrorDto, ICreateUserDto>
  getPersonalInfo: RequestHandler<
    {},
    IUserDto | IErrorDto,
    unknown,
    undefined,
    AuthStatus
  >
}

export interface IProductHandler {
  getAllProducts: RequestHandler<{}, IProductDto[] | IErrorDto>
  getProductById: RequestHandler<{id: string}, IProduct | IErrorDto>
}

export interface ICartHandler {
  getAllItemInCart: RequestHandler<
    {},
    IGetCartsDto | IErrorDto,
    ID,
    undefined,
    AuthStatus
  >
  createCart: RequestHandler<
    {},
    ICartDto | IErrorDto,
    ICreateCartDto,
    undefined,
    AuthStatus
  >
  addCartItem: RequestHandler<
    {},
    ICartItemDto | IErrorDto,
    IAddCartItemDto,
    undefined,
    AuthStatus
  >
  deleteCartItemById: RequestHandler<
    {},
    ICartItemDto | IErrorDto,
    ID,
    undefined,
    AuthStatus
  >
}
