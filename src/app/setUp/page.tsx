'use client';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { FormEvent, useState } from 'react';

import useFirebaseUser from '@/utils/hooks/useFirebaseUser';

import UserProfile from '../components/userProfile';

interface Link {
  linkURL: string;
  linkDescription: string;
}

export default function SetUp() {
  const [link, setLink] = useState<Link>({
    linkURL: '',
    linkDescription: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useFirebaseUser();

  async function handleAddLink(e: FormEvent) {
    e.preventDefault();

    if (user) {
      const docRef = await addDoc(collection(db, 'links'), {
        userId: user.uid,
        userLinks: link,
      });

      setLink({
        linkURL: '',
        linkDescription: '',
      });

      console.log('Document written with ID: ', docRef.id);
    } else {
      console.log('No user');
    }
  }

  const handleClose = () => {
    setIsOpen(false);
    setLink({
      linkURL: '',
      linkDescription: '',
    });
  };

  return (
    <section className='flex min-h-screen  bg-slate-700 flex-col w-full items-center xl:px-44 py-8'>
      <UserProfile />
      <div className='bg-gray-100 w-1/2 relative transition-all duration-200 p-3 rounded-md flex flex-col items-center'>
        <button
          onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
          className='w-full p-3 font-semibold capitalize'
        >
          New Link
        </button>
        {isOpen ? (
          <button
            aria-label='Close'
            onClick={handleClose}
            className='absolute right-8 top-6 hover:bg-gray-200 rounded-full p-1'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z'
              />
            </svg>
          </button>
        ) : (
          ''
        )}
        <form
          onSubmit={handleAddLink}
          className={`${isOpen ? 'flex' : 'hidden'} flex w-full pb-2 flex-col`}
        >
          <div className='flex flex-col px-4'>
            <label
              htmlFor='description'
              className='px-2 mb-1 text-sm capitalize'
            >
              Enter A Description
            </label>
            <input
              type='text'
              name='description'
              id='description'
              required
              autoComplete='off'
              autoFocus
              value={link.linkDescription}
              placeholder='My GitHub Profile'
              className='px-4 py-2 rounded-md border'
              onChange={(e) =>
                setLink((link) => ({
                  ...link,
                  linkDescription: e.target.value,
                }))
              }
            />
          </div>

          <div className='flex flex-col px-4'>
            <label
              htmlFor='description'
              className='px-2 mb-1 mt-5 text-sm capitalize'
            >
              Enter The URL
            </label>
            <div className='flex w-full'>
              <input
                type='text'
                name='link'
                id='link'
                required
                autoComplete='off'
                value={link.linkURL}
                placeholder='www.github.com/you'
                className='px-4 py-2 rounded-md border w-full text-ellipsis'
                onChange={(e) =>
                  setLink((link) => ({ ...link, linkURL: e.target.value }))
                }
              />
              <button
                className='px-2 ml-2 border-4 w-28 border-purple-500 bg-purple-500 font-semibold text-white rounded-xl'
                type='submit'
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
