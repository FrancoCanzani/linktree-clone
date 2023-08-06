import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';
import LinkType from '../types';

export default function useFetchLinks(): {
  links: LinkType[];
  repositories: LinkType[];
  fetchingStatus: string;
} {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [repositories, setRepositories] = useState<LinkType[]>([]);
  const [fetchingStatus, setFetchingStatus] = useState('idle'); // Set initial status to 'idle'
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
            setFetchingStatus('fetched');
          }
        } else {
          setLinks([]);
          setRepositories([]);
          setFetchingStatus('fetched'); // Set to 'fetched' even when user data doesn't exist
        }
      });

      return () => unsub();
    } else {
      setLinks([]);
      setRepositories([]);
      setFetchingStatus('error'); // Set to 'not_fetched' when user is not available
    }
  }, [user]);

  return { links, repositories, fetchingStatus };
}
