'use client';

import { useState } from 'react';
import useScrollEffect from '@/hooks/useScrollEffect';

import Link from 'next/link';

export default function NavigationFooter() {
  const [activeTab, setActiveTab] = useState('home');
  const { isHidden } = useScrollEffect();

  return (
    <nav
      className={`flex justify-center  items-center fixed bottom-10 left-0 right-0 transition-opacity duration-200 ${
        isHidden
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }`}
    >
      <div className='bg-gradient-to-tl from-black via-black to-purple-900 shadow-sm shadow-slate-600 font-semibold capitalize px-7 py-2 text-white rounded-3xl flex'>
        <Link
          href={'/'}
          onClick={() => setActiveTab('home')}
          className={`${
            activeTab === 'home'
              ? 'bg-lime-400 px-6 text-black rounded-3xl py-2 shadow-md'
              : ''
          } transition-all duration-200 px-6 py-2`}
        >
          Home
        </Link>
        <Link
          href={'/setUpLinks'}
          onClick={() => setActiveTab('setUp')}
          className={`${
            activeTab === 'setUp'
              ? 'bg-lime-400 px-6 text-black rounded-3xl py-2 shadow-md'
              : ''
          } mx-9 transition-all duration-200 px-6 py-2`}
        >
          Set up
        </Link>
        <Link
          href={'/yourLinks'}
          onClick={() => setActiveTab('links')}
          className={`${
            activeTab === 'links'
              ? 'bg-lime-400 text-black rounded-3xl shadow-md'
              : ''
          } transition-all duration-200 px-6 py-2`}
        >
          Your Links
        </Link>
      </div>
    </nav>
  );
}
