import Link from 'next/link';

export default function Icon({ size }: { size: string }) {
  return (
    <Link href={'/'} className={`${size} font-black`}>
      dev.links
    </Link>
  );
}
