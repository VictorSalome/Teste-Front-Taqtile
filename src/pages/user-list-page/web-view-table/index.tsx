import React from 'react';
import { useNavigate } from 'react-router-dom';
import { INode } from '../../../interfaces/inteface-users';
import { FormattedName } from '../../../utils/formated-name';
import { IUserListProps } from '../../../interfaces/interface-user-list';

export const WebViewTable: React.FC<IUserListProps> = ({ users }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-4'>
        <table className='min-w-full divide-y divide-gray-200 table-fixed'>
          <thead className='sticky top-0 bg-gray-100'>
            <tr>
              <th className='w-1/3 px-28 py-1 text-left text-lg font-semibold text-taqtile-green uppercase tracking-wider'>Nome</th>
              <th className='w-1/3 px-28 py-1 text-left text-lg font-semibold text-taqtile-green uppercase tracking-wider'>E-mail</th>
              <th className='w-1/3 px-28 py-1 text-left text-lg font-semibold text-taqtile-green uppercase tracking-wider'>
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
            {users.map((user: INode) => (
              <tr key={user.id} className='hover:bg-gray-50 border-b border-solid border-gray-200'>
                <td className='px-28 py-4 whitespace-nowrap'>
                  <FormattedName name={user.name} />
                </td>
                <td className='px-28 py-4 whitespace-nowrap'>{user.email}</td>
                <td className='px-28 py-4 whitespace-nowrap'>
                  <button className='text-taqtile-font-secondary hover:underline' onClick={() => navigate(`/details-user-page/${user.id}`)}>
                    Detalhe
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
