import React from 'react';
import {
  makeStyles,
  GridListTile,
  Typography,
  CardMedia
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { DiscountMoneyFormatter } from './DiscountMoneyFormatter';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    height: theme.spacing(20)
  },
  hide: { display: 'none' },
  image: {
    height: theme.spacing(30),
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(15)
    }
  },
  gridTile: {
    listStyle: 'none',
    textDecoration: 'none',
    color: theme.palette.common.black,
    height: 'unset !important',
    padding: theme.spacing(1, 2, 2, 2),
    '&:hover': {
      '-webkit-box-shadow': '0px 3px 16px 0px #a9a1b5',
      cursor: 'pointer'
    }
  },
  outOfStock: {
    color: 'red',
    marginLeft: theme.spacing(2),
    position: 'absolute'
  },
  paper: { margin: theme.spacing(2) },
  productName: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
}));

export const ProductCard2 = ({
  onClick,
  quantity,
  image,
  skuId,
  sku,
  name,
  slug,
  pricePerUnit,
  sellingPricePerUnit,
  classes: overrideClasses
}) => {
  const classes = useStyles({ classes: overrideClasses });

  return (
    <GridListTile
      to={`/product/${slug}?sku=${sku}`}
      component={Link}
      onClick={onClick}
      className={classes.gridTile}
    >
      {quantity > 0 ? null : (
        <Typography variant="caption" className={classes.outOfStock}>
          Out of Stock
        </Typography>
      )}
      <div className={classes.paper}>
        {image.loading ? (
          <Skeleton variant="rect" className={classes.skeleton} />
        ) : null}
        <CardMedia
          className={clsx(classes.image, image.loading && classes.hide)}
          image={image && image.url}
          alt="Not Available"
        />
        <div>
          <Typography variant="subtitle2" className={classes.productName}>
            {name}
          </Typography>
          <DiscountMoneyFormatter
            originalPrice={pricePerUnit}
            sellingPrice={sellingPricePerUnit}
          />
        </div>
      </div>
    </GridListTile>
  );
};

ProductCard2.propTypes = {
  onClick: PropTypes.func,
  quantity: PropTypes.number,
  image: PropTypes.object,
  skuId: PropTypes.string,
  sku: PropTypes.string,
  name: PropTypes.string,
  slug: PropTypes.string,
  pricePerUnit: PropTypes.object,
  sellingPricePerUnit: PropTypes.object,
  classes: PropTypes.object
};
