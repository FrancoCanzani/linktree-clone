'use client';

import Icon from './components/icon';
import Link from 'next/link';

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <main className='w-full capitalize h-screen flex items-center justify-center flex-col'>
      <div className='fixed top-6'>
        <Icon size='text-4xl' />
      </div>
      <span className='text-xl font-bold'>There was a problem</span>

      <p className='text-3xl animate-pulse my-8 px-6 rounded-md uppercase font-bold py-4 text-center'>
        {error.message}
      </p>
      <span className='mb-8 text-gray-700'>
        Please try again or contact support if the problem persists
      </span>
      <div className='py-6 flex'>
        <Link
          href={'/'}
          className='mr-2 flex text-2xl hover:opacity-80 p-2 rounded-md underline underline-offset-4'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 256 256'
            className='mr-1'
          >
            <path
              fill='currentColor'
              d='m234.83 98.83l-96 96a4 4 0 0 1-5.66 0L28 89.66V152a4 4 0 0 1-8 0V80a4 4 0 0 1 4-4h72a4 4 0 0 1 0 8H33.66L136 186.34l93.17-93.17a4 4 0 1 1 5.66 5.66Z'
            />
          </svg>
          Back Home
        </Link>
        <button
          className='ml-2 bg-black text-white hover:opacity-80 text-2xl p-2 rounded-md font-bold'
          onCanPlay={reset}
        >
          Try Again
        </button>
      </div>
    </main>
  );
};

export default Error;
