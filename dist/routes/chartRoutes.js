"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hierarchyController_1 = require("../controllers/hierarchyController");
const router = express_1.default.Router();
router.route('/hierarchy').get(hierarchyController_1.getHierarchy);
exports.default = router;
