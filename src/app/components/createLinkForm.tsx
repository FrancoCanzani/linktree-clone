'use client';

import { collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase';
import { FormEvent, useState } from 'react';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import Spinner from '@/app/components/spinner';

interface FormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  link: Link;
  setLink: React.Dispatch<React.SetStateAction<Link>>;
}

interface Link {
  linkURL: string;
  linkDescription: string;
}

export default function CreateLinkForm({
  isOpen,
  setIsOpen,
  handleClose,
  link,
  setLink,
}: FormProps) {
  const { user } = useFirebaseUser();
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  async function handleAddLinksToUser(
    event: FormEvent,
    userId: string | undefined,
    link: Link
  ) {
    event.preventDefault();
    try {
      setIsAddingLink(true);
      const userRef = doc(collection(db, 'users'), userId);
      await updateDoc(userRef, {
        links: arrayUnion(link),
      });
      setLink({
        linkURL: '',
        linkDescription: '',
      });
      setIsAdded(true);
      setIsAddingLink(false);
      setTimeout(() => {
        setIsAdded(false);
      }, 4000);
      console.log('Successfully added links to the user.');
    } catch (error) {
      console.log('Error adding links to the user:', error);
    }
  }

  return (
    <div className='bg-gray-100 w-1/2 relative p-3 rounded-md mb-8 flex flex-col items-center'>
      <button
        onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
        className='w-full p-3 font-semibold text-xl capitalize'
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
        onSubmit={(e) => handleAddLinksToUser(e, user?.uid, link)}
        className={`${isOpen ? 'flex' : 'hidden'} flex w-full pb-2 flex-col`}
      >
        <div className='flex flex-col px-4'>
          <label htmlFor='description' className='px-2 mb-1 text-sm capitalize'>
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
          <label htmlFor='link' className='px-2 mb-1 mt-5 text-sm capitalize'>
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
              className={`${
                isAdded && 'border-green-600 border-2'
              } px-2 flex items-center justify-center ml-2 w-28 bg-black text-white hover:opacity-90 font-semibold rounded-md`}
              type='submit'
            >
              {isAddingLink ? <Spinner color='white' /> : 'Add'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
