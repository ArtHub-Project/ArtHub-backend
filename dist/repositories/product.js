"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const");
class ProductRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAllProducts() {
        return this.prisma.product.findMany({
            include: {
                User: {
                    select: const_1.DATA_USER_SELECT,
                },
            },
        });
    }
}
exports.default = ProductRepository;