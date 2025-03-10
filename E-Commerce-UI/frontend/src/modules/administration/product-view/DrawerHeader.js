import React from 'react';
import { IconButton, AppBar, Toolbar, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  appBar: { top: 0 },
  edit: {
    marginLeft: 'auto'
  }
}));

export const DrawerHeader = ({ onClose, editable, onEditClick }) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {!editable ? (
          <IconButton className={classes.edit} onClick={onEditClick}>
            <EditIcon />
          </IconButton>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

DrawerHeader.propTypes = {
  onClose: PropTypes.func,
  onEditClick: PropTypes.func,
  editable: PropTypes.bool
};
