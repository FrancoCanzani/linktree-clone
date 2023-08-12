'use client';

// Firebase import
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../../../firebase';
import { LogOut } from 'lucide-react';
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
      aria-label='Sign out'
      onClick={handleSignOut}
      className='p-2 rounded-md hover:bg-stone-200'
    >
      <LogOut width={18} />
    </button>
  );
}
