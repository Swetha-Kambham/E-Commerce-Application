import React, { useState, useCallback } from 'react';
import { Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useDialogStyles = makeStyles((theme) => ({
  root: { background: '#3f3f3fe6' },
  paper: ({ moreZoom }) => ({
    width: '100%',
    height: '100%',
    background: 'transparent',
    boxShadow: 'none',
    cursor: moreZoom ? 'zoom-out' : 'zoom-in',
    [theme.breakpoints.up('md')]: ({ moreZoom: expand }) => ({
      maxWidth: expand ? '80%' : '50%',
      height: expand ? '90%' : '70%'
    })
  })
}));

export const ResizableView = ({ children, open, onClose, isMobile }) => {
  const [moreZoom, setMoreZoom] = useState(false);
  const dialogClasses = useDialogStyles({ moreZoom });

  const onMoreZoomClick = useCallback(() => {
    setMoreZoom(!moreZoom);
  }, [moreZoom]);

  return (
    <>
      {children.find((child) => child.key === 'normalView')}
      <Dialog
        onClick={onMoreZoomClick}
        onClose={onClose}
        fullScreen={isMobile}
        open={open}
        classes={dialogClasses}
      >
        {children.find((child) => child.key === 'zoomView')}
      </Dialog>
    </>
  );
};

ResizableView.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  isMobile: PropTypes.bool
};
