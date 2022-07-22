import '../styles/globals.css';
import fetch from 'cross-fetch';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// const client = new ApolloClient({
//   link: new HttpLink({ uri: "http://localhost:4000/", fetch }),
//   cache: new InMemoryCache(),
//   link: authLink.concat(httpLink),
// });
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export const users = gql`
  query GetAlluser {
    getAllUsers {
      email
      name
    }
  }
`;

export const createUser = gql`
  mutation Mutation($name: String, $email: String, $password: String) {
    createUser(name: $name, email: $email, password: $password) {
      email
      name
      password
    }
  }
`;

export const status = gql`
  query getAllStatus {
    getAllStatus {
      name
    }
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
