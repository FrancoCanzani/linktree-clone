import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { User } from 'firebase/auth';

export default async function createNewUser(user: User) {
  const docData = {
    userId: user.uid,
    username: user.displayName,
    userPic: user.photoURL,
    userEmail: user.email,
    userHandle: null,
    signUpDate: new Date(),
    links: [],
    portfolio: null,
    userTitle: null,
    monetizationLinks: [],
    socialLinks: [],
  };

  try {
    await setDoc(doc(db, 'users', user.uid), docData);
    console.log(`Successfully created user: ${user.uid}`);
  } catch (error) {
    console.log(error);
  }
}
