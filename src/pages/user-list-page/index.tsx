import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../../graphql/query';
import { IListUsers } from '../../interfaces/inteface-users';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const UserListPage = () => {
  const token = localStorage.getItem('token');
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const { data, loading, error } = useQuery<IListUsers>(USERS_QUERY, {
    variables: {
      offset: offset,
      limit: limit,
    },
    context: {
      headers: {
        Authorization: token,
      },
    },
  });

 
const navigate = useNavigate();


  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePrevPage = () => {
    setOffset(Math.max(offset - limit, 0));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <>
      <h2>Lista de Usuários</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {data?.users.nodes.map((user) => (
            <tr key={user.id} className='table-primary'>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevPage} disabled={offset === 0}>
          Anterior
        </button>
        <button onClick={handleNextPage}>Próximo</button>
        <button onClick={() => navigate('/user-add-page')}>Adicionar Usuário</button>
      </div>
    </>
  );
};
