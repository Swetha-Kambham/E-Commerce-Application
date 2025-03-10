import React from 'react';
import useAuthContext from 'modules/auth';
import {
  makeStyles,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  header: {
    background: '#ADC8C4',
    backgroundImage: 'linear-gradient(to top, white, transparent)',
    height: theme.spacing(14.5)
  },
  headerLabel: {
    color: 'black',
    marginTop: theme.spacing(2)
  }
}));

export const SellerMenus = ({ menus }) => {
  const classes = useStyles();
  const { me } = useAuthContext();

  return (
    <>
      <AppBar className={classes.header} position="static">
        <Toolbar
          className={classes.headerLabel}
        >{`Welcome! ${me.name}`}</Toolbar>
      </AppBar>
      <List component="nav" aria-label="main mailbox folders">
        {menus.map((item) => (
          <ListItem
            button
            key={item.id}
            disabled={item.disabled}
            onClick={item.onClick}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

SellerMenus.propTypes = {
  menus: PropTypes.array
};
