import React from 'react';
import { makeStyles, GridList, GridListTile } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: { width: '100%', margin: '8px !important' },
  gridTile: { height: 'unset !important' },
  paper: { margin: theme.spacing(2) },
  skeleton1: {
    height: theme.spacing(20)
  },
  skeleton2: {
    height: theme.spacing(4)
  },
  skeleton3: {
    height: theme.spacing(4),
    width: '60%'
  }
}));

const rows = Array(20)
  .fill()
  .map(() => ({ id: v4() }));

export const ProductLoadingSkeleton = ({ cols }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} component="div" cols={cols}>
        {rows.map((row) => (
          <GridListTile className={classes.gridTile} key={row.id}>
            <div className={classes.paper}>
              <Skeleton variant="rect" className={classes.skeleton1} />
              <Skeleton className={classes.skeleton2} />
              <Skeleton className={classes.skeleton3} />
            </div>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

ProductLoadingSkeleton.propTypes = {
  cols: PropTypes.number
};
