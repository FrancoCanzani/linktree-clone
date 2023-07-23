// NextJs imports
import Image from 'next/image';

// Skeleton
import LinkSkeleton from './skeletons/linkSkeleton';

// Firebase types
import { DocumentData } from 'firebase/firestore';

interface UserLinkProps {
  dataFetched: boolean;
  links: DocumentData[];
}

export default function UserLink({ dataFetched, links }: UserLinkProps) {
  return (
    <>
      {dataFetched ? (
        links.length > 0 ? (
          <div className='flex flex-col relative items-center justify-center'>
            {links.map((link) => {
              const url = /^https?:\/\//i.test(link.userLinks.linkURL)
                ? link.userLinks.linkURL
                : 'http://' + link.userLinks.linkURL;

              return (
                <a
                  target='_blank'
                  href={url}
                  key={link.userLinks.linkURL}
                  className='m-2 flex items-center justify-center gap-4 w-96 px-9 py-4 rounded-md bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 font-semibold'
                >
                  <Image
                    src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(
                      url
                    )}`}
                    height={32}
                    width={32}
                    priority
                    alt={`Favicon for ${link.userLinks.linkURL}`}
                    className='p-2 absolute left-7 bg-white rounded-md'
                  />
                  <p className='hover:scale-105 transition-all duration-100'>
                    {link.userLinks.linkDescription}
                  </p>
                </a>
              );
            })}
          </div>
        ) : (
          <p>No Links Found</p>
        )
      ) : (
        <LinkSkeleton />
      )}
    </>
  );
}
