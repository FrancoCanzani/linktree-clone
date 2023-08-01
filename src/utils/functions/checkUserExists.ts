import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { User } from 'firebase/auth';

export default async function checkUserExists(user: User) {
  try {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking user existence:', error);
  }
}
