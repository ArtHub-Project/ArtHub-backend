import { PrismaClient } from "@prisma/client";
import express from "express";
import { IProductRepository, IUserRepository } from "./repositories";
import UserRepository from "./repositories/user";
import { IProductHandler, IUserHandler } from "./handlers";
import UserHandler from "./handlers/user";
import JWTMiddleware from "./middlewares/jwt";
import ProductRepository from "./repositories/product";
import ProductHandler from "./handlers/product";

const PORT = Number(process.env.PORT || 8888);
const app = express();
const clnt = new PrismaClient();

const userRepo: IUserRepository = new UserRepository(clnt);
const productRepo: IProductRepository = new ProductRepository(clnt);

const userHandler: IUserHandler = new UserHandler(userRepo);
const productHandler: IProductHandler = new ProductHandler(productRepo);

const jwtMiddleware = new JWTMiddleware();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to ArtHub");
});

const userRouter = express.Router();
const authRouter = express.Router();
const productRouter = express.Router();

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);

authRouter.post("/login", userHandler.login);
authRouter.get("/me", jwtMiddleware.auth, userHandler.selfcheck);

userRouter.post("/", userHandler.registration);

productRouter.get("/", productHandler.getAllProducts);
productRouter.get("/:id", productHandler.getProductById);


app.listen(PORT, () => {
  console.log(`ArtHub is up at ${PORT}`);
});
