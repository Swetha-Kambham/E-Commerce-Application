import React from 'react';
import useAuthContext from 'modules/auth';
import {
  makeStyles,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useLogout } from 'modules/common/hooks/useLogout';
import PropTypes from 'prop-types';
import PersonIcon from '@material-ui/icons/Person';
import { Roles } from 'modules/common/enums';
import { FlexView } from '../FlexView';
import { CrafthillsLogo } from '../CrafthillsLogo';
import { IconLinkButton } from '../IconLinkButton';

const useStyles = makeStyles((theme) => ({
  header: {
    background: theme.palette.common.white,
    height: theme.spacing(10)
  },
  logo: {
    width: theme.spacing(15)
  },
  headerLabel: {
    color: 'black'
  },
  home: {
    marginRight: theme.spacing(0.5),
    '& span': {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '1.5rem',
      color: theme.palette.primary.main
    }
  },
  icon: { marginTop: theme.spacing(2) },
  name: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));

const menus = [
  {
    id: 1,
    path: '/me',
    label: 'Profile',
    isAuthRequired: false
  },
  {
    id: 2,
    path: '/me/addresses',
    label: 'Addresses',
    isAuthRequired: false
  },
  {
    id: 3,
    path: '/me/orders',
    label: 'Orders',
    isAuthRequired: false
  },
  {
    id: 4,
    path: '/me/cart',
    label: 'Cart',
    isAuthRequired: false
  },
  {
    id: 5,
    path: '/me/change-password',
    label: 'Change Password',
    isAuthRequired: true
  }
];

export const DrawerMenu = ({ onClose }) => {
  const classes = useStyles();
  const { logout } = useLogout();
  const { me, isAuthenticated, role } = useAuthContext();

  return (
    <>
      <AppBar className={classes.header} position="static">
        <Toolbar className={classes.headerLabel}>
          <FlexView>
            {isAuthenticated && role === Roles.user && me && me.name ? (
              <>
                <PersonIcon className={classes.icon} />
                <span className={classes.name}>
                  <Typography variant="body2">Hi,</Typography>
                  <Typography variant="h6">{me.name}</Typography>
                </span>
              </>
            ) : (
              <IconLinkButton
                to="/"
                icon={<CrafthillsLogo className={classes.logo} />}
              />
            )}
          </FlexView>
        </Toolbar>
      </AppBar>
      <List component="nav" aria-label="main mailbox folders">
        {menus.map((item) => {
          if (item.isAuthRequired && (!isAuthenticated || role !== Roles.user))
            return null;

          return (
            <ListItem
              component={Link}
              button
              key={item.id}
              onClick={() => {
                onClose();
              }}
              disabled={item.disabled}
              to={item.path}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
        {isAuthenticated && role === Roles.user ? (
          <ListItem
            button
            onClick={() => {
              logout();
              onClose();
            }}
          >
            <ListItemText primary="Sign out" />
          </ListItem>
        ) : null}
      </List>
    </>
  );
};

DrawerMenu.propTypes = {
  onClose: PropTypes.func
};
