import React, { useMemo } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent'
  },
  input: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.4),
    fontSize: '0.875rem',
    backgroundColor: '#ffffff'
  },
  inputRoot: {
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    background: theme.palette.common.white
  },
  labelRoot: {
    ...theme.typography.body2,
    margin: theme.spacing(-1.3, 0, 0, 3.5)
  },
  shrink: {
    margin: 'unset',
    fontSize: '1rem'
  },
  countryCode: {
    paddingRight: theme.spacing(0.5),
    color: theme.palette.text.secondary
  },
  errorRoot: {},
  error: {
    color: '#ffa39b !important'
  }
}));

export const MonthPicker = ({
  inputVariant = 'standard',
  label,
  disablePast,
  openTo = 'month',
  format = 'MM/yyyy',
  classes: classesOverrides,
  placeholder,
  shrink = true,
  date,
  onChange,
  onBlur
}) => {
  const classes = useStyles({ classes: classesOverrides });

  const InputLabelProps = useMemo(
    () => ({
      classes: {
        root: classes.labelRoot,
        shrink: classes.shrink,
        focused: classes.focused
      },
      shrink
    }),
    [classes.focused, classes.labelRoot, classes.shrink, shrink]
  );

  const InputProps = useMemo(
    () => ({
      classes: { root: classes.inputRoot, input: classes.input }
    }),
    [classes.input, classes.inputRoot]
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        views={['year', 'month']}
        label={label}
        openTo={openTo}
        format={format}
        inputVariant={inputVariant}
        onChange={onChange}
        onBlur={onBlur}
        value={date}
        disablePast={disablePast}
        InputLabelProps={InputLabelProps}
        InputProps={InputProps}
        className={classes.root}
        placeholder={placeholder}
      />
    </MuiPickersUtilsProvider>
  );
};

MonthPicker.propTypes = {
  inputVariant: PropTypes.oneOf(['outlined', 'standard', 'filled']),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  disablePast: PropTypes.bool,
  openTo: PropTypes.oneOf(['date', 'month', 'year']),
  format: PropTypes.string,
  classes: PropTypes.object,
  shrink: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  date: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ])
};
