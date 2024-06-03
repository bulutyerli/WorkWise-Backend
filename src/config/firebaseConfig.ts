import { initializeApp, App, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export const firebase: App = initializeApp({
  credential: cert({
    projectId: process.env.GCP_PROJECT_ID,
    clientEmail: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
    privateKey: process.env.GCP_PRIVATE_KEY,
  }),
});

export const auth = getAuth(firebase);
