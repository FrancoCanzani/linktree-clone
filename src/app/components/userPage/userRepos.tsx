import Image from 'next/image';
import { DocumentData } from 'firebase/firestore';
import { transformURL } from '@/utils/functions/transformURL';
import useFetchRepositoryTech from '@/utils/hooks/useFetchRepositoryTech';
import TechnologiesLegend from './technologiesLegend';
import useFetchLinks from '@/utils/hooks/useFetchLinks';

const UserRepos = () => {
  const { generalLinks, repositories, fetchingStatus } = useFetchLinks();
  const { repositoryTech, error } = useFetchRepositoryTech(
    'https://github.com/tailwindlabs/tailwindcss.com/blob/v3.3/src/layouts/SidebarLayout.js'
  );

  return (
    <>
      {repositories && (
        <div className='flex w-1/2 flex-col relative items-center justify-center'>
          {repositories.map((repo) => (
            <UserRepoItem key={repo.url} repo={repo} />
          ))}
        </div>
      )}
    </>
  );
};

const UserRepoItem = ({ repo }: UserRepoItemProps) => {
  const { repositoryTech, error } = useFetchRepositoryTech(repo.url);

  const technologies: Technology[] = Object.entries(repositoryTech).map(
    ([name, bytesUsed]) => ({
      name,
      bytesUsed: Number(bytesUsed),
    })
  );

  return (
    <a
      href={repo.url}
      target='_blank'
      className='m-2 flex w-full  items-center justify-center gap-4 px-9 py-2 rounded-md font-semibold'
    >
      <div className='flex flex-col justify-center items-center'>
        <div className='flex items-center justify-center gap-2'>
          {/* <Image
            src={repo?.Images[0]}
            height={25}
            width={25}
            priority
            alt={`Favicon for repository`}
            className='p-1 bg-white rounded-md'
          /> */}
          <span className='text-xl'>{repo.title}</span>
        </div>

        {error ? (
          <span>Error fetching tech data</span>
        ) : (
          <TechnologiesLegend technologies={technologies} />
        )}
      </div>
    </a>
  );
};

export default UserRepos;

interface UserRepoItemProps {
  repo: DocumentData;
}

interface Technology {
  name: string;
  bytesUsed: number;
}
