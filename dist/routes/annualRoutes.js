"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const annualController_1 = require("../controllers/annualController");
const isManager_1 = require("../middlewares/isManager");
const router = express_1.default.Router();
router.route('/annual-leaves/:id').get(annualController_1.getAnnualLeaves);
router.route('/annual-current/:id').get(annualController_1.getCurrentAnnual);
router.route('/new-annual').post(annualController_1.makeNewAnnualRequest);
router
    .route('/annual')
    .get(isManager_1.isManager, annualController_1.getStaffAnnualRequests)
    .delete(annualController_1.deleteRequest)
    .put(isManager_1.isManager, annualController_1.requestAnswer);
exports.default = router;
