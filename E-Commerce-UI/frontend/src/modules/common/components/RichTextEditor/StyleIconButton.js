import React, { useCallback } from 'react';
import 'draft-js/dist/Draft.css';
import PropTypes from 'prop-types';
import { IconButton, Tooltip, makeStyles } from '@material-ui/core';

const useIconButtonStyles = makeStyles((theme) => ({
  root: ({ isActive }) => ({
    background: isActive ? theme.palette.action.active : 'transparent',
    '&:hover': {
      background: isActive ? theme.palette.action.active : 'transparent'
    }
  })
}));

export const StyleIconButton = ({ onToggle, tooltipTitle, isActive, Icon }) => {
  const buttonClasses = useIconButtonStyles({ isActive });

  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      onToggle && onToggle();
    },
    [onToggle]
  );

  return (
    <Tooltip title={tooltipTitle}>
      <IconButton classes={buttonClasses} onMouseDown={onMouseDown}>
        {Icon}
      </IconButton>
    </Tooltip>
  );
};

StyleIconButton.propTypes = {
  onToggle: PropTypes.func,
  tooltipTitle: PropTypes.string,
  isActive: PropTypes.bool,
  Icon: PropTypes.element
};
