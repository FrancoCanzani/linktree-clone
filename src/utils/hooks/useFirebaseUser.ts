import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { app } from '../../../firebase';

const auth = getAuth(app);

interface AuthState {
  isSignedIn: boolean;
  pending: boolean;
  user: User | null;
}

export default function useFirebaseUser() {
  const [authState, setAuthState] = useState<AuthState>({
    isSignedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({ user, pending: false, isSignedIn: !!user });
    });

    return () => unsubscribe();
  }, []);

  return authState;
}
