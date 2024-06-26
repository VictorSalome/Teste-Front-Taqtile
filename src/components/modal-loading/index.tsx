// ModalLoading.tsx
import React, { useState, useEffect } from 'react';
import { SpinerLoading } from '../spiner-loading';

interface ModalLoadingProps {
  show: boolean;
}

export const ModalLoading: React.FC<ModalLoadingProps> = ({ show }) => {
  const [isOpen, setIsOpen] = useState(show);

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-transparent z-50'>
      <div className='fixed inset-0 bg-black opacity-50'></div>
      <div className='bg-white rounded-lg p-6'>
        <div className='text-center mb-4'>
          <SpinerLoading />
        </div>
      </div>
    </div>
  );
};
