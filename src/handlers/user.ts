import { sign } from "jsonwebtoken";
import { IUserHandler } from ".";
import { IUserRepository } from "../repositories";
import { verifyPassword } from "../utils/bcrypt";
import { JWT_SECRET } from "../const";

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
}
