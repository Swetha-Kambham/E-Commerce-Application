import React from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
    backgroundColor: '#e8e8e2',
    padding: theme.spacing(1),
    bottom: 0,
    position: 'sticky'
  }
}));

export const DrawerFooter = ({
  editable,
  isSubmitting,
  closeEditMode,
  isAaddMode,
  onSave,
  values,
  onDelete
}) => {
  const classes = useStyles();

  return (
    <>
      {editable ? (
        <Grid className={classes.footer}>
          <Button
            disabled={isSubmitting}
            color="secondary"
            onClick={closeEditMode}
          >
            Cancel
          </Button>
          {isAaddMode ? (
            <Button
              disabled={
                isSubmitting ||
                !values?.image?.file ||
                !values?.name ||
                !values?.priority
              }
              color="primary"
              onClick={onSave}
            >
              Save
            </Button>
          ) : null}
          {!isAaddMode ? (
            <Button
              disabled={isSubmitting}
              className={classes.delete}
              color="secondary"
              onClick={onDelete}
            >
              Delete
            </Button>
          ) : null}
        </Grid>
      ) : null}
    </>
  );
};

DrawerFooter.propTypes = {
  isSubmitting: PropTypes.bool,
  closeEditMode: PropTypes.func,
  isAaddMode: PropTypes.bool,
  onSave: PropTypes.func,
  values: PropTypes.object,
  onDelete: PropTypes.func,
  editable: PropTypes.bool
};
