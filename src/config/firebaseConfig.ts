import { initializeApp, App, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export const firebase: App = initializeApp({
  credential: applicationDefault(),
});

export const auth = getAuth(firebase);
