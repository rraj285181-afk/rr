import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

declare global {
  var __firebase_app: FirebaseApp | undefined;
  var __firebase_db: Firestore | undefined;
  var __firebase_auth: Auth | undefined;
}

export function initializeFirebase() {
  let app: FirebaseApp;
  let db: Firestore;
  let auth: Auth;

  if (globalThis.__firebase_app) {
    app = globalThis.__firebase_app;
    db = globalThis.__firebase_db!;
    auth = globalThis.__firebase_auth!;
  } else {
    if (getApps().length > 0) {
      app = getApp();
    } else {
      app = initializeApp(firebaseConfig);
    }
    db = getFirestore(app);
    auth = getAuth(app);

    if (process.env.NODE_ENV !== 'production') {
      globalThis.__firebase_app = app;
      globalThis.__firebase_db = db;
      globalThis.__firebase_auth = auth;
    }
  }

  return { app, db, auth };
}

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
