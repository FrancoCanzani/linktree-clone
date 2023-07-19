'use client';

import React, { useState, useEffect } from 'react';
import UserProfile from '../components/userProfile';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, app } from '@/firebase';
import { DocumentData } from 'firebase/firestore';

const auth = getAuth(app);
const user = auth.currentUser;

export default function RepoTree() {
  const [repos, setRepos] = useState<DocumentData[]>([]);
  const [dataFetched, setDataFetched] = useState(false); // State to track data fetching status
  const [user, setUser] = useState<User | null>(null); // Import the User type from Firebase

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'repo'), where('userId', '==', user.uid));
      getDocs(q)
        .then((querySnapshot) => {
          const repoData = querySnapshot.docs.map((doc) => doc.data());
          setRepos(repoData);
          setDataFetched(true);
        })
        .catch((error) => {
          console.error('Error fetching repositories:', error);
          setRepos([]);
        });
    } else {
      setRepos([]);
    }
  }, [user]);

  function repoToUrl(link: string): string | undefined {
    try {
      const url = new URL(link);
      return url.hostname;
    } catch (error) {
      console.error(`Error parsing URL "${link}":`, error);
      return undefined;
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-evenly xl:px-44 py-8'>
      <UserProfile />
      <div className='flex flex-col items-center justify-center'>
        {dataFetched ? ( // Conditionally render the repositories and favicons after data is fetched
          repos.length > 0 ? (
            repos.map((repo) => (
              <a
                key={repo.repoLink}
                target='_blank'
                href={repo.repoLink}
                className='m-2 text-clip min-w-full hover:scale-105 transition-all duration-100 px-6 py-3 rounded-xl bg-lime-400 border-4 font-semibold text-slate-900 border-lime-300'
              >
                <span> {repoToUrl(repo.repoLink)}</span>
              </a>
            ))
          ) : (
            <p>No repositories found.</p>
          )
        ) : (
          <span className='animate-spin'>🌍</span> // Display a loading message while data is being fetched
        )}
      </div>
    </main>
  );
}
