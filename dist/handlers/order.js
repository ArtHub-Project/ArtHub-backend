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
class OrderHandler {
    constructor(repoCart, repoProduct, repoOrder) {
        this.repoCart = repoCart;
        this.repoProduct = repoProduct;
        this.repoOrder = repoOrder;
        this.getAllOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dataOrder = yield this.repoOrder.getAllOrder(res.locals.user.id);
            return res.status(200).json(dataOrder).end();
        });
        this.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [{ CartItem }] = yield this.repoCart.getCarts(res.locals.user.id);
                let total = 0;
                for (let i = 0; i < CartItem.length; i++) {
                    const { price } = yield this.repoProduct.getProductById(CartItem[i].productId);
                    total += price;
                }
                const _a = yield this.repoOrder.createOder(res.locals.user.id, total), { id: orderId } = _a, result = __rest(_a, ["id"]);
                const OrderItems = [];
                for (let i = 0; i < CartItem.length; i++) {
                    const { id, productId } = CartItem[i];
                    const dataItem = { orderId, id, productId };
                    OrderItems.push(dataItem);
                    yield this.repoOrder.createOderItem(CartItem[i].productId, orderId);
                    yield this.repoCart.deleteCartItemById(CartItem[i].id);
                }
                const dataOrder = Object.assign(Object.assign({ id: orderId }, result), { OrderItem: OrderItems });
                return res.status(200).json(dataOrder).end();
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message }).end();
                }
                return res.status(500).json({ message: "internal server error" }).end();
            }
        });
    }
}
exports.default = OrderHandler;
