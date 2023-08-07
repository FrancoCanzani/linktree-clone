'use client';

// React / Next
import { Dispatch, SetStateAction } from 'react';
import { FormEvent, useState } from 'react';

// Utils / Hooks
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import useURLMetadata from '@/utils/hooks/useUrlMetadata';

// Components
import CloseButton from '../buttons/closeButton';
import SubmitButton from '../buttons/submitButton';
import LinkTypeSelector from './linkTypeSelector';
import FolderSVG from '@/public/svg/folder';
import HyperlinkSVG from '@/public/svg/hyperlink';

// Firebase
import { collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { User } from 'firebase/auth';
import ErrorMessage from '../form/errorMessage';

type CustomUser = {
  user: User | null;
};

export default function LinkForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [userInput, setUserInput] = useState<string>('');
  const [formStatus, setFormStatus] = useState('');
  const [linkType, setLinkType] = useState('link');
  const { user }: CustomUser = useFirebaseUser();
  // Use the useURLMetadata hook to get metadata
  const metadata = useURLMetadata(userInput);

  async function handleAddLink(event: FormEvent, type: string) {
    event.preventDefault();
    setFormStatus('Adding');

    if (metadata && metadata.url) {
      try {
        const userRef = doc(collection(db, 'users'), user?.uid);
        const fieldToUpdate = type;

        // Access metadata properties directly
        await updateDoc(userRef, {
          [fieldToUpdate]: arrayUnion(metadata),
        });

        setUserInput('');
        setFormStatus('Added');
        setTimeout(() => {
          setFormStatus('');
        }, 4000);
      } catch (error) {
        console.error('Error adding link:', error);
        setFormStatus('Error');
      }
    }
  }

  return (
    <form
      onSubmit={(e) => handleAddLink(e, linkType)}
      className='bg-gray-200 capitalize w-2/3 lg:w-1/2 p-4 rounded-md'
    >
      <div className='flex justify-between items-center'>
        <label htmlFor='url' className='font-semibold'>
          Enter URL
        </label>
        <CloseButton setIsOpen={setIsOpen} />
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

        {formStatus === 'Error' && (
          <ErrorMessage error='Something went wrong. Please try again.' />
        )}
      </div>

      <div className='pt-6 w-full flex flex-col'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold'>Select The Link Type</h2>
          <span className='bg-white text-gray-500 text-xs px-2 font-semibold py-1 rounded-md'>
            More types coming soon
          </span>
        </div>
        <div className='flex py-2 w-full'>
          <LinkTypeSelector
            SVG={<HyperlinkSVG />}
            text={'link'}
            linkType={linkType}
            setLinkType={setLinkType}
          />
          <LinkTypeSelector
            SVG={<FolderSVG />}
            text={'repository'}
            linkType={linkType}
            setLinkType={setLinkType}
          />
        </div>
      </div>
    </form>
  );
}
