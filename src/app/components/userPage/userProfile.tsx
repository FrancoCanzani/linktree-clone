'use client';

import Image from 'next/image';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../../../firebase';
import { useState, useEffect } from 'react';
import UserSkeleton from '../skeletons/userSkeleton';

const auth = getAuth(app);
const user = auth.currentUser;

export default function UserProfile() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userPic, setUserPic] = useState<string | null>(null);
  const [userFetched, setUserFetched] = useState(false); // State to track data fetching status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const photoURL = user.photoURL;
        const name = user.displayName;
        if (photoURL) {
          setUserPic(photoURL);
        }
        if (name) {
          setUserName(name);
        }
        setUserFetched(true);
      } else {
        setUserPic(null); // Reset the userPic and userName when the user is not logged in
        setUserName(null);
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  return (
    <div className='flex flex-col mb-5 items-center justify-center'>
      {userFetched ? (
        <>
          {userPic ? (
            <Image
              src={userPic}
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
            {`@${userName?.replace(' ', '')}`}
          </h2>
        </>
      ) : (
        <UserSkeleton />
      )}
    </div>
  );
}
