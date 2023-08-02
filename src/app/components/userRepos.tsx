import Image from 'next/image';
import { DocumentData } from 'firebase/firestore';
import { transformURL } from '@/utils/functions/transformURL';
import useFetchRepositories from '@/utils/hooks/useFetchRepositories';
import useFetchRepositoryTech from '@/utils/hooks/useFetchRepositoryTech';
import LegendComponent from './repositoryTechBarList';

const UserRepos = () => {
  const { repos, dataFetched } = useFetchRepositories();

  return (
    <>
      {repos.length > 0 ? (
        <div className='flex w-1/2 flex-col relative items-center justify-center'>
          {repos.map((repo) => (
            <UserRepoItem key={repo.repositoryLink} repo={repo} />
          ))}
        </div>
      ) : (
        <span>No links found</span>
      )}
    </>
  );
};

const UserRepoItem = ({ repo }: UserRepoItemProps) => {
  const { repositoryOwner, repositoryName, repositoryLink } = repo;
  const { repositoryTech, error } = useFetchRepositoryTech({
    repositoryOwner,
    repositoryName,
  });

  const technologies: Technology[] = Object.entries(repositoryTech).map(
    ([name, bytesUsed]) => ({
      name,
      bytesUsed: Number(bytesUsed),
    })
  );

  return (
    <a
      href={repositoryLink}
      target='_blank'
      className='m-2 flex w-full  items-center justify-center gap-4 px-9 py-2 rounded-md font-semibold'
    >
      <div className='flex flex-col justify-center items-center'>
        <div className='flex items-center justify-center gap-2'>
          <Image
            src={`https://www.google.com/s2/favicons?sz=256&domain_url=${encodeURIComponent(
              transformURL(repositoryLink)
            )}`}
            height={25}
            width={25}
            priority
            alt={`Favicon for ${repositoryName} repository`}
            className='p-1 bg-white rounded-md'
          />
          <span className='text-xl'>
            {`${repositoryName} by ${repositoryOwner}`}
          </span>
        </div>

        {error ? (
          <span>Error fetching tech data</span>
        ) : (
          <LegendComponent technologies={technologies} />
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
