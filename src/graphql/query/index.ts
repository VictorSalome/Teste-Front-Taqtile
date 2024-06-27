import { gql } from '@apollo/client';

//query de listagem de usuarios
export const USERS_QUERY = gql`
  query ListUsers($offset: Int!, $limit: Int!) {
    users(data: { offset: $offset, limit: $limit }) {
      count
      nodes {
        id
        name
        email
        phone
        birthDate
        role
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        limit
        offset
      }
    }
  }
`;

//query de retornar usuario por id
export const USER_QUERY_BY_ID = gql`
  query User($userId: ID) {
    user(id: $userId) {
      birthDate
      email
      id
      name
      phone
      role
    }
  }
`;
