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
exports.isAuth = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token) {
            return next(new ErrorHandler_1.ErrorHandler(401, 'Forbidden'));
        }
        const decodedToken = yield firebaseConfig_1.auth.verifyIdToken(token);
        if (!decodedToken) {
            return next(new ErrorHandler_1.ErrorHandler(401, 'Forbidden'));
        }
        next();
    }
    catch (error) {
        console.error('Error verifying ID token:', error);
        next(error);
    }
});
exports.isAuth = isAuth;
