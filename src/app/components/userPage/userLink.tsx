// NextJs imports
import Image from 'next/image';

// Skeleton
import LinkSkeleton from '../skeletons/linkSkeleton';

// Firebase types
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';

import { transformURL } from '@/utils/functions/transformURL';

interface UserLinkProps {
  dataFetched: boolean;
  links: DocumentData[];
}

export default function UserLink({ dataFetched, links }: UserLinkProps) {
  return (
    <>
      {dataFetched ? (
        links.length > 0 ? (
          <div className='flex w-1/2 flex-col relative items-center justify-center'>
            {links.map((link) => (
              <a
                target='_blank'
                href={link.linkURL}
                key={link.linkURL}
                className='m-2 flex w-full bg-black text-white items-center justify-center gap-4 px-9 py-4 rounded-md font-semibold'
              >
                <Image
                  src={`https://www.google.com/s2/favicons?sz=256&domain_url=${encodeURIComponent(
                    transformURL(link.linkURL)
                  )}`}
                  height={40}
                  width={40}
                  priority
                  alt={`Favicon for ${link.linkURL}`}
                  className='p-2 absolute left-7 bg-white rounded-md'
                />
                <span className='hover:scale-105 text-xl transition-all duration-100'>
                  {link.linkDescription}
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
