
import { gql } from "@apollo/client";

//Login do Usuário Mutation
export const LOGIN_MUTATION = gql`
   mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  } 
`;
