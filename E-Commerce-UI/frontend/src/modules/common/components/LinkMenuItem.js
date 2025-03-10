import React from 'react';
import { MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

export const LinkMenuItem = ({ to, children, ...rest }) => {
  return (
    <MenuItem component={Link} to={to} {...rest}>
      {children}
    </MenuItem>
  );
};

LinkMenuItem.propTypes = {
  to: propTypes.string,
  children: propTypes.node
};
