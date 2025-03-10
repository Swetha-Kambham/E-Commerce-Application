import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  label: {
    width: theme.spacing(25),
    minWidth: theme.spacing(25)
  }
}));

export const ReadOnlyField = ({ label, value, className }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        className={clsx(classes.label, className)}
        variant="subtitle2"
      >{`${label} :`}</Typography>
      {value !== null && value !== undefined ? (
        <Typography variant="subtitle2">{value}</Typography>
      ) : (
        <span>&ndash;</span>
      )}
    </div>
  );
};

ReadOnlyField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string
};
