'use client';

import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db, app } from '@/firebase';
import { FormEvent, useState } from 'react';

const auth = getAuth(app);
const user = auth.currentUser;

export default function MyRepos() {
  const [link, setLink] = useState<string | undefined>(undefined);

  async function handleAddLink(e: FormEvent) {
    e.preventDefault();

    if (user) {
      const docRef = await addDoc(collection(db, 'repo'), {
        repoLink: link,
        userId: user.uid,
      });
      setLink('');
      console.log('Document written with ID: ', docRef.id);
    } else {
      console.log('no user');
    }
  }

  return (
    <section className='flex min-h-screen flex-col items-center xl:px-44 py-8'>
      <h2 className='mb-16'>Lets add your links:</h2>
      <form onSubmit={handleAddLink}>
        <input
          type='url'
          name='link'
          id='link'
          required
          autoComplete='off'
          autoFocus
          value={link}
          placeholder='Link your repo'
          className='px-6 py-3 rounded-l-xl border-4 border-pink-500'
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          className='px-6 py-3 border-4 border-purple-500 bg-purple-500 font-semibold text-white rounded-r-xl'
          type='submit'
        >
          Add
        </button>
      </form>
    </section>
  );
}
