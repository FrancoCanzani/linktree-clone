'use client';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { FormEvent, useState } from 'react';

import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import UserProfile from '../components/userProfile';
import CreateLinkForm from '../components/createLinkForm';
import Header from '../components/header';

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
    <section className='flex min-h-screen flex-col w-full items-center'>
      <Header />
      <UserProfile />
      <CreateLinkForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleAddLink={handleAddLink}
        handleClose={handleClose}
        link={link}
        setLink={setLink}
      />
    </section>
  );
}
