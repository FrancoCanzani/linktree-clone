'use client';

// Components
import Icon from './icon';
import LogIn from './buttons/login';
import LogOut from './buttons/logout';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../firebase';

const auth = getAuth(app);

export default function Header() {
  const [isUser, setIsUser] = useState(false);
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
    <header className='flex w-full px-6 items-center justify-between'>
      <Icon />
      {isUser ? <LogOut /> : <LogIn />}
    </header>
  );
}
