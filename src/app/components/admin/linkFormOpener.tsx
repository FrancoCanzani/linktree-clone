import { Dispatch, SetStateAction } from 'react';

const LinkFormOpener = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className='bg-gray-200 font-bold capitalize w-2/3 lg:w-1/2 hover:bg-gray-300 px-4 py-4 rounded-md '
    >
      Add link +
    </button>
  );
};

export default LinkFormOpener;
