export default function LinkSkeleton() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='m-2 text-clip min-w-full hover:scale-105 transition-all duration-100 px-6 py-3 rounded-xl bg-lime-400 border-4 font-semibold text-slate-900 border-lime-300 animate-pulse'>
        <div className='w-72 px-4 py-2 bg-lime-400 animate-pulse'></div>
      </div>
      <div className='m-2 text-clip min-w-full hover:scale-105 transition-all duration-100 px-6 py-3 rounded-xl bg-lime-400 border-4 font-semibold text-slate-900 border-lime-300 animate-pulse'>
        <div className='w-72 px-4 py-2 bg-lime-400 animate-pulse'></div>
      </div>
    </div>
  );
}
