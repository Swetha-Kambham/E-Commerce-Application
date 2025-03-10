import { useColumnCapacity } from 'modules/common/hooks/useScreenSize';
import React from 'react';
import { makeStyles, GridList, Paper, Typography } from '@material-ui/core';
import { ProductCard2 } from 'modules/common';
import PropTypes from 'prop-types';
import { usePageOfProductUnits } from 'modules/infiniteProductGridView/hooks';
import { ProductCustomCategoryItemSkeleton } from './ProductCustomCategorySkeleton';

const useStyles = makeStyles((theme) => ({
  productContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '100%',
    margin: '8px !important'
  },
  paper: { margin: theme.spacing(2), padding: theme.spacing(2) }
}));

export const ProductListSummary = ({
  name,
  productUnits: productViewProductUnits
}) => {
  const classes = useStyles();
  const { capacity } = useColumnCapacity();

  const { loading, productUnits } = usePageOfProductUnits({
    page: 1,
    pageSize: 20,
    filters: { skuIds: productViewProductUnits.map((p) => p.skuId) },
    skip: !productViewProductUnits || !productViewProductUnits.length
  });

  if (loading) return <ProductCustomCategoryItemSkeleton />;

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.categoryLabel} variant="h6">
        {name}
      </Typography>
      <div className={classes.productContainer}>
        <GridList className={classes.gridList} component="div" cols={capacity}>
          {(productUnits || []).map((productUnit, index) => (
            <ProductCard2
              key={productUnit.id}
              image={productUnit.image}
              skuId={productUnit.skuId}
              sku={productUnit.sku}
              quantity={productUnit.quantity}
              name={productUnit.name}
              slug={productUnit.slug}
              pricePerUnit={productUnit.pricePerUnit}
              sellingPricePerUnit={productUnit.sellingPricePerUnit}
            />
          ))}
        </GridList>
      </div>
    </Paper>
  );
};

ProductListSummary.propTypes = {
  name: PropTypes.string,
  productUnits: PropTypes.array
};
