export default function ErrorMessage({ error }: { error: string | null }) {
  return <span className='text-red-500 text-xs capitalize'>{error}</span>;
}
