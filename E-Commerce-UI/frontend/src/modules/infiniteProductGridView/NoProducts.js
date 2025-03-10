import React from 'react';
import { NoDataMessage } from 'modules/common/components/NoDataMessage';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { margin: theme.spacing(2) }
}));

export const NoProducts = ({ filter }) => {
  const classes = useStyles();
  const message = filter
    ? 'No matching product(s) found.'
    : 'No Products found.';

  return (
    <div className={classes.root}>
      <NoDataMessage message={message} />
    </div>
  );
};

NoProducts.propTypes = {
  filter: PropTypes.bool
};
