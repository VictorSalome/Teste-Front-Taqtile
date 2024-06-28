import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query ListUsers($userData: PageInput) { 
    users(data: $userData) {
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
