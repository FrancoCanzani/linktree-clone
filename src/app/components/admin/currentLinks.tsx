import useFetchLinks from '@/utils/hooks/useFetchLinks';
import { doc, collection, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../../../../firebase';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import LinkType from '@/utils/types';

export default function CurrentLinks() {
  const { links, repositories, fetchingStatus } = useFetchLinks();
  const { user } = useFirebaseUser();

  async function handleDeleteLink(linkToDelete: LinkType, docToUpdate: string) {
    try {
      if (user) {
        const userRef = doc(collection(db, 'users'), user.uid);
        await updateDoc(userRef, {
          [docToUpdate]: arrayRemove(linkToDelete),
        });
        console.log('Successfully deleted link.');
      }
    } catch (error) {
      throw new Error(
        'Something went wrong while deleting the link. Please try again!'
      );
    }
  }

  return (
    <section className='mt-6 text-center w-2/3 lg:w-1/2'>
      {fetchingStatus == 'error' && (
        <span className='capitalize text-red-500'>
          Something went wrong. Please try again!
        </span>
      )}
      <ul>
        {links.length > 0 &&
          links.map((link) => (
            <li key={link.key}>
              <div className='p-1 rounded-md mb-4 bg-white'>
                <div className='flex pt-2 pl-2 justify-end mb-1 text-xs font-semibold'>
                  <span className='bg-green-300 p-1 rounded-md'>
                    General Link
                  </span>
                </div>
                <div className='flex px-4 items-center justify-between'>
                  <p className='font-semibold'>{link.Url}</p>
                  <button
                    className=''
                    onClick={() => handleDeleteLink(link, 'link')}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <ul>
        {repositories.length > 0 &&
          repositories.map((repo) => (
            <li key={repo.key}>
              <div className='p-1 mb-4 w-full rounded-md bg-white'>
                <div className='flex pt-2 pl-2 justify-end mb-1 text-xs font-semibold'>
                  <span className='bg-red-300 p-1 rounded-md'>Repository</span>
                </div>
                <div className='flex px-4 items-center justify-between'>
                  <p className='font-semibold'>{repo.Url}</p>
                  <button
                    className='bg-gray-200 px-2 py-1 rounded-md text-xs'
                    onClick={() => handleDeleteLink(repo, 'repository')}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}