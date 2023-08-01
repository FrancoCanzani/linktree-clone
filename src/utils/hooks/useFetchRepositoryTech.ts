import { useEffect, useState } from 'react';

interface RepositoryTechProps {
  repositoryOwner: string;
  repositoryName: string;
}

export default function useFetchRepositoryTech({
  repositoryOwner,
  repositoryName,
}: RepositoryTechProps) {
  const [repositoryTech, setRepositoryTech] = useState({});
  const [error, setError] = useState<Error | undefined>();

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
        // This line is added to avoid Argument of type 'unknown' error is not assignable... error
        if (error instanceof Error) {
          setError(error);
        }
      }
    }

    return () => {
      fetchTech();
    };
  }, [repositoryName, repositoryOwner]);

  return { repositoryTech, error };
}
