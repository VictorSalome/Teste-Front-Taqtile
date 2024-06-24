import React from 'react';
import { useForm } from 'react-hook-form';
import { IValidationLogin } from '../../interfaces/interface-login';
import { validateEmail, validatePassword } from '../../utils/validate-login';
import { ApolloError, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphql/mutation';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IValidationLogin>();
  const [serverError, setServerError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

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
    const emailError = validateEmail(data.email);
    const passwordError = validatePassword(data.password);

    setError('email', { message: emailError });
    setError('password', { message: passwordError });
    setServerError('');

    if (!emailError && !passwordError) {
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
    }
  };

  return (
    <main>
      <header>
        <h1>Bem-vindo(a) à Taqtile!</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input {...register('email')} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        <div>
          <label>Senha:</label>
          <input type='password' {...register('password')} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
        <button type='submit' disabled={loading}>
          Entrar
        </button>
        {loading && <div className='spinner'>Carregando...</div>}
      </form>
    </main>
  );
};
