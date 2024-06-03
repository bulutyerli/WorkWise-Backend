"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.firebase = exports.getGCPCredentials = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const getGCPCredentials = () => {
    // for Vercel, use environment variables
    return process.env.GCP_PRIVATE_KEY
        ? {
            credentials: {
                client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GCP_PRIVATE_KEY,
            },
            projectId: process.env.GCP_PROJECT_ID,
        }
        : // for local development, use gcloud CLI
            {};
};
exports.getGCPCredentials = getGCPCredentials;
exports.firebase = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)((0, exports.getGCPCredentials)()),
});
exports.auth = (0, auth_1.getAuth)(exports.firebase);
