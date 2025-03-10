import React, { useState, useMemo, useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';

export const ActionMenuFormatter = ({
  record,
  field,
  column: { onDeleteClick, disableDelete }
}) => {
  const { id } = record;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleDeleteClick = useCallback(() => {
    onDeleteClick(id);
    handleClose();
  }, [onDeleteClick, id, handleClose]);

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          disabled={disableDelete}
          key="delete"
          onClick={handleDeleteClick}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

ActionMenuFormatter.propTypes = {
  record: PropTypes.objectOf(PropTypes.any),
  field: PropTypes.string,
  column: PropTypes.objectOf(PropTypes.any)
};
