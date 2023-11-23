import {PrismaClient} from "@prisma/client"
import express from "express"
import {
  ICartRepository,
  IProductRepository,
  IUserRepository,
} from "./repositories"
import UserRepository from "./repositories/user"
import {ICartHandler, IProductHandler, IUserHandler} from "./handlers"
import UserHandler from "./handlers/user"
import JWTMiddleware from "./middlewares/jwt"
import ProductRepository from "./repositories/product"
import ProductHandler from "./handlers/product"
import CartRepository from "./repositories/cart"
import CartHandler from "./handlers/cart"

const PORT = Number(process.env.PORT || 8888)
const app = express()
const clnt = new PrismaClient()

const userRepo: IUserRepository = new UserRepository(clnt)
const productRepo: IProductRepository = new ProductRepository(clnt)
const cartRepo: ICartRepository = new CartRepository(clnt)

const userHandler: IUserHandler = new UserHandler(userRepo)
const productHandler: IProductHandler = new ProductHandler(productRepo)
const cartHandler: ICartHandler = new CartHandler(cartRepo, productRepo)

const jwtMiddleware = new JWTMiddleware()

app.use(express.json())

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to ArtHub")
})

const userRouter = express.Router()
const authRouter = express.Router()
const productRouter = express.Router()
const cartRouter = express.Router()

app.use("/user", userRouter)
app.use("/auth", authRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)

authRouter.post("/login", userHandler.login)
authRouter.get("/me", jwtMiddleware.auth, userHandler.getPersonalInfo)

userRouter.post("/", userHandler.registration)

productRouter.get("/", productHandler.getAllProducts)
productRouter.get("/:id", productHandler.getProductById)

cartRouter.post("/add", jwtMiddleware.auth, cartHandler.addCartItem)
cartRouter.delete("/delete", jwtMiddleware.auth, cartHandler.deleteCartItemById)

cartRouter.post("/", jwtMiddleware.auth, cartHandler.createCart)
cartRouter.get("/", jwtMiddleware.auth, cartHandler.getAllItemInCart)

app.listen(PORT, () => {
  console.log(`ArtHub is up at ${PORT}`)
})
