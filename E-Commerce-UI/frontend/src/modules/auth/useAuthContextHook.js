import { useState } from 'react';
import { ME } from 'modules/common/hooks/useMe';
import { useQuery } from '@apollo/client';

export const useAuthContextHook = () => {
  const [contextValue, setContextValue] = useState({
    isAuthenticated: false,
    me: {}
  });

  const { loading, refetch } = useQuery(ME, {
    onCompleted: ({ me }) => {
      setContextValue({ isAuthenticated: Boolean(me && me.id && me.role), me });
    },
    fetchPolicy: 'network-only'
  });

  return { contextValue, setContextValue, refetch, loading };
};
