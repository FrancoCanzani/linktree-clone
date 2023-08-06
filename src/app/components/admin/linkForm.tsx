'use client';

// React / Next
import { Dispatch, SetStateAction } from 'react';
import { FormEvent, useState } from 'react';

// Utils / Hooks
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import validateUrl from '@/utils/functions/validateUrl';
import { v4 as uuidv4 } from 'uuid';
import LinkType from '@/utils/types';

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

const LinkForm = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [link, setLink] = useState<LinkType>({
    Url: '',
    key: uuidv4(),
  });
  const [formStatus, setFormStatus] = useState('');
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [linkType, setLinkType] = useState('link');

  const { user }: CustomUser = useFirebaseUser();

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink((prev) => ({ ...prev, Url: e.target.value }));
    setIsTyping(true);

    if (isTyping && e.target.value.trim() !== '') {
      setIsUrlValid(validateUrl(e.target.value));
    }
  };

  async function handleAddLink(
    event: FormEvent,
    userId: string | undefined,
    type: string,
    linkValue: LinkType
  ) {
    event.preventDefault();
    try {
      if (!isUrlValid) {
        return;
      }

      setFormStatus('Adding');
      const userRef = doc(collection(db, 'users'), userId);
      const fieldToUpdate = type;

      await updateDoc(userRef, {
        [fieldToUpdate]: arrayUnion(linkValue),
      });

      setLink({
        Url: '',
        key: uuidv4(),
      });
      setFormStatus('Added');
      setTimeout(() => {
        setFormStatus('');
      }, 4000);
    } catch (error) {
      setFormStatus('Error');
    }
    setIsTyping(false);
  }

  return (
    <form
      onSubmit={(e) => handleAddLink(e, user?.uid, linkType, link)}
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
            value={link.Url}
            onChange={handleLinkChange}
            className={`px-3 border-2 ${
              isUrlValid ? 'border-gray-200' : 'border-red-500'
            } hover:border-black py-2 w-full rounded-md`}
            aria-invalid={!isUrlValid}
          />
          <SubmitButton text='Add' formStatus={formStatus} />
        </div>

        {isTyping && !isUrlValid && (
          <ErrorMessage error='Please enter a valid URL.' />
        )}

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
};

export default LinkForm;
