import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApolloError, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutation';
import { useNavigate } from 'react-router-dom';
import { IValidationLogin } from '../../interfaces/interface-login';
import { SchemaValidationLogin } from '../../schemas';

import { HeaderTitle } from '../../components/header-title-component';
import { ButtonSubmit, InputSubmitLoginForm } from '../../components';


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
      <HeaderTitle title='Bem-vindo(a) à Taqtile!' className='mt-20 mb-16 md:mt-52 ' />

      <main className='flex flex-col items-center justify-center bg-taqtile-background'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm p-4'>
          <InputSubmitLoginForm label='E-mail' name='email' type='text' register={register} error={errors.email} />
          <InputSubmitLoginForm
            label='Senha'
            name='password'
            type='password'
            register={register}
            error={errors.password}
            showPasswordToggle
          />
          {serverError && <p className='text-red-500 text-xs italic'>{serverError}</p>}
          <ButtonSubmit isLoading={loading} text='Entrar' onClick={handleSubmit(onSubmit)} />
        </form>
      </main>
    </>
  );
};
