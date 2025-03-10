import React, { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { useMe } from 'modules/common/hooks';
import { FullPageLoading } from 'modules/common/components';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const { me, loading } = useMe();

  const value = useMemo(
    () => ({
      me
    }),
    [me]
  );

  if (loading) return <FullPageLoading />;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node
};
