"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const ErrorHandler_1 = require("../utils/ErrorHandler");
const errorDev = (err, res) => {
    console.log(err);
    if (err instanceof ErrorHandler_1.ErrorHandler) {
        return res.status(err.status).json({
            success: err.success,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err,
        stack: err.stack,
    });
};
const errorProd = (err, res) => {
    if (err instanceof ErrorHandler_1.ErrorHandler) {
        return res.status(err.status).json({
            success: err.success,
            message: err.message,
        });
    }
    else {
        console.log('Error', err);
        return res
            .status(500)
            .json({ success: false, message: 'Something went wrong.' });
    }
};
const globalError = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        errorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        errorProd(err, res);
    }
};
exports.globalError = globalError;
