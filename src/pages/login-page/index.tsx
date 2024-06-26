import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApolloError, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutation';
import { useNavigate } from 'react-router-dom';
import { IValidationLogin } from '../../interfaces/interface-login';
import { SchemaValidationLogin } from '../../schemas';
import { SpinerLoading } from '../../components';
import { InputForm } from '../../components/input-form';
import { HeaderTitle } from '../../components/header-title';


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
 

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
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
   <HeaderTitle title='Bem-vindo(a) à Taqtile!' />

      <main className='flex flex-col items-center justify-center bg-taqtile-background'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm p-4'>
          <InputForm
            label='E-mail'
            name='email'
            type='text'
            register={register}
            error={errors.email}
          />
          <InputForm
            label='Senha'
            name='password'
            type='password'
            register={register}
            error={errors.password}
            showPasswordToggle
          />
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
