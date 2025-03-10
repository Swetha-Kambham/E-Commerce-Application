import React, { useCallback, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useApolloClient } from '@apollo/client';
import { ME } from 'modules/common/hooks/useMe';
import { AuthContext } from './AuthContext';
import { useUserContext } from './UserContext';

export const AuthContextProvider = ({ children }) => {
  const client = useApolloClient();
  const { me } = useUserContext();
  const [initialValue, setValue] = useState({
    isAuthenticated: Boolean(me && me.id && me.role),
    role: me && me.role,
    me
  });

  const updateAuthContext = useCallback(async () => {
    const {
      data: { me: meValue },
      loading
    } = await client.query({
      query: ME,
      fetchPolicy: 'network-only'
    });

    if (!loading) {
      setValue({
        me: meValue,
        role: meValue && meValue.role,
        isAuthenticated: Boolean(meValue && meValue.id && meValue.role)
      });
    }
  }, [client]);

  const value = useMemo(
    () => ({ ...initialValue, updateAuthContext }),
    [initialValue, updateAuthContext]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node
};
