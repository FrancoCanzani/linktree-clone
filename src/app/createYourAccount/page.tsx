'use client';

// Components
import Icon from '../components/icon';
import Spinner from '@/app/components/spinner';

// Nextjs
import Image from 'next/image';
import Link from 'next/link';

// Utils
import checkUserHandleExists from '@/utils/functions/checkUserHandleExists';
import createNewUser from '@/utils/functions/createNewUser';

// Hooks
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';

// TS
import { ChangeEvent, FormEvent } from 'react';

export default function CreateYourAccount() {
  const { push } = useRouter();
  const { user } = useFirebaseUser();
  const [userHandle, setUserHandle] = useState('');
  const [inputError, setInputError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      if (!inputError && userHandle) {
        // Check if the user handle already exists
        setIsLoading(true);
        const handleExists = await checkUserHandleExists(userHandle);
        setIsLoading(false);
        if (handleExists) {
          setInputError('Username is already taken.');
        } else {
          setInputError('');
          setSubmitError('');
          createNewUser(user, userHandle);
          push('/yourLinks');
        }
      }
    } catch (error) {
      setSubmitError('Something went wrong. Try again.');
    }
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value;
    // Regular expression to match alphanumeric characters
    const pattern: RegExp = /^[a-zA-Z0-9]+$/;

    // Remove leading and trailing white spaces
    const trimmedValue = value.trim();

    if (!pattern.test(trimmedValue)) {
      setInputError('Username must contain only letters and numbers.');
    } else if (trimmedValue.length < 3 || trimmedValue.length > 20) {
      setInputError('Username must be between 3 and 20 characters.');
    } else {
      setInputError('');
    }

    setUserHandle(trimmedValue);
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
              inputError.length > 0 ? 'border-red-500' : ''
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
          {inputError.length > 0 && (
            <span className='text-red-500'>{inputError}</span>
          )}
          <ul className='text-xs mt-3'>
            <li>Only letters and numbers</li>
            <li>Min. 3 characters and max. 20 characters</li>
            <li></li>
          </ul>

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
            {isLoading ? <Spinner color='white' /> : 'Create Account'}
          </button>
          <span className='text-red-500 w-full text-center'>{submitError}</span>
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
