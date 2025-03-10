import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

export const MultiValueChip = ({ optionId, values = [], onDelete }) => {
  return (
    <>
      {values.map((v) => (
        <Chip
          key={v.id}
          onDelete={onDelete ? onDelete(optionId, v.id) : null}
          label={v.value}
        />
      ))}
    </>
  );
};

MultiValueChip.propTypes = {
  values: PropTypes.arrayOf(PropTypes.any),
  optionId: PropTypes.string,
  onDelete: PropTypes.func
};
