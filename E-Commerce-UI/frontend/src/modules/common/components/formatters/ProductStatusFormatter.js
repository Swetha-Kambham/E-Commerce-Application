import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { ProductStatus } from '../ProductStatus';

const useStyles = makeStyles((theme) => ({
  status: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5)
  }
}));

export const ProductStatusFormatter = ({ record, field }) => {
  const classes = useStyles();
  return (
    <ProductStatus
      className={classes.status}
      product={record}
      editable={false}
    />
  );
};

ProductStatusFormatter.propTypes = {
  record: PropTypes.objectOf(PropTypes.any),
  field: PropTypes.string
};
