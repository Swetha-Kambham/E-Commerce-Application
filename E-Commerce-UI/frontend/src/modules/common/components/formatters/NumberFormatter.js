import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

export const NumberFormatter = ({ record, field }) => {
  return (
    <>
      {record && record[field] !== null && record[field] !== undefined ? (
        <Typography>{record[field]}</Typography>
      ) : (
        <span>&ndash;</span>
      )}
    </>
  );
};

NumberFormatter.propTypes = {
  record: PropTypes.objectOf(PropTypes.any),
  field: PropTypes.string
};
