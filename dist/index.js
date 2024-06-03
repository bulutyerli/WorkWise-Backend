"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const staffRoutes_1 = __importDefault(require("./routes/staffRoutes"));
const financeRoutes_1 = __importDefault(require("./routes/financeRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const chartRoutes_1 = __importDefault(require("./routes/chartRoutes"));
const annualRoutes_1 = __importDefault(require("./routes/annualRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const ErrorHandler_1 = require("./utils/ErrorHandler");
const errors_1 = require("./middlewares/errors");
const isAuth_1 = require("./middlewares/isAuth");
const app = (0, express_1.default)();
const baseUrl = process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL
    : 'http://localhost:5173';
app.use((0, cors_1.default)({
    origin: baseUrl,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(isAuth_1.isAuth);
app.use('/api/v1', staffRoutes_1.default);
app.use('/api/v1', financeRoutes_1.default);
app.use('/api/v1', staffRoutes_1.default);
app.use('/api/v1', categoryRoutes_1.default);
app.use('/api/v1', chartRoutes_1.default);
app.use('/api/v1', authRoutes_1.default);
app.use('/api/v1', annualRoutes_1.default);
app.all('*', (req, res, next) => {
    next(new ErrorHandler_1.ErrorHandler(404, `Can't find ${req.originalUrl} on this server`));
});
app.use(errors_1.globalError);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});
exports.default = app;
