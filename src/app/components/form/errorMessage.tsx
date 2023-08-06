export default function ErrorMessage({ error }: { error: string }) {
  return <span className='text-red-500 capitalize'>{error}</span>;
}
