'use client';

// Gets us the selected link to maintain style state
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';

const sidebarOptions = [
  { name: 'Links', href: '/admin/links' },
  { name: 'Appearance', href: '/admin/appearance' },
  { name: 'Analytics', href: '/admin/analytics' },
  { name: 'Account', href: '/admin/account' },
];

export default function AdminSidebar() {
  const segment = useSelectedLayoutSegment();

  return (
    <aside className='flex flex-col h-screen pt-3 items-start w-1/6 bg-gray-100 rounded-r-md'>
      <Link
        href={'/admin'}
        className='mb-8 px-3 w-full text-center font-bold text-xl'
      >
        Admin Panel
      </Link>
      {sidebarOptions.map((option, index) => (
        <Link
          key={option.name}
          href={option.href}
          className={`${
            index !== sidebarOptions.length - 1 ? 'mb-2' : 'mb-0'
          } p-4 font-bold hover:bg-gray-100 bg-white w-full border-r-4 ${
            segment && option.href.includes(segment)
              ? 'border-black'
              : 'border-none'
          }`}
        >
          {option.name}
        </Link>
      ))}
    </aside>
  );
}
