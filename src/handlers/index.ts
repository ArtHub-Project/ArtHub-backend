
import { RequestHandler } from "express";
import { ICredentialDto, ILoginDto } from "../dto/auth";
import { IErrorDto } from "../dto/error";
import {ICreateUserDto, IUserDto} from "../dto/user"

export interface IUserHandler {
  login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto>;
}
export interface IUserHandler {
  registration: RequestHandler<{}, IUserDto | IErrorDto, ICreateUserDto>
}
