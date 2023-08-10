// NextJs imports
import Image from 'next/image';

// Skeleton
import LinkSkeleton from '../skeletons/linkSkeleton';

// Firebase types
import Link from 'next/link';

import { transformURL } from '@/utils/functions/transformURL';
import useFetchLinks from '@/utils/hooks/useFetchLinks';

export default function UserLink() {
  const { generalLinks, repositories, fetchingStatus } = useFetchLinks();

  return (
    <>
      {generalLinks ? (
        generalLinks.length > 0 ? (
          <div className='flex w-1/2 flex-col relative items-center justify-center'>
            {generalLinks.map((link) => (
              <a
                target='_blank'
                href={link.url}
                key={link.url}
                className='m-2 flex w-full bg-black text-white items-center justify-center gap-4 px-9 py-4 rounded-md font-semibold'
              >
                <Image
                  src={`https://www.google.com/s2/favicons?sz=256&domain_url=${encodeURIComponent(
                    transformURL(link.url)
                  )}`}
                  height={40}
                  width={40}
                  priority
                  alt={`Favicon for ${link.url}`}
                  className='p-2 absolute left-7 bg-white rounded-md'
                />
                <span className='hover:scale-105 text-xl transition-all duration-100'>
                  {link.description}
                </span>
              </a>
            ))}
          </div>
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
