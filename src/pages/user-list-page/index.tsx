import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../../graphql/query';
import { IListUsers } from '../../interfaces/inteface-users';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
        <h2 className='text-lg font-semibold text-taqtile-font-secondary p-4'>Lista de Usuários da Taqtile</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-taqtile-font-secondary uppercase tracking-wider'>
                  Nome
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium taqtile-font-secondary uppercase tracking-wider'>
                  E-mail
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium taqtile-font-secondary uppercase tracking-wider'>
                  Detalhes do Usuário
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {data?.users.nodes.map((user) => (
                <tr key={user.id}>
                  <td className='px-6 py-4 whitespace-nowrap'>{user.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{user.email}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <button className='text-blue-500 hover:underline' onClick={() => navigate(`/details-user-page/${user.id}`)}>
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0'>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50'
            onClick={handlePrevPage}
            disabled={offset === 0}
          >
            Anterior
          </button>
          <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md' onClick={handleNextPage}>
            Próximo
          </button>
          <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md' onClick={() => navigate('/user-add-page')}>
            Adicionar Usuário
          </button>
        </div>
      </div>
    </>
  );
};
