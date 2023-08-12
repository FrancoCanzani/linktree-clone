import { useEffect, useState } from 'react';
import extractRepositoryInfo from '@/utils/functions/extractRepositoryInfo';

export default function useFetchRepositoryTech(url: string) {
  const [repositoryTech, setRepositoryTech] = useState({});
  const [error, setError] = useState<Error | undefined>();
  const { repositoryOwner, repositoryName } = extractRepositoryInfo(url);

  useEffect(() => {
    async function fetchTech() {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/languages`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch repository tech data.');
        }
        const data = await res.json();
        setRepositoryTech(data);
        setError(undefined);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      }
    }

    fetchTech();
  }, [repositoryName, repositoryOwner]);

  return { repositoryTech, error };
}
