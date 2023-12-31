"use strict";
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
exports.default = (product) => {
    const _a = product.User, { registeredAt } = _a, userInfo = __rest(_a, ["registeredAt"]), { createdAt, updatedAt } = product, productInfo = __rest(product, ["User", "createdAt", "updatedAt"]);
    return Object.assign(Object.assign({}, productInfo), { User: Object.assign(Object.assign({}, userInfo), { registeredAt: registeredAt.toISOString() }), createdAt: createdAt.toISOString(), updatedAt: updatedAt.toISOString() });
};
