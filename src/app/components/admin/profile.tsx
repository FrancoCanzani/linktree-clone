'use client';

import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SignOut from '../auth/signOut';

export default function Profile() {
  const router = useRouter();
  const { user, pending, isSignedIn } = useFirebaseUser();

  if (pending) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    router.push('/signIn');
    return null;
  }

  return (
    <div>
      <div className='flex items-center gap-2 border-t pt-3 pb-2'>
        <div className='flex gap-3 hover:bg-stone-200 rounded-md p-2 font-bold items-center justify-start'>
          <Image
            src={user?.photoURL ?? '/images/defaultUserPic.jpg'}
            alt={`${user?.displayName} profile pic`}
            width={25}
            height={25}
            className='rounded-md shadow-sm'
            priority
          />
          <span className='text-sm'>{user?.displayName}</span>
        </div>
        <SignOut />
      </div>
    </div>
  );
}
