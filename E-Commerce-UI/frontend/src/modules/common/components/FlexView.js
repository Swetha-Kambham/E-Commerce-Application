import React from 'react';
import { makeStyles } from '@material-ui/core';
import propTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex' }
}));

export const FlexView = ({ children, className }) => {
  const classes = useStyles();

  return <div className={clsx(classes.root, className)}>{children}</div>;
};

FlexView.propTypes = {
  children: propTypes.node,
  className: propTypes.any
};
