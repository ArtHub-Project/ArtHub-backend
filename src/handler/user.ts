import {RequestHandler} from "express"
import {IUserHandler} from "."
import {IUserRepository} from "../repository"
import {ICreateUserDto, IUserDto} from "../dto/user"
import {IErrorDto} from "../dto/error"
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library"
import {hashPassword} from "../utils/bcrypt"

export default class UserHandler implements IUserHandler {
  private repo: IUserRepository
  constructor(repo: IUserRepository) {
    this.repo = repo
  }

  public registration: RequestHandler<
    {},
    IUserDto | IErrorDto,
    ICreateUserDto
  > = async (req, res) => {
    const {name, username, password} = req.body
    if (typeof name !== "string" || name.length === 0)
      return res.status(400).json({message: "name is invalid"}).end()
    if (typeof username !== "string" || username.length === 0)
      return res.status(400).json({message: "username is invalid"}).end()
    if (typeof password !== "string" || password.length < 5)
      return res.status(400).json({message: "password is invalid"}).end()

    try {
      const {
        id: registeredId,
        name: registeredName,
        username: registeredUsername,
        registeredAt,
      } = await this.repo.create({
        name,
        username,
        password: hashPassword(password),
        email: "",
        imageUrl: "",
        bio: "",
      })
      return res.status(201).json({
        id: registeredId,
        name: registeredName,
        registeredAt: `${registeredAt}`,
        username: registeredUsername,
      })
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return res
          .status(500)
          .json({
            message: `name is invalid`,
          })
          .end()
      }
      return res
        .status(500)
        .json({
          message: `Internal Server Error`,
        })
        .end()
    }
  }
}
