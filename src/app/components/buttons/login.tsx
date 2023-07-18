'use client';

// Firebase imports
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithRedirect } from 'firebase/auth';
import { app } from '../../../firebase';
const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export default function LogIn() {
  return (
    <button
      onClick={() => signInWithRedirect(auth, provider)}
      className='rounded-xl bg-slate-100 hover:bg-slate-50 px-6 text-xl font-semibold py-3'
    >
      LogIn
    </button>
  );
}
