import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function checkUserExists(userId: string) {
  try {
    const q = query(collection(db, 'users'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    // Check if the querySnapshot is empty (no documents match the query)
    const exists = !querySnapshot.empty;

    return exists;
  } catch (error) {
    console.error('Error checking user existence:', error);
    return false;
  }
}
