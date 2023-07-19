import Link from 'next/link';

// Components
import Header from './components/header';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between xl:px-44 py-8'>
      <Header />
      <div className='flex items-center gap-8'>
        <Link href={'/myRepos'}>Set up a repo</Link>
        <Link href={'/yourTree'}>Your Repos</Link>
      </div>
    </main>
  );
}
