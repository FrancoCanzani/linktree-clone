'use client';

// Components
import Icon from './icon';
import SignOut from './auth/signOut';

// React / Custom hooks

import useScrollEffect from '@/utils/hooks/useScrollEffect';

// NextJs Imports
import Link from 'next/link';

import useFirebaseUser from '@/utils/hooks/useFirebaseUser';

export default function Header() {
  const { isScrolling } = useScrollEffect();
  const { user } = useFirebaseUser();

  return (
    <header
      className={`overflow-hidden z-10 sticky top-0 w-full rounded-b-md items-center transition-all duration-100 ease-in-out ${
        isScrolling ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className='backdrop-blur flex justify-between py-2 px-4 lg:px-8 xl:px-24 backdrop-filter'>
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
                href={'/admin/links'}
                className='px-3 py-2 mx-2 hover:bg-gray-100 rounded-md'
              >
                Admin
              </Link>
              <SignOut />
            </nav>
          </>
        ) : (
          <Link
            href={'/signIn'}
            className='px-3 py-2 mx-2 font-bold bg-black text-white hover:opacity-90 rounded-md'
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
