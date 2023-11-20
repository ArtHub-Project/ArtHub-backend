import { PrismaClient } from "@prisma/client";
import express from "express";
import { IUserRepository } from "./repositories";
import UserRepository from "./repositories/user";
import { IUserHandler } from "./handlers";
import UserHandler from "./handlers/user";

const PORT = Number(process.env.PORT || 8888);
const app = express();
const clnt = new PrismaClient();

const userRepo: IUserRepository = new UserRepository(clnt);
const userHandler: IUserHandler = new UserHandler(userRepo);

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to ArtHub");
});

const userRouter = express.Router();
const authRouter = express.Router();

app.use("/user", userRouter);
app.use("/auth", authRouter);
authRouter.post("/login", userHandler.login);
userRouter.post("/", userHandler.registration);

app.listen(PORT, () => {
  console.log(`ArtHub is up at ${PORT}`);
});
