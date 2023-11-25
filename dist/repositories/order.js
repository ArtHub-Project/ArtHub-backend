"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const");
class OrderRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAllOrder(userId) {
        return this.prisma.order.findMany({
            where: {
                User: {
                    id: userId,
                },
            },
            select: const_1.DATA_ORDER_SELECT,
        });
    }
    createOder(userId, total) {
        return this.prisma.order.create({
            data: {
                total,
                User: {
                    connect: { id: userId },
                },
            },
            select: const_1.DATA_ORDER_SELECT,
        });
    }
    createOderItem(productId, orderId) {
        return this.prisma.orderItem.create({
            data: {
                orderId,
                productId,
            },
            select: const_1.DATA_ORDER_ITEM_SELECT,
        });
    }
}
exports.default = OrderRepository;
