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
const cart_1 = __importDefault(require("./repositories/cart"));
const cart_2 = __importDefault(require("./handlers/cart"));
const order_1 = __importDefault(require("./repositories/order"));
const order_2 = __importDefault(require("./handlers/order"));
const cors_1 = __importDefault(require("cors"));
const PORT = Number(process.env.PORT || 8888);
const app = (0, express_1.default)();
const clnt = new client_1.PrismaClient();
const userRepo = new user_1.default(clnt);
const productRepo = new product_1.default(clnt);
const cartRepo = new cart_1.default(clnt);
const orderRepo = new order_1.default(clnt);
const userHandler = new user_2.default(userRepo);
const productHandler = new product_2.default(productRepo);
const cartHandler = new cart_2.default(cartRepo, productRepo);
const orderHendler = new order_2.default(cartRepo, productRepo, orderRepo);
const jwtMiddleware = new jwt_1.default();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.status(200).send("Welcome to ArtHub");
});
const userRouter = express_1.default.Router();
const authRouter = express_1.default.Router();
const productRouter = express_1.default.Router();
const cartRouter = express_1.default.Router();
const orderRouter = express_1.default.Router();
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
authRouter.post("/login", userHandler.login);
authRouter.get("/me", jwtMiddleware.auth, userHandler.getPersonalInfo);
userRouter.post("/", userHandler.registration);
productRouter.get("/", productHandler.getAllProducts);
productRouter.get("/:id", productHandler.getProductById);
productRouter.post("/", jwtMiddleware.auth, productHandler.createProduct);
productRouter.patch("/:id", jwtMiddleware.auth, productHandler.updateProduct);
productRouter.delete("/:id", jwtMiddleware.auth, productHandler.deleteProduct);
cartRouter.post("/add", jwtMiddleware.auth, cartHandler.addCartItem);
cartRouter.delete("/delete", jwtMiddleware.auth, cartHandler.deleteCartItemById);
cartRouter.post("/", jwtMiddleware.auth, cartHandler.createCart);
cartRouter.get("/", jwtMiddleware.auth, cartHandler.getAllItemInCart);
orderRouter.post("/", jwtMiddleware.auth, orderHendler.createOrder);
orderRouter.get("/", jwtMiddleware.auth, orderHendler.getAllOrder);
app.listen(PORT, () => {
    console.log(`ArtHub is up at ${PORT}`);
});
