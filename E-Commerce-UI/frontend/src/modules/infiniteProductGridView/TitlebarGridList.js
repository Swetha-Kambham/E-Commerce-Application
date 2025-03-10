import React from 'react';
import { makeStyles, GridList } from '@material-ui/core';
import { ProductCard2 } from 'modules/common';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
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
  paper: { margin: theme.spacing(2) }
}));

export const TitlebarGridList = ({ records, cols }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} component="div" cols={cols}>
        {records.map((record, index) => (
          <ProductCard2
            key={record.id}
            image={record.image}
            skuId={record.skuId}
            sku={record.sku}
            quantity={record.quantity}
            name={record.name}
            slug={record.slug}
            pricePerUnit={record.pricePerUnit}
            sellingPricePerUnit={record.sellingPricePerUnit}
          />
        ))}
      </GridList>
    </div>
  );
};

TitlebarGridList.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object),
  cols: PropTypes.number
};
