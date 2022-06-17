import "../styles/globals.css";
import fetch from "cross-fetch";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/", fetch }),
  cache: new InMemoryCache(),
});

export const users = gql`
  query getAllUsers {
    getAllUsers {
      email
      name
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
