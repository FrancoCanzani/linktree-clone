'use client';

import React, { useState, useEffect } from 'react';
import UserProfile from '../components/userProfile';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { DocumentData } from 'firebase/firestore';

import useFirebaseUser from '@/hooks/useFirebaseUser';

import LinkSkeleton from '../components/skeletons/linkSkeleton';

export default function RepoTree() {
  const [repos, setRepos] = useState<DocumentData[]>([]);
  const [dataFetched, setDataFetched] = useState(false); // State to track data fetching status
  const { user } = useFirebaseUser();

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
      if (!/^https?:\/\//i.test(link)) {
        // If the link does not start with http:// or https://, prepend http://
        link = 'http://' + link;
      }
      const url = new URL(link);
      return url.hostname;
    } catch (error) {
      console.error(`Error parsing URL "${link}":`, error);
      return undefined;
    }
  }

  return (
    <main className='flex bg-gradient-to-tr from-purple-800 via-purple-900 to-purple-900 min-h-screen flex-col items-center justify-start xl:px-44 py-8'>
      <UserProfile />
      <div className='flex flex-col items-center justify-center'>
        {dataFetched ? (
          repos.length > 0 ? (
            repos.map((repo) => {
              const link = /^https?:\/\//i.test(repo.repoLink)
                ? repo.repoLink
                : 'http://' + repo.repoLink;

              return (
                <a
                  key={repo.repoLink}
                  target='_blank'
                  href={link}
                  className='m-2 text-clip min-w-full hover:scale-105 transition-all duration-100 px-6 py-3 rounded-xl bg-lime-400 border-4 font-semibold text-slate-900 border-lime-200 shadow-inner shadow-lime-400'
                >
                  <span>{repoToUrl(repo.repoLink) || repo.repoLink}</span>
                </a>
              );
            })
          ) : (
            <p>No repositories found.</p>
          )
        ) : (
          <LinkSkeleton />
        )}
      </div>
    </main>
  );
}
