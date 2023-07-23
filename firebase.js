import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDPrq81FSX2Y5aOO-0Wyn1FPXpSTFFQwH4',
  authDomain: 'linktree-7c4d2.firebaseapp.com',
  projectId: 'linktree-7c4d2',
  storageBucket: 'linktree-7c4d2.appspot.com',
  messagingSenderId: '442037281267',
  appId: '1:442037281267:web:a9574be8b1b1723070f286',
  measurementId: 'G-NX51TMJBVL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
