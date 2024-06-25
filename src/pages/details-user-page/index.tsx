import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER_QUERY_BY_ID } from '../../graphql/query';
import { IUserAdd } from '../../interfaces/interface-user-add';

export const DetailsUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<{ user: IUserAdd }>(USER_QUERY_BY_ID, {
    variables: { userId: id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.user) {
    return <p>User not found</p>;
  }

  const { user } = data;

  return (
    <div>
      <h2>Detalhes do Usuário</h2>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Telefone: {user.phone}</p>
      <p>Data de Nascimento: {user.birthDate}</p>
      <p>Cargo: {user.role}</p>
    </div>
  );
};
