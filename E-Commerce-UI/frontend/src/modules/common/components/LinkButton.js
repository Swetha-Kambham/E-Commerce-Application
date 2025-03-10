import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const LinkButton = ({ to, label, onClick, ...rest }) => {
  return (
    <Button component={Link} to={to} onClick={onClick} {...rest}>
      {label}
    </Button>
  );
};

LinkButton.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.any
};
