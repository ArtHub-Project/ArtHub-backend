import { sign } from "jsonwebtoken";
import { IUserHandler } from ".";
import { IUserRepository } from "../repositories";
import { verifyPassword, hashPassword } from "../utils/bcrypt";
import { JWT_SECRET } from "../const";
import { RequestHandler } from "express";
import { ICreateUserDto, IUserDto } from "../dto/user";
import { IErrorDto } from "../dto/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AuthStatus } from "../middlewares/jwt";

export default class UserHandler implements IUserHandler {
  constructor(private repo: IUserRepository) {}

  public login: IUserHandler["login"] = async (req, res) => {
    const { username, password: plaintext } = req.body;
    try {
      const { password, id } = await this.repo.findByUsername(username);

      if (!verifyPassword(plaintext, password))
        throw new Error("Invalid username or password");

      const accessToken = sign({ id }, JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: "12h",
        issuer: "ArtHub-backend",
        subject: "user-credential",
      });

      return res.status(200).json({ accessToken }).end();
    } catch (error) {
      console.error(error);

      return res
        .status(401)
        .json({ message: "Invalid username or password" })
        .end();
    }
  };

  public registration: RequestHandler<
    {},
    IUserDto | IErrorDto,
    ICreateUserDto
  > = async (req, res) => {
    const { name, username, password } = req.body;
    if (typeof name !== "string" || name.length === 0)
      return res.status(400).json({ message: "name is invalid" }).end();
    if (typeof username !== "string" || username.length === 0)
      return res.status(400).json({ message: "username is invalid" }).end();
    if (typeof password !== "string" || password.length < 5)
      return res.status(400).json({ message: "password is invalid" }).end();

    try {
      const { id, registeredAt } = await this.repo.create({
        name,
        username,
        password: hashPassword(password),
        email: "",
        imageUrl: "",
        bio: "",
        address: "",
      });
      return res.status(201).json({
        id,
        name,
        registeredAt: `${registeredAt}`,
        username,
      });
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
          .end();
      }
      return res
        .status(500)
        .json({
          message: `Internal Server Error`,
        })
        .end();
    }
  };
  public getPersonalInfo: RequestHandler<
    {},
    IUserDto | IErrorDto,
    unknown,
    unknown,
    AuthStatus
  > = async (req, res) => {
    try {
      const { registeredAt, ...others } = await this.repo.findById(
        res.locals.user.id
      );

      return res
        .status(200)
        .json({ ...others, registeredAt: registeredAt.toISOString() })
        .end();
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal Server Error" }).end();
    }
  };
}
