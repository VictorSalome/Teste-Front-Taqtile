import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query ListUsers($offset: Int!, $limit: Int!) {
    users(data: { offset: $offset, limit: $limit }) {
      nodes {
        id
        name
        email
        phone
        birthDate
        role
      }
    }
  }
`;
