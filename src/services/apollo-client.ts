import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


const httpLink = createHttpLink({
  uri: "https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql",
});

//Função que vai salvar o token no localstorage

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

/*
Essa função cria um cliente Apollo, que é responsável por fazer as requisições 
ao servidor
*/
const client = new ApolloClient({
  // Concatenando os links de conexão e autenticação
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
