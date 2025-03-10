import React, { useState, useMemo, useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';

export const ActionMenu = ({
  onSaveClick,
  onDeleteClick,
  onUploadClick,
  disableSave,
  disableDelete,
  disableUpload
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSaveClick = useCallback(() => {
    onSaveClick();
    handleClose();
  }, [onSaveClick, handleClose]);

  const handleDeleteClick = useCallback(() => {
    onDeleteClick();
    handleClose();
  }, [onDeleteClick, handleClose]);

  const handleUploadClick = useCallback(() => {
    onUploadClick();
    handleClose();
  }, [onUploadClick, handleClose]);

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
        <MenuItem disabled={disableSave} key="save" onClick={handleSaveClick}>
          Save
        </MenuItem>
        <MenuItem
          disabled={disableDelete}
          key="delete"
          onClick={handleDeleteClick}
        >
          Delete
        </MenuItem>
        <MenuItem
          disabled={disableUpload}
          key="upload"
          onClick={handleUploadClick}
        >
          Upload
        </MenuItem>
      </Menu>
    </div>
  );
};

ActionMenu.propTypes = {
  onSaveClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onUploadClick: PropTypes.func,
  disableSave: PropTypes.bool,
  disableDelete: PropTypes.bool,
  disableUpload: PropTypes.bool
};
