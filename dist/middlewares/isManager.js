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
exports.isManager = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const authRepository_1 = require("../repositories/authRepository");
const isManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    const manager_roles = [1, 2, 3, 4, 5, 9, 12, 19, 20, 21, 22, 23];
    try {
        if (!token) {
            return next(new ErrorHandler_1.ErrorHandler(404, 'No token provided'));
        }
        const decodedToken = yield firebaseConfig_1.auth.verifyIdToken(token);
        if (!decodedToken) {
            return next(new ErrorHandler_1.ErrorHandler(401, 'Unauthorized'));
        }
        const uid = decodedToken.uid;
        const userRole = yield (0, authRepository_1.fetchUserRole)(uid);
        if (userRole && manager_roles.includes(userRole.role_id)) {
            return next();
        }
        else {
            return next(new ErrorHandler_1.ErrorHandler(401, 'Unauthorized'));
        }
    }
    catch (error) {
        console.error('Error verifying ID token:', error);
        next(error);
    }
});
exports.isManager = isManager;
