"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_USER_SELECT = exports.JWT_SECRET = void 0;
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
