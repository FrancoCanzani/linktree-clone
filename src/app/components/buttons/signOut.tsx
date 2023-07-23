'use client';

// Firebase import
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../../../firebase';
const auth = getAuth(app);

const handleSignOut = () => {
  signOut(auth);
  //   Add error handling
};

export default function SignOut() {
  return (
    <button
      onClick={handleSignOut}
      className='rounded-xl bg-red-500 hover:bg-red-400 px-6 py-3'
    >
      SignOut
    </button>
  );
}
