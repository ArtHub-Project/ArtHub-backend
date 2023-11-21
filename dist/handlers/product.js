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
    }
}
exports.default = ProductHandler;
