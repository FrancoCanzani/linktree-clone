'use client';

// React imports
import { useState, useEffect } from 'react';

// Components
import UserProfile from '../components/userProfile';
import UserLink from '../components/userLink';

// Firebase imports
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { DocumentData } from 'firebase/firestore';

// utils
import useFirebaseUser from '@/utils/hooks/useFirebaseUser';

export default function LinkTree() {
  const [links, setLinks] = useState<DocumentData[]>([]);
  const [dataFetched, setDataFetched] = useState(false); // State to track data fetching status
  const { user } = useFirebaseUser();

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'links'), where('userId', '==', user.uid));
      getDocs(q)
        .then((querySnapshot) => {
          const repoData = querySnapshot.docs.map((doc) => doc.data());
          setLinks(repoData);
          setDataFetched(true);
        })
        .catch((error) => {
          console.error('Error fetching repositories:', error);
          setLinks([]);
        });
    } else {
      setLinks([]);
    }
  }, [user]);

  return (
    <main className='flex bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black min-h-screen flex-col items-center justify-start xl:px-44 py-8'>
      <UserProfile />
      <UserLink dataFetched={dataFetched} links={links} />
    </main>
  );
}
