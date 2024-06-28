import { useState } from 'react';
import { IValidationLogin } from '../interfaces/interface-login';
import { validateEmail, validatePassword } from '../utils/validate-login';
import { ApolloError, useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/query';

export const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<IValidationLogin>({
    email: '',
    password: '',
  });
  const [serverError, setServerError] = useState<string>('');

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token);
    },
    onError: (error: ApolloError) => {
      if (error.graphQLErrors.length > 0) {
        setServerError(error.graphQLErrors[0].message);
      }
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
      await login({ variables: { email, password } });
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
        <button type='submit'>Entrar</button>
      </form>
    </main>
  );
};
