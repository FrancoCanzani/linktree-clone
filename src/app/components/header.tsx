'use client';

// Components
import Icon from './icon';
import SignOut from './buttons/signOut';

// React / Custom hooks
import useScrollEffect from '@/utils/hooks/useScrollEffect';

// NextJs Imports
import Link from 'next/link';

import useFirebaseUser from '@/utils/hooks/useFirebaseUser';

export default function Header() {
  const { isHidden } = useScrollEffect();
  const { user } = useFirebaseUser();

  return (
    <header
      className={`flex justify-between capitalize w-full mb-8 py-2 rounded-md items-center transition-opacity duration-200 ${
        isHidden
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }`}
    >
      <Icon size={'text-xl'} />
      {user ? (
        <>
          <nav>
            <Link
              href={`/${user?.displayName?.replace(' ', '')}`}
              className='px-3 py-2 mx-2 hover:bg-gray-100 rounded-md'
            >
              Your Links
            </Link>
            <Link
              href={'/setUp'}
              className='px-3 py-2 mx-2 hover:bg-gray-100 rounded-md'
            >
              Set up
            </Link>
            <Link
              href={'/setUp'}
              className='px-3 py-2 mx-2 hover:bg-gray-100 rounded-md'
            >
              Appearance
            </Link>
            <SignOut />
          </nav>
        </>
      ) : (
        <Link
          href={'/signIn'}
          className='px-3 py-2 font-bold bg-black text-white hover:opacity-90 rounded-md'
        >
          Sign In
        </Link>
      )}
    </header>
  );
}
