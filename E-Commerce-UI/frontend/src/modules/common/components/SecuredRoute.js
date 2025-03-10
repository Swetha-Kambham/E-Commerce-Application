import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, useLocation } from 'react-router-dom';
import useAuthContext from 'modules/auth';

export const SecuredRoute = ({ component: Component, role, ...rest }) => {
  const { isAuthenticated, me } = useAuthContext();
  const { pathname } = useLocation();

  const hasPermission = useMemo(
    () => isAuthenticated && me?.role === role,
    [isAuthenticated, me, role]
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        hasPermission ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: isAuthenticated ? 'unauthorized' : '/login',
              state: { from: pathname }
            }}
          />
        )
      }
    />
  );
};

SecuredRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  role: PropTypes.string.isRequired
};

export default SecuredRoute;
