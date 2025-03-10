import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent'
  },
  inputRoot: { borderRadius: theme.spacing(2), overflow: 'hidden' },
  input: {
    paddingTop: theme.spacing(1.3),
    paddingBottom: theme.spacing(1.3),
    fontSize: '0.875rem',
    backgroundColor: theme.palette.common.white
  },
  labelRoot: {
    ...theme.typography.body2,
    margin: theme.spacing(-1.3, 0, 0, 0)
  },
  shrink: {
    margin: 'unset',
    fontSize: '1rem'
  },
  errorRoot: {},
  error: {
    color: '#ffa39b !important'
  }
}));

export const TextInputField = ({
  label,
  value,
  onChange,
  maxlength = 255,
  classes: classesOverrides,
  error,
  helperText,
  onBlur: onBlurCallback,
  ...rest
}) => {
  const classes = useStyles({ classes: classesOverrides });
  const textInputProps = useMemo(
    () => ({
      classes: { root: classes.inputRoot, input: classes.input },
      inputProps: {
        maxlength
      }
    }),
    [classes.input, classes.inputRoot, maxlength]
  );

  const InputLabelProps = useMemo(
    () => ({
      classes: {
        root: classes.labelRoot,
        shrink: classes.shrink,
        focused: classes.focused
      }
    }),
    [classes.focused, classes.labelRoot, classes.shrink]
  );

  const FormHelperTextProps = useMemo(
    () => ({
      classes: { root: classes.errorRoot, error: classes.error }
    }),
    [classes.error, classes.errorRoot]
  );

  const onBlur = useCallback(() => {
    onBlurCallback && onBlurCallback(value);
  }, [onBlurCallback, value]);

  return (
    <>
      <TextField
        className={classes.root}
        InputProps={textInputProps}
        variant="outlined"
        value={value}
        InputLabelProps={InputLabelProps}
        FormHelperTextProps={FormHelperTextProps}
        label={label}
        onBlur={onBlur}
        onChange={onChange}
        fullWidth
        error={error}
        helperText={helperText}
        {...rest}
      />
    </>
  );
};

TextInputField.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  maxlength: PropTypes.number,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  classes: PropTypes.object,
  onBlur: PropTypes.func
};
