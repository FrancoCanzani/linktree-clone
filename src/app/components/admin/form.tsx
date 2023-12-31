'use client';

import { FormEvent, useState } from 'react';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import validateURL from '@/utils/functions/validateUrl';
import SubmitButton from '../buttons/submitButton';
import LinkType from './linkType';
import ErrorMessage from '../errorMessage';
import { Link2, Folder } from 'lucide-react';
import { collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import fetchMetadata from '@/utils/functions/fetchMetadata';
import { db } from '../../../../firebase';
import { User } from 'firebase/auth';

type CustomUser = {
  user: User | null;
};

export default function Form() {
  const [userInput, setUserInput] = useState<string>('');
  const [formStatus, setFormStatus] = useState('');
  const [linkType, setLinkType] = useState('generalLink');
  const { user }: CustomUser = useFirebaseUser();

  async function handleAddLink(event: FormEvent, type: string, input: string) {
    event.preventDefault();
    setFormStatus('adding');
    if (user && validateURL(userInput) == null) {
      try {
        const metadata = await fetchMetadata(input);
        const userRef = doc(collection(db, 'users'), user?.uid);
        const fieldToUpdate = type;
        await updateDoc(userRef, {
          [fieldToUpdate]: arrayUnion(metadata),
        });

        setUserInput('');
        setFormStatus('added');
        setTimeout(() => {
          setFormStatus('');
        }, 4000);
      } catch (error) {
        setFormStatus('error');
      }
    }
  }

  return (
    <form
      onSubmit={(e) => handleAddLink(e, linkType, userInput)}
      className='rounded-md border border-stone-200 bg-white p-8'
    >
      <div className='flex justify-between items-center'>
        <label htmlFor='url' className='font-semibold'>
          Enter URL
        </label>
      </div>
      <div className='border-b-2 border-gray-100 py-6'>
        <div className='flex items-center justify-center mb-1'>
          <input
            type='text'
            name='url'
            id='url'
            autoFocus
            autoComplete='off'
            placeholder='URL'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className={`px-3 border-2  hover:border-black py-2 w-full rounded-md`}
          />
          <SubmitButton text='Add' formStatus={formStatus} />
        </div>

        {formStatus == 'error' && (
          <ErrorMessage
            error={
              'Something went wrong while submitting your URL. Please try again!'
            }
          />
        )}
        <ErrorMessage error={validateURL(userInput)} />
      </div>

      <div className='pt-6 w-full flex flex-col'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold'>Select The Link Type</h2>
          <span className='bg-stone-200 text-stone-700 text-xs px-2 font-semibold py-1 rounded-md'>
            More types coming soon
          </span>
        </div>
        <div className='flex py-2 w-full'>
          <LinkType
            SVG={<Link2 size={18} />}
            text={'generalLink'}
            linkType={linkType}
            setLinkType={setLinkType}
          />
          <LinkType
            SVG={<Folder size={18} />}
            text={'repository'}
            linkType={linkType}
            setLinkType={setLinkType}
          />
        </div>
      </div>
    </form>
  );
}
