import { initializeApp, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export const firebase: App = initializeApp();

export const auth = getAuth(firebase);
