import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
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
      const q = query(collection(db, 'links'), where('userId', '==', user.uid));
      getDocs(q)
        .then((querySnapshot) => {
          const linkData = querySnapshot.docs.map((doc) => doc.data() as Link);
          setLinks(linkData);
          setDataFetched(true);
        })
        .catch((error) => {
          console.error('Error fetching links:', error);
          setLinks([]);
        });
    } else {
      setLinks([]);
    }
  }, [user]);

  return { links, dataFetched };
}

export default useFetchLinks;
