import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { IUserAdd } from '../../interfaces/interface-user-add';
import { REGISTER_MUTATION } from '../../graphql/mutation';
import { SchemaCreateUser } from '../../schemas';
import { HeaderTitle, InputSubmitRegisterForm } from '../../components';
import { ButtonSubmit } from '../../components/button-submit-component';

export const UserAddPage: React.FC = () => {
  const [registerUser, { loading, error }] = useMutation(REGISTER_MUTATION);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUserAdd>({
    resolver: yupResolver(SchemaCreateUser),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      birthDate: '',
      role: '',
    },
  });
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);

  const onSubmit = async (data: IUserAdd) => {
    try {
      await registerUser({ variables: { createUser: data } });
      setRedirected(true);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  useEffect(() => {
    if (redirected) {
      navigate('/user-list-page', { replace: true });
      window.location.reload();
    }
  }, [redirected, navigate]);

  return (
    <>
      <main className='mt-10  md:mt-20 md:mb-16'>
        <HeaderTitle title='Adicione um Usuário' className=' mb-9 text-taqtile-font-secondary' />
        <div className='flex flex-col items-center justify-center bg-taqtile-background'>
          <form onSubmit={handleSubmit(onSubmit)} className='w-11/12 md:w-1/3'>
            <InputSubmitRegisterForm
              label='Nome'
              name='name'
              control={control}
              error={errors.name}
              render={({ field }) => (
                <input
                  id='name'
                  className='shadow-md appearance-none border rounded-xl w-full h-12 py-2 px-3 text-taqtile-font-primary leading-tight focus:outline-none focus:shadow-outline'
                  {...field}
                />
              )}
            />

            <InputSubmitRegisterForm
              label='Email'
              name='email'
              control={control}
              error={errors.email}
              render={({ field }) => (
                <input
                  id='email'
                  type='email'
                  className='shadow-md appearance-none border rounded-xl w-full h-12 py-2 px-3 text-taqtile-font-primary leading-tight focus:outline-none focus:shadow-outline'
                  {...field}
                />
              )}
            />

            <InputSubmitRegisterForm
              label='Senha'
              name='password'
              control={control}
              error={errors.password}
              render={({ field }) => (
                <input
                  id='password'
                  type='password'
                  className='shadow-md appearance-none border rounded-xl w-full h-12 py-2 px-3 text-taqtile-font-primary leading-tight focus:outline-none focus:shadow-outline'
                  {...field}
                />
              )}
            />

            <InputSubmitRegisterForm
              label='Telefone'
              name='phone'
              control={control}
              error={errors.phone}
              render={({ field }) => (
                <input
                  id='phone'
                  className='shadow-md appearance-none border rounded-xl w-full h-12 py-2 px-3 text-taqtile-font-primary leading-tight focus:outline-none focus:shadow-outline'
                  {...field}
                />
              )}
            />

            <InputSubmitRegisterForm
              label='Data de nascimento'
              name='birthDate'
              control={control}
              error={errors.birthDate}
              render={({ field }) => (
                <input
                  id='birthDate'
                  type='date'
                  className='shadow-md appearance-none border rounded-xl w-full h-12 py-2 px-3 text-taqtile-font-primary leading-tight focus:outline-none focus:shadow-outline'
                  {...field}
                  value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                />
              )}
            />

            <InputSubmitRegisterForm
              label='Cargo'
              name='role'
              control={control}
              error={errors.role}
              render={({ field }) => (
                <input
                  id='role'
                  className='shadow-md appearance-none border rounded-xl w-full h-12 py-2 px-3 text-taqtile-font-primary leading-tight focus:outline-none focus:shadow-outline'
                  {...field}
                />
              )}
            />

            <ButtonSubmit
              text='Cadastrar'
              isLoading={loading}
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            />

            {error && <p style={{ color: 'red' }}>Erro ao realizar cadastro.</p>}
          </form>
        </div>
      </main>
    </>
  );
};
