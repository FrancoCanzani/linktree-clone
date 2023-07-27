'use client';

import Icon from '../components/icon';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import Image from 'next/image';
import Link from 'next/link';
import checkUserHandleExists from '@/utils/functions/checkUserHandleExists';
import createNewUser from '@/utils/functions/createNewUser';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateYourAccount() {
  const { push } = useRouter();
  const { user } = useFirebaseUser();
  const [userHandle, setUserHandle] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!error && userHandle) {
      // Check if the user handle already exists
      setIsLoading(true);
      const handleExists = await checkUserHandleExists(userHandle);
      setIsLoading(false);
      if (handleExists) {
        setError('Username is already taken');
      } else {
        setError('');
        createNewUser(user, userHandle);
        push('/yourLinks');
        console.log('Submitted username:', userHandle);
      }
    } else {
      // Handle error or display an appropriate message to the user
      console.log('Form submission is not valid');
    }
  }

  async function handleChange(e) {
    const value = e.target.value;
    const pattern = /^\S+$/;

    if (!pattern.test(value)) {
      setError('Username must not be empty');
      setTimeout(() => {
        setError('');
      }, 4000);
    } else if (value.length < 3 || value.length > 20) {
      setError('Username must be between 3 and 20 characters');
    } else {
      setError('');
    }

    setUserHandle(value);
  }

  return (
    <div className='flex w-full'>
      <div className='w-2/3 px-6 xl:px-44 p-2'>
        <div className='mb-8 py-2'>
          <Icon size='text-2xl' />
        </div>
        <h2 className='text-5xl font-bold capitalize'>Create your account</h2>
        <h3 className='text-gray-600 mt-2 capitalize'>
          Choose your username. You can always change it later.
        </h3>
        <div className='my-16 flex items-center'>
          {user?.photoURL ? (
            <Image
              src={user?.photoURL}
              alt={`${user?.displayName} profile pic`}
              width={67}
              height={67}
              className={`${
                userHandle.length > 0 ? 'rounded-l-md' : 'rounded-md'
              }`}
              priority
            />
          ) : (
            ''
          )}
          <span
            className={`${
              userHandle.length > 0
                ? 'rounded-r-md bg-gray-100 py-4 px-4 text-3xl font-bold'
                : ''
            }`}
          >
            {userHandle}
          </span>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='capitalize flex flex-col w-full'
        >
          <label htmlFor='handle' className='mt-1 font-bold'>
            Your new handle
          </label>
          <input
            className={`${
              error.length > 0 ? 'border-red-500' : ''
            } py-3 placeholder:text-xl appearance-none outline-none text-xl px-3 border-2 rounded-md`}
            type='text'
            id='handle'
            name='handle'
            placeholder='username'
            autoFocus
            autoCorrect='off'
            value={userHandle}
            onChange={handleChange}
          />
          {error.length > 0 && <span className='text-red-500'>{error}</span>}

          <p className='text-xs mt-16 text-center capitalize'>
            By clicking create account, you agree to our{' '}
            <Link
              className='text-blue-500 underline'
              target='blank'
              href={'/termsOfService'}
            >
              Terms of Service
            </Link>
          </p>
          <button
            type='submit'
            className='p-2 px-3 flex items-center justify-center mt-4 hover:opacity-90 bg-black font-bold text-white rounded-md'
          >
            {isLoading ? spinner : 'Create Account'}
          </button>
        </form>
        <div className='mt-6 text-xs mx-auto my-0 text-center max-w-md bg-gray-100 rounded-md p-2'>
          Already have an account?{' '}
          <Link href={'/signIn'} className='text-blue-500 underline'>
            Sign In
          </Link>
        </div>
      </div>
      <div className='flex items-center justify-center w-1/3 h-screen bg-gray-200'>
        An image goes here
      </div>
    </div>
  );
}

const spinner = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='25'
    height='25'
    viewBox='0 0 24 24'
  >
    <path
      fill='currentColor'
      d='M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z'
    >
      <animateTransform
        attributeName='transform'
        dur='0.75s'
        repeatCount='indefinite'
        type='rotate'
        values='0 12 12;360 12 12'
      />
    </path>
  </svg>
);
