import React from 'react';
import { useDialogState, useIsScreenDown } from 'modules/common/hooks';
import { SideDrawer2 } from 'modules/common/components/SideDrawer2';
import { useHistory } from 'react-router-dom';
import { useLogout } from 'modules/common/hooks/useLogout';
import { SellerRoutes } from './SellerRoutes';
import { SellerMenus } from './SellerMenus';
import { Header } from './Header';
import { tabs, useTabValue } from './tabs';
import { useSellerHook } from './useSellerHook';

export const Seller = () => {
  const history = useHistory();
  const { logout } = useLogout();
  const isMobile = useIsScreenDown('sm');
  const { tabValue, setTabValue } = useTabValue({
    path: history.location.pathname
  });
  const { isDialogOpen, openDialog, closeDialog } = useDialogState(false);
  const { homeButtonClick, menus, handleTabChange } = useSellerHook({
    history,
    closeDialog,
    setTabValue,
    logout
  });

  return (
    <>
      <Header
        isMobile={isMobile}
        tabs={tabs}
        openDialog={openDialog}
        closeDialog={closeDialog}
        homeButtonClick={homeButtonClick}
        isDialogOpen={isDialogOpen}
        handleTabChange={handleTabChange}
        value={tabValue}
        logout={logout}
      />
      <SellerRoutes />
      {isMobile && isDialogOpen ? (
        <SideDrawer2 open={isDialogOpen} onClose={closeDialog}>
          <SellerMenus menus={menus} />
        </SideDrawer2>
      ) : null}
    </>
  );
};
