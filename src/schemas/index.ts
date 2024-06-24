import * as yup from 'yup';
import { passwordRegex } from '../utils/validate-login';

//schema de validação de login
// Esquema de validação com Yup
export const SchemaValidationLogin = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup
    .string()
    .matches(passwordRegex, 'A senha deve ter pelo menos 8 caracteres, incluindo letras e números')
    .required('Senha é obrigatória'),
});

//schema de validação de criação de usuario

export const SchemaCreateUser = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatório'),
  phone: yup.string().matches(/^\d+$/, 'Telefone inválido').required('Telefone é obrigatório'),
  birthDate: yup
    .string()
    .test('valid-date', 'Data de nascimento inválida', (value) => {
      if (!value) return false;
      const birthDate = new Date(value);
      return birthDate <= new Date();
    })
    .required('Data de nascimento é obrigatório'),
  role: yup.string().required('Cargo é obrigatório'),
});
