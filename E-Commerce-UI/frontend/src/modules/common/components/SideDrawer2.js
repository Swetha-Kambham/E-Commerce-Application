import React from 'react';
import { Drawer, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useDialogStyles = makeStyles((theme) => ({
  paper: {
    width: '60%'
  }
}));

export const SideDrawer2 = ({ onClose, open, children }) => {
  const drawerClasses = useDialogStyles();

  return (
    <Drawer classes={drawerClasses} anchor="left" open={open} onClose={onClose}>
      {children}
    </Drawer>
  );
};

SideDrawer2.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  children: PropTypes.node
};
