'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Link2, Component, Menu } from 'lucide-react';
import Icon from '../icon';

const sidebarOptions = [
  { name: 'Add Links', href: '/admin/addLinks', icon: <Link2 /> },
  { name: 'Links', href: '/admin/links', icon: <Component /> },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true); // Sidebar is initially open on xl screens
  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    // Hide sidebar on path change
    setShowSidebar(false);
  }, [segment]);

  return (
    <aside>
      {/* Toggle button for small screens  */}
      <button
        className={`fixed z-20 right-5 top-7 sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } transform fixed z-10 flex h-full w-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all sm:w-60 sm:translate-x-0`}
      >
        <div>
          <div className='flex items-center justify-center p-4 mb-3'>
            <Icon size='text-2xl' />
          </div>
          {sidebarOptions.map((option, index) => (
            <Link
              key={option.name}
              href={option.href}
              className={`${
                index !== sidebarOptions.length - 1 ? 'mb-2' : 'mb-0'
              } px-4 py-2 flex gap-3 rounded-md items-center justify-start font-bold hover:bg-stone-200 w-full ${
                segment && option.href.includes(segment) && 'bg-stone-200'
              }`}
            >
              {option.icon}
              <span> {option.name}</span>
            </Link>
          ))}
        </div>
        <div>{children}</div>
      </div>
    </aside>
  );
}
