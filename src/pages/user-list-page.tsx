import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../graphql/query';
import { IListUsers } from '../interfaces/inteface-users';

export const UserListPage = () => {
  const token = localStorage.getItem('token');
  const { data, loading, error } = useQuery<IListUsers>(USERS_QUERY, {
    variables: {
      offset: 0,
      limit: 5,
    },
    context: {
      headers: {
        Authorization: token,
      },
    },
  });

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
          {data?.users.nodes.map((user) => (
            <tr key={user.id} className='table-primary'>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </thead>
        <tbody>{}</tbody>
      </table>
    </>
  );
};
