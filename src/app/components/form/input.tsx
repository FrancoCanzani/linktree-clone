import { ChangeEventHandler } from 'react';

interface InputProps {
  label: string;
  inputId: string;
  value: string;
  placeholder: string;
  onChangeFn: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  label,
  inputId,
  value,
  placeholder,
  onChangeFn,
}: InputProps) => {
  return (
    <div className='flex flex-col px-4'>
      <label htmlFor={inputId} className='px-2 mb-1 text-sm capitalize'>
        {label}
      </label>
      <input
        type='text'
        name={inputId}
        id={inputId}
        required
        autoComplete='off'
        value={value}
        placeholder={placeholder}
        className='px-4 py-2 rounded-md border'
        onChange={onChangeFn}
      />
    </div>
  );
};

export default Input;
