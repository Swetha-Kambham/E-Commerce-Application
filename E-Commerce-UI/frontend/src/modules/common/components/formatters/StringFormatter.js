import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

export const StringFormatter = ({ record, field }) => {
  return (
    <>
      {record && record[field] ? (
        <Typography>{record[field]}</Typography>
      ) : (
        <span>&ndash;</span>
      )}
    </>
  );
};

StringFormatter.propTypes = {
  record: PropTypes.objectOf(PropTypes.any),
  field: PropTypes.string
};
