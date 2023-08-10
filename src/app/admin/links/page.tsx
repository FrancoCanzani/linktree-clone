'use client';

import { useState } from 'react';

import LinkFormOpener from '@/app/components/admin/linkFormOpener';
import LinkForm from '@/app/components/admin/linkForm';
import UserLinks from '@/app/components/admin/userLinks';
import Header from '@/app/components/header';
export default function Links() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className='w-full h-full flex-col flex items-center'>
        {isOpen ? (
          <LinkForm setIsOpen={setIsOpen} />
        ) : (
          <LinkFormOpener isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
        <UserLinks />
      </section>
    </>
  );
}
