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
exports.requestAnswer = exports.getStaffAnnualRequests = exports.deleteRequest = exports.makeNewAnnualRequest = exports.getCurrentAnnual = exports.getAnnualLeaves = void 0;
const annualRepository_1 = require("../repositories/annualRepository");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const totalAnnualLeave_1 = require("../utils/totalAnnualLeave");
const annualSchema_1 = require("../schemas/annualSchema");
function getAnnualLeaves(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const staffId = req.params.id;
            if (!staffId) {
                return next(new ErrorHandler_1.ErrorHandler(400, 'No id given'));
            }
            const annualLeaves = yield (0, annualRepository_1.fetchAnnualLeaves)(Number(staffId));
            if (!annualLeaves) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'Annual leave not found'));
            }
            if (annualLeaves.length === 0) {
                return res.status(200).json([]);
            }
            res.status(200).json(annualLeaves);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAnnualLeaves = getAnnualLeaves;
function getCurrentAnnual(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const staffId = req.params.id;
            const allowed_annual = 20;
            if (!staffId) {
                return next(new ErrorHandler_1.ErrorHandler(400, 'No id given'));
            }
            const annualLeave = yield (0, annualRepository_1.fetchCurrentAnnual)(Number(staffId));
            if (!annualLeave) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'Annual leave not found'));
            }
            if (annualLeave.length === 0) {
                return res.status(200).json(20);
            }
            const totalAnnual = allowed_annual - (0, totalAnnualLeave_1.totalAnnualLeave)(annualLeave);
            res.status(200).json(totalAnnual);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getCurrentAnnual = getCurrentAnnual;
function makeNewAnnualRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { firebase_id, starting_date, end_date, user_id } = req.body;
            const validatedData = annualSchema_1.annualSchema.parse({
                user_id,
                firebase_id,
                starting_date: new Date(starting_date),
                end_date: new Date(end_date),
                status: 'pending',
            });
            yield (0, annualRepository_1.insertAnnualRequest)(validatedData);
            res
                .status(201)
                .json({ success: true, message: 'Annual request created successfully' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.makeNewAnnualRequest = makeNewAnnualRequest;
function deleteRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requestId = req.query.requestId;
            yield (0, annualRepository_1.deleteAnnualRequest)(Number(requestId));
            res.status(204).send();
        }
        catch (error) { }
    });
}
exports.deleteRequest = deleteRequest;
function getStaffAnnualRequests(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const managerId = req.query.managerId;
            const annualRequests = yield (0, annualRepository_1.fetchEmployeeAnnualRequests)(Number(managerId));
            if (annualRequests.length === 0) {
                return res.status(200).json([]);
            }
            res.status(200).json(annualRequests);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getStaffAnnualRequests = getStaffAnnualRequests;
function requestAnswer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { requestId, status } = req.body;
            console.log('Started now');
            if (!status || !requestId) {
                return next(new ErrorHandler_1.ErrorHandler(400, 'Status or ID not provided'));
            }
            yield (0, annualRepository_1.answerAnnualRequest)(Number(requestId), status);
            res.status(200).send();
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
exports.requestAnswer = requestAnswer;
