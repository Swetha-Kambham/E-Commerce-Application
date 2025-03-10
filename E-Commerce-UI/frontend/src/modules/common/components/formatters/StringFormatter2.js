import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

export const StringFormatter2 = ({ record, field }) => {
  return (
    <>
      {record && record[field] && record[field] ? (
        <Typography>
          {record[field].displayName || record[field].name}
        </Typography>
      ) : (
        <span>&ndash;</span>
      )}
    </>
  );
};

StringFormatter2.propTypes = {
  record: PropTypes.objectOf(PropTypes.any),
  field: PropTypes.string
};
