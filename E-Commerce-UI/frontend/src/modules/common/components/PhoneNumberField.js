import { Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CountryCodes } from 'modules/common/enums';

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

export const PhoneNumberField = ({
  label,
  value,
  onChange: onPhoneNumberChannge,
  maxLength = 10,
  classes: classesOverrides,
  error,
  helperText,
  shrink,
  onBlur: onBlurCallback,
  onFocus: onFocusCallback,
  ...rest
}) => {
  const classes = useStyles({ classes: classesOverrides });

  const { countryCode = CountryCodes.INDIA, phoneNumber } = value || {};

  const onChange = useCallback(
    (e) => {
      const re = /^[0-9\b]+$/;

      if (e.target.value === '' || re.test(e.target.value)) {
        onPhoneNumberChannge && onPhoneNumberChannge(e.target.value);
      }
    },
    [onPhoneNumberChannge]
  );

  const numberInputProps = useMemo(
    () => ({
      classes: { root: classes.inputRoot, input: classes.input },
      startAdornment: (
        <Typography className={classes.countryCode} variant="body2">
          {countryCode}
        </Typography>
      ),
      inputProps: { maxLength, pattern: '^[0-9]*$' }
    }),
    [
      classes.inputRoot,
      classes.input,
      classes.countryCode,
      countryCode,
      maxLength
    ]
  );

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

  const FormHelperTextProps = useMemo(
    () => ({
      classes: { root: classes.errorRoot, error: classes.error }
    }),
    [classes.error, classes.errorRoot]
  );

  const onFocus = useCallback(() => {
    onFocusCallback && onFocusCallback();
  }, [onFocusCallback]);

  const onBlur = useCallback(() => {
    onBlurCallback && onBlurCallback(value);
  }, [onBlurCallback, value]);

  return (
    <>
      <TextField
        className={classes.root}
        InputProps={numberInputProps}
        value={phoneNumber}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        label={label}
        variant="outlined"
        fullWidth
        InputLabelProps={InputLabelProps}
        FormHelperTextProps={FormHelperTextProps}
        helperText={helperText}
        error={error}
        {...rest}
      />
    </>
  );
};

PhoneNumberField.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  countryCode: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  shrink: PropTypes.bool,
  classes: PropTypes.object,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};
