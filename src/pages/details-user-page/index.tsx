import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER_QUERY_BY_ID } from '../../graphql/query';
import { IUserAdd } from '../../interfaces/interface-user-add';
import { SpinnerScreenLoading } from '../../components';

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
    return <p className='text-center mt-4'>Error: {error.message}</p>;
  }

  if (!data || !data.user) {
    return <p className='text-center mt-4'>User not found</p>;
  }

  const { user } = data;

  return (
    <div className='mx-auto max-w-lg p-6 bg-white rounded-xl shadow-md mt-4'>
      <h2 className='text-2xl font-bold mb-4'>Detalhes do Usuário</h2>
      <div className='mb-4'>
        <p className='text-gray-700 font-bold'>Nome:</p>
        <p className='text-gray-800'>{user.name}</p>
      </div>
      <div className='mb-4'>
        <p className='text-gray-700 font-bold'>Email:</p>
        <p className='text-gray-800'>{user.email}</p>
      </div>
      <div className='mb-4'>
        <p className='text-gray-700 font-bold'>Telefone:</p>
        <p className='text-gray-800'>{user.phone}</p>
      </div>
      <div className='mb-4'>
        <p className='text-gray-700 font-bold'>Data de Nascimento:</p>
        <p className='text-gray-800'>{user.birthDate}</p>
      </div>
      <div className='mb-4'>
        <p className='text-gray-700 font-bold'>Cargo:</p>
        <p className='text-gray-800'>{user.role}</p>
      </div>
    </div>
  );
};
