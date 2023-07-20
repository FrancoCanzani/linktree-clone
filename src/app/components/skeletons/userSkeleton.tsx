export default function UserSkeleton() {
  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='w-16 h-16 bg-gray-200 rounded-md animate-pulse'></div>
      <div className='w-64 px-4 mt-4 py-2 bg-gray-200 rounded-md animate-pulse'></div>
    </div>
  );
}
