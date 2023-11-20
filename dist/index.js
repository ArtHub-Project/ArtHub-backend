"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./repositories/user"));
const user_2 = __importDefault(require("./handlers/user"));
const jwt_1 = __importDefault(require("./middlewares/jwt"));
const product_1 = __importDefault(require("./repositories/product"));
const product_2 = __importDefault(require("./handlers/product"));
const PORT = Number(process.env.PORT || 8888);
const app = (0, express_1.default)();
const clnt = new client_1.PrismaClient();
const userRepo = new user_1.default(clnt);
const productRepo = new product_1.default(clnt);
const userHandler = new user_2.default(userRepo);
const productHandler = new product_2.default(productRepo);
const jwtMiddleware = new jwt_1.default();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.status(200).send("Welcome to ArtHub");
});
const userRouter = express_1.default.Router();
const authRouter = express_1.default.Router();
const productRouter = express_1.default.Router();
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);
authRouter.post("/login", userHandler.login);
authRouter.get("/me", jwtMiddleware.auth, userHandler.selfcheck);
userRouter.post("/", userHandler.registration);
productRouter.get("/", productHandler.getAllProducts);
app.listen(PORT, () => {
    console.log(`ArtHub is up at ${PORT}`);
});
