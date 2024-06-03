"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.firebase = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
exports.firebase = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)({
        projectId: process.env.GCP_PROJECT_ID,
        clientEmail: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
        privateKey: process.env.GCP_PRIVATE_KEY,
    }),
});
exports.auth = (0, auth_1.getAuth)(exports.firebase);
