import {PrismaClient} from "@prisma/client"
import express from "express"
import {IUserRepository} from "./repositories"
import UserRepository from "./repositories/user"
import {IUserHandler} from "./handlers"
import UserHandler from "./handlers/user"
import JWTMiddleware from "./middlewares/jwt"

const PORT = Number(process.env.PORT || 8888)
const app = express()
const clnt = new PrismaClient()

const userRepo: IUserRepository = new UserRepository(clnt)
const userHandler: IUserHandler = new UserHandler(userRepo)

const jwtMiddleware = new JWTMiddleware()

app.use(express.json())

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to ArtHub")
})

const userRouter = express.Router()
const authRouter = express.Router()

app.use("/user", userRouter)
app.use("/auth", authRouter)

authRouter.post("/login", userHandler.login)
authRouter.get("/me", jwtMiddleware.auth, userHandler.selfcheck)

userRouter.post("/", userHandler.registration)

app.listen(PORT, () => {
  console.log(`ArtHub is up at ${PORT}`)
})
