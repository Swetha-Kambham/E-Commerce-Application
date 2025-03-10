import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

export const TagFormatter = ({ record, field }) => {
  return (
    <>
      {record && record[field] && record[field].length ? (
        record[field].map((t) => <Chip key={t} label={t} />)
      ) : (
        <span>&ndash;</span>
      )}
    </>
  );
};

TagFormatter.propTypes = {
  record: PropTypes.objectOf(PropTypes.any),
  field: PropTypes.string
};
