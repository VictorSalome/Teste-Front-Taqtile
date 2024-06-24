import { useState } from 'react';
import { IValidationLogin } from '../interfaces/interface-login';
import { validateEmail, validatePassword } from '../utils/validate-login';
import { ApolloError, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutation';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<IValidationLogin>({
    email: '',
    password: '',
  });
  const [serverError, setServerError] = useState<string>('');
  console.log(serverError);
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    setServerError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    setServerError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });
    setServerError('');

    if (!emailError && !passwordError) {
      setLoading(true);
      try {
        await login({ variables: { email, password } });
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input value={email} onChange={handleEmailChange} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label>Senha:</label>
          <input type='password' value={password} onChange={handlePasswordChange} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
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
