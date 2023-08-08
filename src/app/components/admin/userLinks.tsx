import useFetchLinks from '@/utils/hooks/useFetchLinks';
import { doc, collection, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../../../../firebase';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import LinkType from '@/utils/types';
import Image from 'next/image';

export default function UserLinks() {
  const { generalLinks, repositories, fetchingStatus } = useFetchLinks();

  return (
    <section className='mt-6 text-center w-2/3 lg:w-1/2'>
      {fetchingStatus == 'error' && (
        <span className='capitalize text-red-500'>
          Something went wrong. Please try again!
        </span>
      )}

      <UserLink
        data={generalLinks}
        docToUpdate={'generalLink'}
        linkType={'General Link'}
      />

      <UserLink
        data={repositories}
        docToUpdate={'repository'}
        linkType={'Repository'}
      />
    </section>
  );
}

function UserLink({
  data,
  linkType,
  docToUpdate,
}: {
  data: LinkType[];
  linkType: string;
  docToUpdate: string;
}) {
  const { user } = useFirebaseUser();

  async function handleDeleteLink(linkToDelete: LinkType, docToUpdate: string) {
    try {
      if (user) {
        const userRef = doc(collection(db, 'users'), user.uid);
        await updateDoc(userRef, {
          [docToUpdate]: arrayRemove(linkToDelete),
        });
      }
    } catch (error) {
      throw new Error(
        'Something went wrong while deleting the link. Please try again!'
      );
    }
  }
  return (
    <ul>
      {data.length > 0 &&
        data.map((link) => (
          <li key={link.key}>
            <div
              className={`p-3 shadow-sm rounded-md mb-4 ${
                docToUpdate == 'generalLink' ? 'bg-white' : 'bg-sky-50'
              }`}
            >
              <div className='flex items-center justify-start '>
                <Image
                  src={link.images[0]}
                  width={150}
                  height={150}
                  priority
                  alt={link.description}
                  className='rounded-md xl:mr-6'
                />
                <div className='flex w-full flex-col'>
                  <div className='flex items-center mb-2 w-full justify-between'>
                    <p className='font-semibold text-ellipsis truncate  max-w-xs'>
                      {link.title}
                    </p>
                    <div className=''>
                      <button
                        className='bg-gray-100 mr-2 px-2 p-1 text-xs rounded-md'
                        onClick={() => handleDeleteLink(link, docToUpdate)}
                      >
                        Delete
                      </button>
                      <span
                        className={`${
                          docToUpdate == 'generalLink'
                            ? 'bg-green-300 text-green-800'
                            : 'bg-slate-900 text-slate-200'
                        } p-1 text-xs rounded-md`}
                      >
                        {linkType}
                      </span>
                    </div>
                  </div>
                  <p className='text-left text-ellipsis truncate break-all max-w-md'>
                    {link.description}
                  </p>
                  <a
                    target='blank'
                    href={link.url}
                    className='text-left underline text-blue-500 text-xs italic text-ellipsis truncate break-all max-w-md'
                  >
                    {link.url}
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
