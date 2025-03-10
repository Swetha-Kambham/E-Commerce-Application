import React from 'react';
import PropTypes from 'prop-types';
import { CardMedia, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  image: {
    padding: theme.spacing(1)
  },
  details: {
    margin: 'auto',
    padding: theme.spacing(1)
  }
}));

const productNameField = 'productName';
const imageField = 'images';

export const DetailsFormatters = ({ record }) => {
  const classes = useStyles();
  const productName = record[productNameField];
  const [image] = record[imageField];

  return (
    <>
      <CardMedia
        id={record.id}
        className={classes.image}
        component="img"
        alt="Not Available"
        height="150"
        image={image?.url}
      />
      <Typography className={classes.details}>{productName}</Typography>
    </>
  );
};

DetailsFormatters.propTypes = {
  record: PropTypes.object
};
