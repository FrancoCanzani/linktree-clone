'use client';

// Components
import UserProfile from '../components/userProfile';
import UserLink from '../components/userLink';

// utils
import useFetchLinks from '@/utils/hooks/useFetchLinks';

// Firebase imports
import { getAuth } from 'firebase/auth';
import { app } from '../../../firebase';
import Icon from '../components/icon';

const auth = getAuth(app);

const generateStaticParams = async () => {
  const user = auth.currentUser;

  const username = user?.displayName?.replace(' ', '');

  return {
    slug: username,
  };
};

export default function LinkTree({ params }: { params: { slug: string } }) {
  const { links, dataFetched } = useFetchLinks();

  return (
    <main className='flex px-4 xl:px-44 flex-col items-center justify-start py-8'>
      <UserProfile />
      <UserLink dataFetched={dataFetched} links={links} />
      <footer className='fixed bottom-2'>
        <Icon size='text-xl' />
      </footer>
    </main>
  );
}
