import React from 'react';
import { Typography, Divider, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex'
  },
  value: {
    marginLeft: theme.spacing(1)
  }
}));

export const OptionValuesFormatter = ({ optionValues = [] }) => {
  const classes = useStyles();

  if (optionValues.length === 0) return <span>&ndash;</span>;

  return optionValues.map((o) => (
    <div key={o.option}>
      <div className={classes.container}>
        <Typography variant="caption">{`${o.option}:`}</Typography>
        <Typography className={classes.value} variant="caption">
          {o.value}
        </Typography>
      </div>
      <Divider variant="fullWidth" />
    </div>
  ));
};

OptionValuesFormatter.propTypes = {
  optionValues: PropTypes.arrayOf(PropTypes.any)
};
