'use client';

import Image from 'next/image';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import UserSkeleton from '../skeletons/userSkeleton';

export default function UserProfile() {
  const { user } = useFirebaseUser();

  return (
    <div className='flex flex-col mb-5 items-center justify-center'>
      {user ? (
        <>
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={`${user?.displayName} profile pic`}
              width={70}
              height={70}
              className='rounded-md shadow-sm'
              priority
            />
          ) : (
            <p>No profile picture</p>
          )}
          <h2 className='mt-4 text-xl capitalize transition-opacity duration-400 font-black opacity-100'>
            {`@${user.displayName?.replace(' ', '')}`}
          </h2>
        </>
      ) : (
        <UserSkeleton />
      )}
    </div>
  );
}
