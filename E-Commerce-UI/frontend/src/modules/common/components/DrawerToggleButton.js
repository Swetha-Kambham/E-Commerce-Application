import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';

export const DrawerToggleButton = ({ onClick, className }) => {
  return (
    <IconButton onClick={onClick} className={className}>
      <MenuIcon />
    </IconButton>
  );
};

DrawerToggleButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string
};
