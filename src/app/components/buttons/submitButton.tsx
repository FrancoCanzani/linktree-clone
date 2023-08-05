import Spinner from '../spinner';

interface SubmitButtonProps {
  text: string;
  formStatus: string;
}

const SubmitButton = ({ text, formStatus }: SubmitButtonProps) => {
  return (
    <button
      className={`${
        formStatus == 'Added' && 'border-green-600 border-2'
      } px-2 py-2 flex items-center justify-center ml-1 w-28 bg-black text-white hover:opacity-80 font-semibold rounded-md`}
      type='submit'
    >
      {formStatus == 'Adding' ? <Spinner color='white' /> : <span>{text}</span>}
    </button>
  );
};

export default SubmitButton;
