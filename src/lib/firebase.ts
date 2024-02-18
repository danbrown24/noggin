import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

export const initFirebase = () => {
  const config = process.env.REACT_APP_FIREBASE_CONFIG;

  if (!config) {
    console.warn('No Firebase config found; continuing without analytics')
    return;
  }

  try {
    const firebaseConfig = JSON.parse(config)
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
  }
  catch (e) {
    console.error('Error loading Firebase config');
  }
};
