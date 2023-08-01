'use client';

import { collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { FormEvent, useState } from 'react';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import Spinner from '@/app/components/spinner';

interface Repository {
  repositoryLink: string;
  repositoryName: string;
  repositoryOwner: string;
}

export default function CreateRepoLinkForm() {
  const { user } = useFirebaseUser();
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const [repository, setRepository] = useState<Repository>({
    repositoryLink: '',
    repositoryName: '',
    repositoryOwner: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setRepository({
      repositoryLink: '',
      repositoryName: '',
      repositoryOwner: '',
    });
  };

  async function handleAddRepoLinks(
    event: FormEvent,
    userId: string | undefined,
    repository: Repository
  ) {
    event.preventDefault();
    try {
      setIsAddingLink(true);
      const userRef = doc(collection(db, 'users'), userId);
      await updateDoc(userRef, {
        repositoryLinks: arrayUnion(repository),
      });
      setRepository({
        repositoryLink: '',
        repositoryName: '',
        repositoryOwner: '',
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
        New Repository Link
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
        onSubmit={(e) => handleAddRepoLinks(e, user?.uid, repository)}
        className={`${isOpen ? 'flex' : 'hidden'} flex w-full pb-2 flex-col`}
      >
        <div className='flex flex-col px-4'>
          <label htmlFor='owner' className='px-2 mb-1 text-sm capitalize'>
            Enter owner username
          </label>
          <input
            type='text'
            name='owner'
            id='owner'
            required
            autoComplete='off'
            value={repository.repositoryOwner}
            placeholder={user?.displayName?.replace(' ', '') ?? 'Microsoft'}
            className='px-4 py-2 rounded-md border'
            onChange={(e) =>
              setRepository((repo) => ({
                ...repo,
                repositoryOwner: e.target.value,
              }))
            }
          />
        </div>

        <div className='flex flex-col px-4'>
          <label htmlFor='name' className='px-2 mb-1 mt-5 text-sm capitalize'>
            Enter Repository Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            required
            autoComplete='off'
            value={repository.repositoryName}
            placeholder={'dev.links'}
            className='px-4 py-2 rounded-md border'
            onChange={(e) =>
              setRepository((repo) => ({
                ...repo,
                repositoryName: e.target.value,
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
              value={repository.repositoryLink}
              placeholder='www.github.com/you'
              className='px-4 py-2 rounded-md border w-full text-ellipsis'
              onChange={(e) =>
                setRepository((repo) => ({
                  ...repo,
                  repositoryLink: e.target.value,
                }))
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
