import { Dispatch, SetStateAction } from 'react';
import CrossSVG from '@/public/svg/cross';

const CloseButton = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <button
      onClick={handleClose}
      aria-label='Close'
      className='hover:bg-gray-100 rounded-full'
    >
      <CrossSVG />
    </button>
  );
};

export default CloseButton;
