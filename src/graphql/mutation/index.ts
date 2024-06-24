import { gql } from '@apollo/client';

//Login do Usuário Mutation
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

// Registrar novo usuario
export const REGISTER_MUTATION = gql`
  mutation CreateUser($createUser: UserInput!) {
    createUser(data: $createUser) {
      birthDate
      email
      id
      name
      phone
      role
    }
  }
`;
