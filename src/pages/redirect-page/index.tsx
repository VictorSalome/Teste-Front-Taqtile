import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RedirectPage: React.FC = () => {
  const [countdown, setCountdown] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white p-12 text-center md:text-left'>
      <h1 className='text-4xl font-semibold text-gray-700'>Ops! 😕</h1>
      <div className='mt-4 w-full h-1 bg-gray-200 rounded-full'></div>
      <p className='mt-4 text-lg text-gray-600'>
        Você será redirecionado em <span className='font-bold'>{countdown}</span> segundos para a página de login.{' '}
      </p>
    </div>
  );
};
