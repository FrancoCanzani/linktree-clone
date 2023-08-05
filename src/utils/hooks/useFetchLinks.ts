import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';

function useFetchLinks(): {
  links: string[];
  repositories: string[];
  fetchingStatus: string;
} {
  const [links, setLinks] = useState<string[]>([]);
  const [repositories, setRepositories] = useState<string[]>([]);
  const [fetchingStatus, setFetchingStatus] = useState('');
  const { user } = useFirebaseUser();

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const unsub = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.data();
          if (userData && userData.link && userData.repository) {
            setLinks(userData.link);
            setRepositories(userData.repository);
          }
        } else {
          setLinks([]);
          setRepositories([]);
          setFetchingStatus('fetched');
        }
      });

      return () => unsub();
    } else {
      setLinks([]);
      setRepositories([]);
      setFetchingStatus('error');
    }
  }, [user]);

  return { links, repositories, fetchingStatus };
}

export default useFetchLinks;
