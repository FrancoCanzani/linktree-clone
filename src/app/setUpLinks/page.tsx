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

  const [title, setTitle] = useState<string>('');

  const { user } = useFirebaseUser();

  async function handleAddUser(e: FormEvent) {
    e.preventDefault();

    if (user) {
      const docRef = await addDoc(collection(db, 'users'), {
        userId: user.uid,
        userName: user.displayName?.replace(' ', ''),
        userEmail: user.email,
        userPic: user.photoURL,
        profileTitle: title,
      });
      setTitle('');
      console.log('Document written with ID: ', docRef.id);
    } else {
      console.log('No user');
    }
  }

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

  return (
    <section className='flex min-h-screen bg-slate-700 flex-col items-center xl:px-44 py-8'>
      <UserProfile />
      <form
        onSubmit={handleAddUser}
        className='flex items-center justify-center mb-8'
      >
        <input
          type='text'
          className='px-4 py-2 rounded-md border'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type='submit' className='bg-white p-2 rounded-md ml-2'>
          Save
        </button>
      </form>
      <form onSubmit={handleAddLink} className='flex gap-4'>
        <input
          type='text'
          name='description'
          id='description'
          required
          autoComplete='off'
          autoFocus
          value={link.linkDescription}
          placeholder='URL description'
          className='px-4 py-2 rounded-md border'
          onChange={(e) =>
            setLink((link) => ({
              ...link,
              linkDescription: e.target.value,
            }))
          }
        />

        <input
          type='text'
          name='link'
          id='link'
          required
          autoComplete='off'
          value={link.linkURL}
          placeholder='URL'
          className='px-4 py-2 rounded-md border'
          onChange={(e) =>
            setLink((link) => ({ ...link, linkURL: e.target.value }))
          }
        />
        <button
          className='px-4 py-2 border-4 w-28 border-purple-500 bg-purple-500 font-semibold text-white rounded-xl'
          type='submit'
        >
          Save
        </button>
      </form>
    </section>
  );
}
