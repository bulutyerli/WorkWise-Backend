import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

const config = {
  credential: applicationDefault(),
};

export const firebase = admin.apps.length
  ? admin.app()
  : admin.initializeApp(config);
