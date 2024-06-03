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
exports.getHierarchy = void 0;
const rolesRepository_1 = require("../repositories/rolesRepository");
const ErrorHandler_1 = require("../utils/ErrorHandler");
function getHierarchy(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hierarchy = yield (0, rolesRepository_1.fetchHierarchy)();
            if (!hierarchy) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'Could not get the hierarchy data'));
            }
            res.status(200).json({ data: hierarchy });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getHierarchy = getHierarchy;
