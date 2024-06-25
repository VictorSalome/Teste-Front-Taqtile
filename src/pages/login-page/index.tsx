import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApolloError, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutation';
import { useNavigate } from 'react-router-dom';
import { IValidationLogin } from '../../interfaces/interface-login';
import { SchemaValidationLogin } from '../../schemas';
import { SpinerLoading } from '../../components';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IValidationLogin>({
    resolver: yupResolver(SchemaValidationLogin),
  });

  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
    <>
      <header className='mt-20 mb-16 md:mt-52 '>
        <h1 className='text-taqtile-font-primary text-center text-3xl font-bold'>Bem-vindo(a) à Taqtile!</h1>
      </header>

      <main className='flex flex-col items-center justify-center bg-taqtile-background'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm p-4'>
          <div className='mb-4'>
            <label className='block text-taqtile-font-primary text-base font-bold mb-2'>E-mail</label>
            <input
              className='shadow-md appearance-none border rounded-xl w-full h-12 py-2 px-3 text-taqtile-font-primary leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              {...register('email')}
            />
            {errors.email && <p className='text-red-500 text-xs italic mt-3'>{errors.email.message}</p>}
          </div>
          <div className='mb-6'>
            <label className='block text-taqtile-font-primary text-base font-bold mb-2'>Senha</label>
            <div className='relative'>
              <input
                className='shadow-md appearance-none border rounded-xl w-full h-12 py-2 px-3 text-taqtile-font-primary leading-tight focus:outline-none focus:shadow-outline'
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            {errors.password && <p className='text-red-500 text-xs italic mt-3'>{errors.password.message}</p>}
          </div>
          {serverError && <p className='text-red-500 text-xs italic'>{serverError}</p>}
          <button
            className={`bg-taqtile-green hover:bg-[#004440db] w-full h-12 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : 'bg-taqtile-green hover:bg-[#004440db]'}`}
            type='submit'
            disabled={loading}
          >
            <span className='flex items-center justify-center '>{loading && <SpinerLoading />}Entrar</span>
          </button>
        </form>
      </main>
    </>
  );
};
