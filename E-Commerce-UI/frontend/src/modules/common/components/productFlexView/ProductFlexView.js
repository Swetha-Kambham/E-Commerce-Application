import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ProductCard } from './ProductCard';

const imageUrls = [
  'http://127.0.0.1:8887/craft1.jpg',
  'http://127.0.0.1:8887/craft2.jpg',
  'http://127.0.0.1:8887/craft3.jpg',
  'http://127.0.0.1:8887/craft4.jpg',
  'http://127.0.0.1:8887/craft1.jpg',
  'http://127.0.0.1:8887/craft2.jpg',
  'http://127.0.0.1:8887/craft3.jpg',
  'http://127.0.0.1:8887/craft4.jpg'
];

const useStyles = makeStyles((theme) => ({
  container: { paddingTop: theme.spacing(4), paddingLeft: theme.spacing(2) },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 2, 4, 0)
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
  },
  labelContainer: {
    display: 'flex',
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(0.5)
  },
  viewAll: {
    marginLeft: 'auto'
  }
}));

export const ProductFlexView = ({ label = 'Similar Products:' }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <span className={classes.labelContainer}>
        <Typography variant="h6">{label}</Typography>
        <Button className={classes.viewAll}>View All</Button>
      </span>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {imageUrls.map((img) => (
            <ProductCard key={img} />
          ))}
        </GridList>
      </div>
    </div>
  );
};

ProductFlexView.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};
