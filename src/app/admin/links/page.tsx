'use client';

import { useState } from 'react';

import LinkFormOpener from '@/app/components/admin/linkFormOpener';
import LinkForm from '@/app/components/admin/linkForm';
import Links from '@/app/components/admin/links';

export default function Appearance() {
  const [isOpen, setIsOpen] = useState(false);
  const [linkType, setLinkType] = useState('link');

  return (
    <section className='w-full flex-col flex items-center'>
      {isOpen ? (
        <LinkForm
          setIsOpen={setIsOpen}
          linkType={linkType}
          setLinkType={setLinkType}
        />
      ) : (
        <LinkFormOpener isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <Links />
    </section>
  );
}
