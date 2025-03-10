import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export const DateField = ({ label }) => {
  const classes = useStyles();
  const InputLabelProps = useMemo(() => ({ shrink: true }), []);

  return (
    <form className={classes.container} noValidate>
      <TextField
        fullWidth
        id="date"
        label={label}
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={InputLabelProps}
      />
    </form>
  );
};

DateField.propTypes = {
  label: PropTypes.string
};
