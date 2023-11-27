"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const");
class ProductRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAllProducts() {
        return this.prisma.product.findMany({
            select: const_1.DATA_PRODUCT_SELECT,
        });
    }
    getProductById(id) {
        return this.prisma.product.findUniqueOrThrow({
            where: { id },
            select: const_1.DATA_PRODUCT_SELECT,
        });
    }
    createProduct(userId, createProduct) {
        return this.prisma.product.create({
            data: Object.assign(Object.assign({}, createProduct), { User: {
                    connect: { id: userId },
                } }),
            select: const_1.DATA_PRODUCT_SELECT,
        });
    }
    updateProduct(id, updateProduct) {
        return this.prisma.product.update({
            where: { id },
            data: Object.assign({}, updateProduct),
            select: const_1.DATA_PRODUCT_SELECT,
        });
    }
    deleteProduct(id) {
        return this.prisma.product.delete({
            where: { id },
            select: const_1.DATA_PRODUCT_SELECT,
        });
    }
}
exports.default = ProductRepository;
