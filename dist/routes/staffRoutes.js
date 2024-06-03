"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staffController_1 = require("../controllers/staffController");
const isAdmin_1 = require("../middlewares/isAdmin");
const router = express_1.default.Router();
router.route('/staff').get(staffController_1.getAllStaff).post(isAdmin_1.isAdmin, staffController_1.createNewStaff);
router
    .route('/staff/:id')
    .get(staffController_1.getStaffByID)
    .delete(isAdmin_1.isAdmin, staffController_1.deleteStaff)
    .put(isAdmin_1.isAdmin, staffController_1.updateStaff);
router.route('/staff-dates').get(staffController_1.getStaffDates);
exports.default = router;
