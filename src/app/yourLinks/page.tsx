'use client';

import React, { useState, useEffect } from 'react';
import UserProfile from '../components/userProfile';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { DocumentData } from 'firebase/firestore';

import Image from 'next/image';

import useFirebaseUser from '@/hooks/useFirebaseUser';

import LinkSkeleton from '../components/skeletons/linkSkeleton';

export default function RepoTree() {
  const [repos, setRepos] = useState<DocumentData[]>([]);
  const [dataFetched, setDataFetched] = useState(false); // State to track data fetching status
  const { user } = useFirebaseUser();
  const [favicons, setFavicons] = useState<Record<string, string>>({});

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

  useEffect(() => {
    const fetchFavicons = async () => {
      const faviconsData: Record<string, string> = {};
      for (const repo of repos) {
        const link = /^https?:\/\//i.test(repo.repoLink)
          ? repo.repoLink
          : 'http://' + repo.repoLink;
        try {
          const response = await fetch(
            `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
              link
            )}`
          );
          if (response.ok) {
            faviconsData[repo.repoLink] = response.url;
          } else {
            console.error(
              `Error fetching favicon for "${link}". Status: ${response.status}`
            );
          }
        } catch (error) {
          console.error(`Error fetching favicon for "${link}":`, error);
        }
      }
      setFavicons(faviconsData);
    };

    if (dataFetched && repos.length > 0) {
      fetchFavicons();
    }
  }, [dataFetched, repos]);

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
    <main className='flex bg-gradient-to-tl from-black via-black to-purple-900 min-h-screen flex-col items-center justify-start xl:px-44 py-8'>
      <UserProfile />
      <div className='flex flex-col items-center justify-center'>
        {dataFetched ? (
          repos.length > 0 ? (
            repos.map((repo) => {
              const link = /^https?:\/\//i.test(repo.repoLink)
                ? repo.repoLink
                : 'http://' + repo.repoLink;

              return (
                <div
                  key={repo.repoLink}
                  className='m-2 flex items-center gap-4 min-w-full hover:scale-105 transition-all duration-100 px-9 py-4 rounded-3xl bg-purple-900 font-semibold text-pink-100'
                >
                  <Image
                    src={
                      favicons[repo.repoLink] ||
                      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
                        link
                      )}`
                    }
                    height={50}
                    width={50}
                    alt={`Favicon for ${link}`}
                    className='p-2 bg-white rounded-md'
                  />
                  <a
                    target='_blank'
                    href={link}
                    className='text-clip min-w-full'
                  >
                    <span>{repoToUrl(repo.repoLink) || repo.repoLink}</span>
                  </a>
                </div>
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
