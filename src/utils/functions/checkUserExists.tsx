import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function checkUserExists(userId: string) {
  const q = query(collection(db, 'users'), where('userId', '==', userId));

  return new Promise<boolean>((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        // Check if the querySnapshot is empty (no documents match the query)
        const exists = !querySnapshot.empty;

        // Resolve the promise with the result (true if exists, false if not)
        resolve(exists);

        // Unsubscribe to stop listening for real-time changes
        unsubscribe();
      },
      (error) => {
        // If there's an error with the query or snapshot, reject the promise
        console.error('Error checking user existence:', error);
        reject(error);
      }
    );
  });
}
