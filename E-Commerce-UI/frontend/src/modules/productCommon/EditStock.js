import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { useIsScreenDown } from 'modules/common';
import { StockKeepingUnitDetails } from './stockUnit';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5)
  }
}));

export const EditStock = ({
  sellerId,
  refetchProduct,
  product,
  productId,
  editable
}) => {
  const classes = useStyles();
  const isMobile = useIsScreenDown('sm');

  return (
    <div className={classes.root}>
      <StockKeepingUnitDetails
        productId={productId}
        isMobile={isMobile}
        refetchProduct={refetchProduct}
        product={product}
        sellerId={sellerId}
        editable={editable}
      />
    </div>
  );
};

EditStock.propTypes = {
  product: PropTypes.objectOf(PropTypes.any),
  refetchProduct: PropTypes.func,
  productId: PropTypes.string,
  sellerId: PropTypes.string,
  editable: PropTypes.bool
};
