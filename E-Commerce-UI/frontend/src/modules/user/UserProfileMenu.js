import React from 'react';
import {
  Typography,
  Paper,
  makeStyles,
  MenuList,
  MenuItem
} from '@material-ui/core';
import { LinkMenuItem } from 'modules/common/components/LinkMenuItem';
import { useLogout } from 'modules/common/hooks/useLogout';

const useStyles = makeStyles((theme) => ({
  paper: { marginTop: theme.spacing(2), paddingBottom: theme.spacing(1) }
}));

export const UserProfileMenu = () => {
  const classes = useStyles();
  const { logout } = useLogout();

  return (
    <Paper className={classes.paper}>
      <MenuList>
        <LinkMenuItem to="/me">
          <Typography color="primary">Profile</Typography>
        </LinkMenuItem>
        <LinkMenuItem to="/me/addresses">
          <Typography color="primary">Addresses</Typography>
        </LinkMenuItem>
        <LinkMenuItem to="/me/orders">
          <Typography color="primary">Orders</Typography>
        </LinkMenuItem>
        <LinkMenuItem to="/me/cart">
          <Typography color="primary">Cart</Typography>
        </LinkMenuItem>
        <LinkMenuItem to="/me/change-password">
          <Typography color="primary">Change Password</Typography>
        </LinkMenuItem>
        <MenuItem onClick={logout}>
          <Typography color="primary">Sign out</Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};
