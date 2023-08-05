'use client';

// Firebase import
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../../../firebase';

import { useRouter } from 'next/navigation';

const auth = getAuth(app);

export default function SignOut() {
  const { push } = useRouter();

  const handleSignOut = () => {
    signOut(auth);
    push('/');
  };

  return (
    <button
      onClick={handleSignOut}
      className='px-3 py-2 font-bold bg-black text-white hover:opacity-90 rounded-md'
    >
      SignOut
    </button>
  );
}
