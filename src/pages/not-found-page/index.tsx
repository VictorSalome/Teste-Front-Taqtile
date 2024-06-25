import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white p-12 text-center md:text-left'>
      <h1 className='text-4xl font-bold text-gray-700 mb-4'>Oops!😟 Página não encontrada</h1>
      <p className='text-lg text-gray-600 mb-4'>Desculpe, mas a página que você está procurando não pode ser encontrada. 😔</p>
      <p className='text-lg text-gray-600 mb-4'>Erro: 404</p>
      <Link to='/' className='text-blue-500 hover:underline mt-4'>
        Voltar para a página de login 🔙
      </Link>
    </div>
  );
};
