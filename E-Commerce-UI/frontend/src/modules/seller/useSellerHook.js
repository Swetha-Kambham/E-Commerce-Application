import { useMemo, useCallback } from 'react';
import { tabs } from './tabs';

export const useSellerHook = ({
  history,
  closeDialog,
  setTabValue,
  logout
}) => {
  const homeButtonClick = useCallback(() => {
    history.push('/');
  }, [history]);

  const handleTabChange = useCallback(
    (event, newValue) => {
      setTabValue(newValue);
      history.push(`/seller/${newValue}`);
    },
    [history, setTabValue]
  );

  const menus = useMemo(
    () => [
      ...Object.values(tabs).map((t) => ({
        ...t,
        onClick: () => {
          history.push(`/seller/${t.value}`);
          closeDialog();
        }
      })),
      {
        id: 'signOut',
        value: 'signOut',
        label: 'Sign Out',
        onClick: logout
      }
    ],
    [closeDialog, history, logout]
  );
  return {
    menus,
    homeButtonClick,
    handleTabChange
  };
};
