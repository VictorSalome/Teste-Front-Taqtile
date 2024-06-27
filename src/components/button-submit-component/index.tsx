import React from 'react';
import { SpinnerLoading } from '../spinner-button-loading-component';

interface ILoadingButtonProps {
  isLoading: boolean;
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export const ButtonSubmit: React.FC<ILoadingButtonProps> = ({
  isLoading,
  text,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  return (
    <button
      className={`bg-taqtile-green hover:bg-[#004440db] w-full h-12 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : 'bg-taqtile-green hover:bg-[#004440db]'} ${className}`}
      onClick={onClick}
      type={type}
      disabled={isLoading || disabled}
    >
      <span className='flex items-center justify-center'>
        {isLoading && <SpinnerLoading />}
        {text}
      </span>
    </button>
  );
};
