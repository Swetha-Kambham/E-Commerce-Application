import React from 'react';
import { Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

export const BooleanFormatter = ({ record, field }) => {
  return (
    <Checkbox checked={record && record[field]} color="primary" readOnly />
  );
};

BooleanFormatter.propTypes = {
  record: PropTypes.objectOf(PropTypes.any),
  field: PropTypes.string
};
