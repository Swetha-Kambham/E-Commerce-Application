import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import useAuthContext from 'modules/auth';

export const TestAuthorization = () => {
  const { isAuthenticated } = useAuthContext();
  const { state } = useLocation();
  const { from } = state || {};

  return (
    <>
      {isAuthenticated && from ? <Redirect to={from} /> : <Redirect to="/" />}
    </>
  );
};
