"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const");
class CartRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getCarts(id) {
        return this.prisma.cart.findUniqueOrThrow({
            where: { id: id },
            select: const_1.DATA_CART_SELECT,
        });
    }
    addCart(userId, total) {
        console.log(userId, total);
        return this.prisma.cart.create({
            data: {
                total,
                User: {
                    connect: { id: userId },
                },
            },
            select: const_1.DATA_CART_SELECT,
        });
    }
    createCartItem(productId, cartId) {
        return this.prisma.cartItem.create({
            data: {
                cartId,
                productId,
            },
            select: const_1.DATA_CART_ITEM_SELECT,
        });
    }
    deleteCartItemById(id) {
        return this.prisma.cartItem.delete({
            where: { id: Number(id) },
        });
    }
}
exports.default = CartRepository;
