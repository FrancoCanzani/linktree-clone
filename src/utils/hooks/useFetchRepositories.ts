import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';

interface Repository {
  repositoryLink: string;
  repositoryName: string;
  repositoryOwner: string;
}

function useFetchRepositories(): {
  repos: Repository[];
  reposDataFetched: boolean;
} {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [reposDataFetched, setDataFetched] = useState(false);
  const { user } = useFirebaseUser();

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const unsub = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.data();
          if (userData && userData.repositoryLinks) {
            setRepos(userData.repositoryLinks);
            setDataFetched(true);
          }
        } else {
          setRepos([]);
          setDataFetched(true);
        }
      });

      return () => unsub();
    } else {
      setRepos([]);
      setDataFetched(true);
    }
  }, [user]);

  return { repos, reposDataFetched };
}

export default useFetchRepositories;
