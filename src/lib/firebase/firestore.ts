import { connectFirestoreEmulator, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import app from './app';

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    /*settings*/
    tabManager: persistentMultipleTabManager(),
  }),
});

// Run emulator if enabled in .env
if (import.meta.env.VITE_USE_EMULATORS === 'true') {
  console.log('using firestore emulator');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

// export const getFirestoreURL = () => {
//   if (import.meta.env.VITE_USE_EMULATORS === 'true') {
//     return 'http://localhost:8080/v1/projects/keepin-tabs-e8b52/databases/(default)/documents/';
//   }
//   return 'https://firestore.googleapis.com/v1/projects/keepin-tabs-e8b52/databases/(default)/documents/';
// };
