'use client';

// Gets us the selected link to maintain style state
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';

// SVG Icons
import HyperlinkSVG from '@/public/svg/hyperlink';
import AppearanceSVG from '@/public/svg/appearance';
import AnalyticsSVG from '@/public/svg/analyics';
import AccountSVG from '@/public/svg/account';
import ArrowSVG from '@/public/svg/arrow';
import HomeSVG from '@/public/svg/home';

// React Hooks
import { useState } from 'react';

const sidebarOptions = [
  { name: 'Links', href: '/admin/links', icon: HyperlinkSVG },
  { name: 'Appearance', href: '/admin/appearance', icon: AppearanceSVG },
  { name: 'Analytics', href: '/admin/analytics', icon: AnalyticsSVG },
  { name: 'Account', href: '/admin/account', icon: AccountSVG },
];

const AdminPanelSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const segment = useSelectedLayoutSegment();

  return (
    <aside
      className={`relative flex-col pt-6 flex bg-gray-100 rounded-r-md ${
        isOpen ? 'w-1/2 lg:w-60 items-start' : 'w-24 items-center'
      }`}
    >
      <Link
        href={'/admin'}
        className='mb-8 flex items-center justify-center w-full gap-3 text-center font-bold text-xl'
      >
        <div>{HomeSVG}</div>
        <span className={`${!isOpen && 'hidden'}`}>Admin Panel</span>
      </Link>
      {sidebarOptions.map((option, index) => (
        <Link
          key={option.name}
          href={option.href}
          className={`${
            index !== sidebarOptions.length - 1 ? 'mb-2' : 'mb-0 '
          } p-4 flex gap-3 items-center justify-center font-bold hover:bg-gray-100 bg-white w-full ${
            segment &&
            option.href.includes(segment) &&
            isOpen &&
            'border-black border-l-4'
          }
          `}
        >
          {option.icon}
          <span className={`${!isOpen && 'hidden'}`}> {option.name}</span>
        </Link>
      ))}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${!isOpen && 'rotate-180'} absolute bottom-2 right-6`}
      >
        {ArrowSVG}
      </button>
    </aside>
  );
};

export default AdminPanelSidebar;
