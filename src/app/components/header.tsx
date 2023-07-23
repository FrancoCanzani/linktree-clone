'use client';

// Components
import Icon from './icon';
import SignIn from './buttons/signIn';
import SignOut from './buttons/signOut';

import { useState, useEffect } from 'react';
import useScrollEffect from '@/utils/hooks/useScrollEffect';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../../firebase';

const auth = getAuth(app);

export default function Header() {
  const [isUser, setIsUser] = useState(false);
  const { isHidden } = useScrollEffect();
  const { push } = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    });
  }, [push]);

  return (
    <header
      className={`flex justify-between w-full xl:px-44 py-4 rounded-xl items-center transition-opacity duration-200 ${
        isHidden
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }`}
    >
      <Icon />
      <nav>
        <Link href={'/'} className='px-6 py-3 hover:bg-gray-300 rounded-xl'>
          Home
        </Link>
        <Link
          href={'/setUpLinks'}
          className='px-6 py-3 mx-4 hover:bg-gray-300 rounded-xl'
        >
          Set up
        </Link>
        <Link
          href={'/yourLinks'}
          className='px-6 py-3 hover:bg-gray-300 rounded-xl mr-4'
        >
          Your Links
        </Link>
        {isUser ? <SignOut /> : <SignIn />}
      </nav>
    </header>
  );
}
