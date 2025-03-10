import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { CookiesProvider } from 'react-cookie';
import { AuthContextProvider, UserProvider } from 'modules/auth';
import { client } from './apolloClient';
import { Routes } from './Routes';

const App = () => (
  <CookiesProvider>
    <ApolloProvider client={client}>
      <UserProvider>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </UserProvider>
    </ApolloProvider>
  </CookiesProvider>
);

export default App;
