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
exports.getUserRole = void 0;
const authRepository_1 = require("../repositories/authRepository");
const ErrorHandler_1 = require("../utils/ErrorHandler");
function getUserRole(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const firebaseId = req.query.firebaseId;
            const admin_roles = [1, 2, 3, 4, 5, 18, 22];
            const manager_roles = [1, 2, 3, 4, 5, 9, 12, 19, 20, 21, 22, 23];
            if (!firebaseId) {
                return next(new ErrorHandler_1.ErrorHandler(400, 'Firebase ID is required'));
            }
            const userRole = yield (0, authRepository_1.fetchUserRole)(firebaseId);
            if (!userRole) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'User not found'));
            }
            const isAdmin = admin_roles.includes(userRole.role_id);
            const isManager = manager_roles.includes(userRole.role_id);
            res.status(200).json({ isAdmin, isManager, userId: userRole.id });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getUserRole = getUserRole;
