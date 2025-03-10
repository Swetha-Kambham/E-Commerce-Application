import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    background: 'white',
    boxShadow: '1px 0px 7px rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '70%',
    maxWidth: '400px',
    zIndex: 1200,
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease-out'
  },
  open: {
    transform: 'translateX(0)'
  }
}));

export const SideDrawer = ({ open }) => {
  const classes = useStyles();
  return (
    <nav className={clsx(classes.root, open && classes.open)}>
      <ul>
        <li>
          <a href="/">Products</a>
        </li>
        <li>
          <a href="/">Users</a>
        </li>
      </ul>
    </nav>
  );
};
