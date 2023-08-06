import useFetchLinks from '@/utils/hooks/useFetchLinks';

export default function Links() {
  const { links, repositories, fetchingStatus } = useFetchLinks();

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
              <div className='p-4 rounded-md mb-4 bg-white'>
                <div className='flex justify-start text-xs font-semibold'>
                  <span className='bg-green-300 p-1 rounded-md'>
                    General Link
                  </span>
                </div>
                <p className='font-semibold'>{link.Url}</p>
              </div>
            </li>
          ))}
      </ul>
      <ul>
        {repositories.length > 0 &&
          repositories.map((repo) => (
            <li key={repo.key}>
              <div className='p-4 mb-4 w-full rounded-md bg-white'>
                <div className='flex justify-start text-xs font-semibold'>
                  <span className='bg-red-300 p-1 rounded-md'>Repository</span>
                </div>
                <p className='font-semibold'>{repo.Url}</p>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
