import { Link } from 'react-router-dom';
import { IButtonRedirectProps } from '../../interfaces/interface-components';

export const ButtonRedirect = ({ to }: IButtonRedirectProps) => {
  return (
    <div className='mt-8'>
      <Link
        to={to}
        className='bg-taqtile-font-secondary text-white p-2 rounded-full w-10 h-10 shadow-md transition duration-500  hover:bg-[#01322bdf]'
      >
        Voltar para lista de usuários
      </Link>
    </div>
  );
};
