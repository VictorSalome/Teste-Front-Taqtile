import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApolloError, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutation';
import { useNavigate } from 'react-router-dom';
import { IValidationLogin } from '../../interfaces/interface-login';
import { SchemaValidationLogin } from '../../schemas';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IValidationLogin>({
    resolver: yupResolver(SchemaValidationLogin),
  });
  const navigate = useNavigate();
  const [serverError, setServerError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token.substring(7));
      console.log('Login Successful', data);
      setLoading(false);
      navigate('/user-list-page');
    },
    onError: (error: ApolloError) => {
      if (error.graphQLErrors.length > 0) {
        setServerError(error.graphQLErrors[0].message);
      } else {
        console.log('Error', error);
      }
      setLoading(false);
    },
  });

  const onSubmit = async (data: IValidationLogin) => {
    setLoading(true);
    try {
      await login({ variables: { email: data.email, password: data.password } });
    } catch (error: any) {
      if (error.graphQLErrors.length > 0) {
        setServerError(error.graphQLErrors[0].message);
      } else {
        console.error('Error:', error);
      }
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <header className='mb-10'>
        <h1 className='text-red-500 text-center text-4xl font-bold'>Bem-vindo(a) à Taqtile!</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' {...register('email')} />
          {errors.email && <p className='text-red-500 text-xs italic'>{errors.email.message}</p>}
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Senha:</label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' {...register('password')} />
          {errors.password && <p className='text-red-500 text-xs italic'>{errors.password.message}</p>}
        </div>
        {serverError && <p className='text-red-500 text-xs italic'>{serverError}</p>}
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit' disabled={loading}>
          Entrar
        </button>
        {loading && <div className='spinner w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full ml-4 animate-spin'></div>}
      </form>
    </main>
  );
};
