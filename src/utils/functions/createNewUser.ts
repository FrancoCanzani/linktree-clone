import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { User } from 'firebase/auth';

export default async function createNewUser(
  user: User | null,
  userHandle: string
) {
  const docData = {
    userId: user?.uid,
    username: user?.displayName,
    userPic: user?.photoURL,
    userEmail: user?.email,
    userHandle: userHandle,
    signUpDate: new Date(),
    link: [],
    repository: [],
    portfolio: null,
    userTitle: null,
    monetization: [],
    social: [],
  };

  try {
    const userRef = doc(collection(db, 'users'), user?.uid);
    await setDoc(userRef, docData);
    console.log(`Successfully created user: ${user?.uid}`);
  } catch (error) {
    console.log(error);
  }
}
