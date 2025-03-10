import React from 'react';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

export const DeleteOption = ({ onClick }) => {
  return (
    <IconButton aria-label="Delete-Option" onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  );
};

DeleteOption.propTypes = {
  onClick: PropTypes.func
};
