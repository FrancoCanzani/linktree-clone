import Image from 'next/image';
import LinkSkeleton from './skeletons/linkSkeleton';
import { DocumentData } from 'firebase/firestore';

interface UserLinkProps {
  dataFetched: boolean;
  links: DocumentData[];
}

export default function UserLink({ dataFetched, links }: UserLinkProps) {
  const fetchFavicons = async () => {
    const faviconsData = {}; // Store favicons in a new object
    for (const link of links) {
      const l = /^https?:\/\//i.test(link.userLink)
        ? link.userLink
        : 'http://' + link.userLink;
      try {
        const response = await fetch(
          `https://www.google.com/s2/favicons?domain=${encodeURIComponent(l)}`
        );
        if (response.ok) {
          faviconsData[link.userLink] = response.url;
        } else {
          //   console.error(
          //     `Error fetching favicon for "${link.userLink}". Status: ${response.status}`
          //   );
        }
      } catch (error) {
        // console.error(`Error fetching favicon for "${link.userLink}":`, error);
      }
    }
    return faviconsData;
  };

  if (dataFetched && links.length > 0) {
    const faviconsData = fetchFavicons(); // Fetch and store the favicons
    return (
      <div className='flex flex-col items-center justify-center'>
        {links.length > 0 ? (
          links.map((link) => {
            const l = /^https?:\/\//i.test(link.userLink)
              ? link.userLink
              : 'http://' + link.userLink;

            return (
              <a
                target='_blank'
                href={l}
                key={link.userLink}
                className='m-2 flex items-center gap-4 w-96 hover:scale-105 transition-all duration-100 px-9 py-4 rounded-md bg-purple-900 font-semibold text-pink-100'
              >
                <Image
                  src={
                    faviconsData[link.userLink] ||
                    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
                      l
                    )}`
                  }
                  height={30}
                  width={30}
                  alt={`Favicon for ${link.userLink}`}
                  className='p-2 bg-white rounded-md'
                />
                <p>{link.linkDescription}</p>
              </a>
            );
          })
        ) : (
          <p>No repositories found</p>
        )}
      </div>
    );
  }

  return <LinkSkeleton />;
}
