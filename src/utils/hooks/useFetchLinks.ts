import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';

interface Link {
  linkURL: string;
  linkDescription: string;
}

function useFetchLinks(): { links: Link[]; dataFetched: boolean } {
  const [links, setLinks] = useState<Link[]>([]);
  const [dataFetched, setDataFetched] = useState(false);
  const { user } = useFirebaseUser();

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const unsub = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.data();
          if (userData && userData.projectLinks) {
            setLinks(userData.projectLinks);
            setDataFetched(true);
          }
        } else {
          setLinks([]);
          setDataFetched(true);
        }
      });

      return () => unsub();
    } else {
      setLinks([]);
      setDataFetched(true);
    }
  }, [user]);

  return { links, dataFetched };
}

export default useFetchLinks;
