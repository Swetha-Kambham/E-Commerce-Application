import React, { useCallback } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    color: '#0000EE',
    '&:focus': {
      outline: 'none'
    }
  }
}));

export const NameFormatter = ({ record, field, column: { onClick } }) => {
  const classes = useStyles();

  const onKeyDown = useCallback(
    (event) => {
      if (event && event.keyCode === 13 && onClick) {
        onClick(record && record.id);
      }
    },
    [onClick, record]
  );

  const handleClick = useCallback(
    (event) => {
      onClick(record && record.id);
    },
    [onClick, record]
  );

  return (
    <div
      className={classes.root}
      role="button"
      tabIndex="0"
      onClick={handleClick}
      onKeyDown={onKeyDown}
    >
      {record && record[field] ? (
        <Typography>{record[field]}</Typography>
      ) : (
        <span>&ndash;</span>
      )}
    </div>
  );
};

NameFormatter.propTypes = {
  record: PropTypes.objectOf(PropTypes.any),
  field: PropTypes.string,
  column: PropTypes.objectOf(PropTypes.any)
};
