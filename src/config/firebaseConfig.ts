import { initializeApp, App, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = JSON.parse(
  process.env.GOOGLE_APPLICATION_CREDENTIALS as string
);

export const firebase: App = initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth(firebase);
