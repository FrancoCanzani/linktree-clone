'use client';

import useFetchRepositories from '@/utils/hooks/useFetchRepositories';
import Image from 'next/image';
import { transformURL } from '@/utils/functions/transformURL';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import { User } from 'firebase/auth';
import { doc, collection, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../../../../firebase';

interface Repository {
  repositoryLink: string;
  repositoryName: string;
  repositoryOwner: string;
}

export default function RepositoryLinks() {
  const { repos, reposDataFetched } = useFetchRepositories();
  const { user } = useFirebaseUser();

  async function handleDeleteLink(user: User | null, linkToDelete: Repository) {
    try {
      if (user) {
        const userRef = doc(collection(db, 'users'), user.uid);
        await updateDoc(userRef, {
          RepositoryLinks: arrayRemove(linkToDelete),
        });
        console.log('Successfully deleted link.');
      }
    } catch (error) {
      console.log('Error deleting link:', error);
    }
  }

  return (
    <div className='w-full'>
      <ul className='w-full flex flex-col justify-center items-center'>
        {repos.map((repo) => (
          <li
            key={repo.repositoryLink}
            className='flex hover:opacity-95 w-1/2 justify-between items-center bg-black rounded-md mb-4 text-white px-4 py-1'
          >
            <Image
              src={`https://www.google.com/s2/favicons?sz=256&domain_url=${encodeURIComponent(
                transformURL(repo.repositoryLink)
              )}`}
              height={40}
              width={40}
              priority
              alt={`Favicon for ${repo.repositoryName} repository`}
              className='p-2 xl:mr-8 mr-2 bg-white rounded-md'
            />

            <div className='flex flex-col items-start justify-center w-full'>
              <span className='font-bold text-clip text-xl'>
                {repo.repositoryName}
              </span>
              <span className='truncate whitespace-nowrap overflow-hidden max-w-sm'>
                {repo.repositoryLink}
              </span>
            </div>

            <div className='font-bold text-center p-2 text-white border-white border-l-4'>
              <button className='' onClick={() => handleDeleteLink(user, repo)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
