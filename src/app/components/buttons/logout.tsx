'use client';

// Firebase import
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../../firebase';
const auth = getAuth(app);

const handleSignOut = () => {
  signOut(auth);
  //   Add error handling
};

export default function LogOut() {
  return (
    <button
      onClick={handleSignOut}
      className='rounded-xl bg-red-500 hover:bg-red-600 px-6 text-xl font-semibold py-3'
    >
      SignOut
    </button>
  );
}
