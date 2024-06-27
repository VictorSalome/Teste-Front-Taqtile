import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER_QUERY_BY_ID } from '../../graphql/query';
import { IUserAdd } from '../../interfaces/interface-user-add';
import { ButtonRedirect, SpinnerScreenLoading } from '../../components';

export const DetailsUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<{ user: IUserAdd }>(USER_QUERY_BY_ID, {
    variables: { userId: id },
  });

  if (loading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center'>
        <SpinnerScreenLoading />
      </div>
    );
  }

  if (error) {
    return <p className='text-center mt-4 text-red-500'>Error: {error.message}</p>;
  }

  if (!data || !data.user) {
    return <p className='text-center mt-4 text-gray-500'>User not found</p>;
  }

  const { user } = data;

  return (
    <div className='mx-auto max-w-lg p-6 bg-white shadow-lg rounded-lg mt-10'>
      <h2 className='text-2xl font-semibold text-taqtile-font-secondary mb-6'>Detalhes do Usuário</h2>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        <div className='flex flex-col'>
          <p className='text-base font-semibold text-gray-800'>Nome:</p>
          <p className='text-base text-gray-600'>{user.name}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-base font-semibold text-gray-800'>Email:</p>
          <p className='text-base text-gray-600'>{user.email}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-base font-semibold text-gray-800'>Telefone:</p>
          <p className='text-base text-gray-600'>{user.phone}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-base font-semibold text-gray-800'>Data de Nascimento:</p>
          <p className='text-base text-gray-600'>{user.birthDate}</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-base font-semibold text-gray-800'>Cargo:</p>
          <p className='text-base text-gray-600'>{user.role}</p>
        </div>
      </div>

      <ButtonRedirect to='/user-list-page' />
    </div>
  );
};
