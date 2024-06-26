import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../../graphql/query';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IListUsers, INode } from '../../interfaces/inteface-users';

export const UserListPage = () => {
  const token = localStorage.getItem('token');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);

  const navigate = useNavigate();

  const updateLimitBasedOnWindowSize = () => {
    if (window.innerWidth >= 768) {
      setLimit(24);
    } else {
      setLimit(5);
    }
  };

  useEffect(() => {
    updateLimitBasedOnWindowSize();

    window.addEventListener('resize', updateLimitBasedOnWindowSize);
    return () => window.removeEventListener('resize', updateLimitBasedOnWindowSize);
  }, []);

  const { data, loading, error } = useQuery<IListUsers>(USERS_QUERY, {
    variables: {
      offset,
      limit,
    },
    context: {
      headers: {
        Authorization: token,
      },
    },
  });

  const handleNextPage = () => {
    if (data?.users.pageInfo.hasNextPage) {
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (data?.users.pageInfo.hasPreviousPage) {
      setOffset(Math.max(offset - limit, 0));
    }
  };

  if (loading) {
    return <div className='fixed inset-0 flex items-center justify-center'>Carregando...</div>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const pageInfo = data?.users.pageInfo;
  const totalCount = data?.users.count || 0;
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className='bg-white shadow sm:rounded-lg'>
      <h2 className='text-2xl font-semibold text-taqtile-font-secondary p-4'>Lista de Usuários Taqtile</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
        {data?.users.nodes.map((user: INode) => (
          <div
            key={user.id}
            className='bg-white shadow-md rounded-md p-4 transition duration-500 hover:scale-105 hover:shadow-lg cursor-pointer'
          >
            <h2 className='text-lg font-semibold text-taqtile-font-secondary mb-2'>{user.name.toUpperCase()}</h2>
            <p className='text-gray-700 mb-2'>E-mail: {user.email}</p>
            <button className='text-blue-500 hover:underline' onClick={() => navigate(`/details-user-page/${user.id}`)}>
              Detalhes
            </button>
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center p-4 border-t border-gray-200'>
        <nav className='flex gap-x-2' aria-label='Pagination'>
          <button
            className={`cursor-pointer rounded-l-md ${offset === 0 ? 'text-gray-500' : 'text-gray-700'}`}
            onClick={handlePrevPage}
            disabled={offset === 0}
          >
            <svg
              className='h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19l-7.5-7.5 7.5-7.5' />
            </svg>
          </button>
          <ul className='flex flex-wrap gap-x-2'>
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter((page) => page <= currentPage + 3 && page >= currentPage - 4)
              .map((page) => (
                <li
                  key={page}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${page === currentPage ? 'bg-gray-600 text-white' : 'text-gray-500'}`}
                >
                  {page === currentPage - 4 || page === currentPage + 3 ? (
                    '...'
                  ) : (
                    <button onClick={() => setOffset((page - 1) * limit)}>{page}</button>
                  )}
                </li>
              ))}
          </ul>
          <button
            className={`cursor-pointer rounded-r-md ${!pageInfo?.hasNextPage ? 'text-gray-500' : 'text-gray-700'}`}
            onClick={handleNextPage}
            disabled={!pageInfo?.hasNextPage}
          >
            <svg
              className='h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};
