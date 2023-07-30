'use client';

import { useState } from 'react';

import CreateLinkForm from '@/app/components/createLinkForm';
import AdminLinks from '@/app/components/adminLinks';

interface Link {
  linkURL: string;
  linkDescription: string;
}

export default function Links() {
  const [link, setLink] = useState<Link>({
    linkURL: '',
    linkDescription: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setLink({
      linkURL: '',
      linkDescription: '',
    });
  };

  return (
    <section className='flex flex-col min-h-full w-full items-center'>
      <CreateLinkForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClose={handleClose}
        link={link}
        setLink={setLink}
      />
      <AdminLinks />
    </section>
  );
}
