import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { Cookies } from 'react-cookie';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/'
});

const authLink = setContext((_, { headers }) => {
  const cookies = new Cookies();
  const jwt = cookies.get('token');

  return {
    headers: {
      ...headers,
      authorization: jwt ? `Bearer ${jwt}` : null
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
