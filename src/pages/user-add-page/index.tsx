import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { IUserAdd } from '../../interfaces/interface-user-add';
import { REGISTER_MUTATION } from '../../graphql/mutation';
import { SchemaCreateUser } from '../../schemas';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome</label>
        <Controller name='name' control={control} render={({ field }) => <input id='name' {...field} />} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <Controller name='email' control={control} render={({ field }) => <input id='email' type='email' {...field} />} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Senha</label>
        <Controller name='password' control={control} render={({ field }) => <input id='password' type='password' {...field} />} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label>Telefone</label>
        <Controller name='phone' control={control} render={({ field }) => <input id='phone' {...field} />} />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>

      <div>
        <label>Data de nascimento</label>
        <Controller
          name='birthDate'
          control={control}
          render={({ field }) => (
            <input id='birthDate' type='date' {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} />
          )}
        />
        {errors.birthDate && <p>{errors.birthDate.message}</p>}
      </div>

      <div>
        <label>Cargo</label>
        <Controller name='role' control={control} render={({ field }) => <input id='role' {...field} />} />
        {errors.role && <p>{errors.role.message}</p>}
      </div>

      <button type='submit' disabled={loading}>
        Enviar
      </button>

      {loading && <div className='spinner'>Carregando...</div>}

      {error && <p style={{ color: 'red' }}>Erro ao realizar cadastro.</p>}
    </form>
  );
};
