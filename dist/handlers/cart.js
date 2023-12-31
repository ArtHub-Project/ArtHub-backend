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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
class CartHandler {
    constructor(repoCart, repoProduct) {
        this.repoCart = repoCart;
        this.repoProduct = repoProduct;
        this.getAllItemInCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const [_a] = yield this.repoCart.getCarts(res.locals.user.id), { id: Id, total } = _a, resultCart = __rest(_a, ["id", "total"]);
                let sum = 0;
                for (let i = 0; i < resultCart.CartItem.length; i++) {
                    const { price } = yield this.repoProduct.getProductById(resultCart.CartItem[i].productId);
                    sum += price;
                }
                return res
                    .status(200)
                    .json(Object.assign({ id: Id, total: sum }, resultCart))
                    .end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message }).end();
                }
                return res.status(500).json({ message: "internal server error" }).end();
            }
        });
        this.createCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let total = 0;
                const dataCart = yield this.repoCart.createCart(res.locals.user.id, total);
                return res.status(200).json(dataCart).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message }).end();
                }
                return res.status(500).json({ message: "internal server error" }).end();
            }
        });
        this.addCartItem = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.body;
                if (isNaN(productId))
                    return res.status(404).json({ message: "Not a Number" });
                const checkCart = yield this.repoCart.getCarts(res.locals.user.id);
                if (checkCart[0].User.id !== res.locals.user.id)
                    return res.status(403).json({ message: "You're not the owner" });
                const cart = yield this.repoCart.addCartItem(productId, checkCart[0].id);
                return res.status(201).json(cart).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message }).end();
                }
                return res.status(500).json({ message: "internal server error" }).end();
            }
        });
        this.deleteCartItemById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                if (isNaN(id))
                    return res.status(404).json({ message: "Not a Number" });
                const cart = yield this.repoCart.getCarts(res.locals.user.id);
                if (cart[0].User.id !== res.locals.user.id)
                    return res.status(403).json({ message: "You're not the owner" });
                const result = yield this.repoCart.deleteCartItemById(id);
                return res.status(200).json(result).end();
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
exports.default = CartHandler;
