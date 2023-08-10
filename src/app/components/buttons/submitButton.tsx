import Spinner from '../spinner';

interface SubmitButtonProps {
  text: string;
  formStatus: string;
}

const SubmitButton = ({ text, formStatus }: SubmitButtonProps) => {
  return (
    <button
      className={`${
        formStatus == 'added' && 'border-green-500 border-4'
      } px-2 py-2 flex items-center justify-center border-4 border-gray-200 ml-1 w-28 bg-black text-white hover:opacity-80 font-semibold rounded-md`}
      type='submit'
    >
      {formStatus == 'adding' ? <Spinner color='white' /> : <span>{text}</span>}
    </button>
  );
};

export default SubmitButton;
