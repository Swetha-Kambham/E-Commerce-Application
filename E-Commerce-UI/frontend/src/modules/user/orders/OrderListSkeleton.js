import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles, Paper } from '@material-ui/core';
import { FlexView } from 'modules/common/components/FlexView';

const useStyles = makeStyles((theme) => ({
  actions: {
    float: 'right',
    width: '20%',
    marginLeft: 'auto'
  },
  productDetails: {
    float: 'left',
    width: '20%'
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const rows = [1, 2, 3, 4, 5];

export const OrderListSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {rows.map((row) => (
        <Paper className={classes.paper} key={row}>
          <FlexView>
            <div className={classes.productDetails}>
              <Skeleton height={30} />
              <Skeleton height={90} />
            </div>
            <div className={classes.actions}>
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
            </div>
          </FlexView>
        </Paper>
      ))}
    </div>
  );
};
