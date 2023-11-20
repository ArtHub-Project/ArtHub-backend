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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("../utils/bcrypt");
const const_1 = require("../const");
const library_1 = require("@prisma/client/runtime/library");
class UserHandler {
    constructor(repo) {
        this.repo = repo;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password: plaintext } = req.body;
            try {
                const { password, id } = yield this.repo.findByUsername(username);
                if (!(0, bcrypt_1.verifyPassword)(plaintext, password))
                    throw new Error("Invalid username or password");
                const accessToken = (0, jsonwebtoken_1.sign)({ id }, const_1.JWT_SECRET, {
                    algorithm: "HS512",
                    expiresIn: "12h",
                    issuer: "ArtHub-backend",
                    subject: "user-credential",
                });
                return res.status(200).json({ accessToken }).end();
            }
            catch (error) {
                console.error(error);
                return res
                    .status(401)
                    .json({ message: "Invalid username or password" })
                    .end();
            }
        });
        this.registration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, username, password } = req.body;
            if (typeof name !== "string" || name.length === 0)
                return res.status(400).json({ message: "name is invalid" }).end();
            if (typeof username !== "string" || username.length === 0)
                return res.status(400).json({ message: "username is invalid" }).end();
            if (typeof password !== "string" || password.length < 5)
                return res.status(400).json({ message: "password is invalid" }).end();
            try {
                const { id, registeredAt } = yield this.repo.create({
                    name,
                    username,
                    password: (0, bcrypt_1.hashPassword)(password),
                    email: "",
                    imageUrl: "",
                    bio: "",
                });
                return res.status(201).json({
                    id,
                    name,
                    registeredAt: `${registeredAt}`,
                    username,
                });
            }
            catch (error) {
                if (error instanceof library_1.PrismaClientKnownRequestError &&
                    error.code === "P2002") {
                    return res
                        .status(500)
                        .json({
                        message: `name is invalid`,
                    })
                        .end();
                }
                return res
                    .status(500)
                    .json({
                    message: `Internal Server Error`,
                })
                    .end();
            }
        });
    }
}
exports.default = UserHandler;
