import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../../graphql/query';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { IListUsers } from '../../interfaces/inteface-users';
import { SpinnerScreenLoading } from '../../components';
import { MobileViewTable } from './mobile-view-table';
import { WebViewTable } from './web-view-table';

export const UserListPage = () => {
  const token = localStorage.getItem('token');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    setLimit(isMobile ? 5 : 15);
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
      <h2 className='text-2xl md:text-3xl font-bold text-taqtile-font-secondary p-4'>Lista de Usuários Taqtile</h2>{' '}
      {isMobile ? <MobileViewTable users={data?.users.nodes || []} /> : <WebViewTable users={data?.users.nodes || []} />}
      <div className='mt-9 flex justify-center items-center p-3 border-t border-gray-200'>
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
