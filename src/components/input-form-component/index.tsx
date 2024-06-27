import React, { useState } from 'react';
import { IInputFormProps } from '../../interfaces/interface-components';
import { Controller, FieldError } from 'react-hook-form';

interface InputSubmitRegisterFormProps {
  label: string;
  name: string;
  control: any;
  error?: FieldError;
  render: (args: {
    field: {
      value: any;
      onChange: (...event: any[]) => void;
      onBlur: () => void;
    };
  }) => JSX.Element;
}

export const InputSubmitLoginForm: React.FC<IInputFormProps> = ({
  label,
  name,
  type = 'text',
  register,
  error,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className='mb-4'>
      <label className='block text-taqtile-font-primary text-base font-bold mb-2'>{label}</label>
      <div className='relative'>
        <input
          className='shadow-md appearance-none border rounded-xl w-full h-12 py-2 px-3 text-taqtile-font-primary leading-tight focus:outline-none focus:shadow-outline'
          type={showPasswordToggle && showPassword ? 'text' : type}
          {...register(name)}
        />
        {showPasswordToggle && (
          <button
            type='button'
            className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>
      {error && <p className='text-red-500 text-xs italic mt-3'>{error.message}</p>}
    </div>
  );
};

export const InputSubmitRegisterForm: React.FC<InputSubmitRegisterFormProps> = ({ label, name, control, error, render }) => {
  return (
    <div className='mb-4 w-full'>
      <label className='block text-taqtile-font-primary text-base font-bold mb-2'>{label}</label>
      <div className='relative'>
        <Controller name={name} control={control} render={({ field }) => render({ field })} />
      </div>
      {error && <p className='text-red-500 text-xs italic mt-3'>{error.message}</p>}
    </div>
  );
};
