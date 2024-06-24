import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IUserAdd } from '../../interfaces/interface-user-add';

// Esquema de validação
const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  phone: yup.string().matches(/^\d+$/, 'telefone inválido').required('Telefone é obrigatório'),
  birthDate: yup
    .string()
    .test('valid-date', 'Data de nacimento inválida', (value) => {
      if (!value) return false;
      const birthDate = new Date(value);
      return birthDate <= new Date();
    })
    .required('Data de nacimento é obrigatório'),
  role: yup.string().required('Cargo é obrigatório'),
});

export const UserAddPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUserAdd>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IUserAdd) => {
    console.log(data);
  };

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

      <button type='submit'>Enviar</button>
    </form>
  );
};
