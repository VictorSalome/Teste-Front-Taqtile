import React from 'react';
import { useNavigate } from 'react-router-dom';
import { INode } from '../../../interfaces/inteface-users';
import { FormattedName } from '../../../utils/formated-name';
import { IUserListProps } from '../../../interfaces/interface-user-list';



export const MobileViewTable: React.FC<IUserListProps> = ({ users }) => {
  const navigate = useNavigate();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {users.map((user: INode) => (
        <div
          key={user.id}
          className='bg-white shadow-md rounded-md p-4 transition duration-500 hover:scale-105 hover:shadow-lg cursor-pointer'
        >
          <h2 className='text-lg font-semibold text-taqtile-font-secondary mb-2'>
            <FormattedName name={user.name} />
          </h2>
          <p className='text-gray-700 mb-2'>E-mail: {user.email}</p>
          <button className='text-blue-500 hover:underline' onClick={() => navigate(`/details-user-page/${user.id}`)}>
            Detalhes
          </button>
        </div>
      ))}
      <div className='flex justify-end items-center gap-2 mb-4'>
        <p className='text-taqtile-font-secondary text-sm font-semibold text-center'>Adicionar usuário</p>
        <button
          className='bg-taqtile-font-secondary text-white p-2 rounded-full w-10 h-10 shadow-md transition duration-500  hover:bg-[#01322bdf]'
          onClick={() => navigate('/user-add-page')}
        >
          +
        </button>
      </div>
    </div>
  );
};
