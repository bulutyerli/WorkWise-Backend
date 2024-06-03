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
exports.getAllCategories = void 0;
const categoryRepository_1 = require("../repositories/categoryRepository");
function getAllCategories(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const offices = yield (0, categoryRepository_1.getOffices)();
            const roles = yield (0, categoryRepository_1.getRoles)();
            const departments = yield (0, categoryRepository_1.getDepartments)();
            const shifts = yield (0, categoryRepository_1.getShifts)();
            const managers = yield (0, categoryRepository_1.getAllManagers)();
            res
                .status(200)
                .json({ data: { offices, roles, departments, shifts, managers } });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllCategories = getAllCategories;
