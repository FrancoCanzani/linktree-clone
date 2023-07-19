'use client';

import Image from 'next/image';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase';
import { useState, useEffect } from 'react';

const auth = getAuth(app);
const user = auth.currentUser;

export default function UserProfile() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userPic, setUserPic] = useState<string | null>(null);

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
      } else {
        setUserPic(null); // Reset the userPic and userName when user is not logged in
        setUserName(null);
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  return (
    <div className='flex flex-col items-center justify-center'>
      {userPic ? (
        <Image
          src={userPic}
          alt={`${user?.displayName} profile pic`}
          width={60}
          height={60}
          className='rounded-md'
          priority
        />
      ) : (
        <p>No profile picture</p>
      )}
      <h2 className='mt-4 capitalize font-semibold text-xl'>{userName}</h2>
    </div>
  );
}
