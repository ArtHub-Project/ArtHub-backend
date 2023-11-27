"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_ORDER_SELECT = exports.DATA_ORDER_ITEM_SELECT = exports.DATA_CART_SELECT = exports.DATA_CART_ITEM_SELECT = exports.DATA_PRODUCT_SELECT = exports.DATA_USER_SELECT = exports.JWT_SECRET = void 0;
require("dotenv/config");
const { JWT_SECRET: ENV_JWT_SECRET } = process.env;
if (!ENV_JWT_SECRET)
    throw new Error("JWT_SECRET environment variable is not configured");
exports.JWT_SECRET = ENV_JWT_SECRET;
exports.DATA_USER_SELECT = {
    id: true,
    name: true,
    username: true,
    registeredAt: true,
};
exports.DATA_PRODUCT_SELECT = {
    id: true,
    name: true,
    imageUrl: true,
    description: true,
    price: true,
    type: true,
    collection: true,
    createdAt: true,
    updatedAt: true,
    User: { select: exports.DATA_USER_SELECT },
};
exports.DATA_CART_ITEM_SELECT = {
    id: true,
    productId: true,
    Product: {
        select: {
            id: true,
            name: true,
            imageUrl: true,
            price: true,
            type: true,
        },
    },
};
exports.DATA_CART_SELECT = {
    id: true,
    total: true,
    createdAt: true,
    User: { select: { id: true, name: true } },
    CartItem: { select: exports.DATA_CART_ITEM_SELECT },
};
exports.DATA_ORDER_ITEM_SELECT = {
    id: true,
    productId: true,
    Product: {
        select: {
            id: true,
            name: true,
            imageUrl: true,
            price: true,
            type: true,
        },
    },
};
exports.DATA_ORDER_SELECT = {
    id: true,
    total: true,
    createdAt: true,
    User: { select: { id: true, name: true } },
    OrderItem: { select: exports.DATA_ORDER_ITEM_SELECT },
};
