import { initializeFirebase } from '@/firebase';

/**
 * Consolidating Firebase initialization to use the singleton from @/firebase.
 */
const { app, db } = initializeFirebase();

// Analytics is client-side only
let analytics;
if (typeof window !== 'undefined') {
  import('firebase/analytics').then(({ getAnalytics, isSupported }) => {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    });
  });
}

export { db, analytics };
