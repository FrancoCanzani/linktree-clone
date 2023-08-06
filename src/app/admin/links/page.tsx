'use client';

import { useState } from 'react';

import LinkFormOpener from '@/app/components/admin/linkFormOpener';
import LinkForm from '@/app/components/admin/linkForm';
import CurrentLinks from '@/app/components/admin/currentLinks';
export default function Links() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className='w-full flex-col flex items-center'>
      {isOpen ? (
        <LinkForm setIsOpen={setIsOpen} />
      ) : (
        <LinkFormOpener isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <CurrentLinks />
    </section>
  );
}
