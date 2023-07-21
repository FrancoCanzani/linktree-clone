'use client';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { FormEvent, useState } from 'react';

import useFirebaseUser from '@/utils/hooks/useFirebaseUser';

export default function MyRepos() {
  const [link, setLink] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { user } = useFirebaseUser();

  async function handleAddLink(e: FormEvent) {
    e.preventDefault();

    if (user) {
      const docRef = await addDoc(collection(db, 'links'), {
        userLink: link,
        linkDescription: description,
        userId: user.uid,
      });
      setLink('');
      setDescription('');
      console.log('Document written with ID: ', docRef.id);
    } else {
      console.log('No user');
    }
  }

  return (
    <section className='flex min-h-screen flex-col items-center xl:px-44 py-8'>
      <h2 className='mb-16'>Lets add your links:</h2>
      <form onSubmit={handleAddLink} className='flex flex-col'>
        <input
          type='text'
          name='description'
          id='description'
          required
          autoComplete='off'
          autoFocus
          value={description}
          placeholder='Link description'
          className='px-6 py-3 rounded-xl mb-6 border-4 border-pink-500'
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type='text'
          name='link'
          id='link'
          required
          autoComplete='off'
          value={link}
          placeholder='Link your repo'
          className='px-6 py-3 mb-4 rounded-xl border-4 border-pink-500'
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          className='px-6 py-3 border-4 w-28 border-purple-500 bg-purple-500 font-semibold text-white rounded-xl'
          type='submit'
        >
          Save
        </button>
      </form>
    </section>
  );
}
