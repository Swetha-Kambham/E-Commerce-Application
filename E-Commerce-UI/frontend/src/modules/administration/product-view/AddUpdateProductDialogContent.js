import React, { useCallback, useMemo } from 'react';
import {
  Grid,
  Checkbox,
  Paper,
  makeStyles,
  Button,
  Typography
} from '@material-ui/core';
import { ProductCard2 } from 'modules/common/components';
import PropTypes from 'prop-types';
import { AddUpdateProductDialogContentSkeleton } from './AddUpdateProductDialogContentSkeleton';

const useStyles = makeStyles((theme) => ({
  paper: { width: '100%', height: '100%' },
  checkbox: { margin: 'auto' },
  loadMore: {
    float: 'right'
  },
  loadMoreLabel: {
    textTransform: 'none',
    fontWeight: 600
  },
  gridTile: {
    listStyle: 'none',
    textDecoration: 'none',
    color: theme.palette.common.black,
    padding: 'unset',
    height: 'unset !important',
    '&:hover': {
      '-webkit-box-shadow': '0px 3px 16px 0px #a9a1b5',
      cursor: 'pointer'
    }
  }
}));

export const AddUpdateProductDialogContent = ({
  productUnits,
  loading,
  loadMore,
  hasMore,
  selectedProductUnits,
  setSelectedProductUnits
}) => {
  const classes = useStyles();
  const productCardClasses = useMemo(
    () => ({ gridTile: classes.gridTile }),
    [classes.gridTile]
  );

  const onCheckedChange = useCallback(
    (productId, skuId) => (event) => {
      const { checked } = event?.target || {};
      if (checked) {
        if (
          !selectedProductUnits.some(
            (unit) => unit.productId === productId && unit.skuId === skuId
          )
        ) {
          setSelectedProductUnits([
            ...new Set([...selectedProductUnits, { productId, skuId }])
          ]);
        }
      } else {
        setSelectedProductUnits(
          selectedProductUnits.filter(
            (unit) => unit.productId !== productId && unit.skuId !== skuId
          )
        );
      }
    },
    [selectedProductUnits, setSelectedProductUnits]
  );

  if (loading) return <AddUpdateProductDialogContentSkeleton />;

  return (
    <Grid container spacing={2}>
      {(productUnits || []).map((productUnit) => (
        <React.Fragment key={productUnit.id}>
          <Grid item xs={1} key={productUnit.id}>
            <Checkbox
              className={classes.checkbox}
              id="enabled"
              checked={selectedProductUnits.some(
                (unit) =>
                  unit.skuId === productUnit.skuId &&
                  unit.productId === productUnit.productId
              )}
              onChange={onCheckedChange(
                productUnit.productId,
                productUnit.skuId
              )}
              color="primary"
            />
          </Grid>
          <Grid item xs={11} key={productUnit.id}>
            <Paper className={classes.paper}>
              <ProductCard2
                key={productUnit.id}
                skuId={productUnit.skuId}
                sku={productUnit.sku}
                classes={productCardClasses}
                slug={productUnit.slug}
                image={productUnit.image}
                quantity={productUnit.quantity}
                name={productUnit.name}
                pricePerUnit={productUnit.pricePerUnit}
                sellingPricePerUnit={productUnit.sellingPricePerUnit}
              />
            </Paper>
          </Grid>
        </React.Fragment>
      ))}
      {hasMore ? (
        <Grid item xs={12}>
          <Button
            className={classes.loadMore}
            onClick={loadMore}
            color="primary"
          >
            <Typography className={classes.loadMoreLabel} variant="caption">
              Load More...
            </Typography>
          </Button>
        </Grid>
      ) : null}
    </Grid>
  );
};

AddUpdateProductDialogContent.propTypes = {
  productUnits: PropTypes.array,
  loading: PropTypes.bool,
  loadMore: PropTypes.func,
  hasMore: PropTypes.func,
  setSelectedProductUnits: PropTypes.func,
  selectedProductUnits: PropTypes.array
};
