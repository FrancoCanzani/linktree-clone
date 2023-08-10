// NextJs imports
import Image from 'next/image';

// Skeleton
import LinkSkeleton from '../skeletons/linkSkeleton';

// Firebase types
import Link from 'next/link';

import useFetchLinks from '@/utils/hooks/useFetchLinks';

export default function UserLink() {
  const { generalLinks, repositories, fetchingStatus } = useFetchLinks();

  return (
    <>
      {generalLinks ? (
        generalLinks.length > 0 ? (
          generalLinks.map((link) => (
            <a
              target='_blank'
              href={link.url}
              key={link.url}
              className='m-2 flex relative xl:w-2/3 hover:scale-105 bg-black text-white items-center justify-center gap-4 px-9 py-4 rounded-sm font-semibold'
            >
              <Image
                src={link.images[0]}
                height={90}
                width={90}
                alt={link.title}
                className='absolute p-1 left-2 rounded-md'
              />
              <div className='justify-center capitalize px-24 w-full flex items-center'>
                <span className='mr-1'>{`${link.domain}: `}</span>
                <p className='block truncate'>{link.title}</p>
              </div>{' '}
            </a>
          ))
        ) : (
          <div className='bg-gray-100 flex flex-col items-center justify-center px-4 py-2 rounded-md'>
            <span className='mb-2 font-bold'>No Links Found</span>
            <Link
              href={'/admin/links'}
              className='capitalize underline font-bold text-blue-500'
            >
              Set one up
            </Link>
          </div>
        )
      ) : (
        <LinkSkeleton />
      )}
    </>
  );
}
