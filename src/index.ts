import {PrismaClient} from "@prisma/client"
import express from "express"
import {IUserRepository} from "./repository"
import UserRepository from "./repository/user"
import {IUserHandler} from "./handler"
import UserHandler from "./handler/user"

const PORT = Number(process.env.PORT || 8888)
const app = express()
const clnt = new PrismaClient()

const userRepo: IUserRepository = new UserRepository(clnt)
const userHandler: IUserHandler = new UserHandler(userRepo)

app.use(express.json())

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to ArtHub")
})

const userRouter = express.Router()
app.use("/user", userRouter)
userRouter.post("/", userHandler.registration)

app.listen(PORT, () => {
  console.log(`ArtHub is up at ${PORT}`)
})
