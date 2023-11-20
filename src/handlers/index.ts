import { RequestHandler } from "express";
import { ICredentialDto, ILoginDto } from "../dto/auth";
import { IErrorDto } from "../dto/error";
import { ICreateUserDto, IUserDto } from "../dto/user";
import { AuthStatus } from "../middlewares/jwt";
import { IProductDto } from "../dto/product";

export interface IUserHandler {
  login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto>;
  registration: RequestHandler<{}, IUserDto | IErrorDto, ICreateUserDto>;
  selfcheck: RequestHandler<
    {},
    IUserDto | IErrorDto,
    unknown,
    undefined,
    AuthStatus
  >;
}

export interface IProductHandler {
  getAllProducts: RequestHandler<{}, IProductDto[] | IErrorDto>;
}
