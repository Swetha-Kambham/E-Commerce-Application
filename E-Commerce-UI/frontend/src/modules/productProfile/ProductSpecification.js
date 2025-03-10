import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { ReadOnlyField } from 'modules/common';
import PropTypes from 'prop-types';

export const ProductSpecification = ({ specification }) => {
  return (
    <List>
      {specification.map((spec) => (
        <ListItem key={spec.optionId}>
          <ReadOnlyField label={spec.option} value={spec.value} />
        </ListItem>
      ))}
    </List>
  );
};

ProductSpecification.propTypes = {
  specification: PropTypes.arrayOf(PropTypes.any)
};
