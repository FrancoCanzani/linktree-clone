'use client';

import Icon from '../../components/icon';
import Link from 'next/link';
import GoogleSignIn from '@/app/components/buttons/googleSignIn';

import { useEffect } from 'react';

import checkUserExists from '@/utils/functions/checkUserHandleExists';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';

import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { user } = useFirebaseUser();
  const { push } = useRouter();

  useEffect(() => {
    async function checkAndCreateUser() {
      if (user) {
        const userExists = await checkUserExists(user.uid);

        if (!userExists) {
          push('/yourLinks');
        } else {
          push('/createYourAccount');
        }
      }
    }

    checkAndCreateUser();
  }, [user, push]);

  return (
    <div className='flex px-4 xl:px-44 h-screen w-full flex-col items-center justify-center'>
      <div className='py-10 px-8 w-1/3 rounded-xl border-2 flex justify-start flex-col bg-gray-50'>
        <Icon size={'text-3xl'} />
        <h2 className='mt-8 font-black text-xl'>Sign In</h2>
        <h4 className='text-sm text-gray-600'>to continue to dev.links</h4>
        <div className='mt-5 w-full flex flex-col justify-center'>
          <GoogleSignIn />
        </div>
      </div>
      <p className='text-sm mt-4 capitalize'>
        By signing in, you agree to our{' '}
        <Link
          className='text-blue-500 underline'
          target='blank'
          href={'/termsOfService'}
        >
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
