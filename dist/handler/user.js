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
const library_1 = require("@prisma/client/runtime/library");
const bcrypt_1 = require("../utils/bcrypt");
class UserHandler {
    constructor(repo) {
        this.registration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, username, password } = req.body;
            if (typeof name !== "string" || name.length === 0)
                return res.status(400).json({ message: "name is invalid" }).end();
            if (typeof username !== "string" || username.length === 0)
                return res.status(400).json({ message: "username is invalid" }).end();
            if (typeof password !== "string" || password.length < 5)
                return res.status(400).json({ message: "password is invalid" }).end();
            try {
                const { id: registeredId, name: registeredName, username: registeredUsername, registeredAt, } = yield this.repo.create({
                    name,
                    username,
                    password: (0, bcrypt_1.hashPassword)(password),
                    email: "",
                    imageUrl: "",
                    bio: "",
                });
                return res.status(201).json({
                    id: registeredId,
                    name: registeredName,
                    registeredAt: `${registeredAt}`,
                    username: registeredUsername,
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
        this.repo = repo;
    }
}
exports.default = UserHandler;
