import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../../graphql/query';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { IListUsers, INode } from '../../interfaces/inteface-users';
import { SpinnerScreenLoading } from '../../components';

export const UserListPage = () => {
  const token = localStorage.getItem('token');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const navigate = useNavigate();

  useEffect(() => {
    setLimit(isMobile ? 5 : 16);
  }, [isMobile]);

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
    return (
      <div className='fixed inset-0 flex items-center justify-center'>
        <SpinnerScreenLoading />
      </div>
    );
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
      <h2 className='text-2xl md:text-3xl font-bold text-taqtile-font-secondary p-4'>Lista de Usuários Taqtile</h2>
      {isMobile ? (
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
          <div className='flex justify-end items-center gap-2 mb-4 '>
            <p className='text-taqtile-font-secondary text-sm font-semibold text-center'>Adicionar usuário</p>
            <button
              className='bg-taqtile-font-secondary text-white p-2 rounded-full w-10 h-10 shadow-md transition duration-500  hover:bg-[#01322bdf]'
              onClick={() => navigate('/user-add-page')}
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-4'>
            <table className='min-w-full divide-y divide-gray-200 table-fixed'>
              <thead className='sticky top-0 bg-gray-100'>
                <tr>
                  <th className='w-1/3 px-6 py-1 text-left text-lg font-semibold text-taqtile-green uppercase tracking-wider'>Nome</th>
                  <th className='w-1/3 px-6 py-1 text-left text-lg font-semibold text-taqtile-green uppercase tracking-wider'>E-mail</th>
                  <th className='w-1/3 px-6 py-1 text-left text-lg font-semibold text-taqtile-green uppercase tracking-wider'>
                    <button
                      className='bg-taqtile-font-secondary text-white text-base py-2 px-1 rounded-md shadow-md transition duration-500 hover:bg-[#01322bdf]'
                      onClick={() => navigate('/user-add-page')}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-11 inline-block mr-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                        />
                      </svg>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {data?.users.nodes.map((user: INode) => (
                  <tr key={user.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>{user.name.toUpperCase()}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{user.email}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <button
                        className='text-taqtile-font-secondary hover:underline'
                        onClick={() => navigate(`/details-user-page/${user.id}`)}
                      >
                        Detalhe
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className=' flex justify-center items-center p-3 border-t border-gray-200'>
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
          <ul className='flex flex-wrap gap-x-1'>
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter((page) => page <= currentPage + 2 && page >= currentPage - 3)
              .map((page) => (
                <li
                  key={page}
                  className={`w-6 h-6 flex items-center justify-center rounded-full ${page === currentPage ? 'bg-gray-600 text-white' : 'text-gray-500'}`}
                >
                  {page === currentPage - 3 || page === currentPage + 2 ? (
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
