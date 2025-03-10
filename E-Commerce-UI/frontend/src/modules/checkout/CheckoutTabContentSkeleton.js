import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { FlexView } from 'modules/common/components';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  skeleton: { margin: theme.spacing(2), width: '20%' },
  skeleton1: { margin: theme.spacing(2), width: '30%' },
  skeleton2: { margin: theme.spacing(2), width: '40%' },
  skeleton3: { margin: theme.spacing(2), width: '50%' },
  skeleton4: { marginLeft: 'auto', width: '40px' },
  skeleton5: { width: '40%', marginLeft: theme.spacing(2) }
}));

export const CheckoutTabContentSkeleton = () => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Skeleton
          className={classes.skeleton}
          variant="rect"
          animation="wave"
        />
      </Paper>
      <Paper className={classes.paper}>
        <FlexView>
          <Skeleton
            className={classes.skeleton5}
            variant="rect"
            animation="wave"
          />
          <Skeleton
            className={classes.skeleton4}
            variant="rect"
            animation="wave"
          />
        </FlexView>
        <Skeleton
          className={classes.skeleton1}
          variant="rect"
          animation="wave"
        />
        <Skeleton
          className={classes.skeleton3}
          variant="rect"
          animation="wave"
        />
        <Skeleton
          className={classes.skeleton2}
          variant="rect"
          animation="wave"
        />
      </Paper>
      <Paper className={classes.paper}>
        <FlexView>
          <Skeleton
            className={classes.skeleton5}
            variant="rect"
            animation="wave"
          />
          <Skeleton
            className={classes.skeleton4}
            variant="rect"
            animation="wave"
          />
        </FlexView>
        <Skeleton
          className={classes.skeleton1}
          variant="rect"
          animation="wave"
        />
        <Skeleton
          className={classes.skeleton3}
          variant="rect"
          animation="wave"
        />
        <Skeleton
          className={classes.skeleton2}
          variant="rect"
          animation="wave"
        />
      </Paper>
    </>
  );
};
