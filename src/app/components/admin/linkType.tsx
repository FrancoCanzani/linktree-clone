import { ReactElement } from 'react';
import { Dispatch, SetStateAction } from 'react';

const LinkType = ({
  SVG,
  text,
  linkType,
  setLinkType,
}: {
  SVG: ReactElement<any, any>;
  text: string;
  linkType: string;
  setLinkType: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className='flex flex-col items-center justify-center p-2'>
      <button
        onClick={() => setLinkType(text)}
        type='button'
        className={`${
          linkType == text ? 'border-stone-800' : 'border-stone-200'
        } p-4 border-2 hover:bg-gray-100 bg-white rounded-md mb-2`}
      >
        {SVG}
      </button>
      <span className='text-center capitalize font-semibold text-xs'>
        {text == 'generalLink' ? 'general link' : text}
      </span>
    </div>
  );
};

export default LinkType;
