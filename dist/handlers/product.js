"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_mapper_1 = __importDefault(require("../utils/product.mapper"));
class ProductHandler {
    constructor(repo) {
        this.repo = repo;
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.getAllProducts();
            const productResponse = result.map((product) => {
                return (0, product_mapper_1.default)(product);
            });
            return res.status(200).json(productResponse).end();
        });
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id))
                    throw new Error("Id isNaN");
                const result = yield this.repo.getProductById(id);
                return res.status(200).json(result).end();
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message }).end();
                }
                return res.status(500).json({ message: "internal server error" }).end();
            }
        });
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, imageUrl, description, type, collection, price } = req.body;
                if (typeof price !== "number")
                    return res.status(400).send({ message: "price is not a number" });
                const createProduct = yield this.repo.createProduct(res.locals.user.id, { name, imageUrl, description, type, collection, price, });
                const productResponse = (0, product_mapper_1.default)(createProduct);
                return res.status(201).json(productResponse).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message }).end();
                }
                return res.status(500).json({ message: "internal server error" }).end();
            }
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const product = yield this.repo.getProductById(id);
                const { name, imageUrl, description, type, collection, price } = req.body;
                if (isNaN(id))
                    return res.status(400).send({ message: "id invalid" });
                if (typeof price !== "number")
                    return res.status(400).send({ message: "price is not a number" });
                if (product.User.id !== res.locals.user.id)
                    throw new Error("You're not the owner of this Product");
                const updeteData = yield this.repo.updateProduct(id, {
                    name,
                    imageUrl,
                    description,
                    type,
                    collection,
                    price,
                    updatedAt: new Date()
                });
                const productResponse = (0, product_mapper_1.default)(updeteData);
                return res.status(200).json(productResponse).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message }).end();
                }
                return res.status(500).json({ message: "internal server error" }).end();
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = res.locals.user.id;
                const productId = Number(req.params.id);
                const check = yield this.repo.getProductById(productId);
                if (userId !== check.User.id)
                    throw new Error("OwnerId is invalid");
                const result = yield this.repo.deleteProduct(productId);
                const contentResponse = (0, product_mapper_1.default)(result);
                return res.status(200).json(contentResponse).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).json({ message: "Not found" }).end();
                }
                return res.status(500).json({ message: "internal server error" }).end();
            }
        });
    }
}
exports.default = ProductHandler;
