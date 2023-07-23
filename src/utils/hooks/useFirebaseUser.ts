import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { app } from '../../../firebase';

const auth = getAuth(app);

export default function useFirebaseUser() {
  const [user, setUser] = useState<User | null>(null); // Import the User type from Firebase

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return { user };
}
