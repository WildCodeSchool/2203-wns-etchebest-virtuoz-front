import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export const users = gql`
  query GetAlluser {
    allUsers {
      email
      name
    }
  }
`;

export const status = gql`
  query GetAllstatus {
    allStatus {
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
