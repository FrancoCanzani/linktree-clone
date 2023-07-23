'use client';

// Firebase imports
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithRedirect } from 'firebase/auth';
import { app } from '../../../../firebase';
const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export default function SignIn() {
  return (
    <button
      onClick={() => signInWithRedirect(auth, provider)}
      className='rounded-xl bg-gray-300 hover:bg-gray-200 px-6 py-3'
    >
      LogIn
    </button>
  );
}
