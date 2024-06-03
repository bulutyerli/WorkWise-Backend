"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.firebase = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
exports.firebase = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)(serviceAccount),
});
exports.auth = (0, auth_1.getAuth)(exports.firebase);
