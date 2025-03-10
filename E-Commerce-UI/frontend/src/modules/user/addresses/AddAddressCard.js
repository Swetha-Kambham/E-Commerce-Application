import React from 'react';
import { Paper, makeStyles, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  paper: {},
  addButton: {
    margin: theme.spacing(2)
  }
}));

export const AddAddressCard = ({
  handleAddClick,
  classes: overrideClasses
}) => {
  const classes = useStyles({ classes: overrideClasses });

  return (
    <Paper className={classes.paper}>
      <Button
        className={classes.addButton}
        onClick={handleAddClick}
        startIcon={<AddIcon />}
        color="primary"
      >
        Add New Address
      </Button>
    </Paper>
  );
};

AddAddressCard.propTypes = {
  handleAddClick: PropTypes.func,
  classes: PropTypes.object
};
